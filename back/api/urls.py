from django.urls import path, include #type: ignore

from rest_framework import permissions
from rest_framework.routers import DefaultRouter

from drf_spectacular.views import (
    SpectacularRedocView,
    SpectacularSwaggerView
)

from .views.animal_view import Animals
from .views.swagger import CustomSchemaView

urlpatterns = [
    path('animals/', Animals.as_view(), name='animals'),
    path('animals/<int:id>', Animals.as_view(), name='animals'),

    path('api/schema/', CustomSchemaView.as_view(), name='custom-schema'),
    path('api/docs/',SpectacularSwaggerView.as_view(url_name='custom-schema'), name='swagger-ui'),
    path('api/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]