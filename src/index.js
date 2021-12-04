const track = document.querySelector('.carousel_track');
const slides = Array.from(track.children);
const slideWidth = slides[0].getBoundingClientRect().width;

const nextButton = document.querySelector('.carousel_button--right');
const prevButton = document.querySelector('.carousel_button--left');
const dotsNav =  document.querySelector('.carousel_nav');
const dots = Array.from(dotsNav.children);

//Arranging slides next to one another
const setSlidePosition = (slide,index)=>{
    slide.style.left = slideWidth * index + 'px';
};
slides.forEach(setSlidePosition);

const moveToSlide = (track,currentSlide,targetSlide) =>{
    const amountToMove = targetSlide.style.left;
    track.style.transform = 'translateX(-'+amountToMove+')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}
const updateDots = (currentDot,targetDot) =>{
    currentDot.classList.remove('current_slide');
    targetDot.classList.add('current_slide');
}
const vanishButton = (targetIndex) =>{
    if(targetIndex===0)
    {
        prevButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
    else if(targetIndex===slides.length-1)
    {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden');
    }
    else
    {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
}

nextButton.addEventListener('click',e=>{
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.current_slide');
    const nextDot = currentDot.nextElementSibling;
    const targetIndex = slides.findIndex(slide=>slide===nextSlide)
    moveToSlide(track,currentSlide,nextSlide);
    updateDots(currentDot,nextDot);
    vanishButton(targetIndex);
});
prevButton.addEventListener('click',e=>{
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.current_slide');
    const prevDot = currentDot.previousElementSibling;
    const targetIndex = slides.findIndex(slide=>slide===prevSlide)
    moveToSlide(track,currentSlide,prevSlide);
    updateDots(currentDot,prevDot);
    vanishButton(targetIndex);
});

dotsNav.addEventListener('click',e=>{
    const targetDot = e.target.closest('button');
    
    if(!targetDot)
    return;

    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current_slide');
    const targetIndex = dots.findIndex(dot=>dot===targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track,currentSlide,targetSlide);
    updateDots(currentDot,targetDot);
    vanishButton(targetIndex);
});

// Mobile Menu Toggle
const btn = document.querySelector("button.mobile-menu-button");
const menu = document.querySelector(".mobile-menu");

btn.addEventListener("click", () => {
	menu.classList.toggle("hidden");
});