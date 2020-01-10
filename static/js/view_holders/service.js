class ServiceViewHolder {
    service;
    _id;


    constructor(service) {
        this.service = service;
        this._id = this.service.id;
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
    let addButton = this.createAddButton(this._id);
    let removeButton = this.createRemoveButton(this._id);

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

    headerElement.textContent = this.service.title;

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

    priceElement.innerHTML = '$' + this.service.price + '';

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

ServiceViewHolder.prototype.createAddButton = function (t) {
    let addButton = document.createElement('button');

    addButton.setAttribute('type', 'button');

    addButton.classList.add('btn');
    addButton.classList.add('btn-sm');
    addButton.classList.add('btn-secondary');

    addButton.textContent = 'add';

    function logga() {
        var doesnt_have = true;
        selected_s.forEach(function (value, index) {
            if (value == t)
                doesnt_have = false
        });
        if (doesnt_have)
            selected_s.push(t);

        console.log(selected_s);
    }

    addButton.addEventListener('click', function () {
        logga()
    });

    return addButton;
};

ServiceViewHolder.prototype.createFeaturesList = function () {
    return undefined;
};

ServiceViewHolder.prototype.createRemoveButton = function (t) {
    let removeButton = document.createElement('button');

    removeButton.setAttribute('type', 'button');

    removeButton.classList.add('btn');
    removeButton.classList.add('btn-sm');
    removeButton.classList.add('btn-secondary');

    removeButton.textContent = 'remove';

    function logga() {
        selected_s.forEach(function (value) {
            var present = false;
            selected_s.forEach(function (value) {
                if (value === t)
                    present = true;
            });
            if (present) {
                var ind = selected_s.indexOf(t);
                selected_s.splice(ind, 1);
            }
            console.log(selected_s);
        });
    }

    removeButton.addEventListener('click', function () {
        logga();
    });

    return removeButton;
};