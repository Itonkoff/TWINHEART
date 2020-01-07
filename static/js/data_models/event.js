class BookingEvent {
    _event_id;
    _event_title;
    _event_services;

    constructor(event_id, event_title) {
        this._event_id = event_id;
        this._event_title = event_title;
        this._event_services = [];
    }


    get event_id() {
        return this._event_id;
    }


    get event_title() {
        return this._event_title;
    }


    get event_services() {
        return this._event_services;
    }

    addService(service) {
        this._event_services.push(service);
    }


    getServiceCount() {
        return this._event_services.length;
    }


    getTotalCostOFServices() {
        let total = 0;
        this._event_services.forEach(service => total + service.service_price);

        return total;
    }


}