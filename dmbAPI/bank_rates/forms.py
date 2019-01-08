from django import forms
from .models import BankRate


class BankRatesForm(forms.ModelForm):
    penalties = forms.CharField(widget=forms.Textarea)
    subsidies = forms.CharField(widget=forms.Textarea)
    additional_fees = forms.CharField(widget= forms.Textarea)

    class Meta:
        model = BankRate
        fields = '__all__'
