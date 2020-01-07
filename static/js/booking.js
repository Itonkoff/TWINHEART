// let pack = {
//     booking: {},
//     event_: {},
//     services: []
// };
function displayBookings(pack) {
    let evt_ = new BookingEvent(pack.event_.evnt_id, pack.event_.title);

    let container = document.getElementById('container');

    pack.services.forEach(function (service) {
        evt_.addService(new Services(service.serv_id, service.title, service.price));
    });

    // let service1 = new Services(1, 'catering', 100);
    // let service2 = new Services(2, 'decoration', 100);
    // let service3 = new Services(3, 'planning', 100);
    // let service4 = new Services(4, 'venue', 100);
    //
    // let event1 = new BookingEvent(1, 'meeting');
    // event1.addService(service1);
    // event1.addService(service2);
    // event1.addService(service3);

    let booking = new Booking(evt_);
    booking.booking_date = pack.booking.booking_date;
    booking.booking_status = pack.booking.booking_status;

    let viewHolder = new BookingViewHolder(booking);
    container.appendChild(viewHolder.make());

}
//
// displayBookings();