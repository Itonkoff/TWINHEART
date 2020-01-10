from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
from BookingSystem.models import MassEvents, MassBooking, EventDetail, BookedEvent, MassServices, UserManager


def home(request):
    credentials = []
    username = ''
    password = ''
    user = 0
    u_detail = 0
    if request.method == 'POST':
        for key, value in request.POST.lists():
            if key == 'csrfmiddlewaretoken':
                continue
            else:
                credentials.append(value[0])

        username = credentials[0]
        password = credentials[1]

        user = UserManager()
        user.sign_in(username, password)
        u_detail = 0
        if user.user_is_logged_in():
            u_detail = user.get_user()

        events = MassEvents()
        return render(request, 'home.html', {'user': u_detail,
                                             'events': events})

    elif request.method == 'GET':
        return render(request, 'sign_in.html')


def welcome(request):
    return render(request, 'welcome.html')


def sign_in(request):
    return render(request, 'sign_in.html')


def sign_up(request):
    return render(request, 'sign_up.html')


def sign_up_next(request):
    credentials = []
    last_name = ''
    first_name = ''
    telephone = ''
    email = ''

    if request.method == 'POST':
        for key, value in request.POST.lists():
            if key == 'csrfmiddlewaretoken':
                continue
            else:
                credentials.append(value[0])
        last_name = credentials[0]
        first_name = credentials[1]
        telephone = credentials[2]
        email = credentials[3]

    mock_uid = 'q'
    mockpss=''
    a = 1
    return render(request, 'sign_up_n.html')


def quote(request, servs):
    serv_ = servs.split(',')
    converted = []
    for num in serv_:
        converted.append(int(num))
    event_id = converted.pop()
    services = converted
    event = EventDetail()
    event.load_event_from_database(event_id)
    event.load_services_from_database_(services)

    return render(request, 'quotation.html', {'event': event})


def service(request, event_id):
    event = EventDetail()
    event.load_event_from_database(event_id)
    event.load_services_from_database()
    services_ = MassServices()
    return render(request, 'services.html', {'id': event.event_id,
                                             'title': event.title,
                                             'services': event.services})


def bookings(request, user_id):
    bookings_ = MassBooking(user_id)
    return render(request, 'bookings.html', {'bookings': bookings_})


def place(request, booking):
    booking_ev = booking.split(',')
    converted = []
    for num in booking_ev:
        converted.append(int(num))
    user_id = converted.pop()
    event_id = converted.pop()
    services = converted
    event = EventDetail()
    event.load_event_from_database(event_id)
    event.load_services_from_database_(services)
    book = BookedEvent()
    book.extract(event)  # remember to set date and user name here
    if book.save():
        bookings_ = MassBooking(user_id)
        a = 1
        return render(request, 'bookings.html', {'bookings': bookings_})
    else:
        return HttpResponse("failed to place booking. please try again")
