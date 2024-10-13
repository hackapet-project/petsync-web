from django.shortcuts import render # type: ignore
from django.http import JsonResponse # type: ignore
from rest_framework.decorators import api_view # type: ignore

from api.support.repository import Repository

import json
# Create your views here.
@api_view(['GET'])
def animals(request):
    animals = Repository.show()

    return JsonResponse(animals)

@api_view(['POST'])
def create_animal(request):
    body_unicode = request.body.decode('utf-8')
    payload = json.loads(body_unicode)

    Repository.create(payload)
    return JsonResponse({ 'Message': 'Animal created' })