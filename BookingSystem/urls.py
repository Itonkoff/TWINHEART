from django.urls import path

from BookingSystem import views

urlpatterns = [
    path('home/', views.home, name='home'),
    path('welcome/', views.welcome, name='welcome'),
    path('sign_up/', views.sign_up, name='sign_up'),
    path('sign_in/', views.sign_in, name='sign_in'),
    path('next/', views.sign_up_next, name='next'),
    path('service/<str:event_id>', views.service, name='service'),
    path('quote/<str:servs>', views.quote, name='quote'),
    path('bookings<int:user_id>/', views.bookings, name='bookings'),
    path('place/<str:booking>',views.place, name='place'),
]
