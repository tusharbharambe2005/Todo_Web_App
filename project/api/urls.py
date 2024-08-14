

from django.urls import path
from .views import register_view,login_view,DispalyUser,LogoutView,user_delete 
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("register/",register_view,name="register"),
    path('login/', login_view, name='login'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('display/',DispalyUser.as_view(),name="display user"),
    path('user_delete/', user_delete, name='user_delete'),#not implemennt
    
]

if settings.DEBUG:
        urlpatterns += static(settings.MEDIA_URL,
                              document_root=settings.MEDIA_ROOT)    
#{"username": "tushar","password": "admin@123"}
