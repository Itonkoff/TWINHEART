function displayListItems() {

    let service1 = new Service(1, 'catering', 100);
    let service2 = new Service(2, 'decoration', 100);
    let service3 = new Service(3, 'planning', 100);
    let service4 = new Service(4, 'venue', 100);

    let event1 = new BookingEvent(1, 'meeting');

    event1.addService(service1);
    event1.addService(service2);
    event1.addService(service3);

    let event2 = new BookingEvent(1, 'wedding');
    event2.addService(service1);
    event2.addService(service4);

    let event3 = new BookingEvent(1, 'concert');
    event1.addService(service1);
    event1.addService(service1);
    event1.addService(service1);
    event1.addService(service1);

    let event4 = new BookingEvent(1, 'prayer night');

    let eventHolder1 = new EventViewHolder(event1);
    let eventHolder2 = new EventViewHolder(event2);
    let eventHolder3 = new EventViewHolder(event3);
    let eventHolder4 = new EventViewHolder(event4);

    let quotationViewHolder = new ServiceListItem(service1);
    let quotationViewHolder1 = new ServiceListItem(service2);
    let quotationViewHolder2 = new ServiceListItem(service3);

    let container = document.getElementById("item_list");

    container.appendChild(quotationViewHolder.make());
    container.appendChild(quotationViewHolder1.make());
    container.appendChild(quotationViewHolder2.make());
}

displayListItems();