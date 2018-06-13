from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets

from budjet_app.models import MonthlyBudjet
from budjet_app.serializers import MonthlyBudjetSerializer, CategorySerializer, IncomeSerializer, ExpenseSerializer


class MonthlyBudjetViewSet(viewsets.ModelViewSet):
    queryset = MonthlyBudjet.objects.all()
    serializer_class = MonthlyBudjetSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = MonthlyBudjet.objects.all()
    serializer_class = CategorySerializer


class IncomeViewSet(viewsets.ModelViewSet):
    queryset = MonthlyBudjet.objects.all()
    serializer_class = IncomeSerializer


class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = MonthlyBudjet.objects.all()
    serializer_class = ExpenseSerializer


