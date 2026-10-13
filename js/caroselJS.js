let slideIndex = 1;
showSlides(slideIndex);

let prevImg = document.getElementById("prevImg");
let nextImg = document.getElementById("nextImg");

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let prev = 1;
  let next = 1;

  let slides = document.getElementsByClassName("mySlides");
  let nSlides = document.getElementsByClassName("nSlides");
  let pSlides = document.getElementsByClassName("pSlides");

  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}

  prev = slideIndex-1;
  next = slideIndex+1;
  if (next > slides.length) {next = 1}
  if (prev < 1) {prev = slides.length}

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    nSlides[i].style.display = "none";
    pSlides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
  pSlides[prev-1].style.display = "block";
  nSlides[next-1].style.display = "block";

}

/* 
  
  
*/