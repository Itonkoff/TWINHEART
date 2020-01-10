# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
import datetime

from django.db import models


class Booking(models.Model):
    booking_id = models.AutoField(primary_key=True)
    event = models.ForeignKey('Event', models.DO_NOTHING)
    customer = models.ForeignKey('Customer', models.DO_NOTHING)
    evet_date = models.DateField()
    confirmed = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'booking'


class BookingHasService(models.Model):
    booking = models.ForeignKey(Booking, models.DO_NOTHING, primary_key=True)
    service = models.ForeignKey('Service', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'booking_has_service'
        unique_together = (('booking', 'service'),)


class Customer(models.Model):
    customer_id = models.AutoField(primary_key=True)
    last_name = models.CharField(max_length=200)
    first_name = models.CharField(max_length=200)
    telephone = models.CharField(max_length=200)
    email_address = models.CharField(max_length=200)
    user = models.ForeignKey('User', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'customer'


class Event(models.Model):
    event_id = models.AutoField(primary_key=True)
    title = models.CharField(unique=True, max_length=200)

    class Meta:
        managed = False
        db_table = 'event'


class EventHasService(models.Model):
    event_event = models.ForeignKey(Event, models.DO_NOTHING, primary_key=True)
    service_service = models.ForeignKey('Service', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'event_has_service'
        unique_together = (('event_event', 'service_service'),)


class Service(models.Model):
    service_id = models.AutoField(primary_key=True)
    title = models.CharField(unique=True, max_length=200)
    cost = models.FloatField()

    class Meta:
        managed = False
        db_table = 'service'


class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(unique=True, max_length=200)
    password = models.CharField(unique=True, max_length=200)

    class Meta:
        managed = False
        db_table = 'user'


# ========================================================================================END OF DATABASE MODELS=======

class BookedEvent:
    def __init__(self):
        self.booking_id = 0
        self.event_id = 0
        self.user_id = 1
        self.services = []
        self.date = ''
        self.confirmed = 0
        self.is_empty = True

    def load_booking_from_database(self, booking_id):
        booking = Booking.objects.get(booking_id=booking_id)
        self.booking_id = booking_id
        self.event_id = booking.event
        self.load_services_from_database()
        self.date = booking.evet_date
        self.confirmed = booking.confirmed
        self.is_empty = True

    def load_services_from_database(self):
        all_services = EventHasService.objects.all().filter(event_event=self.event_id)
        for service in all_services:
            _service = BookedService()
            service_id = service.service_service.service_id
            _service.load_service_from_database(service_id)
            self.services.append(_service)

    def extract(self, event):
        self.event_id = event.event_id
        self.services = event.services
        self.date = datetime.datetime.now()
        self.is_empty = False

    def set_user_id(self, user_id):
        self.user_id = user_id

    def set_date(self, date):
        formatted = datetime.strptime(date, '%Y/%m/%d')
        self.date = formatted

    def save(self):
        if not self.is_empty:
            booking = Booking(event_id=self.event_id, customer_id=self.user_id, evet_date=self.date,
                              confirmed=self.confirmed)
            booking.save()
            last_booking = Booking.objects.latest('booking_id')
            last_booking_id = last_booking.booking_id
            for service in self.services:
                booking_services = BookingHasService(booking_id=last_booking_id, service_id=service.service_id)
                booking_services.save(force_insert=True)
            return True


class EventDetail:
    def __init__(self):
        self.event_id = 0
        self.title = ''
        self.services = []
        self.is_empty = True

    def load_event_from_database(self, event_id):
        event_detail = Event.objects.get(event_id=event_id)
        self.event_id = event_id
        self.title = event_detail.title
        self.is_empty = False

    def load_services_from_database(self):
        all_services = EventHasService.objects.all().filter(event_event=self.event_id)
        for service in all_services:
            _service = BookedService()
            id = service.service_service.service_id
            _service.load_service_from_database(id)
            self.services.append(_service)

    def load_services_from_database_(self, ids):
        for service_id in ids:
            _service = BookedService()
            _service.load_service_from_database(service_id)
            self.services.append(_service)

    def is_empty(self):
        return self.is_empty


class BookedService:
    def __init__(self):
        self.service_id = 0
        self.title = ''
        self.price = 0

    def load_service_from_database(self, service_id):
        service = Service.objects.get(service_id=service_id)
        self.service_id = service_id
        self.title = service.title
        self.price = service.cost


class UserManager:
    def __init__(self):
        self.user_id = 0
        self.f_name = ''
        self.l_name = ''
        self.bookings = []
        self.is_logged_in = False

    def get_user_from_database(self, username):
        return User.objects.get(username=username)

    def sign_in(self, username, password):
        user = self.get_user_from_database(username)
        if user.password == password:
            self.get_user_detail(user.user_id)

    def get_user_detail(self, user_id):
        user_details = Customer.objects.get(user=user_id)
        self.user_id = user_details.customer_id
        self.f_name = user_details.first_name
        self.l_name = user_details.last_name
        self.is_logged_in = True

    def user_is_logged_in(self):
        return self.is_logged_in

    def get_full_name(self):
        if self.user_is_logged_in():
            return self.l_name + " " + self.f_name

    def get_logged_in_user_id(self):
        if self.user_is_logged_in():
            return self.user_id

    def get_user(self):
        return [self.get_logged_in_user_id(), self.get_full_name()]


class MassEvents:
    def __init__(self):
        self.events = []
        self.collect()

    def collect(self):
        all_events = Event.objects.all()
        for event in all_events:
            evt_oj = EventDetail()
            evt_oj.load_event_from_database(event.event_id)
            evt_oj.load_services_from_database()
            self.events.append(evt_oj)


class MassBooking:
    def __init__(self, user_id):
        self.bookings = []
        self.collect(user_id)

    def collect(self, user_id):
        bookings = Booking.objects.all().filter(customer_id=user_id)  # to replace 1 with customer_id=user_id when login is implemented
        for booking in bookings:
            booked = BookedEvent()
            booking_id = booking.booking_id
            evnt = EventDetail()
            event_id = booking.event.event_id
            all_services = BookingHasService.objects.all().filter(booking_id=booking_id)
            service_ids = []
            for service in all_services:
                service_ids.append(service.service_id)
            evnt.load_event_from_database(event_id)
            evnt.load_services_from_database_(service_ids)
            booked.load_booking_from_database(booking_id)
            self.bookings.append([booked, evnt])


class MassServices:
    def __init__(self):
        self.services = []
        self.collect()

    def collect(self):
        all_services = Service.objects.all()
        for service in all_services:
            b_service = BookedService()
            service_id = service.service_id
            b_service.load_service_from_database(service_id=service_id)
            self.services.append(b_service)
