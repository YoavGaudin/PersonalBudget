from rest_framework import routers

from budjet_app.views import MonthlyBudjetViewSet, CategoryViewSet, ExpenseViewSet, IncomeViewSet

router = routers.SimpleRouter()

router.register(r'budjet', MonthlyBudjetViewSet)
router.register(r'category', CategoryViewSet)
router.register(r'expense', ExpenseViewSet)
router.register(r'income', IncomeViewSet)

urlpatterns = router.urls
