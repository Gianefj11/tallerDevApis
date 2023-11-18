from users.models import User
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication

from django.shortcuts import get_object_or_404

from .serializers import UserSerializer, ResponseUserSerializer


@api_view(['POST'])
def login(request):
    user = get_object_or_404(User, email=request.data['email'])
    if not user.check_password(request.data['password']):
        return Response({
            'detail': 'Password incorrect',
        }, status=status.HTTP_404_NOT_FOUND)

    # token, created = Token.objects.get_or_create(user=user)
    token = RefreshToken.for_user(user)
    userSerializer = ResponseUserSerializer(instance=user)
    return Response({
        # "token": token.key,
        "refresh": str(token),
        "access": str(token.access_token),
        "user": userSerializer.data
    })


@api_view(['POST'])
def signup(request):
    userSerializer = UserSerializer(data=request.data)
    if userSerializer.is_valid():
        userSerializer.save()
        user = User.objects.get(email=request.data['email'])
        user.set_password(request.data['password'])
        user.save()
        # token, created = Token.objects.get_or_create(user=user)
        token = RefreshToken.for_user(user)
        return Response({
            # "token": token.key,
            "refresh": str(token),
            "access": str(token.access_token),
            "user": userSerializer.data
        })
    else:
        return Response(userSerializer.errors, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
# @authentication_classes([SessionAuthentication, TokenAuthentication])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def check_token(request):
    return Response("valid for {}".format(request.user.email))
