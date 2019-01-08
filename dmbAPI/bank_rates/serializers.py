from rest_framework import serializers

from .models import BankRate, Bank, BankRateType


class BankSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bank
        fields = ['bank_name', 'bank_image']


class BankRateTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = BankRateType
        fields = ['rate_type_name', 'rate_type_info']


class BankRatesSerializer(serializers.ModelSerializer):
    bank = BankSerializer()
    loan_type = BankRateTypeSerializer()

    class Meta:
        model = BankRate
        fields = ['id', 'bank', 'loan_type', 'property_type', 'construction_status', 'lock_in_period', 'user_lock_in_preference', 'interest_rates', 'package_priority', 'min_loan_amount',
                  'max_loan_amount', 'penalties', 'subsidies', 'additional_fees']