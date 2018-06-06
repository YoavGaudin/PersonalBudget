from django.contrib import admin

from budjet_app.models import MonthlyBudjet, Category, Income, Expense

admin.site.register(MonthlyBudjet)
admin.site.register(Category)
admin.site.register(Income)
admin.site.register(Expense)
