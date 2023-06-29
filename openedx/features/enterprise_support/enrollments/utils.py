"""
Utils for use in enrollment codebase such as views.
"""
import logging

from django.core.exceptions import ObjectDoesNotExist  # lint-amnesty, pylint: disable=wrong-import-order
from django.db import transaction

from common.djangoapps.student.models import User
from openedx.core.djangoapps.enrollments import api as enrollment_api
from openedx.core.djangoapps.enrollments.errors import (
    CourseEnrollmentError,
    CourseEnrollmentExistsError,
    EnrollmentNotUpdatableError,
)
from openedx.core.lib.log_utils import audit_log
from openedx.features.enterprise_support.enrollments.exceptions import (
    CourseIdMissingException,
    UserDoesNotExistException
)

log = logging.getLogger(__name__)


def lms_update_or_create_enrollment(
    username,
    course_id,
    desired_mode,
    enterprise_uuid=None,
    is_active=True,
):
    """
    Update or create the user's course enrollment based on the existing enrollment mode.
    If an enrollment exists and its mode is not equal to the desired mode, then it updates the enrollment.
    Othewise, it creates a new enrollment.
    Enrollment function meant to be called by edx-enterprise to replace the
    current uses of the EnrollmentApiClient
    The REST enrollment endpoint may also eventually also want to reuse this function
    since it's a subset of what the endpoint handles

    Unlike the REST endpoint, this function does not check for enterprise enabled, or user api key
    permissions etc. Those concerns are still going to be used by REST endpoint but this function
    is meant for use from within edx-enterprise hence already presume such privileges.

    Arguments:
     - username (str): User name
     - course_id (obj) : Course key obtained using CourseKey.from_string(course_id_input)
     - desired_mode (CourseMode): desired course mode
     - enterprise_uuid (str): Optional. id to identify the enterprise to enroll under
     - is_active (bool): Optional. A Boolean value that indicates whether the
        enrollment is to be set to inactive (if False). Usually we want a True if enrolling anew.

    Returns: A serializable dictionary of the new course enrollment. If it hits
     `CourseEnrollmentExistsError` then it logs the error and returns None.
    """
    user = _validate_enrollment_inputs(username, course_id)
    current_enrollment = enrollment_api.get_enrollment(username, str(course_id))

    with transaction.atomic():
        try:
            if current_enrollment and (
                current_enrollment['mode'] != desired_mode
                or current_enrollment['is_active'] != is_active
            ):
                response = enrollment_api.update_enrollment(
                    username,
                    str(course_id),
                    mode=desired_mode,
                    is_active=is_active,
                    enrollment_attributes=None,
                )
                if not response or (
                    response['mode'] != desired_mode or
                    response['is_active'] != is_active
                ):
                    log.exception(
                        "An error occurred while updating the new course enrollment for user "
                        "[%s] in course run [%s]",
                        username,
                        course_id,
                    )
                    raise EnrollmentNotUpdatableError(
                        f"Unable to upgrade enrollment for user {username} in course {course_id} "
                        "to {desired_mode} mode."
                    )
                return None
            else:
                response = enrollment_api.add_enrollment(
                    username,
                    str(course_id),
                    mode=desired_mode,
                    is_active=is_active,
                    enrollment_attributes=None,
                    enterprise_uuid=enterprise_uuid,
                )
                if not response:
                    log.exception(
                        "An error occurred while creating the new course enrollment for user "
                        "[%s] in course run [%s]",
                        username,
                        course_id,
                    )
                    raise CourseEnrollmentError(
                        f"Unable to create enrollment for user {username} in course {course_id}."
                    )
        except CourseEnrollmentExistsError:
            log.info(
                "The enrollment for user [%s] in course run [%s] already exists.",
                username,
                course_id,
            )
            return None
        except (CourseEnrollmentError, EnrollmentNotUpdatableError) as error:
            log.exception("An error occurred while creating the new course enrollment for user "
                          "[%s] in course run [%s]", username, course_id)
            raise error
        finally:
            # Assumes that the ecommerce service uses an API key to authenticate.
            current_enrollment = enrollment_api.get_enrollment(username, str(course_id))
            audit_log(
                'enrollment_change_requested',
                course_id=str(course_id),
                requested_mode=desired_mode,
                actual_mode=current_enrollment['mode'] if current_enrollment else None,
                requested_activation=is_active,
                actual_activation=current_enrollment['is_active'] if current_enrollment else None,
                user_id=user.id
            )
        return response


def _validate_enrollment_inputs(username, course_id):
    """
    Validates username and course_id.
    Raises:
     - UserDoesNotExistException if user not found.
     - CourseIdMissingException if course_id not provided.
    """
    if not course_id:
        raise CourseIdMissingException("Course ID must be specified to create a new enrollment.")
    if not username:
        raise UserDoesNotExistException('username is a required argument for enrollment')
    try:
        # Lookup the user, instead of using request.user, since request.user may not match the username POSTed.
        user = User.objects.get(username=username)
    except ObjectDoesNotExist as error:
        raise UserDoesNotExistException(f'The user {username} does not exist.') from error
    return user
