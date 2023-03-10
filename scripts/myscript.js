const track = document.querySelector('.carousel__track');
const buttons = document.querySelectorAll('[data-carousel-button]');
const slides = Array.from(track.children);
const nextBtn = document.querySelector('.carousel__button--right'); 
const prevBtn = document.querySelector('.carousel__button--left');
const indicatorsNav = document.querySelector('.carousel__nav');
const indicators = Array.from(indicatorsNav.children);

const thumbnails = Array.from(document.querySelectorAll('.thumbnail__image'));

let isClicked = false

const moveToSlide = (track, currentSlide, targetSlide, index) => {

    if (index < 0) index = slides.length-1;
    if (index >= slides.length) index = 0;

    slides[index].dataset.active = true;
    delete currentSlide.dataset.active;
}

const indicatorMovement = (currentSlideIndicator, targetSlideIndicator, index) => {

    if (index < 0) index = slides.length-1
    if (index >= slides.length) index = 0

    indicators[index].dataset.active = true
    delete currentSlideIndicator.dataset.active
}

// autoplay
var counter = 0;
var auto = setInterval((autoPlay), 3000)

function autoPlay(){
    console.log(counter)
if (counter > slides.length - 1){
    counter = 0
    delete slides[slides.length-1].dataset.active
    delete indicators[slides.length-1].dataset.active
    slides[counter].dataset.active = true;
    indicators[counter].dataset.active = true;
} 
if (counter > 0){
    slides[counter].dataset.active = true;
    delete slides[counter - 1].dataset.active
    indicators[counter].dataset.active = true;
    delete indicators[counter - 1].dataset.active
} 

if (!counter > slides.length - 1 && !counter > 0){
counter++;
}
counter++;
}

// prev button
prevBtn.addEventListener('click', function (e){
   const currentSlide = track.querySelector('[data-active]');
   const prevSlide = currentSlide.previousElementSibling;
   const offset = prevBtn.dataset.carouselButton === "prev" ? -1 : 1

   isClicked = true
   if (isClicked == true){
    isClicked = false
    clearInterval(auto)
    
}
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

   isClicked = true
   if (isClicked == true){
    isClicked = false
    clearInterval(auto)
    

}
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
        isClicked = true
        if (isClicked == true){
            isClicked = false
            clearInterval(auto)
            

        }
        moveToSlide(track, currentSlide, targetSlide, targetIndex)

        indicatorMovement(currentIndex, targetIndicator, targetIndex)

    }

})

//thumbnail
for (let i = 0; i < indicators.length; i++)
{
    indicators[i].addEventListener('mouseover', function (e)
    {
            let pos = indicators[i].getBoundingClientRect().x -25 + 'px'
            thumbnails[i].style.left = pos  

            thumbnails[i].dataset.active = true;
    })

}

for (let i = 0; i < indicators.length; i++)
{
    indicators[i].addEventListener('mouseout', function (e)
    {
            delete thumbnails[i].dataset.active;
    })

}
