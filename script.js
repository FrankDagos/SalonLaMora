// FAQ desplegable
document.querySelectorAll('.faq-question').forEach(item => {
    item.addEventListener('click', () => {
        const answer = item.nextElementSibling;
        const isOpen = answer.style.display === 'block';

        // Abrir/cerrar la respuesta clickeada
        answer.style.display = isOpen ? 'none' : 'block';
    });
});

// Enviar formulario de contacto por mail (usando mailto)
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const nombre = contactForm.nombre.value;
    const email = contactForm.email.value;
    const telefono = contactForm.telefono.value;
    const consulta = contactForm.consulta.value;

    const subject = encodeURIComponent("Consulta desde página Salón La Mora");
    const body = encodeURIComponent(`Nombre: ${nombre}\nEmail: ${email}\nTeléfono: ${telefono}\nConsulta:\n${consulta}`);

    window.location.href = `mailto:marisadagostino3@hotmail.com?subject=${subject}&body=${body}`;

    // Resetear formulario
    contactForm.reset();
});

// Seleccionamos todas las imágenes
const galeriaImgs = document.querySelectorAll('.galeria-img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const cerrar = document.querySelector('.cerrar');

// Abrir overlay al hacer click
galeriaImgs.forEach(img => {
  img.addEventListener('click', () => {
    lightbox.style.display = 'flex';
    lightboxImg.src = img.src;
  });
});

// Cerrar overlay
cerrar.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

// También se puede cerrar haciendo click fuera de la imagen
lightbox.addEventListener('click', e => {
  if(e.target === lightbox) lightbox.style.display = 'none';
});

