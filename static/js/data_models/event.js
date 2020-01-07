class BookingEvent {
    _event_id;
    _event_title;
    _event_services;
    _serv_count;
    _total_price;

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
        this._serv_count++;
        this._total_price += service.service_price;
    }


    getServiceCount() {
        return this._serv_count;
    }


    getTotalCostOFServices() {
        return this._total_price;
    }


}