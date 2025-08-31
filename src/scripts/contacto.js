window.Contacto = (function () {
  "use strict";

  function init() {
    var form = document.getElementById("contactForm");
    var mensajeExito = document.getElementById("mensajeExito");

    if (!form || !mensajeExito) return;

    // ----------------- Overlay y Loader -----------------
    var overlay = document.createElement("div");
    overlay.id = "loaderOverlay";
    overlay.style.display = "none";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
    overlay.style.zIndex = "11999";

    var loader = document.createElement("div");
    loader.id = "loader"; // tu CSS circular
    overlay.appendChild(loader);

    document.body.appendChild(overlay);

    // ----------------- Inicializar EmailJS -----------------
    if (typeof emailjs !== "undefined") {
      emailjs.init("u11F4r_pc8Wv4NzFQ");
    } else {
      console.error("EmailJS no está cargado. Verifica el script en tu HTML.");
      return;
    }

    // ----------------- Evento submit -----------------
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      overlay.style.display = "block"; // mostrar overlay + loader

      var formData = {
        nombre: form.nombre.value,
        email: form.email.value,
        telefono: form.telefono.value,
        consulta: form.consulta.value
      };

      emailjs.send("service_vxqdmii", "template_1dkxsct", formData)
        .then(function () {
          overlay.style.display = "none"; // ocultar overlay + loader
          mensajeExito.style.display = "block";

          setTimeout(function () {
            mensajeExito.style.display = "none";
            form.reset();
          }, 3000);
        })
        .catch(function (err) {
          overlay.style.display = "none"; // ocultar overlay + loader
          console.error("Error al enviar el correo:", err);
          alert("Ocurrió un error, por favor intenta nuevamente.");
        });
    });
  }

  return { init: init };
})();
