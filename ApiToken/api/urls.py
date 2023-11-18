from django.urls import path
from . import views

urlpatterns = [
    path('login', views.login, name='Iniciar Sesion'),
    path('signup', views.signup, name='Crear Usuario'),
    path('check_token', views.check_token, name='Verificar Token'),
]