(() => {
  const words = [
    ['school bag','школьная сумка','🎒'],['pencil','карандаш','✏️'],['pen','ручка','🖊️'],['eraser','ластик','◻️'],['ruler','линейка','📏'],['book','книга','📖'],['pencil case','пенал','🖍️'],
    ['school','школа','🏫'],['classroom','класс','🧑‍🏫'],['teacher','учитель','👩‍🏫'],['student','ученик / ученица','🧒'],['English','английский язык','🇬🇧'],['maths','математика','➗'],['music','музыка','🎵'],
    ['one','один','1️⃣'],['two','два','2️⃣'],['three','три','3️⃣'],['four','четыре','4️⃣'],['five','пять','5️⃣'],['six','шесть','6️⃣'],['seven','семь','7️⃣'],['eight','восемь','8️⃣'],['nine','девять','9️⃣'],['ten','десять','🔟'],['eleven','одиннадцать','1️⃣1️⃣'],['twelve','двенадцать','1️⃣2️⃣'],['thirteen','тринадцать','1️⃣3️⃣'],['fourteen','четырнадцать','1️⃣4️⃣'],['fifteen','пятнадцать','1️⃣5️⃣'],['sixteen','шестнадцать','1️⃣6️⃣'],['seventeen','семнадцать','1️⃣7️⃣'],['eighteen','восемнадцать','1️⃣8️⃣'],['nineteen','девятнадцать','1️⃣9️⃣'],['twenty','двадцать','2️⃣0️⃣'],
    ['open your book','открой книгу','📖'],['sit down','сядь','🪑'],['stand up','встань','⬆️'],['listen','слушай','🔊'],['read','читай','📖'],['write','пиши','✍️'],['look','смотри','👀'],
    ['what','что / какой','❓'],['this','это / этот','👉'],['it','это','✨'],['is','есть / является','🔹'],['a','артикль','🔤'],['an','артикль перед гласным звуком','🔤'],['my','мой / моя / моё','💜'],['your','твой / ваш','💙'],['what’s this?','Что это?','❓']
  ];

  function styles(){
    if(document.getElementById('wordbookStyles')) return;
    const s=document.createElement('style'); s.id='wordbookStyles'; s.textContent=`
      .skill-button{border:0;background:#f0efff;padding:9px 12px;border-radius:12px;font-size:13px;font-weight:800;color:#39326e;cursor:pointer;transition:.18s}
      .skill-button:hover{transform:translateY(-2px);background:#e5e1ff}
      .wordbook-overlay{position:fixed;inset:0;background:rgba(30,38,60,.48);display:none;align-items:center;justify-content:center;padding:20px;z-index:5000}
      .wordbook-overlay.show{display:flex}.wordbook{width:min(900px,100%);max-height:88vh;overflow:auto;background:#fff;border-radius:28px;padding:28px;box-shadow:0 25px 80px rgba(0,0,0,.25)}
      .wordbook-head{display:flex;align-items:center;justify-content:space-between;gap:15px;margin-bottom:18px}.wordbook-head h2{margin:0}.wordbook-close{background:#eef0f8;border-radius:12px;padding:10px 14px;font-weight:800}
      .wordbook-search{width:100%;padding:14px 16px;border:2px solid #eceefa;border-radius:14px;font-size:16px;margin-bottom:18px;outline:none}.wordbook-search:focus{border-color:#7b68ee}
      .wordbook-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.word-card{background:#f7f8fc;border-radius:17px;padding:15px;display:flex;align-items:center;gap:12px}.word-card-icon{font-size:30px}.word-en{font-weight:900}.word-ru{font-size:13px;color:#68738a;margin-top:3px}.word-say{margin-left:auto;background:#fff;border-radius:10px;padding:7px;cursor:pointer}
      @media(max-width:700px){.wordbook-grid{grid-template-columns:1fr 1fr}}@media(max-width:450px){.wordbook-grid{grid-template-columns:1fr}}
    `;document.head.appendChild(s);
  }
  function speak(t){if(!window.speechSynthesis)return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='en-US';u.rate=.78;speechSynthesis.speak(u)}
  function open(){
    styles(); let ov=document.getElementById('wordbookOverlay');
    if(!ov){ov=document.createElement('div');ov.id='wordbookOverlay';ov.className='wordbook-overlay';ov.innerHTML=`<div class="wordbook"><div class="wordbook-head"><h2>📚 Справочник слов</h2><button class="wordbook-close" type="button">✕ Закрыть</button></div><input class="wordbook-search" id="wordbookSearch" placeholder="Найти слово…"><div class="wordbook-grid" id="wordbookGrid"></div></div>`;document.body.appendChild(ov);ov.addEventListener('click',e=>{if(e.target===ov||e.target.closest('.wordbook-close'))ov.classList.remove('show')});ov.querySelector('#wordbookSearch').addEventListener('input',render)}
    render();ov.classList.add('show');setTimeout(()=>ov.querySelector('#wordbookSearch').focus(),50);
  }
  function render(){const q=(document.getElementById('wordbookSearch')?.value||'').toLowerCase();const grid=document.getElementById('wordbookGrid');if(!grid)return;grid.innerHTML=words.filter(w=>(w[0]+' '+w[1]).toLowerCase().includes(q)).map(w=>`<div class="word-card"><span class="word-card-icon">${w[2]}</span><div><div class="word-en">${w[0]}</div><div class="word-ru">${w[1]}</div></div><button class="word-say" data-word="${w[0]}" type="button">🔊</button></div>`).join('');grid.querySelectorAll('.word-say').forEach(b=>b.addEventListener('click',()=>speak(b.dataset.word)))}
  document.addEventListener('DOMContentLoaded',()=>{const row=document.querySelector('.skill-row');if(!row)return;const labels=[['🔤','слова',open],['🔊','слушаю',()=>document.getElementById('startQuest')?.click()],['📖','читаю',()=>document.getElementById('startQuest')?.click()],['🧩','грамматика',()=>document.getElementById('startQuest')?.click()],['💬','говорю',()=>document.getElementById('startQuest')?.click()]];row.innerHTML=labels.map((x,i)=>`<button class="skill-button" data-skill="${i}" type="button">${x[0]} ${x[1]}</button>`).join('');row.querySelectorAll('.skill-button').forEach((b,i)=>b.addEventListener('click',labels[i][2]));document.getElementById('gamesBtn')?.remove()});
})();
