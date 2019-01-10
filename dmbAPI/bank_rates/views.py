from .models import BankRate
from .serializers import BankRatesSerializer
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as filters
from django.http import HttpResponse
from django.template.loader import get_template


class BankFilter(filters.FilterSet):
    loan_package_min_max_range = filters.NumberFilter(field_name='loan_package_min_max_range', lookup_expr="contains")

    class Meta:
        model = BankRate
        fields = ['property_type', 'loan_type', 'construction_status', 'user_lock_in_preference',
                  'loan_package_min_max_range']


class BankRatesViewSet(viewsets.ModelViewSet):
    queryset = BankRate.objects.all()
    serializer_class = BankRatesSerializer

    filter_backends = (DjangoFilterBackend,)
    filter_class = BankFilter


