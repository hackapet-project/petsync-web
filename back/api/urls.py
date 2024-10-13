from django.urls import path #type: ignore
from .views.animal_view import Animal

urlpatterns = [
    path('animals', Animal.as_view(), name='animals'),
]
