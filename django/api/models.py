from django.db import models


class Collection(models.Model):
    name = models.CharField(max_length=200, null=True)


class Product(models.Model):
    name = models.CharField(max_length=200, null=True)
    price = models.FloatField(null=True)
    description = models.TextField(null=True)
    collection = models.ForeignKey(Collection, on_delete=models.SET_NULL, null=True)
