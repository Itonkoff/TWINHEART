class ServiceViewHolder {
    service;
    constructor(service){
        this.service = service;
    }
}

ServiceViewHolder.prototype.make = function () {
    return this.join();
};

ServiceViewHolder.prototype.join = function () {
    let outerContainer = this.createOuterContainer();

    let cardHeaderContainer = this.createCardHeaderContainer();
    let cardHeader = this.createCardHeader();

    cardHeaderContainer.appendChild(cardHeader);
    outerContainer.appendChild(cardHeaderContainer);

    let cardBodyContainer = this.createCardBodyContainer();
    let priceDescription = this.priceDescription();

    cardBodyContainer.appendChild(priceDescription);

    let featuresList = this.createFeaturesList();

    let buttonGroupContainer = this.createButtonGroupContainer();
    let addButton = this.createAddButton();
    let removeButton = this.createRemoveButton();

    buttonGroupContainer.appendChild(addButton);
    buttonGroupContainer.appendChild(removeButton);
    cardBodyContainer.appendChild(buttonGroupContainer);
    outerContainer.appendChild(cardBodyContainer);

    return outerContainer;
};

ServiceViewHolder.prototype.createOuterContainer = function () {
    let outerContainer = document.createElement('div');

    outerContainer.classList.add('card');
    outerContainer.classList.add('mb-4');
    outerContainer.classList.add('shadow-sm');

    return outerContainer;
};

ServiceViewHolder.prototype.createCardHeaderContainer = function () {
    let cardHeaderContainer = document.createElement('div');

    cardHeaderContainer.classList.add('card-header');
    cardHeaderContainer.classList.add('bg-dark');

    return cardHeaderContainer;
};

ServiceViewHolder.prototype.createCardHeader = function () {
    let headerElement = document.createElement('h4');

    headerElement.classList.add('my-0');
    headerElement.classList.add('font-weight-normal');
    headerElement.classList.add('text-white');

    headerElement.textContent = this._service.title;

    return headerElement;
};

ServiceViewHolder.prototype.createCardBodyContainer = function () {
    let cardBodyContainer = document.createElement('div');

    cardBodyContainer.classList.add('card-body');

    return cardBodyContainer;
};

ServiceViewHolder.prototype.priceDescription = function () {
    let priceElement = document.createElement('h1');

    priceElement.classList.add('card-title');
    priceElement.classList.add('pricing-card-title');

    priceElement.innerHTML = '$' + this.service.se + '';

    // priceElement.insertAdjacentElement('beforend', this.currencyElement());

    return priceElement;
};

ServiceViewHolder.prototype.currencyElement = function () {
    let currencyElement = document.createElement('small');

    currencyElement.classList.add('text-muted');

    currencyElement.textContent = 'USD';

    return currencyElement;
};

ServiceViewHolder.prototype.createButtonGroupContainer = function () {
    let buttonGroupContainer = document.createElement('div');

    buttonGroupContainer.classList.add('btn-group');

    return buttonGroupContainer;
};

ServiceViewHolder.prototype.createAddButton = function () {
    let addButton = document.createElement('button');

    addButton.setAttribute('type', 'button');

    addButton.classList.add('btn');
    addButton.classList.add('btn-sm');
    addButton.classList.add('btn-secondary');

    addButton.textContent = 'add';

    addButton.addEventListener('click', function () {
        alert('service ' + 'has been added');
    });

    return addButton;
};

ServiceViewHolder.prototype.createFeaturesList = function () {
    return undefined;
};

ServiceViewHolder.prototype.createRemoveButton = function () {
    let removeButton = document.createElement('button');

    removeButton.setAttribute('type', 'button');

    removeButton.classList.add('btn');
    removeButton.classList.add('btn-sm');
    removeButton.classList.add('btn-secondary');

    removeButton.textContent = 'remove';

    removeButton.addEventListener('click', function () {
        alert('service ' + 'has been removed');
    });

    return removeButton;
};

let service1 = new Service(1, 'catering', 100);
let service2 = new Service(2, 'decoration', 100);
let service3 = new Service(3, 'planning', 100);
let service4 = new Service(4, 'venue', 100);

let serviceViewHolder1 = new ServiceViewHolder(service1);
let serviceViewHolder2 = new ServiceViewHolder(service2);
let serviceViewHolder3 = new ServiceViewHolder(service3);
let serviceViewHolder4 = new ServiceViewHolder(service4);

let container = document.getElementById('container');

container.appendChild(serviceViewHolder1.make());
container.appendChild(serviceViewHolder2.make());
container.appendChild(serviceViewHolder3.make());
container.appendChild(serviceViewHolder4.make());