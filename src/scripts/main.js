(function () {
  "use strict";

  function init() {
    if (window.Menu) Menu.init();
    if (window.FAQ) FAQ.init();
    if (window.Galeria) Galeria.init();
    if (window.Contacto) Contacto.init();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
