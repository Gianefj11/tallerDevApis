from rest_framework.serializers import ModelSerializer
from ..models import *
# Agregar
class ApiSerializer(ModelSerializer):

    class Meta:
        model = Desarrolladores
        #Fields = "__all__" # Todos los Atributos
        fields = [
            'id',
            'first_name',
            'last_name',
            'email',
            'years',
            'country']
        ref_name = 'Desarrolladores'