from django.urls import path #type: ignore

from rest_framework import permissions

from .views.animal_view import Animal
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
   permission_classes=(permissions.AllowAny,),
)

# schema_view = get_swagger_view(tittle='Pastebin API')

urlpatterns = [
    path('animals/<int:id>/', Animal.as_view(), name='animals'),
    # path('animals/:id', Animal.as_view(), name='animals'),
    # path('swagger/', Swagger.as_view(), name='swagger-docs'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='swagger-ui')
    # path('docs', schema_view, name='docs'),
    # url(r'^$', schema_view)
]
