from django.urls import path
from . import views


urlpatterns = [
    path('products/', views.product_list, name='product_list'),
    path('products/<int:pk>/', views.ProductDetail.as_view(), name='product_detail'),
]
