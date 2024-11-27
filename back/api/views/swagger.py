import os
import yaml
import logging
from django.http import JsonResponse
from django.conf import settings
from rest_framework.views import APIView

class CustomSchemaView(APIView):
    def get(self, request, *args, **kwargs):
        schema_path = '/opt/workdir/api/support/swagger.yml'

        try:
            with open(schema_path, 'r') as file:
                schema_data = yaml.safe_load(file)
            return JsonResponse(schema_data)
        except FileNotFoundError:
            return JsonResponse({ 'error': 'Schema file not found.' }, status=404)
        except yaml.YAMLError as e:
            logging.error(f'Error, failing parsing')
            return JsonResponse({'error': 'Fatal Server Error'}, status=500)
