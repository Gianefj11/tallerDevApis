from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models

# Create your models here.


# Clase Desarrolladores (Modelo )
class Desarrolladores(models.Model):
    first_name = models.CharField(max_length=150,null=True)
    last_name = models.CharField(max_length=150,null=True)
    email = models.EmailField(unique=True)
    years = models.IntegerField(blank=True,validators=[MinValueValidator(18), MaxValueValidator(100)]) # Validaciones Min para Integer
    country = models.CharField(max_length=150,blank=True)
    date = models.DateTimeField(auto_now_add=True)
