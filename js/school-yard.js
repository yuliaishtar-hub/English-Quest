(() => {
  let mission = 0;
  let found = new Set();
  let running = false;
  const missions = [
    {id:'bag',icon:'🎒',word:'school bag',prompt:'Find the school bag!',x:'16%',y:'63%'},
    {id:'pen',icon:'🖊️',word:'pen',prompt:'Find the pen!',x:'43%',y:'30%'},
    {id:'pencil',icon:'✏️',word:'pencil',prompt:'Find the pencil!',x:'70%',y:'67%'},
    {id:'ruler',icon:'📏',word:'ruler',prompt:'Find the ruler!',x:'82%',y:'28%'},
    {id:'eraser',icon:'⬜',word:'eraser',prompt:'Find the eraser!',x:'53%',y:'75%'},
    {id:'book',icon:'📕',word:'book',prompt:'Find the book!',x:'30%',y:'24%'},
    {id:'pencil case',icon:'🖍️',word:'pencil case',prompt:'Find the pencil case!',x:'88%',y:'74%'}
  ];
  const el=id=>document.getElementById(id);
  function speak(text){if(!window.speechSynthesis)return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='en-US';u.rate=.78;u.pitch=1.08;speechSynthesis.speak(u)}
  function openSchool(){running=true;mission=0;found=new Set();document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));el('lessonScreen').classList.add('active');el('lessonTitle').textContent='🏫 School Yard';render()}
  function render(){
    const c=missions[mission];
    el('lessonCounter').textContent=`${mission+1} / ${missions.length}`;
    el('progressBar').style.width=`${(mission/missions.length)*100}%`;
    el('lessonContent').innerHTML=`<div class="yard-wrap"><div class="yard-intro"><div class="eyebrow">SCHOOL QUEST</div><h2>${c.prompt}</h2><p>Tap the object, listen to the word and complete the mission.</p><button class="yard-listen" id="yardListen">🔊 Listen</button></div><div class="school-yard-scene"><div class="yard-sky">☁️ &nbsp;&nbsp;☀️ &nbsp;&nbsp;☁️</div><div class="school-building">🏫<span>SCHOOL</span></div><div class="tree tree-a">🌳</div><div class="tree tree-b">🌳</div><div class="path">▰ ▰ ▰ ▰ ▰</div>${missions.map((m,i)=>`<button class="yard-object ${i===mission?'target':''} ${found.has(m.id)?'found':''}" data-object="${m.id}" style="left:${m.x};top:${m.y}">${m.icon}<small>${m.word}</small></button>`).join('')}<div class="yard-lily">🧒</div></div><div class="yard-status" id="yardStatus">Mission ${mission+1}: find <strong>${c.word}</strong>.</div></div>`;
    el('yardListen').addEventListener('click',()=>speak(c.prompt));
    document.querySelectorAll('.yard-object').forEach(b=>b.addEventListener('click',()=>choose(b.dataset.object)));
    speak(c.prompt);
  }
  function choose(id){
    const c=missions[mission], status=el('yardStatus');
    if(id!==c.id){status.innerHTML=`Not this one! Look for <strong>${c.word}</strong>. 👀`;status.className='yard-status wrong';speak(`Find the ${c.word}.`);return}
    found.add(id);status.innerHTML=`Great! <strong>${c.word}</strong>! +10 XP ⭐`;status.className='yard-status success';speak(`Great! It's a ${c.word}!`);
    let state;try{state=JSON.parse(localStorage.getItem('english_quest_v2')||'null')}catch(e){}
    if(state){state.xp=(state.xp||0)+10;state.gems=(state.gems||0)+1;localStorage.setItem('english_quest_v2',JSON.stringify(state));['playerXP','mapXP','lessonXP'].forEach(id=>{if(el(id))el(id).textContent=state.xp});['playerGems','mapGems','lessonGems'].forEach(id=>{if(el(id))el(id).textContent=state.gems})}
    setTimeout(()=>{mission++;if(mission>=missions.length)finish();else render()},850);
  }
  function finish(){el('progressBar').style.width='100%';el('lessonCounter').textContent=`${missions.length} / ${missions.length}`;el('lessonContent').innerHTML=`<div class="yard-finish"><div class="finish-icon">🏆</div><div class="eyebrow">MISSION COMPLETE</div><h2>School Yard Hero!</h2><p>You found every school item.</p><div class="word-badges">${missions.map(m=>`<span>${m.icon} ${m.word}</span>`).join('')}</div><p class="finish-tip">Now say: <strong>“What's this?” — “It's a school bag!”</strong></p><button class="next-button" id="yardBackMap">🗺️ Back to World Map</button></div>`;speak('Well done! School Yard complete!');el('yardBackMap').addEventListener('click',()=>{running=false;el('lessonBack').click()})}
  document.addEventListener('click',e=>{const card=e.target.closest('.world-card-item');if(!card)return;const name=card.querySelector('.world-name')?.textContent||'';if(/School/.test(name)){e.preventDefault();e.stopPropagation();openSchool()}},true);
  document.addEventListener('click',e=>{if(e.target.id==='lessonBack'&&running)running=false});
})();
