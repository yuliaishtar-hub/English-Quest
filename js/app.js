 (cd "$(git rev-parse --show-toplevel)" && printf '%s' 'diff --git a/js/app.js b/js/app.js
index 4e7751be39716d5922d369efad30a4342938e316..212ff653586928e93a14c6aed89f23f6d824c105 100644
--- a/js/app.js
+++ b/js/app.js
@@ -1,360 +1,54 @@
 const IMG = "https://yuliaishtar-hub.github.io/inglish-adventure/";
 
 const zones = [
-  {key:"family",icon:"👨‍👩‍👧",title:"Family House",sub:"Family & people",image:IMG+"mum dad.jpg"},
-  {key:"school",icon:"🏫",title:"School",sub:"School things & actions",image:IMG+"School bag.jpg"},
-  {key:"animals",icon:"🐾",title:"Pet World",sub:"Animals & speaking",image:IMG+"monkey.jpg"},
-  {key:"colours",icon:"🎨",title:"Colour Castle",sub:"Colours",image:null},
-  {key:"food",icon:"🍕",title:"Yummy Café",sub:"Food & drinks",image:IMG+"Pizza.jpg"},
-  {key:"seasons",icon:"🌦️",title:"Weather Park",sub:"Seasons",image:null},
-  {key:"toys",icon:"🧸",title:"Toy Town",sub:"Toys",image:null},
-  {key:"home",icon:"🏡",title:"My Home",sub:"Rooms & things",image:IMG+"bedroom.jpg"},
-  {key:"boss",icon:"👑",title:"Boss Castle",sub:"Big conversation",image:IMG+"Lili green.jpg"}
+  {key:"school", icon:"🏫", title:"Глава 1 · School Days", sub:"Школьные вещи, чтение и вопрос What is it?", image:IMG+"School bag.jpg"},
+  {key:"family", icon:"🏠", title:"Глава 2 · Family Moments", sub:"Семья, чтение и фразы с have got", image:IMG+"mummy.jpg"},
+  {key:"more", icon:"🔮", title:"Скоро продолжение", sub:"Следующие главы Spotlight 3", locked:true}
 ];
-
-const q = (question,image,options,correctIndex) => ({question,image,options,correctIndex});
+const q = (question,image,options,correctIndex,tip="") => ({type:"choice",question,image,options,correctIndex,tip});
+const build = (question,words,answer,tip="") => ({type:"build",question,words,answer,tip});
 
 const levels = {
-  family:{name:"👨‍👩‍👧 Family House",type:"story",scenes:[
-    {text:"Hello! I'\''m Lily!",image:IMG+"Lili.jpg"},
-    {text:"I have a mummy. Her name is Anna.",image:IMG+"mummy.jpg"},
-    {text:"I have a daddy. His name is Tom.",image:IMG+"daddy.jpg"},
-    {text:"I have a grandma and a grandpa.",image:IMG+"grandmagrandpa.jpg"},
-    {text:"I have a sister. Her name is Mia.",image:IMG+"Lilissisterbig.jpg"},
-    {text:"I love my family!",image:IMG+"Lili.jpg"},
-    {text:"I go to school every day!",image:IMG+"Lili.jpg"},
-    {text:"Let'\''s play together!",image:IMG+"Lili.jpg"}
-  ]},
-  school:{name:"🏫 School",questions:[
-    q("What is it?",IMG+"pen.jpg",["It'\''s a pen.","It'\''s a ruler.","It'\''s an eraser."],0),
-    q("What is it?",IMG+"pencil.jpg",["It'\''s a pencil.","It'\''s a ruler.","It'\''s a pen."],0),
-    q("What is it?",IMG+"ruler.jpg",["It'\''s a pencil.","It'\''s a ruler.","It'\''s a pen."],1),
-    q("What is it?",IMG+"Eraser.jpg",["It'\''s a ruler.","It'\''s a pen.","It'\''s an eraser."],2),
-    q("What is it?",IMG+"School bag.jpg",["It'\''s a school bag.","It'\''s a pen.","It'\''s a ruler."],0),
-    q("What is it?",IMG+"book.jpg",["It'\''s a book.","It'\''s a pencil case.","It'\''s a school bag."],0),
-    q("What is it?",IMG+"pencil case.jpg",["It'\''s a ruler.","It'\''s a pencil case.","It'\''s a book."],1)
-  ]},
-  animals:{name:"🐾 Pet World",questions:[
-    q("What is it?",IMG+"monkey.jpg",["It'\''s a chimp.","It'\''s a fish.","It'\''s a bird."],0),
-    q("What is it?",IMG+"fish.jpg",["It'\''s a mouse.","It'\''s a frog.","It'\''s a fish."],2),
-    q("What is it?",IMG+"bird.jpg",["It'\''s a bird.","It'\''s a chimp.","It'\''s a mouse."],0),
-    q("What is it?",IMG+"mouse.jpg",["It'\''s a fish.","It'\''s a mouse.","It'\''s a frog."],1),
-    q("What is it?",IMG+"frog.jpg",["It'\''s a frog.","It'\''s a bird.","It'\''s a chimp."],0)
-  ]},
-  colours:{name:"🎨 Colour Castle",questions:[
-    q("What colour is it?","🔴",["It'\''s red.","It'\''s blue.","It'\''s white."],0),
-    q("What colour is it?","🔵",["It'\''s yellow.","It'\''s black.","It'\''s blue."],2),
-    q("What colour is it?","🟡",["It'\''s yellow.","It'\''s brown.","It'\''s orange."],0),
-    q("What colour is it?","⚫",["It'\''s white.","It'\''s black.","It'\''s red."],1),
-    q("What colour is it?","🟢",["It'\''s green.","It'\''s yellow.","It'\''s red."],0),
-    q("What colour is it?","⚪",["It'\''s white.","It'\''s blue.","It'\''s black."],0),
-    q("What colour is it?","🟤",["It'\''s brown.","It'\''s pink.","It'\''s red."],0),
-    q("What colour is it?","🌸",["It'\''s pink.","It'\''s green.","It'\''s blue."],0)
-  ]},
-  food:{name:"🍕 Yummy Café",questions:[
-    q("What is it?",IMG+"Apple.jpg",["It'\''s an apple.","It'\''s a pizza.","It'\''s a burger."],0),
-    q("What is it?",IMG+"Burger.jpg",["It'\''s an apple.","It'\''s a burger.","It'\''s a sandwich."],1),
-    q("What is it?",IMG+"Chips.jpg",["It'\''s a pizza.","It'\''s a burger.","It'\''s chips."],2),
-    q("What is it?",IMG+"Chocolate cake.jpg",["It'\''s a chocolate cake.","It'\''s an apple.","It'\''s ice cream."],0),
-    q("What is it?",IMG+"Ice cream.jpg",["It'\''s a burger.","It'\''s ice cream.","It'\''s a sandwich."],1),
-    q("What is it?",IMG+"Milk.jpg",["It'\''s milk.","It'\''s pizza.","It'\''s chips."],0),
-    q("What is it?",IMG+"Orange juice.jpg",["It'\''s orange juice.","It'\''s milk.","It'\''s water."],0),
-    q("What is it?",IMG+"Pizza.jpg",["It'\''s pizza.","It'\''s an apple.","It'\''s a burger."],0),
-    q("What is it?",IMG+"Sandwich.jpg",["It'\''s a sandwich.","It'\''s an apple.","It'\''s chips."],0)
-  ]},
-  seasons:{name:"🌦️ Weather Park",questions:[
-    q("What season is it?","❄️",["It'\''s winter.","It'\''s summer.","It'\''s spring."],0),
-    q("What season is it?","🌸",["It'\''s autumn.","It'\''s spring.","It'\''s winter."],1),
-    q("What season is it?","☀️",["It'\''s winter.","It'\''s spring.","It'\''s summer."],2),
-    q("What season is it?","🍂",["It'\''s autumn.","It'\''s winter.","It'\''s summer."],0)
-  ]},
-  toys:{name:"🧸 Toy Town",questions:[
-    q("What is it?","🧸",["It'\''s a teddy bear.","It'\''s a doll.","It'\''s a ball."],0),
-    q("What is it?","🪀",["It'\''s a yoyo.","It'\''s a puppet.","It'\''s a toy soldier."],0),
-    q("What is it?","⚽",["It'\''s a ball.","It'\''s a teddy bear.","It'\''s a doll."],0),
-    q("What is it?","🪆",["It'\''s a puppet.","It'\''s a yoyo.","It'\''s a ball."],0)
-  ]},
-  home:{name:"🏡 My Home",questions:[
-    q("What is it?","🪑",["It'\''s a chair.","It'\''s a table.","It'\''s a shelf."],0),
-    q("What room is it?",IMG+"bedroom.jpg",["It'\''s a kitchen.","It'\''s a bedroom.","It'\''s a bathroom."],1),
-    q("What room is it?",IMG+"kitchen.jpg",["It'\''s a kitchen.","It'\''s a living room.","It'\''s a bedroom."],0),
-    q("What room is it?",IMG+"bathroom.jpg",["It'\''s a bedroom.","It'\''s a bathroom.","It'\''s a kitchen."],1)
-  ]},
-  boss:{name:"👑 Boss Castle",questions:[
-    q("Who is she?",IMG+"mummy.jpg",["She'\''s my mummy.","She'\''s my sister.","She'\''s my grandma."],0),
-    q("Who is he?",IMG+"daddy.jpg",["He'\''s my brother.","He'\''s my daddy.","He'\''s my grandpa."],1),
-    q("What is it?",IMG+"Apple.jpg",["It'\''s an apple.","It'\''s a pizza.","It'\''s a burger."],0),
-    q("What is it?",IMG+"School bag.jpg",["It'\''s a school bag.","It'\''s a pen.","It'\''s a ruler."],0)
+  school:{name:"🏫 Глава 1 · School Days", questions:[
+    q("Listen and choose. What is it?",IMG+"School bag.jpg",["It'\''s a school bag.","It'\''s a pencil.","It'\''s a ruler."],0,"Скажи: It'\''s a school bag."),
+    q("What is it?",IMG+"pen.jpg",["It'\''s a pen.","It'\''s an eraser.","It'\''s a book."],0,"Вопрос: What'\''s this? — It'\''s a pen."),
+    build("Собери предложение: «Это карандаш».",["a","It'\''s","pencil","ruler"],"It'\''s a pencil.","Начинай с It'\''s."),
+    q("What is it?",IMG+"book.jpg",["It'\''s a pencil case.","It'\''s a book.","It'\''s a school bag."],1,"Прочитай слово book."),
+    build("Собери вопрос: «Что это?»",["this?","What'\''s","It","a"],"What'\''s this?","Вопросительное слово стоит в начале."),
+    q("What is it?",IMG+"Eraser.jpg",["It'\''s a ruler.","It'\''s an eraser.","It'\''s a pen."],1,"Повтори: an eraser."),
+    build("Собери ответ.",["ruler.","a","It'\''s","What'\''s"],"It'\''s a ruler.","Артикль a идёт перед ruler.")
+  ]},
+  family:{name:"🏠 Глава 2 · Family Moments", questions:[
+    q("Who is she?",IMG+"mummy.jpg",["She'\''s my mummy.","She'\''s my sister.","She'\''s my grandma."],0,"She'\''s = She is."),
+    q("Who is he?",IMG+"daddy.jpg",["He'\''s my grandpa.","He'\''s my daddy.","He'\''s my brother."],1,"He'\''s = He is."),
+    build("Собери: «У меня есть сестра».",["a","have","sister.","I","got"],"I have got a sister.","I have got = у меня есть."),
+    q("Who is she?",IMG+"grandmagrandpa.jpg",["She'\''s my grandma.","She'\''s my mummy.","She'\''s my sister."],0,"Прочитай: grandma."),
+    build("Собери вопрос о брате.",["got","a","brother?","Have","you"],"Have you got a brother?","В вопросе Have стоит первым."),
+    build("Собери короткий ответ.",["have.","Yes,","I","got"],"Yes, I have.","После Yes ставим запятую."),
+    q("Выбери фразу про семью.","👨‍👩‍👧",["I have got a family.","It'\''s a school bag.","What'\''s this?"],0,"Повтори фразу целиком.")
   ]}
 };
 
-let state = loadState();
-let currentKey = "";
-let currentIndex = 0;
-let answered = false;
-let storyMode = false;
-let lilyVoice = null;
-let levelStartXP = 0;
-let levelStartGems = 0;
-
-function loadState(){
-  try{
-    const saved = JSON.parse(localStorage.getItem("english_quest_v2") || "null");
-    if(saved && typeof saved === "object") return saved;
-  }catch(e){}
-  return {xp:0,gems:0,completed:[],unlocked:["family"]};
-}
-
-function save(){
-  localStorage.setItem("english_quest_v2",JSON.stringify(state));
-  updateStats();
-}
-
-function updateStats(){
-  ["playerXP","mapXP","lessonXP"].forEach(id=>{
-    const el=document.getElementById(id); if(el) el.textContent=state.xp;
-  });
-  ["playerGems","mapGems","lessonGems"].forEach(id=>{
-    const el=document.getElementById(id); if(el) el.textContent=state.gems;
-  });
-}
-
-function show(id){
-  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
-  const target=document.getElementById(id);
-  if(target) target.classList.add("active");
-  window.scrollTo(0,0);
-}
-
-function goHome(){show("homeScreen");updateStats();}
-function showMap(){renderMap();updateStats();show("mapScreen");}
-
-function renderMap(){
-  const grid=document.getElementById("worldMap");
-  if(!grid) return;
-  grid.innerHTML="";
-  zones.forEach((z,i)=>{
-    const unlocked=state.unlocked.includes(z.key);
-    const done=state.completed.includes(z.key);
-    const card=document.createElement("button");
-    card.type="button";
-    card.className="world-card-item"+(unlocked?"":" locked");
-    card.innerHTML=`
-      <div class="world-card-top">
-        <div class="world-icon">${z.icon}</div>
-        ${unlocked?"":'\''<div class="lock">🔒</div>'\''}
-      </div>
-      <div class="world-name">${z.title} ${done?"✓":""}</div>
-      <div class="world-description">${z.sub}</div>`;
-    if(unlocked) card.addEventListener("click",()=>startLevel(z.key));
-    grid.appendChild(card);
-  });
-}
-
-function startLevel(key){
-  currentKey=key;
-  currentIndex=0;
-  answered=false;
-  storyMode=levels[key].type==="story";
-  levelStartXP=state.xp;
-  levelStartGems=state.gems;
-  document.getElementById("lessonTitle").textContent=levels[key].name;
-  show("lessonScreen");
-  renderLesson();
-}
-
-function renderLesson(){
-  const data=levels[currentKey];
-  const total=storyMode?data.scenes.length:data.questions.length;
-  document.getElementById("lessonCounter").textContent=`${currentIndex+1} / ${total}`;
-  document.getElementById("progressBar").style.width=((currentIndex/total)*100)+"%";
-  const box=document.getElementById("lessonContent");
-  if(storyMode){renderStory(box,data.scenes[currentIndex]);return;}
-  renderQuestion(box,data.questions[currentIndex]);
-}
-
-function renderQuestion(box,item){
-  answered=false;
-  const image=typeof item.image==="string" && item.image.startsWith("http")
-    ? `<img class="big-image" src="${item.image}" alt="Learning picture">`
-    : `<div class="big-image emoji-image">${item.image}</div>`;
-  box.innerHTML=`
-    ${image}
-    <div class="question">${item.question}</div>
-    <button id="listenQuestion" class="listen-button" type="button">🔊 Listen</button>
-    <div id="answers" class="answer-grid"></div>
-    <div id="feedback" class="feedback"></div>
-    <div class="lesson-actions">
-      <button id="speakButton" class="speak-button" type="button" style="display:none">🎤 Say it!</button>
-      <button id="nextButton" class="next-button" type="button" style="display:none">Next ➡️</button>
-    </div>`;
-
-  document.getElementById("listenQuestion").addEventListener("click",()=>speak(item.question));
-  document.getElementById("speakButton").addEventListener("click",listenAnswer);
-  document.getElementById("nextButton").addEventListener("click",nextItem);
-
-  const answers=document.getElementById("answers");
-  item.options.forEach((text,i)=>{
-    const btn=document.createElement("button");
-    btn.type="button";
-    btn.className="answer-button";
-    btn.textContent=text;
-    btn.addEventListener("click",()=>selectAnswer(i,btn));
-    answers.appendChild(btn);
-  });
-}
-
-function renderStory(box,scene){
-  box.innerHTML=`
-    <div class="story">
-      <img src="${scene.image}" alt="Lily story">
-      <div>
-        <div class="story-step">LILY'\''S STORY • SCENE ${currentIndex+1}</div>
-        <div class="story-text">${scene.text}</div>
-        <div class="lesson-actions">
-          <button id="storyListen" class="listen-button" type="button">🔊 Listen</button>
-          <button id="storyNext" class="next-button" type="button">${currentIndex===levels[currentKey].scenes.length-1?"Finish story":"Next ➡️"}</button>
-        </div>
-      </div>
-    </div>`;
-  document.getElementById("storyListen").addEventListener("click",()=>speak(scene.text,true));
-  document.getElementById("storyNext").addEventListener("click",nextItem);
-}
-
-function selectAnswer(index,btn){
-  if(answered) return;
-  const item=levels[currentKey].questions[currentIndex];
-  if(index===item.correctIndex){
-    answered=true;
-    btn.classList.add("correct");
-    document.querySelectorAll(".answer-button").forEach(b=>b.disabled=true);
-    state.xp+=10;
-    state.gems+=1;
-    save();
-    const feedback=document.getElementById("feedback");
-    feedback.textContent="Great! Now say it aloud! +10 XP ⭐";
-    feedback.className="feedback success";
-    document.getElementById("speakButton").style.display="inline-block";
-    document.getElementById("nextButton").style.display="inline-block";
-    speak(item.options[item.correctIndex],true);
-  }else{
-    btn.classList.add("wrong");
-    btn.disabled=true;
-    const feedback=document.getElementById("feedback");
-    feedback.textContent="Oops! Try again!";
-    feedback.className="feedback error";
-    speak(item.options[item.correctIndex],true);
-  }
-}
-
-function nextItem(){
-  const total=storyMode?levels[currentKey].scenes.length:levels[currentKey].questions.length;
-  currentIndex++;
-  if(currentIndex>=total){finishLevel();return;}
-  renderLesson();
-}
-
-function finishLevel(){
-  if(!state.completed.includes(currentKey)) state.completed.push(currentKey);
-  const pos=zones.findIndex(z=>z.key===currentKey);
-  const next=zones[pos+1];
-  if(next && !state.unlocked.includes(next.key)) state.unlocked.push(next.key);
-  save();
-  const earnedXP=state.xp-levelStartXP;
-  const earnedGems=state.gems-levelStartGems;
-  document.getElementById("rewardTitle").textContent=levels[currentKey].name+" complete!";
-  document.getElementById("rewardText").textContent=next
-    ? `Amazing! You earned ${earnedXP} XP and ${earnedGems} gem${earnedGems===1?"":"s"}. 🔓 ${next.title} is now unlocked!`
-    : `Amazing! You earned ${earnedXP} XP and ${earnedGems} gems. You reached the end of this adventure!`;
-  document.getElementById("rewardXP").textContent=`+${earnedXP} XP`;
-  document.getElementById("rewardGems").textContent=`+${earnedGems}`;
-  show("rewardScreen");
-  speak("Well done!",true);
-}
-
-function speak(text,slow=false){
-  if(!("speechSynthesis" in window)) return;
-  speechSynthesis.cancel();
-  const u=new SpeechSynthesisUtterance(text);
-  u.lang="en-US";
-  u.rate=slow?0.76:0.9;
-  u.pitch=1.08;
-  if(lilyVoice) u.voice=lilyVoice;
-  speechSynthesis.speak(u);
-}
-
-function setupVoice(){
-  if(!("speechSynthesis" in window)) return;
-  const choose=()=>{
-    const voices=speechSynthesis.getVoices();
-    lilyVoice=voices.find(v=>/Google US English|Microsoft Zira|Samantha|Female/i.test(v.name) && /^en-US/i.test(v.lang))
-      || voices.find(v=>/^en-US/i.test(v.lang))
-      || voices.find(v=>/^en-GB/i.test(v.lang))
-      || voices[0]
-      || null;
-  };
-  choose();
-  speechSynthesis.onvoiceschanged=choose;
-}
-
-function listenAnswer(){
-  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
-  if(!SR){
-    const feedback=document.getElementById("feedback");
-    feedback.textContent="Speech recognition is not available here. Use Listen and repeat aloud.";
-    feedback.className="feedback info";
-    return;
-  }
-  const item=levels[currentKey].questions[currentIndex];
-  const mic=document.getElementById("speakButton");
-  mic.textContent="🎤 Listening...";
-  const r=new SR();
-  r.lang="en-US";
-  r.interimResults=false;
-  r.maxAlternatives=3;
-  r.onresult=e=>{
-    const heard=normalize(e.results[0][0].transcript);
-    const correct=normalize(item.options[item.correctIndex]);
-    const words=correct.split(/\s+/).filter(w=>w.length>2);
-    const hits=words.filter(w=>heard.includes(w)).length;
-    mic.textContent="🎤 Say it!";
-    const feedback=document.getElementById("feedback");
-    if(heard===correct || heard.includes(correct) || hits>=Math.max(1,Math.ceil(words.length*.65))){
-      feedback.textContent="Excellent speaking! 🎉";
-      feedback.className="feedback success";
-    }else{
-      feedback.textContent="Good try! Listen once more and repeat.";
-      feedback.className="feedback info";
-      speak(item.options[item.correctIndex],true);
-    }
-  };
-  r.onerror=()=>{mic.textContent="🎤 Say it!";};
-  try{r.start();}catch(e){mic.textContent="🎤 Say it!";}
-}
-
+let state=loadState(), currentKey="", currentIndex=0, answered=false, levelStartXP=0, levelStartGems=0, lilyVoice=null;
+function loadState(){try{const v=JSON.parse(localStorage.getItem("english_quest_v3")||"null");if(v&&typeof v==="object")return {...{xp:0,gems:0,completed:[],unlocked:["school","family"]},...v};}catch(e){}return {xp:0,gems:0,completed:[],unlocked:["school","family"]};}
+function save(){localStorage.setItem("english_quest_v3",JSON.stringify(state));updateStats();}
+function updateStats(){["playerXP","mapXP","lessonXP"].forEach(id=>{const e=document.getElementById(id);if(e)e.textContent=state.xp});["playerGems","mapGems","lessonGems"].forEach(id=>{const e=document.getElementById(id);if(e)e.textContent=state.gems});}
+function show(id){document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));document.getElementById(id)?.classList.add("active");window.scrollTo(0,0);}
+function goHome(){show("homeScreen");updateStats();} function showMap(){renderMap();updateStats();show("mapScreen");}
+function renderMap(){const grid=document.getElementById("worldMap");grid.innerHTML="";zones.forEach(z=>{const unlocked=!z.locked&&state.unlocked.includes(z.key),done=state.completed.includes(z.key),card=document.createElement("button");card.type="button";card.className="world-card-item"+(unlocked?"":" locked");card.innerHTML=`<div class="world-card-top"><div class="world-icon">${z.icon}</div>${unlocked?`<span class="chapter-pill">${done?"✓ Пройдено":"Играть"}</span>`:'\''<div class="lock">🔒</div>'\''}</div><div class="world-name">${z.title}</div><div class="world-description">${z.sub}</div>`;if(unlocked)card.addEventListener("click",()=>startLevel(z.key));grid.appendChild(card);});}
+function startLevel(key){currentKey=key;currentIndex=0;levelStartXP=state.xp;levelStartGems=state.gems;document.getElementById("lessonTitle").textContent=levels[key].name;show("lessonScreen");renderLesson();}
+function renderLesson(){const data=levels[currentKey],total=data.questions.length;document.getElementById("lessonCounter").textContent=`${currentIndex+1} / ${total}`;document.getElementById("progressBar").style.width=`${(currentIndex/total)*100}%`;const item=data.questions[currentIndex];if(item.type==="build")renderBuilder(item);else renderChoice(item);}
+function visual(image){return typeof image==="string"&&image.startsWith("http")?`<img class="big-image" src="${image}" alt="Illustration for English word">`:`<div class="big-image emoji-image">${image}</div>`;}
+function renderChoice(item){answered=false;document.getElementById("lessonContent").innerHTML=`${visual(item.image)}<div class="lesson-kind">СЛОВО И ФРАЗА</div><div class="question">${item.question}</div><button id="listenQuestion" class="listen-button" type="button">🔊 Слушать</button><div id="answers" class="answer-grid"></div><div id="feedback" class="feedback"></div><div class="lesson-actions"><button id="speakButton" class="speak-button" type="button" hidden>🎤 Повторить</button><button id="nextButton" class="next-button" type="button" hidden>Дальше ➜</button></div>`;document.getElementById("listenQuestion").onclick=()=>speak(item.question);document.getElementById("speakButton").onclick=()=>listenAnswer(item.options[item.correctIndex]);document.getElementById("nextButton").onclick=nextItem;const answers=document.getElementById("answers");item.options.forEach((text,i)=>{const b=document.createElement("button");b.className="answer-button";b.textContent=text;b.onclick=()=>selectChoice(i,b,item);answers.appendChild(b);});}
+function renderBuilder(item){let picked=[];document.getElementById("lessonContent").innerHTML=`<div class="builder-hero">🧩</div><div class="lesson-kind">СОБЕРИ ФРАЗУ</div><div class="question">${item.question}</div><button id="buildListen" class="listen-button" type="button">🔊 Послушать ответ</button><div class="sentence-slot" id="sentenceSlot"><span>Нажимай слова по порядку</span></div><div class="word-bank" id="wordBank"></div><div id="feedback" class="feedback"></div><div class="lesson-actions"><button id="resetSentence" class="secondary-button small-button" type="button">↺ Заново</button><button id="checkSentence" class="next-button" type="button">Проверить ✓</button></div>`;const bank=document.getElementById("wordBank");[...item.words].sort(()=>Math.random()-.5).forEach((word,i)=>{const b=document.createElement("button");b.className="word-tile";b.textContent=word;b.onclick=()=>{picked.push(word);b.disabled=true;updateSlot();};bank.appendChild(b);});function updateSlot(){document.getElementById("sentenceSlot").textContent=picked.join(" ");}document.getElementById("buildListen").onclick=()=>speak(item.answer,true);document.getElementById("resetSentence").onclick=()=>{picked=[];document.querySelectorAll(".word-tile").forEach(b=>b.disabled=false);updateSlot();};document.getElementById("checkSentence").onclick=()=>{if(normalize(picked.join(" "))===normalize(item.answer)){award(item,`Отлично! ${item.answer}`);document.getElementById("checkSentence").hidden=true;}else{feedback("Почти! "+item.tip,"error");speak(item.answer,true);}};}
+function selectChoice(index,btn,item){if(answered)return;if(index===item.correctIndex){document.querySelectorAll(".answer-button").forEach(b=>b.disabled=true);btn.classList.add("correct");award(item,`Верно! ${item.tip}`);}else{btn.classList.add("wrong");btn.disabled=true;feedback("Попробуй ещё раз. 🔎","error");}}
+function award(item,message){answered=true;state.xp+=10;state.gems+=1;save();feedback(`${message} +10 XP ⭐`,`success`);document.getElementById("speakButton")?.removeAttribute("hidden");const n=document.getElementById("nextButton");if(n)n.removeAttribute("hidden");if(item.answer)speak(item.answer,true);else speak(item.options[item.correctIndex],true);}
+function feedback(text,kind){const e=document.getElementById("feedback");e.textContent=text;e.className=`feedback ${kind}`;}
+function nextItem(){if(++currentIndex>=levels[currentKey].questions.length)return finishLevel();renderLesson();}
+function finishLevel(){if(!state.completed.includes(currentKey))state.completed.push(currentKey);save();const x=state.xp-levelStartXP,g=state.gems-levelStartGems;document.getElementById("rewardTitle").textContent="Глава пройдена!";document.getElementById("rewardText").textContent=`Ты заработал ${x} XP и ${g} 💎. Самое время повторить фразы вслух!`;document.getElementById("rewardXP").textContent=`+${x} XP`;document.getElementById("rewardGems").textContent=`+${g}`;show("rewardScreen");speak("Well done!",true);}
 function normalize(s){return String(s).toLowerCase().replace(/[.,!?;:]/g,"").replace(/\s+/g," ").trim();}
-
-function showToast(message){
-  const toast=document.getElementById("toast");
-  if(!toast) return;
-  toast.textContent=message;
-  toast.classList.add("show");
-  clearTimeout(showToast.timer);
-  showToast.timer=setTimeout(()=>toast.classList.remove("show"),2200);
-}
-
-function init(){
-  updateStats();
-  setupVoice();
-  document.getElementById("startQuest")?.addEventListener("click",showMap);
-  document.getElementById("gamesBtn")?.addEventListener("click",()=>{
-    showToast("🎮 Games are coming next — the adventure is ready!");
-    speak("Games are coming next!");
-  });
-  document.getElementById("mapHome")?.addEventListener("click",goHome);
-  document.getElementById("lessonBack")?.addEventListener("click",showMap);
-  document.getElementById("rewardMap")?.addEventListener("click",showMap);
-  document.getElementById("rewardHome")?.addEventListener("click",goHome);
-}
-
+function speak(text,slow=false){if(!("speechSynthesis"in window))return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang="en-US";u.rate=slow?.72:.88;u.pitch=1.08;if(lilyVoice)u.voice=lilyVoice;speechSynthesis.speak(u);}
+function setupVoice(){if(!("speechSynthesis"in window))return;const choose=()=>{const v=speechSynthesis.getVoices();lilyVoice=v.find(x=>/^en-US/i.test(x.lang))||v.find(x=>/^en/i.test(x.lang))||null;};choose();speechSynthesis.onvoiceschanged=choose;}
+function listenAnswer(correct){const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR){feedback("Микрофон недоступен: послушай и повтори вслух.","info");return;}const r=new SR();r.lang="en-US";r.onresult=e=>feedback(normalize(e.results[0][0].transcript).includes(normalize(correct))?"Звучит отлично! 🎉":"Хорошая попытка — послушай ещё раз.","success");r.start();}
+function init(){updateStats();setupVoice();document.getElementById("startQuest").onclick=showMap;document.getElementById("gamesBtn").onclick=()=>startLevel("school");document.getElementById("mapHome").onclick=goHome;document.getElementById("lessonBack").onclick=showMap;document.getElementById("rewardMap").onclick=showMap;document.getElementById("rewardHome").onclick=goHome;}
 document.addEventListener("DOMContentLoaded",init);
' | git apply --3way)
