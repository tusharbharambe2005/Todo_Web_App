from rest_framework import serializers
from .models import todo_list_model
from django.contrib.auth.models import User
class todo_serializers(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    class Meta:
        model = todo_list_model
        fields = "__all__"
    def get_user(self,obj):
        return obj.user.username
       