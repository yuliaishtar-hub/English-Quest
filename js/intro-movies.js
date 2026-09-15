(() => {
  // Все изображения берём из старого English Adventure — это реальные JPG, а не эмодзи.
  const IMG = "https://yuliaishtar-hub.github.io/inglish-adventure/";
  const A = (name) => IMG + encodeURIComponent(name);

  const scenes = {
    family: [
      ["Hi! I'm Lily! 👋","Привет! Я Лили!","Hi! I'm Lily!","Lili.jpg",[],"home"],
      ["This is my family.","Это моя семья.","This is my family.","Lili.jpg",["mum dad.jpg","Lilissisterbig.jpg"],"family"],
      ["This is my mum and this is my dad.","Это моя мама, а это мой папа.","This is my mum and this is my dad.","Lili.jpg",["mummy.jpg","daddy.jpg"],"parents"],
      ["I have got a sister.","У меня есть сестра.","I have got a sister.","Lili.jpg",["Lilissisterbig.jpg"],"sister"],
      ["I love my family! 💜","Я люблю свою семью!","I love my family!","grandmagrandpa.jpg",["Lili.jpg"],"love"]
    ],
    home: [
      ["Welcome to my home! 🏠","Добро пожаловать в мой дом!","Welcome to my home!","kitchen.jpg",["Lili.jpg"],"house"],
      ["This is my house.","Это мой дом.","This is my house.","kitchen.jpg",["Lili.jpg","table.jpg"],"house2"],
      ["There is a kitchen and a living room.","Здесь есть кухня и гостиная.","There is a kitchen and a living room.","kitchen.jpg",["table.jpg","chair.jpg"],"rooms"],
      ["My home is warm and nice.","Мой дом тёплый и уютный.","My home is warm and nice.","bedroom.jpg",["bed.jpg","Lili bear.jpg"],"warm"],
      ["Come in! 😊","Заходи!","Come in!","bathroom.jpg",["Lili.jpg"],"door"]
    ],
    room: [
      ["This is my room.","Это моя комната.","This is my room.","Lily's Room1.jpg",["Lili.jpg"],"room"],
      ["I have got a bed and a desk.","У меня есть кровать и письменный стол.","I have got a bed and a desk.","Lily's Room1.jpg",["bed.jpg","chair.jpg"],"desk"],
      ["My books are on the shelf.","Мои книги на полке.","My books are on the shelf.","Lily's Room1.jpg",["book.jpg"],"books"],
      ["My school bag is by the desk.","Мой школьный рюкзак рядом со столом.","My school bag is by the desk.","Lily's Room1.jpg",["School bag.jpg","Pencil case.jpg"],"bag"],
      ["I like my room! 🌸","Мне нравится моя комната!","I like my room!","Lily's Room1.jpg",["Lili.jpg","bed.jpg"],"like"]
    ],
    school: [
      ["This is my school! 🏫","Это моя школа!","This is my school!","Lili scool.jpg",[],"school"],
      ["This is my classroom.","Это мой класс.","This is my classroom.","Lili scool.jpg",["book.jpg","chair1.jpg"],"class"],
      ["I have got a school bag, a pen and an eraser.","У меня есть школьный рюкзак, ручка и ластик.","I have got a school bag, a pen and an eraser.","Lili scool.jpg",["School bag.jpg","pen.jpg","Eraser.jpg"],"things"],
      ["I listen, read and write at school.","В школе я слушаю, читаю и пишу.","I listen, read and write at school.","Lili scool.jpg",["book.jpg","Notebook.jpg","pencil.jpg"],"learn"],
      ["Let's learn English together! ⭐","Давай учить английский вместе!","Let's learn English together!","Lili scool.jpg",["Lili.jpg","School bag.jpg"],"finish"]
    ]
  };

  const movies = [
    {key:'family',icon:'👨‍👩‍👧',title:'My Family'},
    {key:'home',icon:'🏠',title:'My Home'},
    {key:'room',icon:'🛏️',title:'My Room'},
    {key:'school',icon:'🏫',title:'My School'}
  ];

  function styles(){
    if(document.getElementById('introMovieStyles'))return;
    const s=document.createElement('style');s.id='introMovieStyles';s.textContent=`
      .intro-movies{margin:22px 0 26px}.intro-movies-title{font-weight:900;font-size:18px;margin-bottom:12px;color:#39326e}.intro-movie-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
      .intro-movie-btn{border:0;border-radius:20px;padding:16px 12px;background:linear-gradient(135deg,#f5efff,#eaf7ff);cursor:pointer;text-align:left;box-shadow:0 8px 22px rgba(70,65,120,.09);transition:.18s}.intro-movie-btn:hover{transform:translateY(-3px);box-shadow:0 12px 28px rgba(70,65,120,.15)}.intro-movie-icon{font-size:30px}.intro-movie-name{display:block;margin-top:8px;font-weight:900;color:#39326e}.intro-movie-sub{display:block;margin-top:4px;font-size:12px;color:#68738a}
      .movie-overlay{position:fixed;inset:0;background:rgba(20,25,50,.72);display:none;align-items:center;justify-content:center;padding:18px;z-index:7000}.movie-overlay.show{display:flex}.movie-box{width:min(980px,100%);background:#fff;border-radius:30px;padding:18px;box-shadow:0 30px 90px rgba(0,0,0,.38);position:relative}.movie-close{position:absolute;right:14px;top:12px;z-index:5;border:0;background:rgba(255,255,255,.95);border-radius:12px;padding:8px 12px;font-weight:900;cursor:pointer}.movie-stage{position:relative;min-height:500px;border-radius:24px;overflow:hidden;background:linear-gradient(160deg,#cceeff,#f7ddff);display:flex;align-items:center;justify-content:center}.movie-bg{position:absolute;inset:0;background-position:center;background-size:cover;background-repeat:no-repeat;transition:transform 5s ease,opacity .45s ease;filter:saturate(1.04)}.movie-bg:after{content:"";position:absolute;inset:0;background:linear-gradient(to top,rgba(20,20,50,.12),rgba(255,255,255,.04))}.movie-scene-art{position:absolute;inset:0;display:flex;align-items:flex-end;justify-content:center;padding:20px 28px 18px;animation:movieFade .55s ease}.movie-lily{height:360px;max-width:42%;object-fit:contain;filter:drop-shadow(0 14px 18px rgba(40,40,80,.25));animation:lilyFloat 2.8s ease-in-out infinite}.movie-props{position:absolute;left:4%;right:4%;bottom:5%;display:flex;justify-content:space-around;align-items:flex-end;gap:10px;pointer-events:none}.movie-prop{width:120px;height:100px;object-fit:contain;filter:drop-shadow(0 8px 10px rgba(30,30,60,.22));animation:propPop .7s ease both;border-radius:14px}.movie-bubble{position:absolute;top:7%;left:50%;transform:translateX(-50%);max-width:76%;background:#fff;border-radius:22px;padding:14px 20px;text-align:center;font-size:22px;font-weight:900;color:#302b63;box-shadow:0 10px 28px rgba(30,30,70,.15);animation:bubbleIn .55s ease;z-index:3}.movie-bubble:after{content:"";position:absolute;bottom:-12px;left:50%;border:12px solid transparent;border-top-color:#fff;border-bottom:0;transform:translateX(-50%)}.movie-text{padding:16px 6px 0}.movie-en{font-size:28px;font-weight:900;color:#302b63;line-height:1.25}.movie-ru{font-size:18px;color:#68738a;margin-top:8px}.movie-scene{font-size:13px;color:#8a7bbd;font-weight:800;margin-bottom:6px}.movie-controls{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:14px}.movie-control{border:0;border-radius:14px;padding:11px 16px;font-weight:900;cursor:pointer}.movie-control:disabled{opacity:.45;cursor:default}.movie-prev{background:#eeeefa}.movie-next{background:#7567d9;color:#fff}.movie-speak{background:#e8f7ff}.movie-dots{font-weight:800;color:#68738a}.movie-progress{height:5px;background:#ecebfa;border-radius:99px;margin-top:12px;overflow:hidden}.movie-progress i{display:block;height:100%;background:#7567d9;transition:width .35s ease}
      @keyframes lilyFloat{0%,100%{transform:translateY(0) rotate(-1deg)}50%{transform:translateY(-10px) rotate(1deg)}}@keyframes movieFade{from{opacity:0;transform:scale(1.04)}to{opacity:1;transform:scale(1)}}@keyframes bubbleIn{from{opacity:0;transform:translateX(-50%) translateY(-12px) scale(.96)}to{opacity:1;transform:translateX(-50%) translateY(0) scale(1)}}@keyframes propPop{from{opacity:0;transform:scale(.72) translateY(20px)}to{opacity:1;transform:scale(1) translateY(0)}}
      @media(max-width:700px){.intro-movie-grid{grid-template-columns:1fr 1fr}.movie-stage{min-height:520px}.movie-lily{height:300px;max-width:58%}.movie-prop{width:90px;height:78px}.movie-bubble{font-size:18px;max-width:86%}.movie-en{font-size:23px}.movie-props{gap:4px}}@media(max-width:430px){.intro-movie-grid{grid-template-columns:1fr}.movie-controls{flex-wrap:wrap}.movie-stage{min-height:470px}.movie-prop{width:70px;height:65px}}
    `;document.head.appendChild(s)
  }

  function speak(text){if(!window.speechSynthesis)return;window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='en-US';u.rate=.72;window.speechSynthesis.speak(u)}

  function openMovie(movie){
    styles();
    let ov=document.getElementById('movieOverlay');
    if(!ov){
      ov=document.createElement('div');ov.id='movieOverlay';ov.className='movie-overlay';
      ov.innerHTML=`<div class="movie-box"><button class="movie-close" type="button">✕</button><div class="movie-stage"><div class="movie-bg"></div><div class="movie-scene-art"><img class="movie-lily" alt="Lily"><div class="movie-props" id="movieProps"></div><div class="movie-bubble" id="movieBubble"></div></div></div><div class="movie-text"><div class="movie-scene" id="movieScene"></div><div class="movie-en" id="movieEn"></div><div class="movie-ru" id="movieRu"></div></div><div class="movie-progress"><i id="movieProgress"></i></div><div class="movie-controls"><button class="movie-control movie-prev" type="button">← Назад</button><button class="movie-control movie-speak" type="button">🔊 Послушать</button><span class="movie-dots" id="movieDots"></span><button class="movie-control movie-next" type="button">Дальше →</button></div></div>`;
      document.body.appendChild(ov);
      ov.addEventListener('click',e=>{if(e.target===ov||e.target.closest('.movie-close')){ov.classList.remove('show');window.speechSynthesis?.cancel()}})
    }
    let n=0;const data=scenes[movie.key],stage=ov.querySelector('.movie-stage'),bg=ov.querySelector('.movie-bg'),img=ov.querySelector('.movie-lily'),props=ov.querySelector('#movieProps'),bubble=ov.querySelector('#movieBubble'),scene=ov.querySelector('#movieScene'),en=ov.querySelector('#movieEn'),ru=ov.querySelector('#movieRu'),dots=ov.querySelector('#movieDots'),bar=ov.querySelector('#movieProgress');
    const render=()=>{
      const x=data[n];
      stage.dataset.scene=x[5];
      bg.style.backgroundImage=`url("${A(x[3])}")`;
      bg.style.transform=`scale(${1.04+n*.018}) translateX(${n%2?-1:1}%)`;
      img.src=A(x[3]);
      img.onerror=()=>{img.src=A('Lili.jpg')};
      props.innerHTML=x[4].map((name,i)=>`<img class="movie-prop" src="${A(name)}" alt="" style="animation-delay:${i*.12}s">`).join('');
      bubble.textContent=x[0].replace(/[👋🏠💜😊🌸⭐]+/g,'').trim();
      scene.textContent=`${movie.icon} ${movie.title} · Сцена ${n+1} из ${data.length}`;
      en.textContent=x[0];ru.textContent=x[1];dots.textContent=`${n+1} / ${data.length}`;bar.style.width=`${((n+1)/data.length)*100}%`;
      ov.querySelector('.movie-prev').disabled=n===0;
      ov.querySelector('.movie-next').textContent=n===data.length-1?'✓ Закрыть':'Дальше →';
    };
    ov.querySelector('.movie-prev').onclick=()=>{if(n>0){n--;render();speak(data[n][2])}};
    ov.querySelector('.movie-next').onclick=()=>{if(n<data.length-1){n++;render();speak(data[n][2])}else{ov.classList.remove('show');window.speechSynthesis?.cancel()}};
    ov.querySelector('.movie-speak').onclick=()=>speak(data[n][2]);
    render();ov.classList.add('show');setTimeout(()=>speak(data[0][2]),250)
  }

  function install(){
    const map=document.querySelector('#worldMap');if(!map||document.getElementById('introMovies'))return;
    const wrap=document.createElement('section');wrap.id='introMovies';wrap.className='intro-movies';
    wrap.innerHTML=`<div class="intro-movies-title">🎬 Сначала посмотрим мини-мультфильмы с Лили</div><div class="intro-movie-grid">${movies.map(m=>`<button class="intro-movie-btn" data-movie="${m.key}" type="button"><span class="intro-movie-icon">${m.icon}</span><span class="intro-movie-name">${m.title}</span><span class="intro-movie-sub">5 сцен · реальные картинки · английская озвучка</span></button>`).join('')}</div>`;
    map.parentNode.insertBefore(wrap,map);wrap.querySelectorAll('.intro-movie-btn').forEach(b=>b.onclick=()=>openMovie(movies.find(m=>m.key===b.dataset.movie)))
  }
  document.addEventListener('DOMContentLoaded',()=>{styles();setTimeout(install,300);setTimeout(install,1000);new MutationObserver(install).observe(document.body,{childList:true,subtree:true})})
})();
