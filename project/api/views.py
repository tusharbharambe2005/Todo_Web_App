from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken,AccessToken
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework import generics
@csrf_exempt
def register_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            username = data.get("username")
            email = data.get("email")
            password = data.get("password")

            
            user = User.objects.create_user(username=username,email=email, password=password)
            return JsonResponse({"message": "User registered successfully"}, status=201)
            
        except json.JSONDecodeError:
            return JsonResponse({"error": "username,email,password:-Invalid JSON."}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"message": "Use POST to register."})



@csrf_exempt
def login_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            username = data.get("username")
            password = data.get("password")
            if not username or not password:
                return JsonResponse({'error': 'Username and password are required.'}, status=400)
            
            user = authenticate(request, username=username, password=password)
            
            if user is not None:
                login(request, user)
                #create token
                refresh = RefreshToken.for_user(user)
                return JsonResponse({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }, status=status.HTTP_200_OK)
            else:
                return JsonResponse({"error": "Invalid credentials."}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON."}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"message": "Use POST to log in."})

class DispalyUser(APIView):
    permission_classes=(IsAuthenticated,)
    
    def get(self,request):
        user = request.user.id
        print(user.id)
        
        return Response({"id":user.id})
    
class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    
@csrf_exempt 
def user_delete(request):
    if request.method == 'DELETE':
        try:
            data = json.loads(request.body)
            username = data.get("username")
            
            if not username:
                return JsonResponse({"error": "Username is required"}, status=400)
            
            user = User.objects.get(username=username)
            user.delete()
            return JsonResponse({"message": "User deleted successfully"}, status=200)
        
        except User.DoesNotExist:
            return JsonResponse({"error": "User does not exist"}, status=404)
        
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON."}, status=400)
        
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    
    else:
        return JsonResponse({"message": "Invalid request method"}, status=405)