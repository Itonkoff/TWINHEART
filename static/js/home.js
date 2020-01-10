let x = [];

function displayEvents(e) {
    let eventHolder = new EventViewHolder(e);
    let containerElement = document.getElementById('container');
    containerElement.appendChild(eventHolder.make());
}



