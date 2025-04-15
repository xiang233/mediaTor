from django.urls import path

from . import views
urlpatterns = [
    path('users/login/', views.loginUser, name= 'login'),
    path('users/register/', views.registerUser, name= 'register'),
    path('users/logout/', views.logoutUser, name= 'logout'),
    path('users/<str:id>/orders/', views.getUserOrders, name= 'user_orders'),
    path('', views.getRoutes, name='routes'),
    path('products/', views.getProducts, name="products"),
    path('products/<str:pk>/', views.getProduct, name="product"),
    path('create_order/', views.createOrder, name="order"),
    # path('cart/:id?/', views.getCart, name="product")
]