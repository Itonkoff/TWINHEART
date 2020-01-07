class Booking {
    _booking_id;
    _booking_event;
    _booking_date;
    _booking_status;


    constructor(booking_event) {
        this._booking_event = booking_event;
    }


    set booking_id(value) {
        this._booking_id = value;
    }

    set booking_date(value) {
        this._booking_date = value;
    }

    set booking_status(value) {
        this._booking_status = value;
    }


    get booking_id() {
        return this._booking_id;
    }

    get booking_date() {
        return this._booking_date;
    }

    get booking_status() {
        return this._booking_status;
    }

    get booking_event() {
        return this._booking_event;
    }
}