from rest_framework import serializers
from users.models import User


# Modelo para Registro de Usuario
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email','password']

# User Model Response Login
class ResponseUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username', 'email']

class RequestLogin(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'password']