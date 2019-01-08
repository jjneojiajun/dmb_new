from django.contrib import admin

from .models import BankRate, Bank, BankRateType
from .forms import BankRatesForm


class BankRatesAdmin(admin.ModelAdmin):
    form = BankRatesForm


# Register your models here.
admin.site.register(BankRate, BankRatesAdmin)
admin.site.register(Bank)
admin.site.register(BankRateType)


