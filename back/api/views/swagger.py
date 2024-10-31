# from django.conf import settings

# from rest_framework.decorators import APIView # type: ignore
# from rest_framework.response import Response
# from rest_framework.permissions import AllowAny
# from rest_framework import status
# # from django.http import JsonResponse # type: ignore
# from drf_yasg import openapi
# from drf_yasg.utils import swagger_auto_schema
# from drf_yasg.views import get_schema_view

# from api.support.repository import Repository

# import os, yaml, json, sys

# class Swagger(APIView):
#     permission_classes = [AllowAny]

#     def get(self, request):
#         # Load the YAML file
#         yaml_path = '/opt/workdir/api/support/swagger.yml'
#         with open(yaml_path, 'r') as yaml_file:
#             yaml_content = yaml.safe_load(yaml_file)

#         # Convert the loaded YAML content to an OpenAPI schema
#             openapi_schema = openapi.Swagger(yaml_content)
#         return Response(openapi_schema, status=status.HTTP_200_OK)