window.FAQ = (function () {
  "use strict";

  function init() {
    var faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(function (item) {
      var question = item.querySelector(".faq-question");
      if (question) {
        question.addEventListener("click", function () {
          var isActive = item.classList.contains("active");

          // Cerrar todos los demás
          faqItems.forEach(function (otherItem) {
            otherItem.classList.remove("active");
          });

          // Abrir/cerrar el actual
          if (!isActive) {
            item.classList.add("active");
          }
        });
      }
    });
  }

  return { init: init };
})();
