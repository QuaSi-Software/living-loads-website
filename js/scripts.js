/* Implementation for multi-item carousel. Adapted from:
https://gist.github.com/viniciusmachado106/c1fc350ef03a14a21a45235c80da5b9f */

// wait for the DOM to be fully loaded and Bootstrap to be available
document.addEventListener('DOMContentLoaded', function() {
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