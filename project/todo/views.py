from rest_framework import viewsets
from.models import todo_list_model
from .serializers import todo_serializers
from rest_framework import generics


class TodoItemListCreate(generics.ListCreateAPIView):
    queryset = todo_list_model.objects.all()
    serializer_class=todo_serializers

    def get_queryset(self):
        return todo_list_model.objects.filter(user= self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user= self.request.user)
    

class TodoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = todo_list_model.objects.all()
    serializer_class = todo_serializers
    lookup_field = 'id'
class Todo_Update(generics.UpdateAPIView):
    queryset = todo_list_model.objects.all()
    serializer_class = todo_serializers

    def perform_update(self, serializer):
        return super().perform_update(serializer)


class Todo_Delete(generics.DestroyAPIView):
    queryset = todo_list_model.objects.all()
    serializer_class = todo_serializers

    def perform_destroy(self, instance):
        return super().perform_destroy(instance)


class todo_display(generics.ListAPIView):
    queryset = todo_list_model.objects.all()
    serializer_class=todo_serializers

    def get_queryset(self):
        return todo_list_model.objects.filter(user= self.request.user)
    
    
