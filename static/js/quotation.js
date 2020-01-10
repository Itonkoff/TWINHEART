function displayServices(service) {
    let serviceListItem = new ServiceListItem(service);
    let container = document.getElementById("item_list");
    container.appendChild(serviceListItem.make());
}

