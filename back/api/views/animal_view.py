# from rest_framework.viewsets import ViewSet # type: ignore
from django.views import View
from django.views.decorators.csrf import csrf_exempt # type: ignore
from django.utils.decorators import method_decorator
from django.http import JsonResponse # type: ignore

from rest_framework import status, viewsets #type: ignore
from rest_framework.response import Response #type: ignore

from api.support.repository import Repository

import json, sys

class Animals(View):

    @method_decorator(csrf_exempt)
    def get(self, request, id=None):
        animals = Repository.show()
        if id:
            animal = next((animal for animal in animals if animal['id'] == id), None)

            if animal:
                return JsonResponse(animal)
            else:
                return JsonResponse({ 'Error': 'Animal not found' }, status=404)
        else:
            return JsonResponse(animals, safe=False)

    @method_decorator(csrf_exempt)
    def post(self, request):
        body_unicode = request.body.decode("utf-8")
        payload = json.loads(body_unicode)

        Repository.create(payload)

        return JsonResponse({ 'Message': 'Animal created' })

    @method_decorator(csrf_exempt)
    def delete(self, request, id=None):
        deleted = Repository.destroy(id)

        if not deleted: return JsonResponse({ 'Error': 'Animal not found'}, status=404)

        return JsonResponse({ 'Message': 'Animal Deleted' }, status=204)

    @method_decorator(csrf_exempt)
    def put(self, request, id=None):
        animals = Repository.show()
        print(id, type(id), file=sys.stderr)
        if not id:
            return JsonResponse({'Error': 'ID is required for updating an animal'}, status=400)

        animal = next((animal for animal in animals if animal['id'] == id), None)
        if not animal:
            return JsonResponse({'Error': 'Animal not found'}, status=404)

        try:
            # Decode the request body and load JSON data
            body_unicode = request.body.decode("utf-8")
            payload = json.loads(body_unicode)

            # Update all fields of the animal with the payload in one line
            animal.update(payload)

        except json.JSONDecodeError:
            return JsonResponse({'Error': 'Invalid JSON data'}, status=400)
        return JsonResponse(animal)