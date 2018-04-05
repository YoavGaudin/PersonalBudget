from django.contrib import admin

from transaction.models import Transaction, Category

admin.site.register(Transaction)
admin.site.register(Category)
