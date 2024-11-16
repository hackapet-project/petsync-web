from django.urls import path, include #type: ignore

from rest_framework import permissions
from rest_framework.routers import DefaultRouter

from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView
)

from .views.animal_view import Animals

urlpatterns = [
    path('animals/', Animals.as_view(), name='animals'),
    path('animals/<int:id>', Animals.as_view(), name='animals'),

    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]