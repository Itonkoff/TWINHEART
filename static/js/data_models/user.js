class User {
    _user_id;
    _user_f_name;
    _user_surname;
    _bookings;

    constructor(user_id, user_f_name, user_surname) {
        this._user_id = user_id;
        this._user_f_name = user_f_name;
        this._user_surname = user_surname;
        this._bookings = []
    }

    toString(){
        return this._user_surname + ' ' + this._user_f_name;
    }

    addBooking(booking){
        this._bookings.add(booking);
    }


    get bookings() {
        return this._bookings;
    }
}