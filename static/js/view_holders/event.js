class EventViewHolder {
    _event;

    constructor(event) {
        this._event = event;
    }

    get event() {
        return this._event;
    }
}

EventViewHolder.prototype.make = function () {
    return this.join();
};

EventViewHolder.prototype.join = function () {
    let outerContainer = this.createOuterContainer();
    let innerContainer = this.createInnerContainer();
    this.thumbnail();
    let cardBody = this.cardBody();

    // innerContainer.appendChild(thumbnail);
    innerContainer.appendChild(cardBody);

    outerContainer.appendChild(innerContainer);

    return outerContainer;
};

EventViewHolder.prototype.createOuterContainer = function () {
    let outer_container = document.createElement('div');
    outer_container.classList.add('col-md-4');

    return outer_container;
};

EventViewHolder.prototype.createInnerContainer = function () {
    let innerContainer = document.createElement('div');
    innerContainer.classList.add('card');
    innerContainer.classList.add('mb-4');
    innerContainer.classList.add('shadow-sm');

    return innerContainer;
};

EventViewHolder.prototype.thumbnail = function () {
    let svg_element = document.createElement('svg');

    svg_element.classList.add('bd-placeholder-img');
    svg_element.classList.add('card-img-top');

    svg_element.setAttribute('width', '100%');
    svg_element.setAttribute('height', '225%');
    svg_element.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg_element.setAttribute('preserveAspectRatio', 'xMidYMid slice');
    svg_element.setAttribute('focusable', 'false');
    svg_element.setAttribute('role', 'img');
    svg_element.setAttribute('aria-label', 'Placeholder: Thumbnail');

    let title = this.createThumbnailTitle();
    let rect = this.createThumbnailRect();
    let text = this.createThumbnailText();

    svg_element.appendChild(title);
    svg_element.appendChild(rect);
    svg_element.appendChild(text);

    return svg_element;
};

EventViewHolder.prototype.createThumbnailTitle = function () {
    let titleElement = document.createElement('title');
    titleElement.textContent = 'Placeholder';

    return titleElement;
};

EventViewHolder.prototype.createThumbnailRect = function () {
    let rectElement = document.createElement('rect');

    rectElement.setAttribute('width', '100%');
    rectElement.setAttribute('height', '100%');
    rectElement.setAttribute('fill', '#55595c');

    return rectElement;
};

EventViewHolder.prototype.createThumbnailText = function () {
    let textElement = document.createElement('text');

    textElement.setAttribute('x', '50%');
    textElement.setAttribute('y', '50%');
    textElement.setAttribute('fill', '#eceeef');
    textElement.setAttribute('dy', '.3em');

    return textElement;
};

EventViewHolder.prototype.cardBody = function () {
    let cardContainer = this.cardContainer();
    let cardText = this.cardText();
    let cardButtonGroupContainer = this.cardButtonGroupContainer();
    let cardButtonGroup = this.cardButtonGroup();
    let cardButton = this.cardButton();
    let cardServicesCountDescription = this.cardServicesCountDescription();

    cardButtonGroup.appendChild(cardButton);

    cardButtonGroupContainer.appendChild(cardButtonGroup);
    cardButtonGroupContainer.appendChild(cardServicesCountDescription);

    cardContainer.appendChild(cardText);
    cardContainer.appendChild(cardButtonGroupContainer);

    return cardContainer;
};

EventViewHolder.prototype.cardContainer = function () {
    let containerElement = document.createElement('div');

    containerElement.classList.add('card-body');

    return containerElement;
};

EventViewHolder.prototype.cardText = function () {
    let textElement = document.createElement('p');

    textElement.textContent = this._event.event_title;

    return textElement;
};

EventViewHolder.prototype.cardButtonGroupContainer = function () {
    let buttonContainerElement = document.createElement('div');

    buttonContainerElement.classList.add('d-flex');
    buttonContainerElement.classList.add('justify-content-between');
    buttonContainerElement.classList.add('align-items-center');

    return buttonContainerElement;
};

EventViewHolder.prototype.cardButtonGroup = function () {
    let buttonGroupElement = document.createElement('div');

    buttonGroupElement.classList.add('btn-group');

    return buttonGroupElement;
};

EventViewHolder.prototype.cardButton = function () {
    let buttonElement = document.createElement('button');

    buttonElement.setAttribute('type', 'button');

    buttonElement.classList.add('btn');
    buttonElement.classList.add('btn-sm');
    buttonElement.classList.add('btn-outline-secondary');

    buttonElement.textContent = 'make a date';

    buttonElement.addEventListener('click', function () {
        alert('date');
    });

    return buttonElement;
};

EventViewHolder.prototype.cardServicesCountDescription = function () {
    let descriptionElement = document.createElement('small');

    let servicesCount = this.getServicesCount();

    if (servicesCount === undefined) {
        descriptionElement.textContent = 'no services available for this event';
    } else {
        descriptionElement.textContent = this.getServicesCount().toString() + ' services available';
    }

    return descriptionElement;
};

EventViewHolder.prototype.getServicesCount = function () {
    return this.event.getServicesCount;
};
