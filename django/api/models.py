from django.db import models


class Collection(models.Model):
    name = models.CharField(max_length=200, null=True)

    def __str__(self) -> str:
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=200, null=True)
    price = models.FloatField(null=True)
    description = models.TextField(null=True)
    collection = models.ForeignKey(Collection, on_delete=models.SET_NULL, null=True)

    def __str__(self) -> str:
        return self.name


class Item(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='items')
    quantity = models.IntegerField(null=True)
    price = models.FloatField(null=True)
