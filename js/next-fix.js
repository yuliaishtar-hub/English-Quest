// Next button reliability patch.
// The lesson buttons are created dynamically by app.js.
(function(){
  const nativeAdd = EventTarget.prototype.addEventListener;

  EventTarget.prototype.addEventListener = function(type, listener, options){
    const isNextButton = type === "click" &&
      this instanceof HTMLButtonElement &&
      (this.id === "nextButton" || this.id === "storyNext") &&
      typeof listener === "function";

    if(!isNextButton){
      return nativeAdd.call(this, type, listener, options);
    }

    let pointerHandled = false;

    // Capture-phase guard runs before the app's normal click listener.
    nativeAdd.call(this, "click", function(event){
      if(pointerHandled){
        pointerHandled = false;
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    }, true);

    // Use the exact same app callback on pointerup.
    nativeAdd.call(this, "pointerup", function(event){
      if(event.button !== 0) return;
      pointerHandled = true;
      listener.call(this, event);
    });

    // Keep the original app click listener.
    return nativeAdd.call(this, type, listener, options);
  };
})();
