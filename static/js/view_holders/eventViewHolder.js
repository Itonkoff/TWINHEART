class EventViewHolder {
    evn;
    _id = 0;

    constructor(evnt) {
        this.evn = evnt;
        this._id = this.evn.id;
        // console.log(this.evn.title);
    }


    make() {
        console.log(this._id);
        return this.join();

    }

    join() {
        let outerContainer = this.createOuterContainer();
        let innerContainer = this.createInnerContainer();
        let cardBody = this.cardBody();

        // innerContainer.appendChild(thumbnail);
        innerContainer.appendChild(cardBody);

        outerContainer.appendChild(innerContainer);

        return outerContainer;
    }

    createOuterContainer() {
        let outer_container = document.createElement('div');
        outer_container.classList.add('col-md-4');

        return outer_container;
    }

    createInnerContainer() {
        let innerContainer = document.createElement('div');
        innerContainer.classList.add('card');
        innerContainer.classList.add('mb-4');
        innerContainer.classList.add('shadow-sm');

        return innerContainer;
    }


    cardBody() {
        let cardContainer = this.cardContainer();
        let cardText = this.cardText();
        let cardButtonGroupContainer = this.cardButtonGroupContainer();
        let cardButtonGroup = this.cardButtonGroup();
        let cardButton = this.cardButton(this._id);
        let cardServicesCountDescription = this.cardServicesCountDescription();

        cardButtonGroup.appendChild(cardButton);

        cardButtonGroupContainer.appendChild(cardButtonGroup);
        cardButtonGroupContainer.appendChild(cardServicesCountDescription);

        cardContainer.appendChild(cardText);
        cardContainer.appendChild(cardButtonGroupContainer);

        return cardContainer;
    }

    cardContainer() {
        let containerElement = document.createElement('div');

        containerElement.classList.add('card-body');

        return containerElement;
    }

    cardText() {
        let textElement = document.createElement('p');

        textElement.textContent = this.evn.title;

        return textElement;
    }

    cardButtonGroupContainer() {
        let buttonContainerElement = document.createElement('div');

        buttonContainerElement.classList.add('d-flex');
        buttonContainerElement.classList.add('justify-content-between');
        buttonContainerElement.classList.add('align-items-center');

        return buttonContainerElement;
    }

    cardButtonGroup() {
        let buttonGroupElement = document.createElement('div');

        buttonGroupElement.classList.add('btn-group');

        return buttonGroupElement;
    }

    cardButton(t) {
        let buttonElement = document.createElement('button');

        buttonElement.setAttribute('type', 'button');

        buttonElement.classList.add('btn');
        buttonElement.classList.add('btn-sm');
        buttonElement.classList.add('btn-outline-secondary');

        buttonElement.textContent = 'view services';

        function logga() {
            next = next.replace('0',t.toString());
            window.location.href=next;
        }

        buttonElement.addEventListener('click', function () {

            logga();
        });

        return buttonElement;
    }

    cardServicesCountDescription() {
        let descriptionElement = document.createElement('small');

        let servicesCount = this.evn.services.length;
        descriptionElement.textContent = servicesCount + ' services available';

        return descriptionElement;
    }

    getServicesCount() {
        return undefined;
    }
}