from django.shortcuts import render
from django.urls import path, include
from .views import RoomView,DictionaryWordsViewSet,AddScoreView,Last5ScoresView,AverageScoreView,SignupView,LoginView
urlpatterns = [
    path('room',RoomView.as_view()),
    path('DictionaryWords',DictionaryWordsViewSet.as_view()),
    path('add-score', AddScoreView.as_view()),
    path('last-5-scores', Last5ScoresView.as_view()),
    path('average-score', AverageScoreView.as_view()),
    path('signup', SignupView.as_view()),
    path('login', LoginView.as_view())
]