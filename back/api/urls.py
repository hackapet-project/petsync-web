from django.urls import path, include #type: ignore

from rest_framework import permissions
from rest_framework.routers import DefaultRouter

from .views.animal_view import Animals
from .views.swagger import Swagger

from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
   openapi.Info(
      title="Sample API",
      default_version='v1',
      description="API documentation for your Django project",
      contact=openapi.Contact(email="your-email@example.com"),
   ),
   public=True,
   # permission_classes=(permissions.AllowAny,),
)

# router = DefaultRouter()
# router.register(r'animals', Animals, basename='animal')

urlpatterns = [
    path('animals/', Animals.as_view(), name='animals'),
    path('animals/<int:id>', Animals.as_view(), name='animals'),
    path('docs/', schema_view.with_ui('swagger', cache_timeout=0), name='swagger-ui')
]