const IMG = "https://yuliaishtar-hub.github.io/inglish-adventure/";

const zones = [
  {key:"starter", icon:"🌈", title:"Starter Unit · Welcome back!", sub:"Повторение: цвета, числа, формы, школьные слова"},
  {key:"school", icon:"🏫", title:"Module 1 · School Days!", sub:"Школа, предметы, числа 1–20, команды, to be"},
  {key:"family", icon:"👨‍👩‍👧", title:"Module 2 · Family Moments!", sub:"Семья, have got, притяжательные слова, множественное число"},
  {key:"likes", icon:"🍎", title:"Module 3 · All the Things I Like!", sub:"Еда, напитки, like / don’t like, some / any"},
  {key:"toys", icon:"🧸", title:"Module 4 · Come in and Play!", sub:"Игрушки, комнаты, мебель, принадлежность"},
  {key:"animals", icon:"🐾", title:"Module 5 · Furry Friends!", sub:"Животные, части тела, can / can’t, описание"},
  {key:"home", icon:"🏡", title:"Module 6 · Home, Sweet Home!", sub:"Комнаты, предметы и где они находятся"},
  {key:"dayoff", icon:"🌳", title:"Module 7 · A Day Off!", sub:"Действия сейчас, парк и свободное время"},
  {key:"daybyday", icon:"⏰", title:"Module 8 · Day by Day!", sub:"Распорядок дня, время и привычные действия"}
];

const QUESTION_RU = {"What colour is it?":"Какого это цвета?","How many stars can you see?":"Сколько звёзд ты видишь?","Choose a school item.":"Выбери школьную принадлежность.","What is it?":"Что это?","How many books?":"Сколько книг?","Who is she?":"Кто она?","Who is he?":"Кто он?","Who are they?":"Кто они?","What do you like?":"Что тебе нравится?","Choose a drink.":"Выбери напиток.","Choose the correct question.":"Выбери правильный вопрос.","Choose the correct word.":"Выбери правильное слово.","Where is the ball?":"Где мяч?","Choose the correct phrase.":"Выбери правильную фразу.","Choose a room.":"Выбери комнату.","Choose the plural.":"Выбери форму множественного числа.","What can it do?":"Что оно умеет делать?","Choose the body part.":"Выбери часть тела.","Choose the animal.":"Выбери животное.","How many?":"Сколько?","What room is it?":"Что это за комната?","Where is the lamp?":"Где лампа?","Choose the correct plural.":"Выбери правильную форму множественного числа.","What is she doing?":"Что она делает?","What are they doing?":"Что они делают?","Choose the action.":"Выбери действие.","Choose the correct form.":"Выбери правильную форму.","What time is it?":"Который час?","Choose a daily action.":"Выбери действие из распорядка дня.","Choose the correct sentence.":"Выбери правильное предложение.","When do you do it?":"Когда ты это делаешь?"};
const questionRu = question => QUESTION_RU[question] || "";
const q = (question, image, options, correctIndex, tip="") => ({type:"choice", question, questionRu:questionRu(question), image, options, correctIndex, tip});
const build = (question, words, answer, tip="") => ({type:"build", question, questionRu:questionRu(question), words, answer, tip});

