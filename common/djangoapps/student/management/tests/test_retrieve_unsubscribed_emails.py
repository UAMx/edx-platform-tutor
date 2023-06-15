"""Tests for retrieve unsubscribed emails management command"""

import os
from io import StringIO
from tempfile import NamedTemporaryFile
from unittest.mock import patch, MagicMock

import six
from django.core.management import call_command
from django.core.management.base import CommandError
from django.test import TestCase, override_settings


class RetrieveUnsubscribedEmailsTests(TestCase):
    """
    Tests for the retrieve_unsubscribed_emails command.
    """

    @staticmethod
    def _write_test_csv(csv, lines):
        """
        Write a test csv file with the lines provided
        """
        csv.write(b"email,unsubscribed_at\n")
        for line in lines:
            csv.write(six.b(line))
        csv.seek(0)
        return csv

    @override_settings(
        UNSUBSCRIBED_EMAILS_FROM_EMAIL='test@example.com',
        UNSUBSCRIBED_EMAILS_RECIPIENT_EMAIL=['test@example.com']
    )
    @patch('common.djangoapps.student.management.commands.retrieve_unsubscribed_emails.EmailMultiAlternatives.send')
    @patch('common.djangoapps.student.management.commands.retrieve_unsubscribed_emails.get_braze_client')
    def test_retrieve_unsubscribed_emails_command(self, mock_get_braze_client, mock_send):
        """
        Test the retrieve_unsubscribed_emails command
        """
        mock_braze_client = mock_get_braze_client.return_value
        mock_braze_client.retrieve_unsubscribed_emails.return_value = [
            {'email': 'test1@example.com', 'unsubscribed_at': '2023-06-01 10:00:00'},
            {'email': 'test2@example.com', 'unsubscribed_at': '2023-06-02 12:00:00'},
        ]
        mock_send.return_value = MagicMock()

        output = StringIO()
        call_command('retrieve_unsubscribed_emails', stdout=output)

        self.assertIn('Unsubscribed emails retrieved successfully', output.getvalue())
        mock_send.assert_called_once()

        with NamedTemporaryFile(delete=False) as csv:
            filepath = csv.name
            lines = [
                'test1@example.com,2023-06-01 10:00:00',
                'test2@example.com,2023-06-02 12:00:00'
            ]
            self._write_test_csv(csv, lines)

            with open(filepath, 'r') as csv_file:
                csv_data = csv_file.read()
                self.assertIn('test1@example.com,2023-06-01 10:00:00', csv_data)
                self.assertIn('test2@example.com,2023-06-02 12:00:00', csv_data)

            os.remove(filepath)

    @override_settings(
        UNSUBSCRIBED_EMAILS_FROM_EMAIL='test@example.com',
        UNSUBSCRIBED_EMAILS_RECIPIENT_EMAIL=['test@example.com']
    )
    @patch('common.djangoapps.student.management.commands.retrieve_unsubscribed_emails.EmailMultiAlternatives.send')
    @patch('common.djangoapps.student.management.commands.retrieve_unsubscribed_emails.get_braze_client')
    def test_retrieve_unsubscribed_emails_command_with_dates(self, mock_get_braze_client, mock_send):
        """
        Test the retrieve_unsubscribed_emails command with custom start and end dates.
        """
        mock_braze_client = mock_get_braze_client.return_value
        mock_braze_client.retrieve_unsubscribed_emails.return_value = [
            {'email': 'test3@example.com', 'unsubscribed_at': '2023-06-03 08:00:00'},
            {'email': 'test4@example.com', 'unsubscribed_at': '2023-06-04 14:00:00'},
        ]
        mock_send.return_value = MagicMock()

        output = StringIO()
        call_command(
            'retrieve_unsubscribed_emails',
            '--start_date', '2023-06-03',
            '--end_date', '2023-06-04',
            stdout=output
        )

        self.assertIn('Unsubscribed emails retrieved successfully', output.getvalue())
        mock_send.assert_called_once()

        with NamedTemporaryFile(delete=False) as csv:
            filepath = csv.name
            lines = [
                'test3@example.com,2023-06-03 08:00:00',
                'test4@example.com,2023-06-04 14:00:00'
            ]
            self._write_test_csv(csv, lines)

            with open(filepath, 'r') as csv_file:
                csv_data = csv_file.read()
                self.assertIn('test3@example.com,2023-06-03 08:00:00', csv_data)
                self.assertIn('test4@example.com,2023-06-04 14:00:00', csv_data)

            os.remove(filepath)

    @patch('common.djangoapps.student.management.commands.retrieve_unsubscribed_emails.EmailMultiAlternatives.send')
    @patch('common.djangoapps.student.management.commands.retrieve_unsubscribed_emails.get_braze_client')
    @patch('common.djangoapps.student.management.commands.retrieve_unsubscribed_emails.logger.exception')
    def test_retrieve_unsubscribed_emails_command_exception(self, mock_logger_exception, mock_get_braze_client,
                                                            mock_send):
        """
        Test the retrieve_unsubscribed_emails command when an exception is raised.
        """
        mock_braze_client = mock_get_braze_client.return_value
        mock_braze_client.retrieve_unsubscribed_emails.side_effect = Exception('Braze API error')
        mock_send.return_value = MagicMock()

        output = StringIO()
        with self.assertRaises(CommandError):
            call_command('retrieve_unsubscribed_emails', stdout=output)

        mock_logger_exception.assert_called_once_with(
            'Unable to retrieve unsubscribed emails from Braze due to exception: Braze API error'
        )
        mock_send.assert_not_called()

    @patch('common.djangoapps.student.management.commands.retrieve_unsubscribed_emails.EmailMultiAlternatives.send')
    @patch('common.djangoapps.student.management.commands.retrieve_unsubscribed_emails.get_braze_client')
    @patch('common.djangoapps.student.management.commands.retrieve_unsubscribed_emails.logger.info')
    def test_retrieve_unsubscribed_emails_command_no_data(self, mock_logger_info, mock_get_braze_client, mock_send):
        """
        Test the retrieve_unsubscribed_emails command when no unsubscribed emails are returned.
        """
        mock_braze_client = mock_get_braze_client.return_value
        mock_braze_client.retrieve_unsubscribed_emails.return_value = []
        mock_send.return_value = MagicMock()

        output = StringIO()
        call_command('retrieve_unsubscribed_emails', stdout=output)

        self.assertIn('Unsubscribed emails retrieved successfully', output.getvalue())
        mock_send.assert_not_called()
        mock_logger_info.assert_called_once_with(
            'No unsubscribed emails found within the specified date range.'
        )

    @override_settings(
        UNSUBSCRIBED_EMAILS_FROM_EMAIL='test@example.com',
        UNSUBSCRIBED_EMAILS_RECIPIENT_EMAIL=['test@example.com']
    )
    @patch('common.djangoapps.student.management.commands.retrieve_unsubscribed_emails.EmailMultiAlternatives.send')
    @patch('common.djangoapps.student.management.commands.retrieve_unsubscribed_emails.get_braze_client')
    @patch('common.djangoapps.student.management.commands.retrieve_unsubscribed_emails.logger.exception')
    def test_retrieve_unsubscribed_emails_command_error_sending_email(self, mock_logger_exception,
                                                                      mock_get_braze_client, mock_send):
        """
        Test the retrieve_unsubscribed_emails command when an error occurs during email sending.
        """
        mock_braze_client = mock_get_braze_client.return_value
        mock_braze_client.retrieve_unsubscribed_emails.return_value = [
            {'email': 'test1@example.com', 'unsubscribed_at': '2023-06-01 10:00:00'},
        ]
        mock_send.side_effect = Exception('Email sending error')

        output = StringIO()

        with self.assertRaises(CommandError):
            call_command('retrieve_unsubscribed_emails', stdout=output)

        mock_logger_exception.assert_called_once_with(
            'Failure to send unsubscribed emails data to your email due to exception: Email sending error'
        )
