from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter
from rest_framework_nested import routers as nested_routers

router = DefaultRouter()
router.register('products', views.ProductViewSet, basename='products')
item_router = nested_routers.NestedDefaultRouter(router, 'products', lookup='product')
item_router.register('items', views.ItemViewSet, basename='product-items')

urlpatterns = router.urls + item_router.urls
