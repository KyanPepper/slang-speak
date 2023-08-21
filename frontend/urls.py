from django.urls import path, include
from .views import index
urlpatterns = [
    path('',index),
    path('exam',index),
    path('practice',index),
    path('login',index),
    path('profile',index)
]