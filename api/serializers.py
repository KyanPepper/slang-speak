from rest_framework import serializers
from .models import Room,DictionaryWords,Score
from django.contrib.auth.models import User
class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields=('username','practiceMode','examMode','questions')


class PickMode(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields =('questions','practiceMode')

class DictionaryWordsSerializer(serializers.ModelSerializer):
    class Meta:
        model = DictionaryWords
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("This username is already taken.")
        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email is already registered.")
        return value
    def create(self, validated_data):
        password = validated_data.pop('password')  
        user = User(**validated_data)
        user.set_password(password)  
        user.save()
        return user

class ScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Score
        fields = ('id', 'user', 'score', 'date')

