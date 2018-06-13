from django.db import models


class MonthlyBudjet(models.Model):
    start_date = models.DateField()
    end_date = models.DateField()


class Category(models.Model):
    month = models.ForeignKey('MonthlyBudjet', on_delete=models.CASCADE, null=True)
    budjet = models.IntegerField(default=0)
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=256, blank=True, null=True)


class Income(models.Model):
    month = models.ForeignKey('MonthlyBudjet', on_delete=models.CASCADE, null=True)
    amount = models.IntegerField()
    description = models.CharField(max_length=256, blank=True, null=True)


class Expense(models.Model):
    month = models.ForeignKey('MonthlyBudjet', on_delete=models.CASCADE, null=True)
    category = models.ForeignKey('Category', null=True, on_delete=models.SET_NULL)
    amount = models.DecimalField(max_digits=10, decimal_places=3)
