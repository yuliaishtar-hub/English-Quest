/* Restore the grandma-only picture from the original English Adventure. */
(() => {
  const OLD = 'https://yuliaishtar-hub.github.io/inglish-adventure/';
  function fix(){
    document.querySelectorAll('#lessonContent img').forEach(img => {
      const src = img.getAttribute('src') || '';
      if (src.includes('grandmagrandpa.jpg')) img.src = OLD + 'grandma.jpg';
    });
  }
  function watch(){
    const root = document.getElementById('lessonContent');
    if (!root) return;
    new MutationObserver(() => setTimeout(fix,0)).observe(root,{childList:true,subtree:true});
    fix();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',watch); else watch();
})();
