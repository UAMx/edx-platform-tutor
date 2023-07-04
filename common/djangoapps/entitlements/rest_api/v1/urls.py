"""
URLs for the V1 of the Entitlements API.
"""

from django.conf.urls import include
from django.urls import path, re_path
from rest_framework.routers import DefaultRouter

from .views import EntitlementEnrollmentViewSet, EntitlementViewSet, RevokeVerifiedAccessView

router = DefaultRouter()
router.register(r'entitlements', EntitlementViewSet, basename='entitlements')

ENROLLMENTS_VIEW = EntitlementEnrollmentViewSet.as_view({
    'post': 'create',
    'delete': 'destroy',
})

app_name = 'v1'
urlpatterns = [
    path('', include(router.urls)),
    re_path(
        fr'entitlements/(?P<uuid>{EntitlementViewSet.ENTITLEMENT_UUID4_REGEX})/enrollments$',
        ENROLLMENTS_VIEW,
        name='enrollments'
    ),
    re_path(
        fr'subscriptions/entitlements/(?P<uuid>{RevokeVerifiedAccessView.ENTITLEMENT_UUID4_REGEX})/$',
        RevokeVerifiedAccessView.as_view(),
        name='revoke_verified_access'
    )
]
