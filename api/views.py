from django.shortcuts import render
from rest_framework import generics, status,viewsets
from .serializers import RoomSerializer,PickMode,DictionaryWordsSerializer,UserSerializer,ScoreSerializer
from .models import Room,DictionaryWords,Score
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User,Group
from django.db.models import Avg
from rest_framework_simplejwt.tokens import RefreshToken
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
class RoomView(generics.CreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
class DictionaryWordsViewSet(generics.ListAPIView):
    queryset = DictionaryWords.objects.all()
    serializer_class = DictionaryWordsSerializer

class SignupView(APIView):
    @csrf_exempt
    def post(self, request):
        user_serializer = UserSerializer(data=request.data)
        if user_serializer.is_valid():
          user = user_serializer.save()
          reg_group = Group.objects.get(name='RegGroup')
          reg_group.user_set.add(user)
          return Response({'message' : 'Account Created '}, status=status.HTTP_201_CREATED)
        return Response({'message' : 'Account not created '}, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    @csrf_exempt
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            refresh = RefreshToken.for_user(user)
            token = str(refresh.access_token)
            return Response({'token': token},status=status.HTTP_200_OK) 
        else:
            return Response({'message': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)

class AddScoreView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        score_data = {'user': request.user, 'score': request.data.get('score')}
        score_serializer = ScoreSerializer(data=score_data)
        if score_serializer.is_valid():
            score_serializer.save(user=request.user)
            return Response(score_serializer.data, status=status.HTTP_201_CREATED)
        return Response(score_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class Last5ScoresView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user_scores = Score.objects.filter(user=request.user).order_by('-date')[:5]
        score_serializer = ScoreSerializer(user_scores, many=True)
        return Response(score_serializer.data)

class AverageScoreView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_scores = Score.objects.filter(user=request.user)
        average = user_scores.aggregate(Avg('score'))['score__avg']
        return Response({'average_score': average})

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        logout(request)
        return Response({'message': 'Logged out successfully.'}, status=status.HTTP_200_OK)

class GetUsernameView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        username = request.user.username
        return Response({'username': username},status=status.HTTP_200_OK)