const levels = {
  starter:{name:"🌈 Starter Unit · Welcome back!", questions:[
    q("What colour is it?","🔵",["It’s blue.","It’s a circle.","It’s ten."],0,"blue = синий"),
    q("How many stars can you see?","⭐⭐⭐⭐⭐",["Five.","Fifteen.","Twenty."],0,"Сосчитай звёзды."),
    build("Собери: «Меня зовут Лили».",["name","My","Lily.","is"],"My name is Lily.","My name is… = Меня зовут…"),
    q("Choose a school item.","✏️",["a pencil","a sandwich","a dog"],0,"pencil = карандаш"),
    build("Собери команду учителя.",["your","Open","book!"],"Open your book!","Команда начинается с Open.")
  ]},
  school:{name:"🏫 Module 1 · School Days!", questions:[
    q("What is it?",IMG+"School bag.jpg",["It’s a school bag.","It’s a pencil.","It’s a ruler."],0,"school bag = школьная сумка"),
    q("What is it?",IMG+"pen.jpg",["It’s a pen.","It’s an eraser.","It’s a book."],0,"pen = ручка"),
    q("What is it?",IMG+"Eraser.jpg",["It’s a ruler.","It’s an eraser.","It’s a pen."],1,"Перед eraser нужен an."),
    build("Собери: «Что это?»",["this?","What’s","It","a"],"What’s this?","What’s this? — Что это?"),
    build("Собери: «Это карандаш».",["a","It’s","pencil","ruler"],"It’s a pencil.","It’s + a + предмет."),
    q("How many books?","📚📚📚",["Three.","Thirteen.","Thirty."],0,"Three = три"),
    build("Собери команду.",["sit","Please","down."],"Please sit down.","Please делает команду вежливой.")
  ]},
  family:{name:"👨‍👩‍👧 Module 2 · Family Moments!", questions:[
    q("Who is she?",IMG+"mummy.jpg",["She’s my mummy.","She’s my sister.","She’s my grandma."],0,"mummy = мама"),
    q("Who is he?",IMG+"daddy.jpg",["He’s my grandpa.","He’s my daddy.","He’s my brother."],1,"daddy = папа"),
    q("Who is she?",IMG+"Lilissisterbig.jpg",["She’s my sister.","She’s my mummy.","She’s my grandma."],0,"sister = сестра"),
    q("Who is she?",IMG+"grandma.jpg",["She’s my grandma.","She’s my mummy.","She’s my sister."],0,"grandma = бабушка"),
    q("Who is he?",IMG+"grandpa.jpg",["He’s my grandpa.","He’s my daddy.","He’s my brother."],0,"grandpa = дедушка"),
    q("Who are they?",IMG+"mum dad.jpg",["They’re my mum and dad.","They’re my grandma and grandpa.","They’re my sister and brother."],0,"mum and dad = мама и папа"),
    q("Who are they?",IMG+"grandmagrandpa.jpg",["They’re my grandma and grandpa.","They’re my mum and dad.","They’re my sister and brother."],0,"grandma and grandpa = бабушка и дедушка")
  ]},
  likes:{name:"🍎 Module 3 · All the Things I Like!", questions:[
    q("What do you like?","🍎",["I like apples.","I am apples.","I have apples."],0,"like = нравиться / любить"),
    q("Choose a drink.","🥛",["milk","chair","kite"],0,"milk = молоко"),
    build("Собери: «Я не люблю молоко».",["don’t","milk.","I","like"],"I don’t like milk.","don’t + like = не люблю"),
    q("Choose the correct question.","🍕",["Do you like pizza?","Are you like pizza?","You do like pizza?"],0,"Do помогает задать вопрос с like."),
    build("Собери вопрос с any.",["got","Have","any","you","juice?"],"Have you got any juice?","any часто используется в вопросах."),
    q("Choose the correct word.","🍰",["some cake","some cakeses","a some cake"],0,"some = немного / некоторое количество"),
    build("Собери: «Я люблю мороженое».",["ice","I","cream.","like"],"I like ice cream.","I like + еда.")
  ]},
  toys:{name:"🧸 Module 4 · Come in and Play!", questions:[
    q("What is it?","🧸",["It’s a teddy bear.","It’s a ruler.","It’s a book."],0,"teddy bear = плюшевый мишка"),
    q("Where is the ball?","⚽📦",["It’s in the box.","It’s on Monday.","It’s a box."],0,"in the box = в коробке"),
    build("Собери: «Это комната Бетси».",["is","room.","This","Betsy’s"],"This is Betsy’s room.","’s показывает принадлежность."),
    q("Choose the correct phrase.","🪑",["This is a chair.","These is a chair.","This are a chair."],0,"This используется с одним предметом."),
    build("Собери: «У меня есть робот».",["a","robot.","have","I","got"],"I have got a robot.","have got = у меня есть"),
    q("Choose a room.","🛏️",["bedroom","pencil","sandwich"],0,"bedroom = спальня"),
    q("Choose the plural.","🧸🧸",["two teddy bears","two teddy bear","a teddy bears"],0,"bear → bears")
  ]},
  animals:{name:"🐾 Module 5 · Furry Friends!", questions:[
    q("What is it?","🐄",["It’s a cow.","It’s a frog.","It’s a fish."],0,"cow = корова"),
    q("What can it do?","🐦",["It can fly.","It can’t fly.","It is a chair."],0,"can = умеет / может"),
    build("Собери: «Собака умеет бегать».",["can","A","dog","run."],"A dog can run.","can + глагол без to"),
    q("Choose the body part.","🐘👂",["ear","kitchen","table"],0,"ear = ухо"),
    build("Собери отрицание.",["can’t","A","fish","walk."],"A fish can’t walk.","can’t = не может"),
    q("Choose the animal.","🦘",["a kangaroo","a mouse","a cow"],0,"kangaroo = кенгуру"),
    q("How many?","🐾🐾🐾",["three paws","three paw","a paws"],0,"Во множественном числе paws.")
  ]},
  home:{name:"🏡 Module 6 · Home, Sweet Home!", questions:[
    q("What room is it?","🛏️",["It’s a bedroom.","It’s a kitchen.","It’s a bathroom."],0,"bedroom = спальня"),
    q("Where is the lamp?","💡🪑",["It’s on the table.","It’s a kitchen.","It’s blue."],0,"on the table = на столе"),
    build("Собери: «Кот на стуле».",["is","The","cat","on","the","chair."],"The cat is on the chair.","on = на"),
    q("Where is the ball?","⚽📦",["It’s in the box.","It’s under Monday.","It’s a box."],0,"in = в / внутри"),
    build("Собери вопрос.",["the","Where’s","cat?"],"Where’s the cat?","Where’s = Where is"),
    q("Choose the room.","🍳",["kitchen","bedroom","garden"],0,"kitchen = кухня"),
    q("Choose the correct plural.","📦📦",["boxes","boxs","box"],0,"box → boxes")
  ]},
  dayoff:{name:"🌳 Module 7 · A Day Off!", questions:[
    q("What is she doing?","🏃‍♀️",["She’s running.","She runs yesterday.","She is a pencil."],0,"Сейчас: be + -ing."),
    build("Собери: «Он играет в парке».",["is","He","playing","in","the","park."],"He is playing in the park.","is + playing"),
    q("What are they doing?","⚽👧👦",["They’re playing football.","They’re a house.","They play yesterday."],0,"They’re = They are"),
    build("Собери вопрос.",["doing?","What","you","are"],"What are you doing?","What + are + you…"),
    q("Choose the action.","🚲",["riding a bike","reading a cake","sleeping a chair"],0,"riding a bike = катается на велосипеде"),
    build("Собери: «Мы смотрим телевизор».",["TV.","watching","We’re"],"We’re watching TV.","We’re = We are"),
    q("Choose the correct form.","🎨",["I am drawing.","I drawing.","I am draw."],0,"am + drawing")
  ]},
  daybyday:{name:"⏰ Module 8 · Day by Day!", questions:[
    q("What time is it?","🕖",["It’s seven o’clock.","It’s seven apples.","It’s a clock seven."],0,"o’clock используется для целого часа."),
    build("Собери: «Я встаю в семь».",["up","I","at","seven.","get"],"I get up at seven.","get up = вставать"),
    q("Choose a daily action.","🪥",["brush my teeth","play a bedroom","eat a clock"],0,"brush my teeth = чистить зубы"),
    build("Собери: «Я иду в школу».",["school.","go","I","to"],"I go to school.","go to school = идти в школу"),
    q("Choose the correct sentence.","🌙",["I go to bed at nine.","I go bed nine.","I am bed at nine."],0,"go to bed = ложиться спать"),
    q("When do you do it?","🍳",["in the morning","in the pencil","in the chair"],0,"morning = утро"),
    build("Собери вопрос о времени.",["time","What","is","it?"],"What time is it?","What time…? = Который час?")
  ]}
};


