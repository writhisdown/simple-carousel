(function() {

    let position = 0;
    const slides = document.querySelectorAll('.carousel-item');
    const lastSlide = document.querySelector('.carousel-item:last-of-type');
    const totalSlides = slides.length;
    const indicatorContainer = document.querySelector('.carousel-indicators');
    const indicatorButtons = [];

    function initialSlide() {

        if (position == 0) {
            slides[position].classList.add('active-slide');
        }

    }

    function setIndicators() {

        if (indicatorContainer !== null) {
            for (let i = 0; i < totalSlides; i++) {
                const button = document.createElement('button');
                button.setAttribute('type', 'button');
                button.setAttribute('btindex', i); 
                indicatorContainer.appendChild(button);
                indicatorButtons.push(button);
            }

            indicatorButtons[0].classList.add('current-indicator');

        }

    }

    window.onload = function (event) {
        initialSlide();
        setIndicators();
    };

    function updateIndicators() {

        indicatorButtons.forEach( function(element, index){

            if (index === position) {
                element.classList.add('current-indicator');
                element.setAttribute('aria-current', true);
            } else {
                element.classList.remove('current-indicator');
                element.removeAttribute('aria-current');
            }

        });
    }

    function updatePosition() {

        for (let slide of slides) {
            slide.classList.remove('active-slide');
            slide.classList.remove('next');
            slide.classList.remove('prev');
        }

        slides[position].classList.add('active-slide');

        updateIndicators();

    }

    function animateRight() {

        if (position === 0) {
            lastSlide.classList.add('next');
        } else {
            slides[position - 1].classList.add('next');
        }
    
    }

    function animateLeft() {

        if (position === totalSlides - 1) {
            slides[0].classList.add('prev');
        } else {
            slides[position + 1].classList.add('prev');
        }
        
    }

    function moveForward() {

        if (position === totalSlides - 1) {
            position = 0;
        } else {
                position++;
        }

        updatePosition();
        animateRight();
    }

    function moveBack() {

        if (position === 0) {
            position = totalSlides - 1;
        } else {
            position--;
        }

        updatePosition();
        animateLeft();
    }

    function targetIndicator(elementId) {

        let prevPosition = position;
        position = elementId;

        updatePosition();

        if(position > prevPosition) {
            animateRight();
        } else if (position < prevPosition) {
            animateLeft();
        }

    }


    document.addEventListener('click', function (event) {
        if (event.target.matches('.button_carousel-next')) {
            moveForward();
        }

        if (event.target.matches('.button_carousel-prev')) {
            moveBack();
        }

        if (event.target.matches('.carousel-indicators button')) {

            targetIndicator(parseInt(event.target.getAttribute('btindex')));
        }

    }, false);

})();