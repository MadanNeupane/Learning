from rest_framework import serializers
from .models import Product, Collection, Item


class CollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collection
        fields = ['id', 'name']


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'discounted_price', 'description', 'collection']

    discounted_price = serializers.SerializerMethodField(method_name='calculate_discount')

    def calculate_discount(self, product):
        return product.price * 0.9


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['id', 'product', 'quantity', 'price']
