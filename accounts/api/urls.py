from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path("", views.getAccountsRoutes.as_view(), name="accounts-routes"),
    path("register/", views.RegisterView.as_view(), name="user-register"),
    path("login/", views.LoginView.as_view(), name="user-login"),
    path("user/details/", views.UserDetails.as_view(), name="user-details"),
    
    path("user/details/update", views.UserDetailsUpdate.as_view(), name="user-details-update"),
    
    
    
    
    ######################## ADMIN SIDE ##########
    path('admin/users/', views.AdminUserListCreateView.as_view(), name='admin-user-list-create'),
    
    path("current/", views.UserView.as_view(), name="user-current"),
    
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]