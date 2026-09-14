const stages = [
  ["🔤", "Vocabulary"],
  ["🔊", "Listen"],
  ["📖", "Read"],
  ["🧩", "Grammar"],
  ["💬", "Speak"],
  ["🗺️", "Quest"]
];

const wordTranslations = {
  choose:"выбери", the:"этот / эта / это", colour:"цвет", color:"цвет", blue:"синий / голубой", circle:"круг", ten:"десять",
  correct:"правильный", sentence:"предложение", my:"мой / моя", name:"имя", is:"есть / является", lily:"Лили",
  school:"школа", item:"предмет", pencil:"карандаш", apple:"яблоко", dog:"собака", eraser:"ластик",
  an:"неопределённый артикль перед гласным звуком", a:"неопределённый артикль", what:"что / какой", this:"это / этот",
  number:"число", thirteen:"тринадцать", three:"три", thirty:"тридцать", family:"семья", moments:"моменты",
  i:"я", have:"иметь / у меня есть", got:"получил / есть", sister:"сестра", has:"имеет", brother:"брат", you:"ты / вы",
  plural:"множественное число", sisters:"сёстры", likes:"нравится", things:"вещи", like:"нравиться / любить",
  apples:"яблоки", am:"есть / являюсь", don’t:"не", "don't":"не", milk:"молоко", do:"делать / вспомогательный глагол",
  pizza:"пицца", are:"есть / являетесь", toys:"игрушки", come:"приходи / приходить", in:"в / внутри", play:"играть",
  possession:"принадлежность", box:"коробка", teddy:"плюшевый мишка", bears:"медведи", two:"два",
  animals:"животные", furry:"пушистый", can:"мочь / уметь", run:"бегать", to:"частица перед глаголом",
  fish:"рыба", can’t:"не может", "can't":"не может", walk:"ходить", ear:"ухо", home:"дом", sweet:"милый / сладкий",
  cat:"кошка", on:"на", chair:"стул", where:"где", "where’s":"где находится", "where's":"где находится", boxes:"коробки",
  day:"день", off:"выходной", he:"он", playing:"играет", park:"парк", doing:"делаешь / делаете", drawing:"рисую",
  daybyday:"день за днём", get:"получать / вставать", up:"вверх", at:"в / в указанное время", seven:"семь", time:"время",
  it:"это", daily:"ежедневный", action:"действие", brush:"чистить", teeth:"зубы", now:"сейчас", know:"знать",
  little:"маленький", room:"комната", kitchen:"кухня", table:"стол", monday:"понедельник",
  "betsy’s":"Бетси", "betsy's":"Бетси", "it’s":"это", "it's":"это", "he’s":"он", "he's":"он"
};

