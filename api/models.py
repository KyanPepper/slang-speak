from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Room(models.Model):
    username = models.CharField(max_length=10, default="")
    practiceMode = models.BooleanField()
    examMode = models.BooleanField()
    questions = models.IntegerField(null=False, default=10)


class DictionaryWords(models.Model):
    word = models.CharField(max_length=20)
    


class Score(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    score = models.IntegerField()
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username}'s Score: {self.score}"
