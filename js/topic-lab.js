/* English Quest · Topic Lab
   Intro → visual rule → chant/song → mini-game → letter builder → bonus.
*/
(() => {
  const TOPICS = {
    tobe: {
      title:"TO BE · Волшебный хамелеон",
      subtitle:"Он меняет форму в зависимости от героя.",
      forms:[
        ["I","AM","I am happy."],["YOU","ARE","You are happy."],["HE","IS","He is happy."],
        ["SHE","IS","She is happy."],["IT","IS","It is happy."],["WE","ARE","We are happy."],
        ["THEY","ARE","They are happy."]
      ],
      rhyme:"I am, you are — clap, clap, clap!\nHe is, she is, it is — tap, tap, tap!\nWe are, they are — jump up high!\nAM · IS · ARE — now you know why!",
      game:[
        ["I","am"],["you","are"],["he","is"],["she","is"],["it","is"],["we","are"],["they","are"]
      ],
      words:["HAPPY","SCHOOL","PENCIL","FAMILY"]
    },
    todo: {
      title:"TO DO · Помощник-вопросик",
      subtitle:"DO дружит с I / you / we / they, а DOES — с he / she / it.",
      forms:[
        ["I","DO","Do I play?"],["YOU","DO","Do you play?"],["WE","DO","Do we play?"],["THEY","DO","Do they play?"],
        ["HE","DOES","Does he play?"],["SHE","DOES","Does she play?"],["IT","DOES","Does it play?"]
      ],
      rhyme:"I DO, you DO — let's go, go, go!\nWe DO, they DO — now you know!\nHE DOES, SHE DOES, IT DOES too —\nDO or DOES? I know what to do!",
      game:[
        ["I","do"],["you","do"],["we","do"],["they","do"],["he","does"],["she","does"],["it","does"]
      ],
      words:["DO","DOES","PLAY","LIKE"]
    },
    have: {
      title:"HAVE / HAS · Сундучок вещей",
      subtitle:"HAVE — с I / you / we / they. HAS — с he / she / it.",
      forms:[
        ["I","HAVE","I have a book."],["YOU","HAVE","You have a book."],["WE","HAVE","We have a book."],
        ["THEY","HAVE","They have a book."],["HE","HAS","He has a book."],["SHE","HAS","She has a book."],
        ["IT","HAS","It has a tail."]
      ],
      rhyme:"I have, you have — clap your hands!\nWe have, they have — lots of plans!\nHe has, she has, it has too —\nHAVE or HAS? Easy for you!",
      game:[
        ["I","have"],["you","have"],["we","have"],["they","have"],["he","has"],["she","has"],["it","has"]
      ],
      words:["HAVE","HAS","BOOK","BAG"]
    },
    has: {
      title:"HAS GOT · Сундучок сокровищ",
      subtitle:"Говорим, что у кого-то есть.",
      forms:[
        ["I","HAVE GOT","I have got a cat."],["YOU","HAVE GOT","You have got a cat."],["WE","HAVE GOT","We have got a cat."],
        ["THEY","HAVE GOT","They have got a cat."],["HE","HAS GOT","He has got a cat."],["SHE","HAS GOT","She has got a cat."],
        ["IT","HAS GOT","It has got four legs."]
      ],
      rhyme:"Have got, have got — I have got!\nYou have got — a treasure lot!\nHe has got, she has got, it has got —\nHAS for one, HAVE for a lot!",
      game:[
        ["I","have got"],["you","have got"],["we","have got"],["they","have got"],["he","has got"],["she","has got"],["it","has got"]
      ],
      words:["HAVE","HAS","GOT","CAT"]
    },
    plural: {
      title:"PLURAL · Клуб множества",
      subtitle:"Один предмет превращаем в много: cat → cats, box → boxes.",
      forms:[
        ["1 CAT","→","2 CATS"],["1 BOOK","→","2 BOOKS"],["1 BUS","→","2 BUSES"],
        ["1 BOX","→","2 BOXES"],["1 BABY","→","2 BABIES"],["1 CHILD","→","CHILDREN"]
      ],
      rhyme:"One cat, two cats — add an S!\nOne box, two boxes — ES!\nBaby changes Y to IES!\nAnd CHILD? CHILDREN — yes, yes, yes!",
      game:[
        ["cat","cats"],["book","books"],["box","boxes"],["bus","buses"],["baby","babies"],["child","children"]
      ],
      words:["CATS","BOXES","BABIES","CHILDREN"]
    },
    size: {
      title:"BIG · BIGGER · BIGGEST",
      subtitle:"Сравниваем: большой → больше → самый большой.",
      forms:[
        ["BIG","→","BIGGER"],["BIG","→","BIGGEST"],["SMALL","→","SMALLER"],["SMALL","→","SMALLEST"]
      ],
      rhyme:"Big, bigger, biggest — grow, grow, grow!\nSmall, smaller, smallest — down we go!\nOne, two, three — compare with me!",
      game:[["big","bigger"],["small","smaller"],["biggest","smallest"]],
      words:["BIG","BIGGER","BIGGEST","SMALL"]
    }
  };

  function speak(text){
    if(!("speechSynthesis" in window)) return;
    speechSynthesis.cancel();
    const u=new SpeechSynthesisUtterance(text);
    u.lang="en-US"; u.rate=.82; u.pitch=1.08; speechSynthesis.speak(u);
  }

  function openTopicLab(key){
    const data=TOPICS[key]||TOPICS.tobe;
    const screen=document.getElementById("topicLabScreen");
    if(!screen) return;
    document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
    screen.classList.add("active");
    render(data,key);
  }
  window.openTopicLab=openTopicLab;
  window.closeTopicLab=()=>{
    document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
    document.getElementById("homeScreen")?.classList.add("active");
    window.scrollTo(0,0);
  };

  function render(data,key){
    const root=document.getElementById("topicLabContent");
    root.innerHTML = `
      <div class="topic-lab-hero">
        <div><div class="eyebrow">УРОК-ПРИКЛЮЧЕНИЕ · ${key.toUpperCase()}</div>
        <h1>${data.title}</h1><p>${data.subtitle}</p></div>
        <button class="round-button" id="labSpeakIntro" type="button">🔊</button>
      </div>
      <section class="lab-section intro-section">
        <div class="lab-section-title"><span>1</span><div><b>Сначала поймём</b><small>Лили объясняет правило</small></div></div>
        <div class="form-wheel" id="formWheel"></div>
      </section>
      <section class="lab-section">
        <div class="lab-section-title"><span>2</span><div><b>Запоминаем ритмом</b><small>Нажми ▶ и повторяй вместе с Лили</small></div></div>
        <div class="chant-card"><button class="chant-play" id="chantPlay">▶</button><div id="chantText">${data.rhyme.replace(/\n/g,"<br>")}</div></div>
      </section>
      <section class="lab-section">
        <div class="lab-section-title"><span>3</span><div><b>Собери правильную пару</b><small>Перетаскивай форму к герою или нажимай по очереди</small></div></div>
        <div class="match-board" id="matchBoard"></div>
      </section>
      <section class="lab-section">
        <div class="lab-section-title"><span>4</span><div><b>Собери слово по буквам</b><small>Каждая правильная буква даёт бонус ⭐</small></div></div>
        <div class="letter-game" id="letterGame"></div>
      </section>
    `;
    document.getElementById("labSpeakIntro").onclick=()=>speak(data.subtitle);
    document.getElementById("chantPlay").onclick=()=>speak(data.rhyme.replace(/\n/g," "));
    buildForms(data.forms);
    buildMatch(data.game);
    buildLetters(data.words);
  }

  function buildForms(forms){
    const el=document.getElementById("formWheel");
    el.innerHTML=forms.map((f,i)=>`
      <button class="form-node" type="button" data-say="${f[2]}">
        <span class="form-person">${f[0]}</span><strong>${f[1]}</strong><span class="form-example">${f[2]}</span>
      </button>`).join("");
    el.querySelectorAll(".form-node").forEach(b=>b.onclick=()=>{
      el.querySelectorAll(".form-node").forEach(x=>x.classList.remove("selected"));
      b.classList.add("selected"); speak(b.dataset.say);
    });
  }

  function buildMatch(pairs){
    const el=document.getElementById("matchBoard");
    const people=pairs.map((p,i)=>({id:i,text:p[0]}));
    const forms=pairs.map((p,i)=>({id:i,text:p[1]})).sort(()=>Math.random()-.5);
    el.innerHTML=`
      <div class="match-column" id="matchPeople">${people.map(p=>`<button class="match-chip person-chip" data-id="${p.id}" type="button">${p.text}</button>`).join("")}</div>
      <div class="match-arrows">↔</div>
      <div class="match-column" id="matchForms">${forms.map(f=>`<button class="match-chip form-chip" draggable="true" data-id="${f.id}" type="button">${f.text}</button>`).join("")}</div>
      <div class="match-score" id="matchScore">0 / ${pairs.length}</div>`;
    let selected=null,score=0;
    el.querySelectorAll(".person-chip").forEach(b=>b.onclick=()=>{selected=b.dataset.id;el.querySelectorAll(".person-chip").forEach(x=>x.classList.remove("picked"));b.classList.add("picked");});
    el.querySelectorAll(".form-chip").forEach(b=>{
      b.addEventListener("click",()=>{
        if(selected===null)return;
        const ok=selected===b.dataset.id;
        if(ok){score++;b.classList.add("match-ok");const p=el.querySelector(`.person-chip[data-id="${selected}"]`);p.classList.add("match-ok");p.disabled=true;b.disabled=true;speak(b.textContent);window.__questBonus?.(5);}
        else{b.classList.add("match-no");setTimeout(()=>b.classList.remove("match-no"),450);speak("Try again");}
        document.getElementById("matchScore").textContent=`${score} / ${pairs.length}`;
      });
    });
  }

  function buildLetters(words){
    const el=document.getElementById("letterGame");
    let index=0,score=0,typed="";
    const draw=()=>{
      if(index>=words.length){
        el.innerHTML=`<div class="letter-finished">🏆 Отлично! Ты собрала все слова!<br><b>+${score} ⭐</b></div>`;
        return;
      }
      const target=words[index], letters=[...target].sort(()=>Math.random()-.5);
      typed="";
      el.innerHTML=`
        <div class="target-word">Собери: <b>${target.replace(/./g,"_ ")}</b></div>
        <div class="letter-slot" id="letterSlot">Нажимай буквы по порядку</div>
        <div class="letter-bank">${letters.map((l,i)=>`<button class="letter-key" data-letter="${l}" data-i="${i}" type="button">${l}</button>`).join("")}</div>
        <button class="secondary-button small-button" id="letterReset" type="button">↺ Заново</button>
        <div class="feedback info" id="letterFeedback">Слово ${index+1} из ${words.length}</div>`;
      const update=()=>document.getElementById("letterSlot").textContent=typed||"Нажимай буквы по порядку";
      el.querySelectorAll(".letter-key").forEach(b=>b.onclick=()=>{
        const want=target[typed.length];
        if(b.dataset.letter===want){
          typed+=b.dataset.letter;b.disabled=true;score++;window.__questBonus?.(3);update();
          if(typed===target){speak(target);setTimeout(()=>{index++;draw();},500);}
        }else{
          const f=document.getElementById("letterFeedback");f.textContent="Почти! Посмотри на следующую букву 🔎";f.className="feedback error";speak(b.dataset.letter);
        }
      });
      document.getElementById("letterReset").onclick=draw;
    };
    draw();
  }
})();