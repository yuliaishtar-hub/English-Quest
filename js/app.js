const IMG = "https://yuliaishtar-hub.github.io/inglish-adventure/";

const zones = [
  {key:"family",icon:"👨‍👩‍👧",title:"Family House",sub:"Family & people",image:IMG+"mum dad.jpg"},
  {key:"school",icon:"🏫",title:"School",sub:"School things & actions",image:IMG+"School bag.jpg"},
  {key:"animals",icon:"🐾",title:"Pet World",sub:"Animals & speaking",image:IMG+"monkey.jpg"},
  {key:"colours",icon:"🎨",title:"Colour Castle",sub:"Colours",image:null},
  {key:"food",icon:"🍕",title:"Yummy Café",sub:"Food & drinks",image:IMG+"Pizza.jpg"},
  {key:"seasons",icon:"🌦️",title:"Weather Park",sub:"Seasons",image:null},
  {key:"toys",icon:"🧸",title:"Toy Town",sub:"Toys",image:null},
  {key:"home",icon:"🏡",title:"My Home",sub:"Rooms & things",image:IMG+"bedroom.jpg"},
  {key:"boss",icon:"👑",title:"Boss Castle",sub:"Big conversation",image:IMG+"Lili green.jpg"}
];

const q = (question,image,options,correctIndex) => ({question,image,options,correctIndex});