const CURRICULUM_EXTRA = {
starter:[
 q("Choose the colour.","🔴",["red","green","blue"],0,"red = красный"),
 q("How many?","1️⃣2️⃣3️⃣4️⃣",["Four.","Fourteen.","Forty."],0,"four = четыре"),
 build("Собери: «Это моя книга».",["my","book.","It’s"],"It’s my book.","my = мой / моя"),
 q("Choose the correct classroom word.","📏",["ruler","pizza","grandpa"],0,"ruler = линейка"),
 build("Собери команду.",["Listen","please."],"Listen please.","Listen = слушай")
],
school:[
 q("Choose the school subject.","🎵",["music","kitchen","family"],0,"music = музыка"),
 q("Choose the number.","1️⃣6️⃣",["sixteen","sixty","six"],0,"sixteen = шестнадцать"),
 q("What is it?","📏",["It’s a ruler.","It’s a bag.","It’s a pen."],0,"ruler = линейка"),
 build("Собери: «Встань».",["up","Stand"],"Stand up","Stand up = встань"),
 q("Choose the correct article.","◻️",["an eraser","a eraser","an ruler"],0,"an eraser")
],
family:[
 q("Who is she?","👧",["She’s my sister.","He’s my sister.","They’re my sister."],0,"she = она"),
 q("Who is he?","👦",["He’s my brother.","She’s my brother.","They’re my brother."],0,"he = он"),
 q("Choose the plural.","👧👧",["sisters","sister","sisteres"],0,"sister → sisters"),
 build("Собери: «У неё есть сестра».",["has","a","sister.","She"],"She has a sister.","She + has"),
 q("Choose the possessive word.","💜",["my","milk","run"],0,"my = мой / моя")
],
likes:[
 q("Choose the food.","🍎",["apples","chair","ruler"],0,"apples = яблоки"),
 q("Choose the drink.","🧃",["juice","bed","ball"],0,"juice = сок"),
 build("Собери: «Я люблю пиццу».",["I","pizza.","like"],"I like pizza.","I like = мне нравится"),
 q("Choose the negative sentence.","🚫",["I don’t like milk.","I doesn’t like milk.","I am not like milk."],0,"I don’t like..."),
 q("Choose the question.","❓",["Do you like cake?","Does you like cake?","Are you like cake?"],0,"Do you...?")
],
toys:[
 q("Choose the toy.","🧸",["teddy bear","kitchen","teacher"],0,"teddy bear = плюшевый мишка"),
 q("Where is the ball?","⚽⬆️",["It’s on the chair.","It’s a chair.","It’s blue."],0,"on = на"),
 build("Собери: «У неё есть кукла».",["She","has","got","a","doll."],"She has got a doll.","has got = у неё есть"),
 q("Choose the room.","🛏️",["bedroom","classroom","garden"],0,"bedroom = спальня"),
 q("Choose the plural.","🤖🤖",["robots","robot","roboties"],0,"robot → robots")
],
animals:[
 q("Choose the animal.","🐸",["frog","sofa","school"],0,"frog = лягушка"),
 q("What can a bird do?","🐦",["It can fly.","It can swim in a chair.","It is a table."],0,"can fly = умеет летать"),
 build("Собери: «Рыба не умеет ходить».",["A","fish","can’t","walk."],"A fish can’t walk.","can’t + глагол"),
 q("Choose the body part.","👁️",["eye","kitchen","park"],0,"eye = глаз"),
 q("Choose the correct plural.","🐾🐾",["paws","paw","pawses"],0,"paw → paws")
],
home:[
 q("Choose a room.","🛁",["bathroom","bedroom","garden"],0,"bathroom = ванная"),
 q("Where is the cat?","🐱🪑",["It’s on the chair.","It’s under Monday.","It’s a kitchen."],0,"on = на"),
 q("Choose the correct word.","📦⬇️",["under","music","grandma"],0,"under = под"),
 build("Собери: «Мяч в коробке».",["The","ball","is","in","the","box."],"The ball is in the box.","in = в"),
 q("Choose the plural.","📦📦",["boxes","box","boxs"],0,"box → boxes")
],
dayoff:[
 q("What is he doing?","🚲",["He’s riding a bike.","He’s a bedroom.","He ride yesterday."],0,"He’s riding = он катается"),
 build("Собери: «Она рисует».",["She","is","drawing."],"She is drawing.","is + verb-ing"),
 q("Choose the action.","🎨",["drawing","kitchen","grandpa"],0,"drawing = рисование"),
 q("What are they doing?","📺",["They’re watching TV.","They’re a TV.","They watch yesterday."],0,"They’re = They are"),
 build("Собери: «Мы играем в футбол».",["We’re","playing","football."],"We’re playing football.","We’re = We are")
],
daybyday:[
 q("Choose the time.","🕘",["nine o’clock","nine apples","nine school"],0,"nine o’clock = девять часов"),
 build("Собери: «Я чищу зубы».",["I","brush","my","teeth."],"I brush my teeth.","brush my teeth = чистить зубы"),
 q("Choose the morning action.","🌅",["get up","go to bed","sleep at night"],0,"get up = вставать"),
 build("Собери: «Я ложусь спать в девять».",["I","go","to","bed","at","nine."],"I go to bed at nine.","go to bed = ложиться спать"),
 q("Choose the correct routine.","📅",["I go to school every day.","I school go every day.","I am go school."],0,"every day = каждый день")
]
};
Object.keys(CURRICULUM_EXTRA).forEach(key=>levels[key]?.questions.push(...CURRICULUM_EXTRA[key]));

