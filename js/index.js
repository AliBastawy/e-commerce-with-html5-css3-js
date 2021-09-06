const option = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");
const navigation = document.querySelector(".navigation");
const close = document.querySelector(".close");

option.addEventListener('click', () => {
    menu.classList.add("show")
    navigation.classList.add("show")
    document.body.classList.add("show")
})
close.addEventListener('click', () => {
    menu.classList.remove("show")
    navigation.classList.remove("show")
    document.body.classList.remove("show")
})

const navigationHeight = navigation.getBoundingClientRect().height;
window.addEventListener('scroll', () => {
    const windowScroll = window.pageYOffset;
    if (navigationHeight < windowScroll) {
        navigation.classList.add("fix-nav")
    } else {
        navigation.classList.remove("fix-nav")
    }   
})

// Scroll To
const links = [...document.querySelectorAll(".scroll-link")];
links.map(link => {

    if (!link) return;
    link.addEventListener("click", e => {
        e.preventDefault();

        const id = e.target.getAttribute("href").slice(1);

        const element = document.getElementById(id);
        const fixNav = navigation.classList.contains("fix-nav");
        let position = element.offsetTop - navHeight;

        window.scrollTo({
        top: position,
        left: 0,
        });

        navigation.classList.remove("show");
        menu.classList.remove("show");
        document.body.classList.remove("show");
    });
});

gsap.from(".logo", { opacity: 0, duration: 1, delay: 0.5, y: -10 });
gsap.from(".hamburger", { opacity: 0, duration: 1, delay: 1, x: 20 });
gsap.from(".cover img", { opacity: 0, duration: 1, delay: 1.5, x: -200 });
gsap.from(".cover-content h2", { opacity: 0, duration: 1, delay: 2, y: -50 });
gsap.from(".cover-content h1", { opacity: 0, duration: 1, delay: 2.5, y: -45 });
gsap.from(".cover-content a", { opacity: 0, duration: 1, delay: 3.5, y: 50 });

const leftIcon = document.querySelector("#slider .icons .left");
const rightIcon = document.querySelector("#slider .icons .right");
const slide = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");

var currentSlide = 0;

function modulo(number, mod) {
    let result = number % mod;
    if (result > 2) {
        result = -2;
    } else if (result < -2) {
        result = 2;
    }
    currentSlide = result
    return result;
}

function changeSlide(carousel, slideNumber) {
    carousel.style.setProperty('--current-slide', slideNumber);
    var x = [...slider.children]
    x.forEach((element, index) => {
        var dataId = slideNumber + index + 1
        element.setAttribute("data-id", `${dataId}`)
        var scale = 0;
        if (dataId == 3) scale=1.5
        else if (dataId == 2 || dataId == 4) scale = 1.2
        else scale = 1
        element.style = `transform: translateX(calc(50% * ${slideNumber})) scale(${scale})`
    })
}


function handleNext(carousel, currentSlide, numSlides) {
    currentSlide = modulo(currentSlide + 1, numSlides);
    changeSlide(carousel, currentSlide);
}

function handlePrevious(carousel, currentSlide, numSlides) {
    currentSlide = modulo(currentSlide - 1, numSlides);
    changeSlide(carousel, currentSlide);
}

const carousels = document.querySelector('[data-carousel]');

rightIcon.addEventListener('click', () => handlePrevious(carousels, this.currentSlide, 5));
leftIcon.addEventListener('click', () => handleNext(carousels, this.currentSlide, 5));


function clickedImage(image) {
    let sl = image.getAttribute("slide"),
    currentSlide = +sl
    this.currentSlide = currentSlide
    changeSlide(carousels, currentSlide)
}