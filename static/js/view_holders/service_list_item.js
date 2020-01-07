
class ServiceListItem {
    _service;

    constructor(service) {
        this._service = service;
    }
}

ServiceListItem.prototype.make = function () {
    return this.join();
};

ServiceListItem.prototype.join = function () {
    let listItemContainer = this.createListItemContainer();
    let listItem = this.createListItem();

    listItemContainer.appendChild(listItem);

    return listItemContainer;
};

ServiceListItem.prototype.createListItemContainer = function () {
    let listItemContainer = document.createElement('div');

    listItemContainer.classList.add('media');
    listItemContainer.classList.add('text-muted');
    listItemContainer.classList.add('pt-3');

    return listItemContainer;
};

ServiceListItem.prototype.createListItem = function () {
    let listItem = document.createElement('p');

    listItem.classList.add('media-body');
    listItem.classList.add('pb-3');
    listItem.classList.add('mb-0');
    listItem.classList.add('small');
    listItem.classList.add('lh-125');
    listItem.classList.add('border-bottom');
    listItem.classList.add('border-gray');
    listItem.classList.add('text-success');

    listItem.textContent = '$ ' + this._service._service_price;
    total+=this._service._service_price;

    listItem.insertAdjacentElement('afterbegin', this.createServiceTitle());

    return listItem;
};

ServiceListItem.prototype.createServiceTitle = function () {
    let serviceTitleElement = document.createElement('strong');

    serviceTitleElement.classList.add('d-block');
    serviceTitleElement.classList.add('text-gray-dark');

    serviceTitleElement.textContent = this._service._service_title;

    return serviceTitleElement;

};

// function displayListItems() {
//     let service1 = new Service('catering', 'cater',100);
//     let service2 = new Service('decoration', 'photo',100);
//     let service3 = new Service('planning', 'deco',100);
//
//     let quotationViewHolder = new ServiceListItem(service1);
//     let quotationViewHolder1 = new ServiceListItem(service2);
//     let quotationViewHolder2 = new ServiceListItem(service3);
//
//     let container = document.getElementById("item_list");
//
//     container.appendChild(quotationViewHolder.make());
//     container.appendChild(quotationViewHolder1.make());
//     container.appendChild(quotationViewHolder2.make());
// }
//
// displayListItems();


