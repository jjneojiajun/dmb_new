# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2018-12-13 01:46
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='BankRates',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bank_name', models.CharField(default='', max_length=109)),
                ('loan_type', models.CharField(choices=[('Fixed', 'Fixed Rate'), ('FDR', 'FDR'), ('Board', 'Board'), ('SIBOR', 'SIBOR')], default='Fixed', max_length=10)),
                ('property_type', models.CharField(choices=[('Landed Property', 'Landed Property'), ('HDB', 'HDB'), ('Private Condo', 'Private Condo'), ('Executive Condo', 'Executive Condo')], default='Executive Condo', max_length=20)),
                ('construction_status', models.CharField(choices=[('Completed', 'Completed'), ('Under Construction', 'Under Construction')], default='Completed', max_length=50)),
                ('bank_image', models.CharField(choices=[('https://jjneojiajun.pythonanywhere.com/media/bank_images/dbs_logo.jpg', 'DBS'), ('https://jjneojiajun.pythonanywhere.com/media/bank_images/uob_logo.png', 'UOB'), ('https://jjneojiajun.pythonanywhere.com/media/bank_images/uob_logo.png', 'Standard Charter'), ('https://jjneojiajun.pythonanywhere.com/media/bank_images/maybank_logo.png', 'Maybank'), ('https://jjneojiajun.pythonanywhere.com/media/bank_images/hong_leong.jpg', 'Hong Leong Finance'), ('https://jjneojiajun.pythonanywhere.com/media/bank_images/bea_logo.png', 'BEA'), ('https://jjneojiajun.pythonanywhere.com/media/bank_images/ocbc_logo.png', 'OCBC'), ('https://jjneojiajun.pythonanywhere.com/media/bank_images/posb_logo.png', 'POSB'), ('https://jjneojiajun.pythonanywhere.com/media/bank_images/rhb_bank.png', 'RHB')], default='', max_length=200)),
                ('lock_in_period', models.CharField(choices=[('2 Years Locked', '2 Years Lock In Period'), ('3 Years Locked', '3 Years Lock In Period'), ('No Locked In Period', 'No Lock In Period')], default='No Locked In Period', max_length=200)),
                ('user_lock_in_preference', models.CharField(choices=[('Yes', 'Yes'), ('No', 'No')], default='No', max_length=10)),
                ('interest_rates_year1', models.FloatField()),
                ('interest_rates_year2', models.FloatField()),
                ('interest_rates_year3', models.FloatField()),
                ('penalties', models.CharField(default='', max_length=1000)),
                ('subsidies', models.CharField(default='', max_length=1000)),
                ('additional_fees', models.CharField(default='', max_length=1000)),
            ],
            options={
                'ordering': ('interest_rates_year1',),
            },
        ),
    ]
