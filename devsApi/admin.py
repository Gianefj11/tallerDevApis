from django.contrib import admin

from .models import *

@admin.register(Desarrolladores)
class DesarrolladoresAdmin(admin.ModelAdmin):
    pass