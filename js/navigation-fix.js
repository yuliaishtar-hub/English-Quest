/* Lesson navigation fix.
   Once a task has been answered correctly, its state is kept.
   The learner can move Back and Next without answering the same task again.
*/
(function(){
  const cache = new Map();
  let currentKey = null;
  let busy = false;

  function lessonKey(){
    const title = document.getElementById('lessonTitle')?.textContent?.trim() || '';
    const counter = document.getElementById('lessonCounter')?.textContent?.trim() || '';
    if(!title || !/^\d+\s*\/\s*\d+$/.test(counter)) return null;
    return title + '|' + counter;
  }

  function counterNumber(key){
    const m = String(key || '').match(/\|(\d+)\s*\/\s*(\d+)$/);
    return m ? Number(m[1]) : 0;
  }

  function snapshot(){
    const box = document.getElementById('lessonContent');
    const key = lessonKey();
    if(!box || !key) return;
    const nodes = Array.from(box.childNodes);
    if(nodes.length) cache.set(key, nodes);
    currentKey = key;
  }

  function restore(key){
    if(busy || !key || !cache.has(key)) return false;
    const box = document.getElementById('lessonContent');
    const counter = document.getElementById('lessonCounter');
    const bar = document.getElementById('progressBar');
    const nodes = cache.get(key);
    if(!box || !nodes) return false;

    busy = true;
    box.replaceChildren(...nodes);
    if(counter) counter.textContent = key.split('|').pop();
    const m = String(counter?.textContent || '').match(/(\d+)\s*\/\s*(\d+)/);
    if(bar && m) bar.style.width = `${((Number(m[1])-1)/Number(m[2]))*100}%`;
    currentKey = key;
    window.dispatchEvent(new CustomEvent('englishQuestNavigationRestored'));
    setTimeout(()=>{ busy=false; },0);
    return true;
  }

  function addBackButton(){
    const actions = document.querySelector('.lesson-actions');
    if(!actions || actions.querySelector('#previousButton')) return;
    const b = document.createElement('button');
    b.id = 'previousButton';
    b.type = 'button';
    b.className = 'secondary-button small-button';
    b.textContent = '← Назад';
    b.addEventListener('click', function(e){
      e.preventDefault();
      e.stopPropagation();
      const key = lessonKey();
      const title = key?.split('|')[0] || '';
      const n = counterNumber(key);
      if(!key || n <= 1) return;
      const previousKey = Array.from(cache.keys()).reverse().find(k => k.startsWith(title + '|') && counterNumber(k) === n-1);
      if(previousKey) restore(previousKey);
    });
    actions.insertBefore(b, actions.firstChild);
  }

  function findNextKey(key){
    const title = key?.split('|')[0] || '';
    const n = counterNumber(key);
    return Array.from(cache.keys()).find(k => k.startsWith(title + '|') && counterNumber(k) === n+1) || null;
  }

  function observe(){
    const content = document.getElementById('lessonContent');
    const counter = document.getElementById('lessonCounter');
    if(!content || !counter) return;

    const observer = new MutationObserver(()=>{
      if(busy) return;
      const key = lessonKey();
      if(key && key !== currentKey){
        snapshot();
        currentKey = key;
      }
      addBackButton();
    });
    observer.observe(content,{childList:true,subtree:true});
    observer.observe(counter,{childList:true,characterData:true,subtree:true});

    document.addEventListener('click', function(e){
      const next = e.target?.closest?.('#nextButton');
      if(!next || busy) return;
      const key = lessonKey();
      const nextKey = findNextKey(key);
      if(nextKey){
        e.preventDefault();
        e.stopImmediatePropagation();
        restore(nextKey);
      }
    }, true);

    snapshot();
    addBackButton();
  }

  function start(){
    setTimeout(observe, 50);
    setTimeout(observe, 500);
    setTimeout(observe, 1500);
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded',start); else start();
})();
