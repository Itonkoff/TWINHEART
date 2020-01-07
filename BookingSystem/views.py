from django.shortcuts import render

# Create your views here.
from BookingSystem.models import MassEvents


def home(request):
    events = MassEvents()
    return render(request, 'home.html', {'events': events})


def welcome(request):
    return render(request, 'welcome.html')


def sign_in(request):
    return render(request, 'sign_in.html')


def sign_up(request):
    return render(request, 'sign_up.html')


def sign_up_next(request):
    return render(request, 'sign_up_n.html')


def quote(request):
    return render(request, 'quotation.html')


def service(request):
    return render(request, 'services.html')


def bookings(request):
    return render(request, 'bookings.html')
