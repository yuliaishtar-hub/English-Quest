// Next button reliability patch.
// The lesson buttons are created dynamically by app.js. We keep the app's
// original click handler and also run that same handler on pointerup.
(function(){
  const originalAddEventListener = EventTarget.prototype.addEventListener;

  EventTarget.prototype.addEventListener = function(type, listener, options){
    if(type === "click" && this instanceof HTMLButtonElement &&
       (this.id === "nextButton" || this.id === "storyNext") &&
       typeof listener === "function"){

      originalAddEventListener.call(this, type, listener, options);

      let handledByPointer = false;

      originalAddEventListener.call(this, "pointerup", function(event){
        if(event.button !== 0) return;
        handledByPointer = true;
        listener.call(this, event);
      }, {once:true});

      originalAddEventListener.call(this, "click", function(event){
        if(handledByPointer){
          handledByPointer = false;
          event.stopImmediatePropagation();
        }
      }, true);
    }

    return originalAddEventListener.call(this, type, listener, options);
  };
})();