const levels = {
  family:{name:"👨‍👩‍👧 Family House",type:"story",scenes:[
    {text:"Hello! I'm Lily!",image:IMG+"Lili.jpg"},
    {text:"I have a mummy. Her name is Anna.",image:IMG+"mummy.jpg"},
    {text:"I have a daddy. His name is Tom.",image:IMG+"daddy.jpg"},
    {text:"I have a grandma and a grandpa.",image:IMG+"grandmagrandpa.jpg"},
    {text:"I have a sister. Her name is Mia.",image:IMG+"Lilissisterbig.jpg"},
    {text:"I love my family!",image:IMG+"Lili.jpg"},
    {text:"I go to school every day!",image:IMG+"Lili.jpg"},
    {text:"Let's play together!",image:IMG+"Lili.jpg"}
  ]},
  school:{name:"🏫 School",questions:[
    q("What is it?",IMG+"pen.jpg",["It's a pen.","It's a ruler.","It's an eraser."],0),
    q("What is it?",IMG+"pencil.jpg",["It's a pencil.","It's a ruler.","It's a pen."],0),
    q("What is it?",IMG+"ruler.jpg",["It's a pencil.","It's a ruler.","It's a pen."],1),
    q("What is it?",IMG+"Eraser.jpg",["It's a ruler.","It's a pen.","It's an eraser."],2),
    q("What is it?",IMG+"School bag.jpg",["It's a school bag.","It's a pen.","It's a ruler."],0),
    q("What is it?",IMG+"book.jpg",["It's a book.","It's a pencil case.","It's a school bag."],0),
    q("What is it?",IMG+"pencil case.jpg",["It's a ruler.","It's a pencil case.","It's a book."],1)
  ]},
  animals:{name:"🐾 Pet World",questions:[
    q("What is it?",IMG+"monkey.jpg",["It's a chimp.","It's a fish.","It's a bird."],0),
    q("What is it?",IMG+"fish.jpg",["It's a mouse.","It's a frog.","It's a fish."],2),
    q("What is it?",IMG+"bird.jpg",["It's a bird.","It's a chimp.","It's a mouse."],0),
    q("What is it?",IMG+"mouse.jpg",["It's a fish.","It's a mouse.","It's a frog."],1),
    q("What is it?",IMG+"frog.jpg",["It's a frog.","It's a bird.","It's a chimp."],0)
  ]},
  colours:{name:"🎨 Colour Castle",questions:[
    q("What colour is it?","🔴",["It's red.","It's blue.","It's white."],0),
    q("What colour is it?","🔵",["It's yellow.","It's black.","It's blue."],2),
    q("What colour is it?","🟡",["It's yellow.","It's brown.","It's orange."],0),
    q("What colour is it?","⚫",["It's white.","It's black.","It's red."],1),
    q("What colour is it?","🟢",["It's green.","It's yellow.","It's red."],0),
    q("What colour is it?","⚪",["It's white.","It's blue.","It's black."],0),
    q("What colour is it?","🟤",["It's brown.","It's pink.","It's red."],0),
    q("What colour is it?","🌸",["It's pink.","It's green.","It's blue."],0)
  ]},
  food:{name:"🍕 Yummy Café",questions:[
    q("What is it?",IMG+"Apple.jpg",["It's an apple.","It's a pizza.","It's a burger."],0),
    q("What is it?",IMG+"Burger.jpg",["It's an apple.","It's a burger.","It's a sandwich."],1),
    q("What is it?",IMG+"Chips.jpg",["It's a pizza.","It's a burger.","It's chips."],2),
    q("What is it?",IMG+"Chocolate cake.jpg",["It's a chocolate cake.","It's an apple.","It's ice cream."],0),
    q("What is it?",IMG+"Ice cream.jpg",["It's a burger.","It's ice cream.","It's a sandwich."],1),
    q("What is it?",IMG+"Milk.jpg",["It's milk.","It's pizza.","It's chips."],0),
    q("What is it?",IMG+"Orange juice.jpg",["It's orange juice.","It's milk.","It's water."],0),
    q("What is it?",IMG+"Pizza.jpg",["It's pizza.","It's an apple.","It's a burger."],0),
    q("What is it?",IMG+"Sandwich.jpg",["It's a sandwich.","It's an apple.","It's chips."],0)
  ]},
  seasons:{name:"🌦️ Weather Park",questions:[
    q("What season is it?","❄️",["It's winter.","It's summer.","It's spring."],0),
    q("What season is it?","🌸",["It's autumn.","It's spring.","It's winter."],1),
    q("What season is it?","☀️",["It's winter.","It's spring.","It's summer."],2),
    q("What season is it?","🍂",["It's autumn.","It's winter.","It's summer."],0)
  ]},
  toys:{name:"🧸 Toy Town",questions:[
    q("What is it?","🧸",["It's a teddy bear.","It's a doll.","It's a ball."],0),
    q("What is it?","🪀",["It's a yoyo.","It's a puppet.","It's a toy soldier."],0),
    q("What is it?","⚽",["It's a ball.","It's a teddy bear.","It's a doll."],0),
    q("What is it?","🪆",["It's a puppet.","It's a yoyo.","It's a ball."],0)
  ]},
  home:{name:"🏡 My Home",questions:[
    q("What is it?","🪑",["It's a chair.","It's a table.","It's a shelf."],0),
    q("What room is it?",IMG+"bedroom.jpg",["It's a kitchen.","It's a bedroom.","It's a bathroom."],1),
    q("What room is it?",IMG+"kitchen.jpg",["It's a kitchen.","It's a living room.","It's a bedroom."],0),
    q("What room is it?",IMG+"bathroom.jpg",["It's a bedroom.","It's a bathroom.","It's a kitchen."],1)
  ]},
  boss:{name:"👑 Boss Castle",questions:[
    q("Who is she?",IMG+"mummy.jpg",["She's my mummy.","She's my sister.","She's my grandma."],0),
    q("Who is he?",IMG+"daddy.jpg",["He's my brother.","He's my daddy.","He's my grandpa."],1),
    q("What is it?",IMG+"Apple.jpg",["It's an apple.","It's a pizza.","It's a burger."],0),
    q("What is it?",IMG+"School bag.jpg",["It's a school bag.","It's a pen.","It's a ruler."],0)
  ]}
};

let state = loadState();
let currentKey = "";
let currentIndex = 0;
let answered = false;
let storyMode = false;
let lilyVoice = null;
let levelStartXP = 0;
let levelStartGems = 0;

function loadState(){
  try{
    const saved = JSON.parse(localStorage.getItem("english_quest_v2") || "null");
    if(saved && typeof saved === "object") return saved;
  }catch(e){}
  return {xp:0,gems:0,completed:[],unlocked:["family"]};
}

function save(){
  localStorage.setItem("english_quest_v2",JSON.stringify(state));
  updateStats();
}

function updateStats(){
  ["playerXP","mapXP","lessonXP"].forEach(id=>{
    const el=document.getElementById(id); if(el) el.textContent=state.xp;
  });
  ["playerGems","mapGems","lessonGems"].forEach(id=>{
    const el=document.getElementById(id); if(el) el.textContent=state.gems;
  });
}

function show(id){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  const target=document.getElementById(id);
  if(target) target.classList.add("active");
  window.scrollTo(0,0);
}

function goHome(){show("homeScreen");updateStats();}
function showMap(){renderMap();updateStats();show("mapScreen");}

