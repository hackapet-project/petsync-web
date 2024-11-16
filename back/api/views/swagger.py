import os
import yaml
from django.http import JsonResponse
from django.conf import settings
from rest_framework.views import APIView

class CustomSchemaView(APIView):
    def get(self, request, *args, **kwargs):
        # Path to your swagger.yml file
        schema_path = '/opt/workdir/api/support/swagger.yml'  # Use the absolute path in Docker
        try:
            with open(schema_path, 'r') as file:
                # Load YAML content and convert it to a dictionary
                schema_data = yaml.safe_load(file)
            return JsonResponse(schema_data)
        except FileNotFoundError:
            return JsonResponse({'error': 'Schema file not found.'}, status=404)
        except yaml.YAMLError as e:
            return JsonResponse({'error': f'Error parsing YAML: {str(e)}'}, status=500)
