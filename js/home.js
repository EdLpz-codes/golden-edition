// Slide numbers start at zero in JavaScript and at one on the screen.
const slides = document.querySelectorAll(".slide");
const slideStatus = document.getElementById("slide-status");
let currentSlide = 0;

function showSlide(nextSlide) {
  slides[currentSlide].hidden = true;
  if (nextSlide < 0) {
    nextSlide = slides.length - 1;
  } else if (nextSlide >= slides.length) {
    nextSlide = 0;
  }
  currentSlide = nextSlide;
  slides[currentSlide].hidden = false;
  slideStatus.textContent = (currentSlide + 1) + " / " + slides.length;
}

document.getElementById("previous").addEventListener("click", function () {
  showSlide(currentSlide - 1);
});

document.getElementById("next").addEventListener("click", function () {
  showSlide(currentSlide + 1);
});

// Show the controls once their buttons are ready to use.
document.querySelector(".controls").hidden = false;
