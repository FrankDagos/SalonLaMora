window.Menu = (function () {
  "use strict";

  function init() {
    var hamburger = document.querySelector(".hamburger");
    var navLinks = document.querySelector(".nav-links");
    var navItems = document.querySelectorAll(".nav-links a");
    var header = document.querySelector("header");
    if (!hamburger || !navLinks || !header) return;

    hamburger.addEventListener("click", function () {
      navLinks.classList.toggle("active");
    });

    var headerHeight = header.offsetHeight;
    navItems.forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        var target = document.querySelector(this.getAttribute("href"));
        if (!target) return;
        var targetPosition = target.offsetTop - headerHeight;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
        if (navLinks.classList.contains("active")) navLinks.classList.remove("active");
      });
    });

    var lastScrollTop = 0;
    window.addEventListener("scroll", function () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      header.style.top = scrollTop > lastScrollTop && scrollTop > 100 ? "-100px" : "0";
      lastScrollTop = scrollTop;
    });
  }

  return { init: init };
})();
