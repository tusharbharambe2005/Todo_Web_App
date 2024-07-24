from django.db import models
from django.contrib.auth.models import User
#todo_list
class todo_list_model(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.TextField(max_length=250)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title



