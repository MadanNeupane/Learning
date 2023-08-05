from django.contrib import admin
from .models import Product, Collection


class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'price', 'description', 'collection')
    list_display_links = ('id', 'name')

    class Meta:
        model = Product


class CollectionAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    list_display_links = ('id', 'name')

    class Meta:
        model = Collection


admin.site.register(Product, ProductAdmin)
admin.site.register(Collection, CollectionAdmin)
