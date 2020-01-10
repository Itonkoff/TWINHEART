class BookingViewHolder {
    _display_mode;
    booking;
    _confirmation;

    set confirmation(value) {
        this._confirmation = value.toString();
    }

    constructor(booking) {
        this.booking = booking;
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

BookingViewHolder.prototype.createHeaderElement = function (title) {
    let headerContainer = this.createHeaderContainer();
    let headerTitle = this.createHeaderTitle(title);

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

BookingViewHolder.prototype.createHeaderTitle = function (title_) {
    let titleContainer = this.createHeaderTitleContainer();
    let title = this.createTitle(title_);

    return titleContainer.appendChild(title);
};

BookingViewHolder.prototype.createHeaderTitleContainer = function () {
    let titleContainer = document.createElement('div');

    titleContainer.classList.add('lh-100');

    return titleContainer;
};

BookingViewHolder.prototype.createTitle = function (title) {
    let titleElement = document.createElement('h6');

    titleElement.classList.add('mb-0');
    titleElement.classList.add('text-white');
    titleElement.classList.add('lh-100');

    titleElement.textContent = title;

    return titleElement;
};

BookingViewHolder.prototype.createBodyElement = function () {
    let bodyContainer = this.createBodyContainer();
    let bodyTitle = this.createBodyTitle();

    bodyContainer.appendChild(bodyTitle);

    return bodyContainer;
};

BookingViewHolder.prototype.createServiceElement = function (service) {
    return new ServiceListItem(service).make();
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

BookingViewHolder.prototype.createPriceFooterElement = function (total_price) {
    let footer = this.createHeaderContainer();

    if (this._confirmation === '0') {
        footer.classList.replace('bg-dark', 'bg-warning'); //to change depending status
    } else if (this._confirmation === '1') {
        footer.classList.replace('bg-dark', 'bg-success');
    } else {
        footer.classList.replace('bg-dark', 'bg-danger');
    }

    let price = this.createTitle();
    let status = this.createTitle();

    let headerTitleContainer = this.createHeaderTitleContainer();

    price.textContent = 'total : ' + total_price.toString();
    if (this._confirmation === '0') {
        status.textContent = 'status: pending';
    } else if (this._confirmation === '1') {
        status.textContent = 'status: confirmed';
    } else {
        status.textContent = 'status: rejected';
    }

    headerTitleContainer.appendChild(price);
    headerTitleContainer.appendChild(status);

    footer.appendChild(headerTitleContainer);

    return footer;
};