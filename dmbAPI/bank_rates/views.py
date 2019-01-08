from .models import BankRate
from .serializers import BankRatesSerializer
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as filters
from django.http import HttpResponse
from django.template.loader import get_template


class BankFilter(filters.FilterSet):
    min_package = filters.NumberFilter(field_name='min_loan_amount', lookup_expr='gte')
    max_package = filters.NumberFilter(field_name='max_loan_amount', lookup_expr='lt')

    class Meta:
        model = BankRate
        fields = ['property_type', 'loan_type', 'construction_status', 'user_lock_in_preference',
                  'min_package', 'max_package', 'package_priority']


class BankRatesViewSet(viewsets.ModelViewSet):
    queryset = BankRate.objects.all()
    serializer_class = BankRatesSerializer

    filter_backends = (DjangoFilterBackend,)
    filter_class = BankFilter


