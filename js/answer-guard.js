// Answer guard: the lesson cannot move forward until the current task is answered correctly.
(function(){
  function isReady(button){
    if(!button) return true;
    if(button.id !== "nextButton" && button.id !== "storyNext") return true;

    // Final check has its own answer buttons and no Next button.
    if(document.getElementById("finalAnswers")) return true;

    const feedback = document.getElementById("feedback");
    const ready = !!feedback && feedback.classList.contains("success");

    if(!ready){
      const box = document.getElementById("feedback");
      if(box){
        box.textContent = "Сначала выбери правильный ответ 😊";
        box.className = "feedback error";
      }
      return false;
    }
    return true;
  }

  window.addEventListener("click", function(event){
    const button = event.target?.closest?.("#nextButton, #storyNext");
    if(button && !isReady(button)){
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);
})();
