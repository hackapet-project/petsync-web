from rest_framework.decorators import APIView # type: ignore
from django.views.decorators.csrf import csrf_exempt # type: ignore
from django.http import JsonResponse # type: ignore

from api.support.repository import Repository

import json, sys

class Animal(APIView):
    def get(self, request, *args, **kwargs):

        animals = Repository.show()
        return JsonResponse(animals)

    def post(self, request, *args, **kwargs):
        body_unicode = request.body.decode("utf-8")
        payload = json.loads(body_unicode)

        Repository.create(payload)

        return JsonResponse({ 'Message': 'Animal created' })
    
    def delete(self, request, id=None, *args, **kwargs):
        if not id: return JsonResponse({ 'error': 'id not found' })

        Repository.delete(id)
        return JsonResponse({ 'message': 'item deleted' })
        # body_unicode = request.body.decode("utf-8")
        # payload = json.loads(body_unicode)

        # Repository.create(payload)

        # return JsonResponse({ 'Message': 'Animal created' })

    def put(self, request, *args, **kwargs):
        body_unicode = request.body.decode("utf-8")
        payload = json.loads(body_unicode)

        Repository.create(payload)

        return JsonResponse({ 'Message': 'Animal created' })