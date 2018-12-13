from django.db import models

# Create your models here.
class BankRates(models.Model):
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

    FIXED_RATE = 'Fixed'
    FDR = 'FDR'
    BOARD = 'Board'
    SIBOR = 'SIBOR'

    CONSTRUCTION_STATUS_CHOICES = (
        (CONSTRUCTION_DONE, 'Completed'),
        (CONSTRUCTION_NOT_DONE, 'Under Construction')
    )

    LOAN_TYPE = (
        (FIXED_RATE, 'Fixed Rate'),
        (FDR, 'FDR'),
        (BOARD, 'Board'),
        (SIBOR, 'SIBOR')
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

    DBS = '127.0.0.1:8000/media/bank_images/dbs_logo.jpg'
    UOB = '127.0.0.1:8000/media/bank_images/uob_logo.png'
    SCT = '127.0.0.1:8000/media/bank_images/uob_logo.png'
    MYB = '127.0.0.1:8000/media/bank_images/maybank_logo.png'
    HLB = '127.0.0.1:8000/media/bank_images/hong_leong.jpg'
    BEA = '127.0.0.1:8000/media/bank_images/bea_logo.png'
    OCBC = '127.0.0.1:8000/media/bank_images/ocbc_logo.png'
    POSB = '127.0.0.1:8000/media/bank_images/posb_logo.png'
    RHB = '127.0.0.1:8000/media/bank_images/rhb_bank.png'

    BANK_IMAGE_CHOICES = (
        (DBS, 'DBS'),
        (UOB, 'UOB'),
        (SCT, 'Standard Charter'),
        (MYB, 'Maybank'),
        (HLB, 'Hong Leong Finance'),
        (BEA, 'BEA'),
        (OCBC, 'OCBC'),
        (POSB, 'POSB'),
        (RHB, 'RHB')
    )

    bank_name = models.CharField(max_length=109, blank=False, default='')
    loan_type = models.CharField(max_length=10, choices=LOAN_TYPE, default=FIXED_RATE)
    property_type = models.CharField(max_length=20, choices=PROPERTY_TYPE_CHOICES, default=EXEC_CONDO)
    construction_status = models.CharField(max_length=50, choices=CONSTRUCTION_STATUS_CHOICES, default=CONSTRUCTION_DONE)
    bank_image = models.CharField(max_length=200 , choices=BANK_IMAGE_CHOICES, default='')
    lock_in_period = models.CharField(max_length=200, choices=LOCK_IN_CHOICES, default=NO_LOCK)
    user_lock_in_preference = models.CharField(max_length=10,choices=LOCK_IN_PREFERENCE, default=LOCK_NO)
    interest_rates_year1 = models.FloatField()
    interest_rates_year2 = models.FloatField()
    interest_rates_year3 = models.FloatField()

    penalties = models.CharField(max_length=1000, default='')
    subsidies = models.CharField(max_length=1000, default='')
    additional_fees = models.CharField(max_length=1000, default='')

    class Meta:
        ordering = ('interest_rates_year1',)

    def __str__(self):
        return self.bank_name + " " + str(self.property_type) + " " + str(self.construction_status) + " at interest rate of " + str(self.interest_rates_year1) + " in the first year"

