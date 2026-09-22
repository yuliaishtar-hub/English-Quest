(() => {
  const tutors = [
    {name:"Нахида",icon:"🌿",focus:"Чтение и смысл",say:"Let's read together! Read the sentence and find the key word.",ru:"Читаем маленькими шагами: сначала ключевое слово, потом вся фраза."},
    {name:"Аль-Хайтам",icon:"📚",focus:"Грамматика",say:"Look at the structure. One small rule can unlock the whole sentence.",ru:"Смотри на структуру предложения. Одно маленькое правило помогает понять всё предложение."},
    {name:"Кли",icon:"🔥",focus:"Слова и память",say:"New word! Say it, hear it, use it in a sentence!",ru:"Новое слово! Произнеси его, услышь и используй в предложении."},
    {name:"Паймон",icon:"⭐",focus:"Слушание",say:"Listen carefully! Then choose the answer.",ru:"Слушай внимательно, а потом выбери ответ."},
    {name:"Ноэлль",icon:"🛡️",focus:"Тренировка",say:"One more try. Practice makes you stronger!",ru:"Ещё одна попытка. Тренировка делает тебя сильнее!"},
    {name:"Фурина",icon:"💧",focus:"Говорение",say:"Your turn! Say the sentence aloud with confidence.",ru:"Теперь твоя очередь! Произнеси фразу вслух уверенно."}
  ];
  function styles(){
    if(document.getElementById("tutorStyles"))return;
    const s=document.createElement("style");s.id="tutorStyles";s.textContent=`
      .tutor-open{display:inline-flex;align-items:center;gap:8px;border:0;border-radius:14px;padding:11px 14px;background:#fff2d9;color:#6c4a13;font-weight:900;cursor:pointer;box-shadow:0 6px 18px rgba(0,0,0,.08)}
      .tutor-overlay{position:fixed;inset:0;background:rgba(24,28,48,.55);display:none;align-items:center;justify-content:center;padding:18px;z-index:5200}
      .tutor-overlay.show{display:flex}.tutor-panel{width:min(920px,100%);max-height:88vh;overflow:auto;background:#fff;border-radius:28px;padding:24px;box-shadow:0 25px 80px rgba(0,0,0,.3)}
      .tutor-head{display:flex;justify-content:space-between;gap:12px;align-items:center;margin-bottom:18px}.tutor-head h2{margin:0}.tutor-close{border:0;background:#eef0f7;border-radius:12px;padding:10px 13px;font-weight:900;cursor:pointer}
      .tutor-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.tutor-card{border:2px solid #eceefa;border-radius:20px;padding:16px;background:#fafbff;cursor:pointer;transition:.18s;text-align:left}.tutor-card:hover,.tutor-card.active{transform:translateY(-2px);border-color:#9b8cff;background:#f4f1ff}.tutor-icon{font-size:42px}.tutor-name{font-size:19px;font-weight:900;margin-top:7px}.tutor-focus{font-size:13px;color:#6d7284;margin-top:3px}.tutor-voice{margin-top:12px;padding-top:10px;border-top:1px solid #e8e9f1;font-size:13px;line-height:1.4}.tutor-note{margin-top:18px;padding:15px;border-radius:16px;background:#f3f7ff}.tutor-note b{display:block;margin-bottom:5px}@media(max-width:700px){.tutor-grid{grid-template-columns:1fr 1fr}}@media(max-width:450px){.tutor-grid{grid-template-columns:1fr}}
    `;document.head.appendChild(s);
  }
  function speak(t){if(!window.speechSynthesis)return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang="en-US";u.rate=.8;u.pitch=1.05;speechSynthesis.speak(u)}
  function open(){
    styles();let ov=document.getElementById("tutorOverlay");
    if(!ov){
      ov=document.createElement("div");ov.id="tutorOverlay";ov.className="tutor-overlay";
      ov.innerHTML=`<div class="tutor-panel"><div class="tutor-head"><div><div class="eyebrow">ФАН-РЕПЕТИТОРЫ</div><h2>✨ Выбери помощника</h2></div><button class="tutor-close" type="button">✕ Закрыть</button></div><div class="tutor-grid">${tutors.map((t,i)=>`<button class="tutor-card" type="button" data-i="${i}"><div class="tutor-icon">${t.icon}</div><div class="tutor-name">${t.name}</div><div class="tutor-focus">${t.focus}</div><div class="tutor-voice">🔊 ${t.say}</div></button>`).join("")}</div><div class="tutor-note" id="tutorNote"><b>Режим репетитора</b>Выбери персонажа — он станет подсказчиком в этой сессии.</div></div>`;
      document.body.appendChild(ov);
      ov.addEventListener("click",e=>{if(e.target===ov||e.target.closest(".tutor-close"))ov.classList.remove("show")});
      ov.querySelectorAll(".tutor-card").forEach(b=>b.addEventListener("click",()=>{
        const t=tutors[Number(b.dataset.i)];
        ov.querySelectorAll(".tutor-card").forEach(x=>x.classList.remove("active"));b.classList.add("active");
        localStorage.setItem("eq_tutor",t.name);
        const note=ov.querySelector("#tutorNote");note.innerHTML="<b>"+t.icon+" "+t.name+" теперь репетитор</b>"+t.ru;
        speak(t.say);
        window.__questTutor=t;
      }));
    }
    ov.classList.add("show");
  }
  document.addEventListener("DOMContentLoaded",()=>{
    const panel=document.querySelector(".hero-actions"); if(!panel)return;
    const b=document.createElement("button");b.type="button";b.className="tutor-open";b.textContent="✨ Репетиторы Genshin Impact";b.onclick=open;panel.appendChild(b);
    const saved=localStorage.getItem("eq_tutor"); if(saved){const t=tutors.find(x=>x.name===saved);if(t)window.__questTutor=t;}
  });
  window.openGenshinTutors=open;
})();