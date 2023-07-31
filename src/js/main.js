
$(".card").click(function () {
    $(".card").removeClass("active");
    $(this).addClass("active");
  });


  function toggleFullscreen() {
    var overlay = document.getElementById('imageOverlay');
    var closeButton = document.getElementById('closeButton');
    var imageContainer = document.getElementById('imageContainer');
    var fullscreenImage = document.getElementById('fullscreenImage');
    overlay.classList.toggle('hidden');
    closeButton.addEventListener('click', toggleFullscreen);
    if (!overlay.classList.contains('hidden')) {
        imageContainer.style.height = window.innerHeight + 'px';
        fullscreenImage.style.maxHeight = window.innerHeight - 80 + 'px';
        document.body.classList.add('overflow-hidden');
    } else {
        document.body.classList.remove('overflow-hidden');
    }
}

const sliderWrapper = document.querySelector('.slider-wrapper');
  let slideIndex = 0;

  function showSlide() {
    const slides = document.querySelectorAll('.slide');
    if (slideIndex >= slides.length) {
      slideIndex = 0;
    } else if (slideIndex < 0) {
      slideIndex = slides.length - 1;
    }

    sliderWrapper.style.transform = `translateX(-${slideIndex * 100}%)`;
  }

  function nextSlide() {
    slideIndex++;
    showSlide();
  }

  function prevSlide() {
    slideIndex--;
    showSlide();
  }


  window.addEventListener("scroll", function () {
    const logo = document.querySelector(".hidden-logo");
    const threshold = 100; // Adjust this value as per your requirements
  
    if (window.scrollY > threshold) {
      logo.parentElement.classList.add("show-logo");
    } else {
      logo.parentElement.classList.remove("show-logo");
    }
  });

  const video1 = document.getElementById('video1');
  const playPause1 = document.getElementById('playPause1');
  const pauseIcon1 = playPause1.querySelector('.fa-pause');

  const video2 = document.getElementById('video2');
  const playPause2 = document.getElementById('playPause2');
  const pauseIcon2 = playPause2.querySelector('.fa-pause');

  playPause1.addEventListener('click', () => {
    if (video1.paused) {
      video1.play();
      pauseIcon1.classList.remove('hidden');
    } else {
      video1.pause();
      pauseIcon1.classList.add('hidden');
    }
  });

  playPause2.addEventListener('click', () => {
    if (video2.paused) {
      video2.play();
      pauseIcon2.classList.remove('hidden');
    } else {
      video2.pause();
      pauseIcon2.classList.add('hidden');
    }
  });

