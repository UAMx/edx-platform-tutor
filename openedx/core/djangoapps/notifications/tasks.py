"""
This file contains celery tasks for notifications.
"""

from celery import shared_task
from celery.utils.log import get_task_logger
from django.db import transaction
from edx_django_utils.monitoring import set_code_owner_attribute

from common.djangoapps.student.models import CourseEnrollment
from openedx.core.djangoapps.notifications.models import (
    CourseNotificationPreference,
    get_course_notification_preference_config_version
)

logger = get_task_logger(__name__)


@shared_task(bind=True, ignore_result=True)
@set_code_owner_attribute
@transaction.atomic
def create_course_notification_preferences_for_courses(self, course_ids):
    """
    This task creates Course Notification Preferences for users in courses.
    """
    logger.info('Running task create_course_notification_preferences')
    newly_created = 0
    for course_id in course_ids:
        enrollments = CourseEnrollment.objects.filter(course_id=course_id, is_active=True)
        logger.info(f'Found {enrollments.count()} enrollments for course {course_id}')
        logger.info(f'Creating Course Notification Preferences for course {course_id}')
        for enrollment in enrollments:
            _, created = CourseNotificationPreference.objects.get_or_create(
                user=enrollment.user, course_id=course_id
            )
            if created:
                newly_created += 1

        logger.info(
            f'CourseNotificationPreference back-fill completed for course {course_id}.\n'
            f'Newly created course preferences: {newly_created}.\n'
        )
    logger.info('Completed task create_course_notification_preferences')


@shared_task
@set_code_owner_attribute
def send_notifications(user_ids, course_key, app_name, notification_type, context, content_url):
    """
    Send notifications to the users.
    """
    from .models import Notification
    user_ids = list(set(user_ids))

    # check if what is preferences of user and make decision to send notification or not
    preferences = CourseNotificationPreference.objects.filter(
        user_id__in=user_ids,
        course_id=course_key,
    )
    preferences = create_notification_pref_if_not_exists(user_ids, preferences)
    notifications = []
    for preference in preferences:
        preference = update_user_preference(preference, preference.user, course_key)
        if preference and preference.get_web_config(app_name, notification_type):
            notifications.append(Notification(
                user_id=preference.user_id,
                app_name=app_name,
                notification_type=notification_type,
                content_context=context,
                content_url=content_url,
                course_id=course_key,
            ))
    # send notification to users but use bulk_create
    Notification.objects.bulk_create(notifications)


def update_user_preference(preference: CourseNotificationPreference, user, course_id):
    """
    Update user preference if config version is changed.
    """
    ver = get_course_notification_preference_config_version()
    if preference.config_version != ver:
        return preference.get_updated_user_course_preferences(user, course_id)
    return preference


def create_notification_pref_if_not_exists(user_ids, preferences):
    """
    Create notification preference if not exist.
    """
    for user_id in user_ids:
        for preference in preferences:
            if preference.user_id == user_id:
                break
        else:
            preferences.append(CourseNotificationPreference.objects.create(
                user_id=user_id,
                course_id=preferences[0].course_id,

            ))
            logger.info('Creating new notification preference for user because it does not exist.')
    return preferences
