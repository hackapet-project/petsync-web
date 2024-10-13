from django.shortcuts import render
from django.http import JsonResponse # type: ignore

from rest_framework.decorators import api_view # type: ignore

import json
# Create your views here.
@api_view(['GET'])
def animals(request):

    return JsonResponse({ 'Message': 'Ok' })

@api_view(['POST'])
def create_animal(request):
    body_unicode = request.body.decode('utf-8')
    payload = json.loads(body_unicode)

    return JsonResponse({ 'Message': 'Animal created' })