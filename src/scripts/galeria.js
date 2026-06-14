window.Galeria = (function () {
  "use strict";

  var currentSlide = 0;
  var totalSlides = 0;
  var autoPlayInterval = null;
  var autoPlayDelay = 5000;
  var isAutoPlaying = true;
  var touchStartX = 0;
  var touchEndX = 0;

  function init() {
    var track = document.querySelector(".carrusel-track");
    var slides = document.querySelectorAll(".carrusel-slide");
    var prevBtn = document.querySelector(".carrusel-btn-prev");
    var nextBtn = document.querySelector(".carrusel-btn-next");
    var dotsContainer = document.querySelector(".carrusel-dots");
    var counter = document.querySelector(".carrusel-counter");
    var lightbox = document.getElementById("lightbox");
    var lightboxImg = document.querySelector(".lightbox-img");
    var lightboxClose = document.querySelector(".cerrar");
    var lightboxPrev = document.querySelector(".lightbox-btn-prev");
    var lightboxNext = document.querySelector(".lightbox-btn-next");
    var lightboxCounter = document.querySelector(".lightbox-counter");

    if (!track || !slides.length) return;

    totalSlides = slides.length;

    // Crear dots
    for (var i = 0; i < totalSlides; i++) {
      var dot = document.createElement("button");
      dot.className = "carrusel-dot";
      dot.setAttribute("aria-label", "Ir a imagen " + (i + 1));
      if (i === 0) dot.classList.add("active");
      dotsContainer.appendChild(dot);
    }

    var dots = document.querySelectorAll(".carrusel-dot");

    function updateSlide(index, direction) {
      if (index < 0) index = totalSlides - 1;
      if (index >= totalSlides) index = 0;

      currentSlide = index;
      track.style.transform = "translateX(-" + (currentSlide * 100) + "%)";

      // Actualizar dots
      dots.forEach(function (dot) {
        dot.classList.remove("active");
      });
      if (dots[currentSlide]) {
        dots[currentSlide].classList.add("active");
      }

      // Actualizar counter
      if (counter) {
        counter.textContent = (currentSlide + 1) + " / " + totalSlides;
      }
    }

    function nextSlide() {
      updateSlide(currentSlide + 1);
    }

    function prevSlide() {
      updateSlide(currentSlide - 1);
    }

    // Botones de navegación
    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        nextSlide();
        resetAutoPlay();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        prevSlide();
        resetAutoPlay();
      });
    }

    // Dots
    dots.forEach(function (dot, index) {
      dot.addEventListener("click", function () {
        updateSlide(index);
        resetAutoPlay();
      });
    });

    // Click en imagen del carrusel abre lightbox
    slides.forEach(function (slide, index) {
      slide.addEventListener("click", function () {
        openLightbox(index);
      });
    });

    // Lightbox
    function openLightbox(index) {
      if (!lightbox || !lightboxImg) return;
      currentSlide = index;
      lightboxImg.src = slides[currentSlide].src;
      lightbox.classList.add("active");
      lightboxImg.alt = slides[currentSlide].alt;
      if (lightboxCounter) {
        lightboxCounter.textContent = (currentSlide + 1) + " / " + totalSlides;
      }
      document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
      if (!lightbox) return;
      lightbox.classList.remove("active");
      document.body.style.overflow = "";
    }

    function lightboxNextSlide() {
      currentSlide = (currentSlide + 1) % totalSlides;
      lightboxImg.src = slides[currentSlide].src;
      lightboxImg.alt = slides[currentSlide].alt;
      if (lightboxCounter) {
        lightboxCounter.textContent = (currentSlide + 1) + " / " + totalSlides;
      }
      // Sincronizar carrusel
      track.style.transform = "translateX(-" + (currentSlide * 100) + "%)";
      dots.forEach(function (dot) {
        dot.classList.remove("active");
      });
      if (dots[currentSlide]) {
        dots[currentSlide].classList.add("active");
      }
      if (counter) {
        counter.textContent = (currentSlide + 1) + " / " + totalSlides;
      }
    }

    function lightboxPrevSlide() {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      lightboxImg.src = slides[currentSlide].src;
      lightboxImg.alt = slides[currentSlide].alt;
      if (lightboxCounter) {
        lightboxCounter.textContent = (currentSlide + 1) + " / " + totalSlides;
      }
      // Sincronizar carrusel
      track.style.transform = "translateX(-" + (currentSlide * 100) + "%)";
      dots.forEach(function (dot) {
        dot.classList.remove("active");
      });
      if (dots[currentSlide]) {
        dots[currentSlide].classList.add("active");
      }
      if (counter) {
        counter.textContent = (currentSlide + 1) + " / " + totalSlides;
      }
    }

    if (lightboxClose) {
      lightboxClose.addEventListener("click", closeLightbox);
    }

    if (lightboxPrev) {
      lightboxPrev.addEventListener("click", lightboxPrevSlide);
    }

    if (lightboxNext) {
      lightboxNext.addEventListener("click", lightboxNextSlide);
    }

    if (lightbox) {
      lightbox.addEventListener("click", function (e) {
        if (e.target === lightbox) closeLightbox();
      });
    }

    // Navegación con teclado
    document.addEventListener("keydown", function (e) {
      if (lightbox && lightbox.classList.contains("active")) {
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowRight") lightboxNextSlide();
        if (e.key === "ArrowLeft") lightboxPrevSlide();
      } else {
        if (e.key === "ArrowRight") {
          nextSlide();
          resetAutoPlay();
        }
        if (e.key === "ArrowLeft") {
          prevSlide();
          resetAutoPlay();
        }
      }
    });

    // Touch/Swipe para móvil
    var carrusel = document.querySelector(".carrusel");
    if (carrusel) {
      carrusel.addEventListener("touchstart", function (e) {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      carrusel.addEventListener("touchend", function (e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      }, { passive: true });
    }

    function handleSwipe() {
      var threshold = 50;
      if (touchStartX - touchEndX > threshold) {
        nextSlide();
        resetAutoPlay();
      } else if (touchEndX - touchStartX > threshold) {
        prevSlide();
        resetAutoPlay();
      }
    }

    // Auto-play
    function startAutoPlay() {
      if (autoPlayInterval) clearInterval(autoPlayInterval);
      autoPlayInterval = setInterval(function () {
        if (isAutoPlaying) nextSlide();
      }, autoPlayDelay);
    }

    function stopAutoPlay() {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
      }
    }

    function resetAutoPlay() {
      stopAutoPlay();
      startAutoPlay();
    }

    // Pausar auto-play al hover
    if (carrusel) {
      carrusel.addEventListener("mouseenter", function () {
        isAutoPlaying = false;
      });

      carrusel.addEventListener("mouseleave", function () {
        isAutoPlaying = true;
      });
    }

    // Iniciar auto-play
    startAutoPlay();
  }

  return { init: init };
})();
