from rest_framework.permissions import BasePermission


# Permiso Personalizado

class IsAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method == "GET":
            return True
        else:
            return request.user.is_staff