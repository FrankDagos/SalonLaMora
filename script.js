// Selección de elementos
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");
const header = document.querySelector("header");

// ----- MENÚ HAMBURGUESA -----
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// ----- SCROLL SUAVE CON OFFSET PARA HEADER FIJO -----
const headerHeight = header.offsetHeight;

navItems.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (!target) return;

    const targetPosition = target.offsetTop - headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });

    // Cerrar menú hamburguesa si estaba abierto (móvil)
    if (navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
    }
  });
});

// ----- OCULTAR HEADER AL BAJAR / MOSTRAR AL SUBIR (ESCRITORIO) -----
let lastScrollTop = 0;

window.addEventListener("scroll", () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop && scrollTop > 100) {
    // Bajando
    header.style.top = "-100px";
  } else {
    // Subiendo
    header.style.top = "0";
  }

  lastScrollTop = scrollTop;
});
