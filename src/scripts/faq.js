window.FAQ = (function () {
  "use strict";

  function init() {
    var questions = document.querySelectorAll(".faq-question");
    questions.forEach(function (item) {
      item.addEventListener("click", function () {
        var answer = item.nextElementSibling;
        answer.style.display = answer.style.display === "block" ? "none" : "block";
      });
    });
  }

  return { init: init };
})();
