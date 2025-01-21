from django.db import models

class Animal(models.Model):

    ANIMAL_STATUS = {
        'AD': 'Adopted',
        'HO': 'Hosted',
        'SHE': 'Sheltered'
    }

    name = models.CharField(max_length=50)
    breed = models.CharField(max_length=50)
    weight = models.IntegerField(default=None)
    age = models.IntegerField(default=None)

    identifyer = models.CharField(unique=True) #TBD

    has_passport = models.BooleanField(default=False)
    has_chip = models.BooleanField(default=False)
    is_vaccined = models.BooleanField(default=False)
    has_allgeries = models.BooleanField(default=False)

    status = models.CharField(
                              choices=ANIMAL_STATUS, 
                              default=ANIMAL_STATUS['SHE']
                              )
    
    shelter_name = models.CharField(max_length=50)