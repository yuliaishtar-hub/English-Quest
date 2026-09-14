(() => {
  const base = 'assets/school/';
  const map = {
    'School bag.jpg':'school-bag.svg',
    'pen.jpg':'pen.svg',
    'Eraser.jpg':'eraser.svg',
    'pencil.jpg':'pencil.svg',
    'book.jpg':'book.svg',
    'pencil-case.jpg':'pencil-case.svg'
  };
  function fix(){
    document.querySelectorAll('#lessonContent img').forEach(img=>{
      const src=img.getAttribute('src')||'';
      const name=decodeURIComponent(src.split('/').pop()||'');
      if(map[name]) img.src=base+map[name];
    });
    document.querySelectorAll('#lessonContent .emoji-image').forEach(el=>{
      if(el.textContent.includes('📚')){el.textContent='';const img=document.createElement('img');img.src=base+'book.svg';img.className='big-image';el.replaceWith(img)}
    });
  }
  const content=document.getElementById('lessonContent');
  if(content)new MutationObserver(()=>setTimeout(fix,0)).observe(content,{childList:true,subtree:true});
  document.addEventListener('DOMContentLoaded',()=>setTimeout(fix,200));
})();
