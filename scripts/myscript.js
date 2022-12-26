const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextBtn = document.querySelector('.carousel__button--right'); 
const prevBtn = document.querySelector('.carousel__button--left');
const indicatorsNav = document.querySelector('.carousel__nav');
const indicators = Array.from(indicatorsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;


// Arranging slides next to one another
function setSlidePos()
{
    for (let i = 0; i < slides.length; i++){
        slides[i].style.left = slideWidth * i + 'px';
    }
}




// setSlidePos();

const moveToSlide = (track, currentSlide, targetSlide) => {
    // track.style.transform = `translateX(-${targetSlide.style.left})`;
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide'); 

}

const indicatorMovement = (currentSlideIndicator, targetSlideIndicator) => {
    currentSlideIndicator.classList.remove('current__slide');
    targetSlideIndicator.classList.add('current__slide');
}

// prev button
prevBtn.addEventListener('click', function (e){
   const currentSlide = track.querySelector('.current-slide');
   const prevSlide = currentSlide.previousElementSibling;
   moveToSlide(track, currentSlide, prevSlide)
   
   const currentSlideIndicator = indicatorsNav.querySelector('.current__slide');
   const prevSlideIndicator = currentSlideIndicator.previousElementSibling;

   console.log(currentSlide)
   console.log(prevSlide)
   indicatorMovement(currentSlideIndicator, prevSlideIndicator);


})

// next button
nextBtn.addEventListener('click', function (e){
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
  
    moveToSlide(track, currentSlide, nextSlide)
    
    const currentSlideIndicator = indicatorsNav.querySelector('.current__slide');
    const nextSlideIndicator = currentSlideIndicator.nextElementSibling;

    console.log(currentSlide)
    console.log(nextSlide)
    indicatorMovement(currentSlideIndicator, nextSlideIndicator);
 })


// indicator
indicatorsNav.addEventListener('click', function (e) {
    const targetIndicator = e.target.closest('button');

    const currentSlide = track.querySelector('.current-slide');
    const currentIndex = indicatorsNav.querySelector('.current__slide')
    const targetIndex = indicators.findIndex(indicator => indicator === targetIndicator);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide)

    indicatorMovement(currentIndex, targetIndicator)
})


//loop

function loopThrough(){
    if (slides[0].classList.contains('current-slide')){
        alert('first page is the current slide')
    } else if (slides[slides.length-1].classList.contains('current-slide')){
        alert('last page is the current slide')
    } else{
        alert('middle pages is the current slide')
    }
}