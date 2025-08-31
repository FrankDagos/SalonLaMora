window.Galeria = (function () {
  "use strict";

  function init() {
    var galeriaImgs = document.querySelectorAll(".galeria-img");
    var lightbox = document.getElementById("lightbox");
    var lightboxImg = document.querySelector(".lightbox-img");
    var cerrar = document.querySelector(".cerrar");
    if (!lightbox || !lightboxImg || !cerrar) return;

    galeriaImgs.forEach(function (img) {
      img.addEventListener("click", function () {
        lightbox.style.display = "flex";
        lightboxImg.src = img.src;
      });
    });

    cerrar.addEventListener("click", function () {
      lightbox.style.display = "none";
    });

    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) lightbox.style.display = "none";
    });
  }

  return { init: init };
})();
