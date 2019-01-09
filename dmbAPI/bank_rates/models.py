from django.db import models


# Create your models here.
class Bank(models.Model):
    DBS = '/media/bank_images/dbs_logo.png'
    UOB = '/media/bank_images/uob_logo.png'
    SCT = '/media/bank_images/standard_chartered_logo.png'
    MYB = '/media/bank_images/maybank_logo.png'
    HLB = '/media/bank_images/hong_leong_logo.png'
    BEA = '/media/bank_images/bea_logo.png'
    OCBC = '/media/bank_images/ocbc-logo.png'
    POSB = '/media/bank_images/posb_logo.png'
    RHB = '/media/bank_images/rhb_logo.png'
    CITI = '/media/bank_images/citibank.png'
    CIMB = '/media/bank_images/cimb.png'
    BARCLAYS = '/media/bank_images/barclays.png'
    BOI = '/media/bank_images/bank_of_india.png'
    BOC = '/media/bank_images/bank_of_china.png'

    BANK_IMAGE_CHOICES = (
        (DBS, 'DBS'),
        (UOB, 'UOB'),
        (SCT, 'Standard Charter'),
        (MYB, 'Maybank'),
        (HLB, 'Hong Leong Finance'),
        (BEA, 'BEA'),
        (OCBC, 'OCBC'),
        (POSB, 'POSB'),
        (RHB, 'RHB'),
        (CITI, 'Citibank'),
        (CIMB, 'CIMB Bank'),
        (BARCLAYS, 'Barclays'),
        (BOI, 'State Bank Of India'),
        (BOC, 'Bank Of China')
    )

    bank_name = models.CharField(max_length=109, blank=False, default='')
    bank_image = models.CharField(max_length=200, choices=BANK_IMAGE_CHOICES, default='')

    def __str__(self):
        return self.bank_name


class BankRateType(models.Model):
    rate_type_name = models.CharField(max_length=30)
    rate_type_info = models.CharField(max_length=1000)

    def __str__(self):
        return self.rate_type_name


class BankRate(models.Model):
    """Model to key in the rates of the bank"""
    LANDED = 'Landed Property'
    HDB = 'HDB'
    PRIVATE_CONDO = 'Private Condo'
    EXEC_CONDO = 'Executive Condo'

    LOCK_IN_2_YEARS = '2 Years Locked'
    LOCK_IN_3_YEARS = '3 Years Locked'
    NO_LOCK = 'No Locked In Period'

    LOCK_YES = 'Yes'
    LOCK_NO = 'No'

    CONSTRUCTION_DONE = 'Completed'
    CONSTRUCTION_NOT_DONE = 'Under Construction'

    CONSTRUCTION_STATUS_CHOICES = (
        (CONSTRUCTION_DONE, 'Completed'),
        (CONSTRUCTION_NOT_DONE, 'Under Construction')
    )

    PROPERTY_TYPE_CHOICES = (
        (LANDED, 'Landed Property'),
        (HDB, 'HDB'),
        (PRIVATE_CONDO, 'Private Condo'),
        (EXEC_CONDO, 'Executive Condo')
    )

    LOCK_IN_CHOICES = (
        (LOCK_IN_2_YEARS, '2 Years Lock In Period'),
        (LOCK_IN_3_YEARS, '3 Years Lock In Period'),
        (NO_LOCK, 'No Lock In Period')
    )

    LOCK_IN_PREFERENCE = (
        (LOCK_YES, 'Yes'),
        (LOCK_NO, 'No')
    )

    PRIORITY_CHOICES = [(i, i) for i in range(1,11)]

    bank = models.ForeignKey(Bank, on_delete=models.CASCADE)
    loan_type = models.ForeignKey(BankRateType, on_delete=models.CASCADE)
    property_type = models.CharField(max_length=20, choices=PROPERTY_TYPE_CHOICES, default=EXEC_CONDO)
    construction_status = models.CharField(max_length=50, choices=CONSTRUCTION_STATUS_CHOICES, default=CONSTRUCTION_DONE)
    lock_in_period = models.CharField(max_length=200, choices=LOCK_IN_CHOICES, default=NO_LOCK)
    user_lock_in_preference = models.CharField(max_length=10,choices=LOCK_IN_PREFERENCE, default=LOCK_NO)
    interest_rates = models.FloatField()
    # create ability to set which package is priority!
    package_priority = models.IntegerField(choices=PRIORITY_CHOICES)
    # dealing with minimum and maximum loan amount package
    min_loan_amount = models.IntegerField()
    max_loan_amount = models.IntegerField()
    penalties = models.CharField(max_length=1000, default='')
    subsidies = models.CharField(max_length=1000, default='')
    additional_fees = models.CharField(max_length=1000, default='')

    class Meta:
        ordering = ('package_priority',)

    def __str__(self):
        return self.bank.bank_name + " loan_package for amount from $" + str(self.min_loan_amount) + " to $" + str(self.max_loan_amount) + " for " + self.property_type