function escapeHtml(text){
  return String(text).replace(/[&<>\"]/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[ch]));
}

// Делим текст на слова и делаем КАЖДОЕ известное слово интерактивным.
// Перевод показывается при наведении и по нажатию — удобно и для компьютера, и для планшета.
function translatedText(text){
  const safe = escapeHtml(text);
  return safe.replace(/[A-Za-z]+(?:[’'][A-Za-z]+)?/g, word => {
    const key = word.toLowerCase();
    const translation = wordTranslations[key];
    if(!translation) return `<span class="translate-word translate-unknown">${word}</span>`;
    return `<span class="translate-word" tabindex="0" data-translation="${escapeHtml(translation)}" title="${escapeHtml(translation)}">${word}</span>`;
  });
}

function installTranslationHelp(){
  if(window.__translationHelpInstalled) return;
  window.__translationHelpInstalled = true;
  const tip = document.createElement("div");
  tip.id = "translationTip";
  tip.className = "translation-tip";
  document.body.appendChild(tip);

  function show(el){
    const text = el?.dataset?.translation;
    if(!text) return;
    tip.textContent = text;
    tip.classList.add("show");
    const r = el.getBoundingClientRect();
    const left = Math.max(8, Math.min(window.innerWidth - tip.offsetWidth - 8, r.left + r.width/2 - tip.offsetWidth/2));
    tip.style.left = `${left}px`;
    tip.style.top = `${Math.max(8, r.top - tip.offsetHeight - 8)}px`;
  }
  function hide(){ tip.classList.remove("show"); }

  document.addEventListener("mouseover", e => {
    const el = e.target.closest?.(".translate-word[data-translation]");
    if(el) show(el);
  });
  document.addEventListener("mouseout", e => {
    const el = e.target.closest?.(".translate-word[data-translation]");
    if(el && !el.contains(e.relatedTarget)) hide();
  });
  document.addEventListener("focusin", e => {
    const el = e.target.closest?.(".translate-word[data-translation]");
    if(el) show(el);
  });
  document.addEventListener("focusout", e => {
    if(e.target.closest?.(".translate-word[data-translation]")) hide();
  });
  document.addEventListener("click", e => {
    const el = e.target.closest?.(".translate-word[data-translation]");
    if(el) show(el);
  });
  window.addEventListener("scroll", hide, {passive:true});
}

const checks = {
  starter: [
    ["Choose the colour.", ["blue", "circle", "ten"], 0],
    ["Choose the correct sentence.", ["My name is Lily.", "My Lily is name.", "Lily my name is."], 0],
    ["Choose the school item.", ["pencil", "apple", "dog"], 0]
  ],
  school: [
    ["Choose the correct sentence.", ["It’s an eraser.", "It’s a eraser.", "It eraser."], 0],
    ["Choose the correct question.", ["What’s this?", "This what?", "What this is?"], 0],
    ["Choose the number.", ["thirteen", "three", "thirty"], 0]
  ],
  family: [
    ["Choose the correct sentence.", ["I have got a sister.", "I has got a sister.", "I got have a sister."], 0],
    ["Choose the question.", ["Have you got a brother?", "You have got a brother?", "Got you a brother?"], 0],
    ["Choose the plural.", ["sisters", "sisteres", "sister"], 0]
  ],
  likes: [
    ["Choose the correct sentence.", ["I like apples.", "I am apples.", "I like apple am."], 0],
    ["Choose the negative.", ["I don’t like milk.", "I doesn’t like milk.", "I not like milk."], 0],
    ["Choose the question.", ["Do you like pizza?", "Are you like pizza?", "You like do pizza?"], 0]
  ],
  toys: [
    ["Choose the correct sentence.", ["This is Betsy’s room.", "This Betsy room is.", "Betsy’s is room this."], 0],
    ["Choose the preposition.", ["in the box", "on Monday box", "at the box"], 0],
    ["Choose the plural.", ["two teddy bears", "two teddy bear", "a teddy bears"], 0]
  ],
  animals: [
    ["Choose the correct sentence.", ["A dog can run.", "A dog can to run.", "A dog can runs."], 0],
    ["Choose the negative.", ["A fish can’t walk.", "A fish doesn’t can walk.", "A fish can’t walks."], 0],
    ["Choose the body part.", ["ear", "kitchen", "table"], 0]
  ],
  home: [
    ["Choose the correct sentence.", ["The cat is on the chair.", "The cat on is chair.", "The cat are on the chair."], 0],
    ["Choose the question.", ["Where’s the cat?", "Where the cat?", "The cat where is?"], 0],
    ["Choose the plural.", ["boxes", "boxs", "boxies"], 0]
  ],
  dayoff: [
    ["Choose the correct sentence.", ["He is playing in the park.", "He playing is park.", "He is play in the park."], 0],
    ["Choose the question.", ["What are you doing?", "What you are doing?", "What doing you are?"], 0],
    ["Choose the correct form.", ["I am drawing.", "I drawing.", "I am draw."], 0]
  ],
  daybyday: [
    ["Choose the correct sentence.", ["I get up at seven.", "I get at seven up.", "I gets up at seven."], 0],
    ["Choose the question.", ["What time is it?", "What is time it?", "Time what is it?"], 0],
    ["Choose the daily action.", ["brush my teeth", "brush my table", "brush my clock"], 0]
  ]
};

let currentFlowKey = "";
let finalMode = false;
let finalScore = 0;
let finalIndex = 0;

function keyFromTitle(){
  const title = (document.getElementById("lessonTitle")?.textContent || "").toLowerCase();
  const map = [
    ["starter", "starter"], ["school days", "school"], ["family moments", "family"],
    ["all the things", "likes"], ["come in and play", "toys"], ["furry friends", "animals"],
    ["home, sweet home", "home"], ["a day off", "dayoff"], ["day by day", "daybyday"]
  ];
  return map.find(([needle]) => title.includes(needle))?.[1] || "starter";
}

function updateStageBar(counterText){
  const m = String(counterText).match(/(\d+)\s*\/\s*(\d+)/);
  if(!m || finalMode) return;
  const n = Number(m[1]);
  const stageIndex = Math.min(stages.length - 1, n - 1);
  const labels = document.getElementById("lessonStageBar");
  if(!labels) return;
  labels.innerHTML = stages.map((s,i)=>`<span class="flow-step ${i===stageIndex?"active":""} ${i<stageIndex?"done":""}"><b>${s[0]}</b>${s[1]}</span>`).join("");
}

function ensureStageBar(){
  const card = document.querySelector(".lesson-card");
  const content = document.getElementById("lessonContent");
  if(!card || !content) return;
  let bar = document.getElementById("lessonStageBar");
  if(!bar){
    bar = document.createElement("div");
    bar.id = "lessonStageBar";
    bar.className = "lesson-stage-bar";
    card.insertBefore(bar, content);
  }
  updateStageBar(document.getElementById("lessonCounter")?.textContent || "");
}

function showFinalCheck(){
  if(finalMode) return;
  finalMode = true;
  finalScore = 0;
  finalIndex = 0;
  document.getElementById("progressBar").style.width = "100%";
  document.getElementById("lessonCounter").textContent = "Now I Know · 1 / 3";
  const bar = document.getElementById("lessonStageBar");
  if(bar) bar.innerHTML = `<span class="flow-step done"><b>🔤</b>Vocabulary</span><span class="flow-step done"><b>🔊</b>Listen</span><span class="flow-step done"><b>📖</b>Read</span><span class="flow-step done"><b>🧩</b>Grammar</span><span class="flow-step done"><b>💬</b>Speak</span><span class="flow-step done"><b>🗺️</b>Quest</span><span class="flow-step active"><b>🏆</b>Now I Know</span>`;
  renderFinalQuestion();
}

function renderFinalQuestion(){
  const list = checks[currentFlowKey] || checks.starter;
  const item = list[finalIndex];
  const box = document.getElementById("lessonContent");
  box.innerHTML = `<div class="final-badge">🏆 NOW I KNOW</div><div class="lesson-kind">МИНИ-ПРОВЕРКА · ${finalIndex+1} / ${list.length}</div><div class="question">${translatedText(item[0])}</div><div id="finalAnswers" class="answer-grid"></div><div id="finalFeedback" class="feedback"></div>`;
  const answers = document.getElementById("finalAnswers");
  item[1].forEach((text,i)=>{
    const b=document.createElement("button");
    b.type="button"; b.className="answer-button"; b.innerHTML=translatedText(text);
    b.addEventListener("click",()=>answerFinal(i,b));
    answers.appendChild(b);
  });
}

function answerFinal(index, btn){
  const list = checks[currentFlowKey] || checks.starter;
  const item = list[finalIndex];
  document.querySelectorAll("#finalAnswers .answer-button").forEach(b=>b.disabled=true);
  if(index===item[2]){
    btn.classList.add("correct");
    finalScore++;
    document.getElementById("finalFeedback").textContent="Верно! ✓";
    document.getElementById("finalFeedback").className="feedback success";
  }else{
    btn.classList.add("wrong");
    document.getElementById("finalFeedback").textContent=`Правильный ответ: ${item[1][item[2]]}`;
    document.getElementById("finalFeedback").className="feedback error";
  }
  setTimeout(()=>{
    finalIndex++;
    if(finalIndex<list.length) renderFinalQuestion(); else finishFinalCheck();
  },650);
}

function finishFinalCheck(){
  const passed = finalScore >= 2;
  const raw = JSON.parse(localStorage.getItem("english_quest_v4") || "{}") || {};
  raw.xp = Number(raw.xp)||0; raw.gems = Number(raw.gems)||0; raw.completed = Array.isArray(raw.completed)?raw.completed:[];
  if(passed && !raw.completed.includes(currentFlowKey)) raw.completed.push(currentFlowKey);
  const xpGain = passed ? 50 : 15;
  const gemGain = passed ? 5 : 1;
  raw.xp += xpGain; raw.gems += gemGain;
  localStorage.setItem("english_quest_v4", JSON.stringify(raw));

  const rewardTitle=document.getElementById("rewardTitle");
  const rewardText=document.getElementById("rewardText");
  const rewardXP=document.getElementById("rewardXP");
  const rewardGems=document.getElementById("rewardGems");
  if(passed){
    rewardTitle.textContent="🏆 Now I Know!";
    rewardText.textContent=`Результат ${finalScore}/3. Глава закреплена — следующая глава открыта.`;
  }else{
    rewardTitle.textContent="🌱 Почти получилось!";
    rewardText.textContent=`Результат ${finalScore}/3. Повтори эту главу и попробуй мини-проверку ещё раз.`;
  }
  rewardXP.textContent=`+${xpGain} XP`;
  rewardGems.textContent=`+${gemGain}`;
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById("rewardScreen")?.classList.add("active");
  window.scrollTo(0,0);
}

function flowObserver(){
  installTranslationHelp();
  const counter=document.getElementById("lessonCounter");
  if(!counter) return;
  const obs=new MutationObserver(()=>{
    if(finalMode) return;
    currentFlowKey=keyFromTitle();
    ensureStageBar();
    updateStageBar(counter.textContent||"");
  });
  obs.observe(counter,{childList:true,characterData:true,subtree:true});
  const screenObs=new MutationObserver(()=>{
    const active=document.getElementById("lessonScreen")?.classList.contains("active");
    if(active){
      currentFlowKey=keyFromTitle();
      finalMode=false;
      installTranslationHelp();
      setTimeout(ensureStageBar,20);
    }
  });
  const screen=document.getElementById("lessonScreen");
  if(screen) screenObs.observe(screen,{attributes:true,attributeFilter:["class"]});
}

// Back: всегда возвращает на карту. Не зависит от типа текущего задания.
function installBackButton(){
  const card = document.querySelector(".lesson-card");
  if(!card || document.getElementById("lessonBackButton")) return;
  const b = document.createElement("button");
  b.id = "lessonBackButton";
  b.type = "button";
  b.className = "lesson-back-button";
  b.textContent = "← Back";
  b.addEventListener("click", () => {
    finalMode = false;
    document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
    document.getElementById("mapScreen")?.classList.add("active");
    window.scrollTo(0,0);
  });
  card.insertBefore(b, card.firstChild);
}

function installNextFix(){
  if(window.__nextFixInstalled) return;
  window.__nextFixInstalled = true;
  document.addEventListener("click", event=>{
    if(event.target?.id !== "nextButton" || finalMode) return;
    const counter = document.getElementById("lessonCounter")?.textContent || "";
    const m = counter.match(/(\d+)\s*\/\s*(\d+)/);
    if(m && Number(m[1]) >= Number(m[2])){
      event.preventDefault();
      event.stopImmediatePropagation();
      showFinalCheck();
    }
  }, true);
}

document.addEventListener("DOMContentLoaded",()=>{
  flowObserver();
  installBackButton();
  installNextFix();
});
