from rest_framework.routers import DefaultRouter
from .views import *


router = DefaultRouter()
# router.register(prefix='devs',basename='desa',viewset=ApiViewSet)
router.register(prefix='',basename='desa',viewset=ApiModelViewSet)


