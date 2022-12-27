const track = document.querySelector('.carousel__track');
const buttons = document.querySelectorAll('[data-carousel-button]')
const slides = Array.from(track.children);
const nextBtn = document.querySelector('.carousel__button--right'); 
const prevBtn = document.querySelector('.carousel__button--left');
const indicatorsNav = document.querySelector('.carousel__nav');
const indicators = Array.from(indicatorsNav.children);

const moveToSlide = (track, currentSlide, targetSlide, index) => {

    if (index < 0) index = slides.length-1
    if (index >= slides.length) index = 0

    slides[index].dataset.active = true
    delete currentSlide.dataset.active
}

const indicatorMovement = (currentSlideIndicator, targetSlideIndicator, index) => {

    if (index < 0) index = slides.length-1
    if (index >= slides.length) index = 0

    indicators[index].dataset.active = true
    delete currentSlideIndicator.dataset.active
}

// prev button
prevBtn.addEventListener('click', function (e){
   const currentSlide = track.querySelector('[data-active]');
   const prevSlide = currentSlide.previousElementSibling;
   const offset = prevBtn.dataset.carouselButton === "prev" ? -1 : 1

   let newIndex = slides.indexOf(currentSlide) + offset

   moveToSlide(track, currentSlide, prevSlide, newIndex)
   
   const currentSlideIndicator = indicatorsNav.querySelector('[data-active]');
   const prevSlideIndicator = currentSlideIndicator.previousElementSibling;

   indicatorMovement(currentSlideIndicator, prevSlideIndicator, newIndex);
})

// next button
nextBtn.addEventListener('click', function (e){
    const currentSlide = track.querySelector('[data-active]');
    const nextSlide = currentSlide.nextElementSibling;
    const offset = nextBtn.dataset.carouselButton === "next" ? 1 : - 1

    let newIndex = slides.indexOf(currentSlide) + offset
    
   moveToSlide(track, currentSlide, nextSlide, newIndex)
    
    const currentSlideIndicator = indicatorsNav.querySelector('[data-active]');
    const nextSlideIndicator = currentSlideIndicator.nextElementSibling;

    indicatorMovement(currentSlideIndicator, nextSlideIndicator, newIndex);
 })


// indicator
indicatorsNav.addEventListener('click', function (e) {
    const targetIndicator = e.target.closest('button');

    if (!targetIndicator) return;

    const currentSlide = track.querySelector('[data-active]');
    const currentIndex = indicatorsNav.querySelector('[data-active]');
    const targetIndex = indicators.findIndex(indicator => indicator === targetIndicator);
    const targetSlide = slides[targetIndex];

    if (targetSlide != currentSlide)
    {
        moveToSlide(track, currentSlide, targetSlide, targetIndex)

        indicatorMovement(currentIndex, targetIndicator, targetIndex)

    }

})