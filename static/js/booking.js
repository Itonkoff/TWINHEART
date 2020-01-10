
function displayBookings(pack) {
    let container = document.getElementById('container');
    let viewHolder = new BookingViewHolder(booking);
    container.appendChild(viewHolder.make());
}