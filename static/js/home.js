function displayEvents(pack) {

    let evt_ = new BookingEvent(pack.event_.evnt_id, pack.event_.title);

    pack.services.forEach(function (service) {
        evt_.addService(new Services(service.serv_id, service.title, service.price));
    });

    let eventHolder = new EventViewHolder(evt_);
    let containerElement = document.getElementById('container');

    containerElement.appendChild(eventHolder.make());

}

