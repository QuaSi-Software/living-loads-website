// wait for the DOM to be fully loaded and Bootstrap to be available
document.addEventListener('DOMContentLoaded', function() {
    // attach event listener for key visual switcher
    const keyVisualSwitcher = document.getElementById('key-visual-switcher');
    const keyVisual = document.getElementById('homeKeyVisual');
    const moonIcon = keyVisualSwitcher.querySelector('.icon-moon');
    const sunIcon = keyVisualSwitcher.querySelector('.icon-sun');
    const dayKeyVisualUrl = keyVisual.src;
    const nightKeyVisualUrl = new URL('assets/lilo_key_visual_night.jpg', document.baseURI).href;
    let isNight = false;

    keyVisualSwitcher.addEventListener('click', function() {
        isNight = !isNight;
        keyVisual.src = isNight ? nightKeyVisualUrl : dayKeyVisualUrl;
        moonIcon.hidden = isNight;
        sunIcon.hidden = !isNight;
    });

    moonIcon.hidden = false;
    sunIcon.hidden = true;

    /* Implementation for multi-item carousel. Adapted from:
    https://gist.github.com/viniciusmachado106/c1fc350ef03a14a21a45235c80da5b9f */

    // initialize as Bootstrap 5 carousel
    document.querySelectorAll('.multi-item-carousel').forEach(function(element) {
        console.log("init c")
        new bootstrap.Carousel(element, {
            interval: false,
            wrap: true
        });
    });

    // for every slide in a carousel, clone the next and next-next items into the current
    // slide. this allows showing 3 items at once in one slide. the CSS for the interaction
    // buttons then causes each slide to shift one third over and the items to wrap around
    document.querySelectorAll('.multi-item-carousel .carousel-item').forEach(function(item) {
        let next = item.nextElementSibling;
        if (!next) {
            next = item.parentElement.firstElementChild;
        }

        // clone the first child (card) of the next item and append it
        let clonedCard = next.firstElementChild.cloneNode(true);
        item.appendChild(clonedCard);

        // clone the first child of the next-next item if it exists
        if (next.nextElementSibling) {
            let nextNext = next.nextElementSibling;
            clonedCard = nextNext.firstElementChild.cloneNode(true);
            item.appendChild(clonedCard);
        } else {
            // if no next-next, wrap around to the first item
            let firstItem = item.parentElement.firstElementChild;
            clonedCard = firstItem.firstElementChild.cloneNode(true);
            item.appendChild(clonedCard);
        }
    });
});