(function () {
  "use strict";

  function init() {
    if (window.Menu) Menu.init();
    if (window.FAQ) FAQ.init();
    if (window.Galeria) Galeria.init();
    if (window.Contacto) Contacto.init();

    // Header scroll effect
    var header = document.querySelector("header");
    if (header) {
      var lastScroll = 0;
      window.addEventListener("scroll", function () {
        var currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
          header.classList.add("scrolled");
        } else {
          header.classList.remove("scrolled");
        }
        lastScroll = currentScroll;
      });
    }

    // Active nav link on scroll
    var sections = document.querySelectorAll("section[id]");
    var navLinks = document.querySelectorAll("nav a");

    function updateActiveNav() {
      var scrollPos = window.pageYOffset + 100;

      sections.forEach(function (section) {
        var sectionTop = section.offsetTop;
        var sectionHeight = section.offsetHeight;
        var sectionId = section.getAttribute("id");

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          navLinks.forEach(function (link) {
            link.classList.remove("active");
            if (link.getAttribute("href") === "#" + sectionId) {
              link.classList.add("active");
            }
          });
        }
      });
    }

    window.addEventListener("scroll", updateActiveNav);
    updateActiveNav();

    // Scroll reveal animation
    var revealElements = document.querySelectorAll(
      ".servicio, .faq-item, .contacto-container, .carrusel"
    );

    revealElements.forEach(function (el) {
      el.classList.add("reveal");
    });

    function revealOnScroll() {
      var windowHeight = window.innerHeight;
      revealElements.forEach(function (el) {
        var elementTop = el.getBoundingClientRect().top;
        var revealPoint = 100;
        if (elementTop < windowHeight - revealPoint) {
          el.classList.add("visible");
        }
      });
    }

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
