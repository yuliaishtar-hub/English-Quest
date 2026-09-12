// Next button fallback.
// The lesson buttons are created dynamically, so handle the user's pointer directly.
(function(){
  document.addEventListener("pointerdown",function(event){
    const button=event.target.closest("#nextButton,#storyNext");
    if(!button || button.disabled) return;

    event.preventDefault();
    event.stopPropagation();

    // Call the button's real listener directly through the DOM API.
    button.click();
  },true);
})();
