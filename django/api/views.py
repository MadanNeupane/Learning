from django.shortcuts import render
from django.shortcuts import get_object_or_404

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.viewsets import ModelViewSet
from .serializers import ProductSerializer, CollectionSerializer
from .models import Product, Collection


# @api_view(['GET', 'PUT'])
# def product_list(request):
#     if request.method == 'GET':
#         queryset = Product.objects.select_related('collection').all()
#         serializer = ProductSerializer(queryset, many=True)

#         return Response(serializer.data)
#     elif request.method == 'PUT':
#         serializer = ProductSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         return Response(serializer.data)
#     else:
#         return Response(status=405)


# @api_view(['GET', 'PUT', 'DELETE'])
# def product_detail(request, pk):
#     if request.method == 'GET':
#         queryset = get_object_or_404(Product, pk=pk)
#         serializer = ProductSerializer(queryset)

#         return Response(serializer.data)
#     elif request.method == 'PUT':
#         queryset = get_object_or_404(Product, pk=pk)
#         serializer = ProductSerializer(queryset, data=request.data)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         return Response(serializer.data)
#     elif request.method == 'DELETE':
#         queryset = get_object_or_404(Product, pk=pk)
#         queryset.delete()
#         return Response(status=204)
#     else:
#         return Response(status=405)


# class ProductDetail(RetrieveUpdateDestroyAPIView):
#     queryset = Product.objects.get_queryset().select_related('collection')
#     serializer_class = ProductSerializer


class ProductViewSet(ModelViewSet):
    queryset = Product.objects.select_related('collection').all()
    serializer_class = ProductSerializer
