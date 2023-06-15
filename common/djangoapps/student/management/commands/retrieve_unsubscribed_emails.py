"""Management command to retrieve unsubscribed emails from Braze."""

import logging
import tempfile
from datetime import datetime, timedelta

from django.conf import settings
from django.core.mail.message import EmailMultiAlternatives
from django.core.management.base import BaseCommand, CommandError
from django.template.loader import get_template

from lms.djangoapps.utils import get_braze_client

logger = logging.getLogger(__name__)

UNSUBSCRIBED_EMAILS_MAX_LIMIT = 500


class Command(BaseCommand):
    """
    Management command to retrieve unsubscribed emails from Braze.
    """

    help = """
    Retrieve unsubscribed emails from Braze API based on specified parameters.

    Usage:
    python manage.py retrieve_unsubscribed_emails [--start-date START_DATE] [--end-date END_DATE]

    Options:
      --start-date START_DATE   Start date (optional)
      --end-date END_DATE       End date (optional)

    Example:
        $ ... retrieve_unsubscribed_emails --start-date 2022-01-01 --end-date 2023-01-01
    """

    def add_arguments(self, parser):
        parser.add_argument('--start_date', dest='start_date', help='Start date')
        parser.add_argument('--end_date', dest='end_date', help='End date')

    def _write_csv(self, csv, data):
        """Write a test CSV file with the data provided"""
        headers = list(data[0].keys())
        csv.write(','.join(headers).encode('utf-8') + b"\n")

        for row in data:
            values = [str(row[key]) for key in headers]
            csv.write(','.join(values).encode('utf-8') + b"\n")

        csv.seek(0)
        return csv

    def handle(self, *args, **options):
        emails = []
        start_date = options.get('start_date')
        end_date = options.get('end_date')

        if not start_date and not end_date:
            start_date = (datetime.now() - timedelta(days=7)).strftime('%Y-%m-%d')
            end_date = datetime.now().strftime('%Y-%m-%d')

        try:
            braze_client = get_braze_client()
            if braze_client:
                emails = braze_client.retrieve_unsubscribed_emails(
                    start_date=start_date,
                    end_date=end_date,
                )
                self.stdout.write(self.style.SUCCESS('Unsubscribed emails retrieved successfully'))
        except Exception as exc:
            logger.exception(f'Unable to retrieve unsubscribed emails from Braze due to exception: {exc}')
            raise CommandError(
                f'Unable to retrieve unsubscribed emails from Braze due to exception: {exc}'
            ) from exc

        if emails:
            try:
                with tempfile.NamedTemporaryFile(delete=False, mode='wb', suffix='.csv') as csv_file:
                    csv_file = self._write_csv(csv_file, emails)
                    csv_file_path = csv_file.name
            except Exception as exc:
                logger.exception(f'Error while writing data in CSV file due to exception: {exc}')
                raise CommandError(
                    f'Error while writing data in CSV file due to exception: {exc}'
                ) from exc

            txt_template = 'unsubscribed_emails/email/email_body.txt'
            html_template = 'unsubscribed_emails/email/email_body.html'

            context = {
                'start_date': start_date,
                'end_date': end_date,
            }

            template = get_template(txt_template)
            plain_content = template.render(context)
            template = get_template(html_template)
            html_content = template.render(context)

            subject = f'Unsubscribed Emails from {start_date} to {end_date}'

            email_msg = EmailMultiAlternatives(
                subject,
                plain_content,
                settings.UNSUBSCRIBED_EMAILS_FROM_EMAIL,
                settings.UNSUBSCRIBED_EMAILS_RECIPIENT_EMAIL
            )
            email_msg.attach_alternative(html_content, 'text/html')

            with open(csv_file_path, 'rb') as file:
                email_msg.attach(filename='unsubscribed_emails.csv', content=file.read(), mimetype='text/csv')

            try:
                email_msg.send()
                logger.info('Unsubscribed emails data sent to your email.')
            except Exception as exc:
                logger.exception(f'Failure to send unsubscribed emails data to your email due to exception: {exc}')
                raise CommandError(
                    f'Failure to send unsubscribed emails data to your email due to exception: {exc}'
                ) from exc

        logger.info('No unsubscribed emails found within the specified date range.')