function renderMap(){
  const grid=document.getElementById("worldMap");
  if(!grid) return;
  grid.innerHTML="";
  zones.forEach((z,i)=>{
    const unlocked=state.unlocked.includes(z.key);
    const done=state.completed.includes(z.key);
    const card=document.createElement("button");
    card.type="button";
    card.className="world-card-item"+(unlocked?"":" locked");
    card.innerHTML=`
      <div class="world-card-top">
        <div class="world-icon">${z.icon}</div>
        ${unlocked?"":'<div class="lock">🔒</div>'}
      </div>
      <div class="world-name">${z.title} ${done?"✓":""}</div>
      <div class="world-description">${z.sub}</div>`;
    if(unlocked) card.addEventListener("click",()=>startLevel(z.key));
    grid.appendChild(card);
  });
}

function startLevel(key){
  currentKey=key;
  currentIndex=0;
  answered=false;
  storyMode=levels[key].type==="story";
  levelStartXP=state.xp;
  levelStartGems=state.gems;
  document.getElementById("lessonTitle").textContent=levels[key].name;
  show("lessonScreen");
  renderLesson();
}

function renderLesson(){
  const data=levels[currentKey];
  const total=storyMode?data.scenes.length:data.questions.length;
  document.getElementById("lessonCounter").textContent=`${currentIndex+1} / ${total}`;
  document.getElementById("progressBar").style.width=((currentIndex/total)*100)+"%";
  const box=document.getElementById("lessonContent");
  if(storyMode){renderStory(box,data.scenes[currentIndex]);return;}
  renderQuestion(box,data.questions[currentIndex]);
}

function renderQuestion(box,item){
  answered=false;
  const image=typeof item.image==="string" && item.image.startsWith("http")
    ? `<img class="big-image" src="${item.image}" alt="Learning picture">`
    : `<div class="big-image emoji-image">${item.image}</div>`;
  box.innerHTML=`
    ${image}
    <div class="question">${item.question}</div>
    <button id="listenQuestion" class="listen-button" type="button">🔊 Listen</button>
    <div id="answers" class="answer-grid"></div>
    <div id="feedback" class="feedback"></div>
    <div class="lesson-actions">
      <button id="speakButton" class="speak-button" type="button" style="display:none">🎤 Say it!</button>
      <button id="nextButton" class="next-button" type="button" style="display:none">Next ➡️</button>
    </div>`;

  document.getElementById("listenQuestion").addEventListener("click",()=>speak(item.question));
  document.getElementById("speakButton").addEventListener("click",listenAnswer);
  document.getElementById("nextButton").addEventListener("click",nextItem);

  const answers=document.getElementById("answers");
  item.options.forEach((text,i)=>{
    const btn=document.createElement("button");
    btn.type="button";
    btn.className="answer-button";
    btn.textContent=text;
    btn.addEventListener("click",()=>selectAnswer(i,btn));
    answers.appendChild(btn);
  });
}

function renderStory(box,scene){
  box.innerHTML=`
    <div class="story">
      <img src="${scene.image}" alt="Lily story">
      <div>
        <div class="story-step">LILY'S STORY • SCENE ${currentIndex+1}</div>
        <div class="story-text">${scene.text}</div>
        <div class="lesson-actions">
          <button id="storyListen" class="listen-button" type="button">🔊 Listen</button>
          <button id="storyNext" class="next-button" type="button">${currentIndex===levels[currentKey].scenes.length-1?"Finish story":"Next ➡️"}</button>
        </div>
      </div>
    </div>`;
  document.getElementById("storyListen").addEventListener("click",()=>speak(scene.text,true));
  document.getElementById("storyNext").addEventListener("click",nextItem);
}

function selectAnswer(index,btn){
  if(answered) return;
  const item=levels[currentKey].questions[currentIndex];
  if(index===item.correctIndex){
    answered=true;
    btn.classList.add("correct");
    document.querySelectorAll(".answer-button").forEach(b=>b.disabled=true);
    state.xp+=10;
    state.gems+=1;
    save();
    const feedback=document.getElementById("feedback");
    feedback.textContent="Great! Now say it aloud! +10 XP ⭐";
    feedback.className="feedback success";
    document.getElementById("speakButton").style.display="inline-block";
    document.getElementById("nextButton").style.display="inline-block";
    speak(item.options[item.correctIndex],true);
  }else{
    btn.classList.add("wrong");
    btn.disabled=true;
    const feedback=document.getElementById("feedback");
    feedback.textContent="Oops! Try again!";
    feedback.className="feedback error";
    speak(item.options[item.correctIndex],true);
  }
}

