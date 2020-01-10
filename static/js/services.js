function displayService(service) {
    let serviceViewHolder1 = new ServiceViewHolder(service);
    let container = document.getElementById('container');
    container.appendChild(serviceViewHolder1.make());

}