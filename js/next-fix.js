// Reliable Next button fallback.
// Some browsers can lose the dynamically attached click after the lesson redraws.
(function(){
  function blockNativeClick(event){
    const button=event.target.closest("#nextButton,#storyNext");
    if(!button) return;
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  document.addEventListener("pointerdown",function(event){
    const button=event.target.closest("#nextButton,#storyNext");
    if(!button) return;

    document.addEventListener("click",blockNativeClick,true);

    setTimeout(function(){
      document.removeEventListener("click",blockNativeClick,true);
      button.click();
    },0);
  },true);
})();
