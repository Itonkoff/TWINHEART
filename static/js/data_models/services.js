class Services {
    _service_id;
    _service_title;
    _service_price;

    constructor(service_id, service_title, service_price) {
        this._service_id = service_id;
        this._service_title = service_title;
        this._service_price = service_price;
    }


    get service_id() {
        return this._service_id;
    }

    get service_title() {
        return this._service_title;
    }

    get service_price() {
        return this._service_price;
    }
}
