from rest_framework_simplejwt.serializers import TokenObtainPairSerializer,TokenRefreshSerializer


from rest_framework import serializers
from accounts.models import User,UserProfile
from rest_framework_simplejwt.tokens import RefreshToken, Token,AccessToken


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['first_name'] = user.first_name
        # ...
        
        return token
    
# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ('password',)
        
class UserDetailsUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['profile_pic']
    

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','first_name','phone_number','email','password']
        extra_kwargs = {
            'password':{ 'write_only':True}
        }
        
    
    def create(self,validated_data):
        password = validated_data.pop('password',None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
            instance.save()
            return instance
        else:
            raise serializers.ValidationError({"password": "password is not valid"})
       
###################### ADMIN SIDE ####################

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['profile_pic']
        
class AdminUserSerializer(serializers.ModelSerializer):
    User_Profile = UserProfileSerializer()

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'phone_number', 'email', 'User_Profile','password']
        extra_kwargs = {
            'password':{ 'write_only':True}
        }
    
    def create(self, validated_data):
        profile_data = validated_data.pop('User_Profile')
        password = validated_data.pop('password',None)
        user_instance = self.Meta.model(**validated_data)
        if password is not None:
            user_instance.set_password(password)
            user_instance.save()
            
        UserProfile.objects.create(user=user_instance, **profile_data)
        return user_instance
    