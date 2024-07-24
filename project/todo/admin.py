from django.contrib import admin
from .views import todo_list_model



class TodoCreate(admin.ModelAdmin):
    list_display = ['user','title','description','completed']

admin.site.register(todo_list_model, TodoCreate)

