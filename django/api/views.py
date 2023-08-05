from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import ProductSerializer, CollectionSerializer
from .models import Product, Collection


@api_view(['GET'])
def product_list(request):
    queryset = Product.objects.select_related('collection').all()
    serializer = ProductSerializer(queryset, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def product_detail(request, pk):
    queryset = Product.objects.select_related('collection').get(id=pk)
    serializer = ProductSerializer(queryset)

    return Response(serializer.data)
