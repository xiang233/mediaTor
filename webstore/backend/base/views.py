from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from django.contrib.auth import authenticate, login
from .models import *
from .serializer import *
from django.contrib.auth.hashers import make_password
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import IsAuthenticated, IsAdminUser
import logging
from django.contrib.auth import logout
# Create your views here.

@api_view(http_method_names=['GET'])
def getRoutes(request):
    routes=[
        '/api/products/',
        '/api/products/create/',
        '/api/products/upload/',
        '/api/products/<id>/reviews/',
        '/api/products/top/',
        '/api/products/<id>/',
        '/api/products/delete/<id>/',
        '/api/products/<update>/<id>',
    ]
    return JsonResponse(routes, safe=False)

@api_view(http_method_names=['GET'])
def getProducts(request):
    # print("request user at getproducts", request.user)
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    # return JsonResponse(serializer.data, safe=False)
    return Response(serializer.data)

@api_view(http_method_names=['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(http_method_names=['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@csrf_exempt
@api_view(http_method_names=['POST'])
def registerUser(request):
    data = request.data
    try: 
        user = User.objects.create(
            username = data['email'],
            email = data['email'], 
            password = make_password (data['password'])
        )
        user = authenticate(request, username=data['email'], password=data['password'])
        login(request, user)
        serializer = UserSerializer(user, many = False)
        return Response(serializer.data)
    except:
        message = {'message': 'User with the same email exists'}
        return Response(message, status = status.HTTP_400_BAD_REQUEST)

# https://docs.djangoproject.com/en/4.1/topics/auth/default/
@csrf_exempt
@api_view(http_method_names=['POST'])
def loginUser(request):
    try: 
        permission_classes = ()
        password = request.data.get('password')
        username = request.data.get('email')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            serializer = UserSerializer(user, many = False)
            login(request, user)
            print("request user", request.user, request.session)
            return Response(serializer.data)
        else:
            message = {'message': 'User does not exist'}
            return Response(message, status = status.HTTP_400_BAD_REQUEST)
    except:
        message = {'message': 'Server error. '}
        logging.exception("An exception was thrown!")
        return Response(message, status = status.HTTP_504_GATEWAY_TIMEOUT)

@csrf_exempt
@api_view(http_method_names=['POST'])
# @permission_classes([IsAuthenticated])
def createOrder(request):
    try: 
        data = request.data
        user = User.objects.filter(id=data['user_id'])[0]
        order = Order.objects.create(
            user = user,
            paymentMethod = data['paymentMethod'], 
            taxPrice = data['taxPrice'],
            shippingPrice = data['shippingPrice'], 
            totalPrice = data['totalPrice'], 
        )

        shipping = ShippingAddress.objects.create(
            order = order,
            address = data['shippingAddress']['address'],
            city = data['shippingAddress']['city'],
            zip = data['shippingAddress']['zip'],
            country = data['shippingAddress']['country']
        )
        return Response({"message":"Order created. "}, status = status.HTTP_201_CREATED)
    except:
        message = {'message': 'Server error. '}
        logging.exception("An exception was thrown!")
        return Response(message, status = status.HTTP_504_GATEWAY_TIMEOUT)

@api_view(http_method_names=['GET'])
# @permission_classes([IsAuthenticated])
def getUserOrders(request, id):
    
    print("request user", request.user)
    # user = request.user
    # user = User.objects.filter(id=id)[0]
    print("user id", id)
    orders = Order.objects.filter(user__id=id)
    print("orders", orders)
    serializer = OrderSerializer(orders, many = True)
    return Response(serializer.data)





@api_view(http_method_names=['GET'])
@permission_classes([IsAuthenticated])
def logoutUser(request):

    logout(request)
    return Response(status = status.HTTP_200_SUCCESS)