let state = loadState();
let currentKey = "starter";
let currentIndex = 0;
let answered = false;
let levelStartXP = 0;
let levelStartGems = 0;
let lilyVoice = null;

function loadState(){
  try{
    const saved = JSON.parse(localStorage.getItem("english_quest_v4") || "null");
    if(saved && typeof saved === "object") return {xp:0,gems:0,completed:[],...saved};
  }catch(e){}
  return {xp:0,gems:0,completed:[]};
}
function save(){localStorage.setItem("english_quest_v4",JSON.stringify(state));updateStats();}
function updateStats(){
  ["playerXP","mapXP","lessonXP"].forEach(id=>{const e=document.getElementById(id);if(e)e.textContent=state.xp;});
  ["playerGems","mapGems","lessonGems"].forEach(id=>{const e=document.getElementById(id);if(e)e.textContent=state.gems;});
  const xp=document.getElementById("progressXP"), lessons=document.getElementById("progressLessons"), level=document.getElementById("playerLevel"), meter=document.getElementById("xpMeter");
  if(xp)xp.textContent=state.xp;
  if(lessons)lessons.textContent=state.completed.length;
  if(level)level.textContent=Math.max(1,Math.floor(state.xp/100)+1);
  if(meter)meter.style.width=(state.xp%100)+"%";
}
function show(id){document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));document.getElementById(id)?.classList.add("active");window.scrollTo(0,0);}
function goHome(){show("homeScreen");updateStats();}
function showMap(){renderMap();updateStats();show("mapScreen");}
function renderMap(){
  const grid=document.getElementById("worldMap"); if(!grid)return; grid.innerHTML="";
  zones.forEach((z,i)=>{
    const unlocked=i===0 || state.completed.includes(zones[i-1].key);
    const done=state.completed.includes(z.key);
    const card=document.createElement("button"); card.type="button"; card.className="world-card-item"+(unlocked?"":" locked");
    card.innerHTML=`<div class="world-card-top"><div class="world-icon">${z.icon}</div>${unlocked?`<span class="chapter-pill">${done?"✓ Пройдено":"Играть"}</span>`:'<div class="lock">🔒</div>'}</div><div class="world-name">${z.title}</div><div class="world-description">${z.sub}</div>`;
    if(unlocked)card.addEventListener("click",()=>startLevel(z.key));
    grid.appendChild(card);
  });
}
function startLevel(key){currentKey=key;currentIndex=0;answered=false;levelStartXP=state.xp;levelStartGems=state.gems;document.getElementById("lessonTitle").textContent=levels[key].name;show("lessonScreen");renderLesson();}
function renderLesson(){
  const data=levels[currentKey], total=data.questions.length;
  document.getElementById("lessonCounter").textContent=`${currentIndex+1} / ${total}`;
  document.getElementById("progressBar").style.width=`${(currentIndex/total)*100}%`;
  const item=data.questions[currentIndex]; item.type==="build"?renderBuilder(item):renderChoice(item);
}
function visual(image){return typeof image==="string"&&image.startsWith("http")?`<img class="big-image" src="${image}" alt="Learning illustration">`:`<div class="big-image emoji-image">${image}</div>`;}
function renderChoice(item){
  answered=false;
  const box=document.getElementById("lessonContent");
  box.innerHTML=`${visual(item.image)}<div class="lesson-kind">СЛОВО · ФРАЗА · ПОНИМАНИЕ</div><div class="question question-with-translation" tabindex="0" data-translation="${item.questionRu||""}">${item.question}</div><button id="listenQuestion" class="listen-button" type="button">🔊 Слушать</button><div id="answers" class="answer-grid"></div><div id="feedback" class="feedback"></div><div class="lesson-actions"><button id="speakButton" class="speak-button" type="button" hidden>🎤 Повторить</button><button id="nextButton" class="next-button" type="button" hidden>Дальше ➜</button></div>`;
  document.getElementById("listenQuestion").onclick=()=>speak(item.question);
  document.getElementById("speakButton").onclick=()=>listenAnswer(item.options[item.correctIndex]);
  document.getElementById("nextButton").onclick=nextItem;
  const answers=document.getElementById("answers");
  item.options.forEach((text,i)=>{const b=document.createElement("button");b.type="button";b.className="answer-button";b.textContent=text;b.onclick=()=>selectChoice(i,b,item);answers.appendChild(b);});
}
function renderBuilder(item){
  answered=false; let picked=[];
  const box=document.getElementById("lessonContent");
  box.innerHTML=`<div class="builder-hero">🧩</div><div class="lesson-kind">СОБЕРИ ФРАЗУ</div><div class="question question-with-translation" tabindex="0" data-translation="${item.questionRu||""}">${item.question}</div><button id="buildListen" class="listen-button" type="button">🔊 Послушать ответ</button><div class="sentence-slot" id="sentenceSlot">Нажимай слова по порядку</div><div class="word-bank" id="wordBank"></div><div id="feedback" class="feedback"></div><div class="lesson-actions"><button id="resetSentence" class="secondary-button small-button" type="button">↺ Заново</button><button id="checkSentence" class="next-button" type="button">Проверить ✓</button><button id="nextButton" class="next-button" type="button" hidden>Дальше ➜</button></div>`;
  const bank=document.getElementById("wordBank");
  [...item.words].sort(()=>Math.random()-0.5).forEach(word=>{const b=document.createElement("button");b.type="button";b.className="word-tile";b.textContent=word;b.onclick=()=>{picked.push(word);b.disabled=true;updateSlot();};bank.appendChild(b);});
  function updateSlot(){document.getElementById("sentenceSlot").textContent=picked.join(" ")||"Нажимай слова по порядку";}
  document.getElementById("buildListen").onclick=()=>speak(item.answer,true);
  document.getElementById("resetSentence").onclick=()=>{picked=[];document.querySelectorAll(".word-tile").forEach(b=>b.disabled=false);updateSlot();};
  document.getElementById("nextButton").onclick=nextItem;
  document.getElementById("checkSentence").onclick=()=>{if(normalize(picked.join(" "))===normalize(item.answer)){answered=true;award(item,`Отлично! ${item.answer}`);document.getElementById("checkSentence").hidden=true;document.getElementById("nextButton").hidden=false;}else{feedback(item.tip||"Проверь порядок слов.","error");speak(item.answer,true);}};
}
function selectChoice(index,btn,item){if(answered)return;if(index===item.correctIndex){document.querySelectorAll(".answer-button").forEach(b=>b.disabled=true);btn.classList.add("correct");award(item,`Верно! ${item.tip}`);}else{btn.classList.add("wrong");btn.disabled=true;feedback("Попробуй ещё раз. 🔎","error");}}
function award(item,message){if(answered&&item.type!=="build")return;answered=true;state.xp+=10;state.gems+=1;save();feedback(`${message||"Отлично!"} +10 XP ⭐`,"success");document.getElementById("speakButton")?.removeAttribute("hidden");document.getElementById("nextButton")?.removeAttribute("hidden");speak(item.answer||item.options[item.correctIndex],true);}
function feedback(text,kind){const e=document.getElementById("feedback");if(e){e.textContent=text;e.className=`feedback ${kind}`;}}
function nextItem(){currentIndex++;if(currentIndex>=levels[currentKey].questions.length){finishLevel();return;}renderLesson();}
function finishLevel(){
  if(!state.completed.includes(currentKey))state.completed.push(currentKey);save();
  const x=state.xp-levelStartXP,g=state.gems-levelStartGems;
  const pos=zones.findIndex(z=>z.key===currentKey),next=zones[pos+1];
  document.getElementById("rewardTitle").textContent="Глава пройдена!";
  document.getElementById("rewardText").textContent=next?`Ты заработал ${x} XP и ${g} 💎. Следующая глава: ${next.title}`:`Ты прошёл весь маршрут Spotlight 3! ${x} XP и ${g} 💎`;
  document.getElementById("rewardXP").textContent=`+${x} XP`;document.getElementById("rewardGems").textContent=`+${g}`;show("rewardScreen");speak("Well done!",true);
}
function normalize(s){return String(s).toLowerCase().replace(/[.,!?;:’']/g,"").replace(/\s+/g," ").trim();}
function speak(text,slow=false){if(!("speechSynthesis" in window))return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang="en-US";u.rate=slow?.72:.88;u.pitch=1.05;if(lilyVoice)u.voice=lilyVoice;speechSynthesis.speak(u);}
function setupVoice(){if(!("speechSynthesis" in window))return;const choose=()=>{const voices=speechSynthesis.getVoices();lilyVoice=voices.find(v=>/^en-US/i.test(v.lang))||voices.find(v=>/^en-GB/i.test(v.lang))||voices.find(v=>/^en/i.test(v.lang))||null;};choose();speechSynthesis.onvoiceschanged=choose;}
function listenAnswer(correct){
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SR){feedback("Микрофон в этом браузере недоступен. Послушай и повтори вслух.","info");return;}
  const r=new SR();r.lang="en-US";r.interimResults=false;r.maxAlternatives=3;
  r.onresult=e=>{const heard=normalize(e.results[0][0].transcript), target=normalize(correct);const words=target.split(" ").filter(w=>w.length>2);const hits=words.filter(w=>heard.includes(w)).length;feedback(hits>=Math.max(1,Math.ceil(words.length*.6))?"Звучит отлично! 🎉":"Хорошая попытка — послушай ещё раз и повтори.",hits>=Math.max(1,Math.ceil(words.length*.6))?"success":"info");};
  r.onerror=()=>feedback("Не получилось услышать голос. Нажми ещё раз.","info");try{r.start();}catch(e){feedback("Микрофон уже занят. Попробуй ещё раз.","info");}
}
window.__questBonus=(amount)=>{state.xp+=amount;save();const el=document.getElementById("labXP");if(el)el.textContent=state.xp;};

function setupDashboard(){
  const savedAvatar=localStorage.getItem("english_quest_avatar");
  const img=document.getElementById("childAvatar"), placeholder=document.getElementById("avatarPlaceholder");
  if(savedAvatar&&img){img.src=savedAvatar;img.hidden=false;if(placeholder)placeholder.hidden=true;}
  document.getElementById("avatarInput")?.addEventListener("change",e=>{
    const file=e.target.files?.[0]; if(!file)return;
    const reader=new FileReader();
    reader.onload=()=>{localStorage.setItem("english_quest_avatar",reader.result);if(img){img.src=reader.result;img.hidden=false;}if(placeholder)placeholder.hidden=true;};
    reader.readAsDataURL(file);
  });
  const messages=[
    "You can do it! Let's learn something new today!",
    "Great job! Every little step makes your English stronger!",
    "Ready? I have a fun challenge for you!",
    "Let's play, listen and speak English together!"
  ];
  const msg=document.getElementById("coachMessage"); if(msg)msg.textContent=messages[state.completed.length%messages.length];
  document.getElementById("coachListen")?.addEventListener("click",()=>speak(msg?.textContent||messages[0]));
  document.querySelectorAll(".quest-tile").forEach(b=>b.addEventListener("click",()=>startLevel(b.dataset.zone)));
  document.querySelectorAll(".tool-button").forEach(b=>b.addEventListener("click",()=>{
    const tool=b.dataset.tool;
    if(tool==="wordbook" && window.openWordbook){window.openWordbook();return;}
    if(["tobe","todo","have","has","singular","plural","size"].includes(tool)){
      const topic = tool==="singular" ? "plural" : tool;
      if(window.openTopicLab){ window.openTopicLab(topic); }
      return;
    }
    startLevel(tool||"starter");
  }));
}
function startSizeGame(){
  currentKey="starter";currentIndex=0;answered=false;show("lessonScreen");
  document.getElementById("lessonTitle").textContent="🔍 Big · Bigger · Biggest";
  document.getElementById("lessonCounter").textContent="Игра";
  document.getElementById("progressBar").style.width="100%";
  const box=document.getElementById("lessonContent");
  let size=1;
  box.innerHTML=`<div class="lesson-kind">ИНТЕРАКТИВНАЯ ИГРА</div><div class="question">Сделай картинку BIGGER!</div><div class="big-image emoji-image" id="sizeArt" style="font-size:100px;transform:scale(1);transition:.25s">🐘</div><div class="lesson-actions"><button class="speak-button" id="minusSize">−</button><button class="speak-button" id="plusSize">＋</button><button class="speak-button" id="resetSize">↺</button></div><div id="feedback" class="feedback info">Увеличивай и уменьшай слона. Попробуй сделать его BIGGEST! ⭐</div>`;
  const art=document.getElementById("sizeArt"), fb=document.getElementById("feedback");
  document.getElementById("plusSize").onclick=()=>{size=Math.min(2.2,size+.2);art.style.transform=`scale(${size})`;fb.textContent=size>=2?"Amazing! BIGGEST! 🏆":"Bigger! Keep going!";fb.className="feedback success";state.xp+=2;save();};
  document.getElementById("minusSize").onclick=()=>{size=Math.max(.55,size-.2);art.style.transform=`scale(${size})`;fb.textContent="Smaller! Now try Smallest.";fb.className="feedback info";};
  document.getElementById("resetSize").onclick=()=>{size=1;art.style.transform="scale(1)";fb.textContent="Ready for another try!";};
}
function showHomeFromLab(){document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));document.getElementById("homeScreen")?.classList.add("active");updateStats();}
function init(){
  updateStats();setupVoice();setupDashboard();
  document.getElementById("startQuest")?.addEventListener("click",showMap);
  document.getElementById("gamesBtn")?.addEventListener("click",()=>startLevel("school"));
  document.getElementById("mapHome")?.addEventListener("click",goHome);
  document.getElementById("lessonBack")?.addEventListener("click",showMap);
  document.getElementById("rewardMap")?.addEventListener("click",showMap);
  document.getElementById("rewardHome")?.addEventListener("click",goHome);
  document.getElementById("topicLabBack")?.addEventListener("click",showHomeFromLab);
}
document.addEventListener("DOMContentLoaded",init);
