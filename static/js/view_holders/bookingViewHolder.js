class BookingViewHolder {
    _booking_obj;
    _booking_event;
    _booking_date;
    _booking_status;
    _display_mode;

    constructor(booking_obj) {
        this._booking_obj = booking_obj;
        this.extractBookingDetails();
    }

    extractBookingDetails() {
        this._booking_event = this._booking_obj.booking_event;
        this._booking_date = this._booking_obj.booking_date;
        this._booking_status = this._booking_obj.booking_status;
    }


    set display_mode(value) {
        if (value === 1) {
            this._display_mode = 'q';
        } else {
            this._display_mode = 'b';
        }
    }
}

BookingViewHolder.prototype.make = function () {
    return this.join();
};

BookingViewHolder.prototype.join = function () {
    let outerContainer = this.createOuterContainer();
    let headerElement = this.createHeaderElement();
    let bodyElement = this.createBodyElement();
    let priceFooterElement = this.createPriceFooterElement();

    outerContainer.appendChild(headerElement);
    outerContainer.appendChild(bodyElement);
    outerContainer.appendChild(priceFooterElement);

    return outerContainer
};

BookingViewHolder.prototype.createOuterContainer = function () {
    let outerContainer = document.createElement('div');

    outerContainer.classList.add('container');

    return outerContainer;
};

BookingViewHolder.prototype.createHeaderElement = function () {
    let headerContainer = this.createHeaderContainer();
    let headerTitle = this.createHeaderTitle();

    headerContainer.appendChild(headerTitle);
    return headerContainer;
};

BookingViewHolder.prototype.createHeaderContainer = function () {
    let headerContainer = document.createElement('div');

    headerContainer.classList.add('d-flex');
    headerContainer.classList.add('align-items-center');
    headerContainer.classList.add('p-3');
    headerContainer.classList.add('my-3');
    headerContainer.classList.add('text-white-50');
    headerContainer.classList.add('bg-dark');
    headerContainer.classList.add('rounded');
    headerContainer.classList.add('shadow-sm');

    return headerContainer;
};

BookingViewHolder.prototype.createHeaderTitle = function () {
    let titleContainer = this.createHeaderTitleContainer();
    let title = this.createTitle();

    return titleContainer.appendChild(title);
};

BookingViewHolder.prototype.createHeaderTitleContainer = function () {
    let titleContainer = document.createElement('div');

    titleContainer.classList.add('lh-100');

    return titleContainer;
};

BookingViewHolder.prototype.createTitle = function () {
    let titleElement = document.createElement('h6');

    titleElement.classList.add('mb-0');
    titleElement.classList.add('text-white');
    titleElement.classList.add('lh-100');

    titleElement.textContent = this._booking_event.event_title + ' : ' + this._booking_date;

    return titleElement;
};

BookingViewHolder.prototype.createBodyElement = function () {
    let bodyContainer = this.createBodyContainer();
    let bodyTitle = this.createBodyTitle();

    bodyContainer.appendChild(bodyTitle);

    this._booking_event.event_services.forEach(service => {
        let listViewHolder = new ServiceListItem(service).make();
        bodyContainer.appendChild(listViewHolder);
    });

    return bodyContainer;
};

BookingViewHolder.prototype.createBodyContainer = function () {
    let bodyContainer = document.createElement('div');

    bodyContainer.classList.add('my-3');
    bodyContainer.classList.add('p-3');
    bodyContainer.classList.add('bg-white');
    bodyContainer.classList.add('rounded');
    bodyContainer.classList.add('shadow-sm');

    return bodyContainer;
};

BookingViewHolder.prototype.createBodyTitle = function () {
    let bodyTitle = document.createElement('h6');

    bodyTitle.classList.add('border-bottom');
    bodyTitle.classList.add('border-gray');
    bodyTitle.classList.add('pb-2');
    bodyTitle.classList.add('mb-0');

    bodyTitle.textContent = 'selected services';// may change depending nekut is it a quote or a booking

    return bodyTitle;
};

BookingViewHolder.prototype.createPriceFooterElement = function () {
    let footer = this.createHeaderContainer();

    if (this._booking_status === 'pending') {
        footer.classList.replace('bg-dark', 'bg-warning'); //to change depending status
    } else if (this._booking_status === 'confirmed') {
        footer.classList.replace('bg-dark', 'bg-success');
    } else {
        footer.classList.replace('bg-dark', 'bg-danger');
    }

    let price = this.createTitle();
    let status = this.createTitle();

    let headerTitleContainer = this.createHeaderTitleContainer();

    price.textContent = 'total : ' + this._booking_event.getTotalCostOFServices();
    status.textContent = 'status: ' + this._booking_status;

    headerTitleContainer.appendChild(price);
    headerTitleContainer.appendChild(status);

    footer.appendChild(headerTitleContainer);

    return footer;
};


function display() {
    let container = document.getElementById('container');
    let service1 = new Service(1, 'catering', 100);
    let service2 = new Service(2, 'decoration', 100);
    let service3 = new Service(3, 'planning', 100);
    let service4 = new Service(4, 'venue', 100);

    let event1 = new BookingEvent(1, 'meeting');
    event1.addService(service1);
    event1.addService(service2);
    event1.addService(service3);

    let booking = new Booking(event1);
    booking.booking_date = '20/05/2020';
    booking.booking_status='confirmed';

    let viewHolder = new BookingViewHolder(booking);
    container.appendChild(viewHolder.make());

}

display();