function nextItem(){
  const total=storyMode?levels[currentKey].scenes.length:levels[currentKey].questions.length;
  currentIndex++;
  if(currentIndex>=total){finishLevel();return;}
  renderLesson();
}

function finishLevel(){
  if(!state.completed.includes(currentKey)) state.completed.push(currentKey);
  const pos=zones.findIndex(z=>z.key===currentKey);
  const next=zones[pos+1];
  if(next && !state.unlocked.includes(next.key)) state.unlocked.push(next.key);
  save();
  const earnedXP=state.xp-levelStartXP;
  const earnedGems=state.gems-levelStartGems;
  document.getElementById("rewardTitle").textContent=levels[currentKey].name+" complete!";
  document.getElementById("rewardText").textContent=next
    ? `Amazing! You earned ${earnedXP} XP and ${earnedGems} gem${earnedGems===1?"":"s"}. 🔓 ${next.title} is now unlocked!`
    : `Amazing! You earned ${earnedXP} XP and ${earnedGems} gems. You reached the end of this adventure!`;
  document.getElementById("rewardXP").textContent=`+${earnedXP} XP`;
  document.getElementById("rewardGems").textContent=`+${earnedGems}`;
  show("rewardScreen");
  speak("Well done!",true);
}

function speak(text,slow=false){
  if(!("speechSynthesis" in window)) return;
  speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(text);
  u.lang="en-US";
  u.rate=slow?0.76:0.9;
  u.pitch=1.08;
  if(lilyVoice) u.voice=lilyVoice;
  speechSynthesis.speak(u);
}

function setupVoice(){
  if(!("speechSynthesis" in window)) return;
  const choose=()=>{
    const voices=speechSynthesis.getVoices();
    lilyVoice=voices.find(v=>/Google US English|Microsoft Zira|Samantha|Female/i.test(v.name) && /^en-US/i.test(v.lang))
      || voices.find(v=>/^en-US/i.test(v.lang))
      || voices.find(v=>/^en-GB/i.test(v.lang))
      || voices[0]
      || null;
  };
  choose();
  speechSynthesis.onvoiceschanged=choose;
}

function listenAnswer(){
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SR){
    const feedback=document.getElementById("feedback");
    feedback.textContent="Speech recognition is not available here. Use Listen and repeat aloud.";
    feedback.className="feedback info";
    return;
  }
  const item=levels[currentKey].questions[currentIndex];
  const mic=document.getElementById("speakButton");
  mic.textContent="🎤 Listening...";
  const r=new SR();
  r.lang="en-US";
  r.interimResults=false;
  r.maxAlternatives=3;
  r.onresult=e=>{
    const heard=normalize(e.results[0][0].transcript);
    const correct=normalize(item.options[item.correctIndex]);
    const words=correct.split(/\s+/).filter(w=>w.length>2);
    const hits=words.filter(w=>heard.includes(w)).length;
    mic.textContent="🎤 Say it!";
    const feedback=document.getElementById("feedback");
    if(heard===correct || heard.includes(correct) || hits>=Math.max(1,Math.ceil(words.length*.65))){
      feedback.textContent="Excellent speaking! 🎉";
      feedback.className="feedback success";
    }else{
      feedback.textContent="Good try! Listen once more and repeat.";
      feedback.className="feedback info";
      speak(item.options[item.correctIndex],true);
    }
  };
  r.onerror=()=>{mic.textContent="🎤 Say it!";};
  try{r.start();}catch(e){mic.textContent="🎤 Say it!";}
}

function normalize(s){return String(s).toLowerCase().replace(/[.,!?;:]/g,"").replace(/\s+/g," ").trim();}

function showToast(message){
  const toast=document.getElementById("toast");
  if(!toast) return;
  toast.textContent=message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer=setTimeout(()=>toast.classList.remove("show"),2200);
}

function init(){
  updateStats();
  setupVoice();
  document.getElementById("startQuest")?.addEventListener("click",showMap);
  document.getElementById("gamesBtn")?.addEventListener("click",()=>{
    showToast("🎮 Games are coming next — the adventure is ready!");
    speak("Games are coming next!");
  });
  document.getElementById("mapHome")?.addEventListener("click",goHome);
  document.getElementById("lessonBack")?.addEventListener("click",showMap);
  document.getElementById("rewardMap")?.addEventListener("click",showMap);
  document.getElementById("rewardHome")?.addEventListener("click",goHome);
}

document.addEventListener("DOMContentLoaded",init);
