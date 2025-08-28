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

// FAQ desplegable
document.querySelectorAll(".faq-question").forEach((item) => {
  item.addEventListener("click", () => {
    const answer = item.nextElementSibling;
    answer.style.display = answer.style.display === "block" ? "none" : "block";
  });
});

// Formulario contacto
const contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const nombre = contactForm.nombre.value;
  const email = contactForm.email.value;
  const telefono = contactForm.telefono.value;
  const consulta = contactForm.consulta.value;

  const subject = encodeURIComponent("Consulta desde página Salón La Mora");
  const body = encodeURIComponent(
    `Nombre: ${nombre}\nEmail: ${email}\nTeléfono: ${telefono}\nConsulta:\n${consulta}`
  );

  window.location.href = `mailto:marisadagostino3@hotmail.com?subject=${subject}&body=${body}`;
  contactForm.reset();
});

// Galería Lightbox
const galeriaImgs = document.querySelectorAll(".galeria-img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const cerrar = document.querySelector(".cerrar");

galeriaImgs.forEach((img) => {
  img.addEventListener("click", () => {
    lightbox.style.display = "flex";
    lightboxImg.src = img.src;
  });
});

cerrar.addEventListener("click", () => {
  lightbox.style.display = "none";
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) lightbox.style.display = "none";
});
//Mostrar mensaje en pantalla
const form = document.getElementById("contactForm");
const mensajeExito = document.getElementById("mensajeExito");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevenir envío real para mostrar el mensaje

  // Mostrar el mensaje
  mensajeExito.style.display = "block";

  // Opcional: ocultar el mensaje después de 3 segundos y limpiar formulario
  setTimeout(() => {
    mensajeExito.style.display = "none";
    form.reset();
  }, 3000);
});
