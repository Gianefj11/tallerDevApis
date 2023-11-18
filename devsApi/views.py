from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ViewSet, ModelViewSet
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import *
from .utils.serializer import ApiSerializer
from rest_framework.permissions import IsAuthenticated,IsAdminUser,IsAuthenticatedOrReadOnly

# Create your views here.

# Hereda de APIView

class ApiView(APIView):

    # Simple GET
    def get(self,request):
        # Obtener Todos los Objetos
        #dev = Desarrolladores.objects.all()
        dev = ApiSerializer(Desarrolladores.objects.all(),many=True)
        return Response(status=status.HTTP_200_OK,data=dev.data)

    # Metodo Post
    def post(self,request):

        # Desarrolladores.objects.create(
        #     primer_nombre = request.POST['primer_nombre'],
        #     segundo_nombre=request.POST['segundo_nombre'],
        #     email=request.POST['email'],
        #     years=request.POST['years'],
        #     pais=request.POST['pais']
        # )
        # return self.get(request)


        # --------------------------------------------------------------------------
        # Desde Form data
        # --------------------------------------------------------------------------
        devs = ApiSerializer(data=request.POST)

        # Verificar si es Valido
        devs.is_valid(raise_exception=True)
        devs.save()
        return Response(status=status.HTTP_200_OK,data=devs.data)


# A traves de ViewSet
class ApiViewSet(ViewSet):

    #
    def list(self,request):
        dev = ApiSerializer(Desarrolladores.objects.all(),many=True)
        return Response(status=status.HTTP_200_OK,data=dev.data)


    # Get Query Param
    def retrieve(self,request,pk:int):

        # Obtener por el ID
        devs = ApiSerializer(Desarrolladores.objects.get(pk=pk))

        return Response(status=status.HTTP_200_OK, data=devs.data)

    # Post From Data
    def create(self,request):
        # --------------------------------------------------------------------------
        # Desde Form data
        # --------------------------------------------------------------------------
        devs = ApiSerializer(data=request.POST)

        # Verificar si es Valido
        devs.is_valid(raise_exception=True)
        devs.save()
        return Response(status=status.HTTP_200_OK,data=devs.data)

class ApiModelViewSet(ModelViewSet):
    # Permisos de la Clase
    permission_classes = [IsAuthenticated]
    serializer_class = ApiSerializer
    queryset = Desarrolladores.objects.all()
    # http_method_names = ['get','post']