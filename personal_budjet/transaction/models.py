from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=256, blank=True, null=True)


class Transaction(models.Model):
    amount = models.IntegerField()
    category = models.ForeignKey('Category', null=True, on_delete=models.SET_NULL)

    created = models.DateField(auto_now_add=True)