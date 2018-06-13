from rest_framework import serializers

from budjet_app.models import MonthlyBudjet, Category, Income, Expense


class MonthlyBudjetSerializer(serializers.ModelSerializer):
    class Meta:
        model = MonthlyBudjet
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class IncomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Income
        fields = '__all__'


class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = '__all__'

