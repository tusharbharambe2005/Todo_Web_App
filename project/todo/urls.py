from django.urls import path
from .views import TodoItemListCreate, Todo_Update,todo_display,Todo_Delete,TodoDetail

urlpatterns = [
    path('todos/', TodoItemListCreate.as_view(), name='todo_list_create'),
    path('update/<int:pk>/', Todo_Update.as_view(), name='update'),
    path('delete/<int:pk>/',Todo_Delete.as_view(),name="todo_delete"),
    path('display/', todo_display.as_view(), name='todo_detail'),
    path('todos/<int:id>/', TodoDetail.as_view(), name='todo-detail'),
]
