# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
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
        self.is_empty = False

    def load_services_from_database(self):
        if not self.is_empty:
            all_services = EventHasService.objects.all().filter(event_event=self.event_id)
            for service in all_services:
                self.services.append(service.service_service)


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
        self.load_services_from_database()
        self.is_empty = False

    def load_services_from_database(self):
            all_services = EventHasService.objects.all().filter(event_event=self.event_id)
            for service in all_services:
                _service = BookedService()
                id=service.service_service.service_id
                _service.load_service_from_database(id)
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
        self.load_booking_from_database()

    def get_user_detail(self, user_id):
        user_details = Customer.objects.get(user=user_id)
        self.user_id = user_details.customer_id
        self.f_name = user_details.first_name
        self.l_name = user_details.last_name
        self.is_logged_in = True

    def load_booking_from_database(self):
        if self.is_user_logged_in():
            bookings = Booking.objects.all().filter(customer=self.user_id)
            for booked in bookings:
                self.bookings.append(booked.booking_id)

    def is_user_logged_in(self):
        return self.is_logged_in

    def get_full_name(self):
        if self.is_user_logged_in():
            return self.l_name + " " + self.f_name


class MassEvents:
    def __init__(self):
        self.events = []
        self.collect()

    def collect(self):
        all_events = Event.objects.all()
        for event in all_events:
            evt_oj = EventDetail()
            evt_oj.load_event_from_database(event.event_id)
            self.events.append(evt_oj)
