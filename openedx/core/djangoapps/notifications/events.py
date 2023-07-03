""" Events for notification app. """

from eventtracking import tracker
from common.djangoapps.track import contexts


NOTIFICATION_PREFERENCES_VIEWED = 'edx.notifications.preferences.viewed'


def get_user_forums_roles(user, course_id):
    """
    Get the user's roles in the course forums.
    """
    return [
        role.name for role in user.roles.filter(course_id=course_id)
    ]


def get_user_course_roles(user, course_id):
    """
    Get the user's roles in the course.
    """
    return [
        role.role for role in user.courseaccessrole_set.filter(course_id=course_id)
    ]


def notification_preferences_viewed(request, course_id):
    """
    Emit an event when a user views their notification preferences.
    """
    event_name = NOTIFICATION_PREFERENCES_VIEWED
    context = contexts.course_context_from_course_id(course_id)
    with tracker.get_tracker().context(event_name, context):
        tracker.emit(
            event_name,
            {
                'user_id': str(request.user.id),
                'course_id': str(course_id),
                'user_forum_roles': get_user_forums_roles(request.user, course_id),
                'user_course_roles': get_user_course_roles(request.user, course_id),
            }
        )
