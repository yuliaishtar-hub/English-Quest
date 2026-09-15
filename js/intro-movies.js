(() => {
  // Изображения берём из старого English Adventure — реальные JPG.
  const IMG = "https://yuliaishtar-hub.github.io/inglish-adventure/";
  const A = (name) => IMG + encodeURIComponent(name);

  const scenes = {
    family: [
      ["Hi! I'm Lily! 👋","Привет! Я Лили!","Hi! I'm Lily!","Lili.jpg"],
      ["This is my family.","Это моя семья.","This is my family.","mum dad.jpg"],
      ["This is my mum and this is my dad.","Это моя мама, а это мой папа.","This is my mum and this is my dad.","mummy.jpg"],
      ["I have got a sister.","У меня есть сестра.","I have got a sister.","Lilissisterbig.jpg"],
      ["I love my grandma and grandpa! 💜","Я люблю свою бабушку и дедушку!","I love my grandma and grandpa!","grandmagrandpa.jpg"]
    ],
    home: [
      ["Welcome to my home! 🏠","Добро пожаловать в мой дом!","Welcome to my home!","kitchen.jpg"],
      ["This is my house.","Это мой дом.","This is my house.","kitchen.jpg"],
      ["There is a kitchen and a living room.","Здесь есть кухня и гостиная.","There is a kitchen and a living room.","kitchen.jpg"],
      ["My home is warm and nice.","Мой дом тёплый и уютный.","My home is warm and nice.","bedroom.jpg"],
      ["Come in! 😊","Заходи!","Come in!","bathroom.jpg"]
    ],
    room: [
      ["This is my room.","Это моя комната.","This is my room.","Lily's Room1.jpg"],
      ["I have got a bed and a desk.","У меня есть кровать и письменный стол.","I have got a bed and a desk.","Lily's Room1.jpg"],
      ["My books are on the shelf.","Мои книги на полке.","My books are on the shelf.","Lily's Room1.jpg"],
      ["My school bag is by the desk.","Мой школьный рюкзак рядом со столом.","My school bag is by the desk.","Lily's Room1.jpg"],
      ["I like my room! 🌸","Мне нравится моя комната!","I like my room!","Lily's Room1.jpg"]
    ],
    school: [
      ["This is my school! 🏫","Это моя школа!","This is my school!","Lili scool.jpg"],
      ["This is my classroom.","Это мой класс.","This is my classroom.","Lili scool.jpg"],
      ["I have got a school bag, a pen and an eraser.","У меня есть школьный рюкзак, ручка и ластик.","I have got a school bag, a pen and an eraser.","Lili scool.jpg"],
      ["I listen, read and write at school.","В школе я слушаю, читаю и пишу.","I listen, read and write at school.","Lili scool.jpg"],
      ["Let's learn English together! ⭐","Давай учить английский вместе!","Let's learn English together!","Lili scool.jpg"]
    ]
  };

  const movies = [
    {key:'family',icon:'👨‍👩‍👧',title:'My Family'},
    {key:'home',icon:'🏠',title:'My Home'},
    {key:'room',icon:'🛏️',title:'My Room'},
    {key:'school',icon:'🏫',title:'My School'}
  ];

  function styles(){
    if(document.getElementById('introMovieStyles')) return;
    const s=document.createElement('style');
    s.id='introMovieStyles';
    s.textContent=`
      .intro-movies{margin:22px 0 26px}.intro-movies-title{font-weight:900;font-size:18px;margin-bottom:12px;color:#39326e}.intro-movie-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
      .intro-movie-btn{border:0;border-radius:20px;padding:16px 12px;background:linear-gradient(135deg,#f5efff,#eaf7ff);cursor:pointer;text-align:left;box-shadow:0 8px 22px rgba(70,65,120,.09);transition:.18s}.intro-movie-btn:hover{transform:translateY(-3px);box-shadow:0 12px 28px rgba(70,65,120,.15)}.intro-movie-icon{font-size:30px}.intro-movie-name{display:block;margin-top:8px;font-weight:900;color:#39326e}.intro-movie-sub{display:block;margin-top:4px;font-size:12px;color:#68738a}
      .movie-overlay{position:fixed;inset:0;background:rgba(20,25,50,.72);display:none;align-items:center;justify-content:center;padding:18px;z-index:7000}.movie-overlay.show{display:flex}.movie-box{width:min(980px,100%);max-height:calc(100vh - 36px);overflow:auto;background:#fff;border-radius:30px;padding:18px;box-shadow:0 30px 90px rgba(0,0,0,.38);position:relative}.movie-close{position:absolute;right:14px;top:12px;z-index:5;border:0;background:rgba(255,255,255,.95);border-radius:12px;padding:8px 12px;font-weight:900;cursor:pointer}
      .movie-stage{position:relative;height:min(500px,calc(100vh - 300px));min-height:360px;border-radius:24px;overflow:hidden;background:linear-gradient(135deg,#eef6ff,#f7f1ff);display:flex;align-items:center;justify-content:center}.movie-main-image{width:100%;height:100%;display:block;object-fit:contain;object-position:center;transition:transform .55s ease,filter .35s ease,box-shadow .35s ease}.movie-main-image.listening{animation:imageListening 1.15s ease-in-out infinite;filter:saturate(1.14) brightness(1.06);box-shadow:inset 0 0 0 5px rgba(117,103,217,.7),inset 0 0 55px rgba(117,103,217,.32)}
      .movie-listening{position:absolute;left:50%;bottom:18px;transform:translateX(-50%);z-index:4;background:rgba(255,255,255,.94);color:#4c4392;border-radius:999px;padding:8px 16px;font-size:14px;font-weight:900;box-shadow:0 8px 22px rgba(30,30,70,.18);opacity:0;pointer-events:none;transition:.2s}.movie-listening.show{opacity:1}
      .movie-bubble{position:absolute;top:7%;left:50%;transform:translateX(-50%);max-width:76%;background:#fff;border-radius:22px;padding:14px 20px;text-align:center;font-size:22px;font-weight:900;color:#302b63;box-shadow:0 10px 28px rgba(30,30,70,.15);animation:bubbleIn .55s ease;z-index:3}.movie-bubble:after{content:"";position:absolute;bottom:-12px;left:50%;border:12px solid transparent;border-top-color:#fff;border-bottom:0;transform:translateX(-50%)}
      .movie-text{padding:16px 6px 0}.movie-en{font-size:28px;font-weight:900;color:#302b63;line-height:1.25}.movie-ru{font-size:18px;color:#68738a;margin-top:8px}.movie-scene{font-size:13px;color:#8a7bbd;font-weight:800;margin-bottom:6px}.movie-controls{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:14px}.movie-control{border:0;border-radius:14px;padding:11px 16px;font-weight:900;cursor:pointer}.movie-control:disabled{opacity:.45;cursor:default}.movie-prev{background:#eeeefa}.movie-next{background:#7567d9;color:#fff}.movie-speak{background:#e8f7ff}.movie-dots{font-weight:800;color:#68738a}.movie-progress{height:5px;background:#ecebfa;border-radius:99px;margin-top:12px;overflow:hidden}.movie-progress i{display:block;height:100%;background:#7567d9;transition:width .35s ease}
      @keyframes imageListening{0%,100%{transform:scale(1);filter:saturate(1.04) brightness(1)}50%{transform:scale(1.012);filter:saturate(1.18) brightness(1.08)}}@keyframes bubbleIn{from{opacity:0;transform:translateX(-50%) translateY(-12px) scale(.96)}to{opacity:1;transform:translateX(-50%) translateY(0) scale(1)}}
      @media(max-width:700px){.intro-movie-grid{grid-template-columns:1fr 1fr}.movie-stage{height:calc(100vh - 390px);min-height:300px}.movie-bubble{font-size:18px;max-width:86%}.movie-en{font-size:23px}}@media(max-width:430px){.intro-movie-grid{grid-template-columns:1fr}.movie-stage{height:calc(100vh - 400px);min-height:270px}.movie-controls{flex-wrap:wrap}}
    `;
    document.head.appendChild(s)
  }

  let speechTimer=null;
  function speak(text,img,badge){
    if(!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    clearTimeout(speechTimer);
    img.classList.remove('listening');badge.classList.remove('show');
    speechTimer=setTimeout(()=>{img.classList.add('listening');badge.classList.add('show')},80);
    const u=new SpeechSynthesisUtterance(text);u.lang='en-US';u.rate=.72;
    u.onend=()=>{img.classList.remove('listening');badge.classList.remove('show')};
    u.onerror=()=>{img.classList.remove('listening');badge.classList.remove('show')};
    window.speechSynthesis.speak(u)
  }

  function openMovie(movie){
    styles();
    let ov=document.getElementById('movieOverlay');
    if(!ov){
      ov=document.createElement('div');ov.id='movieOverlay';ov.className='movie-overlay';
      ov.innerHTML=`<div class="movie-box"><button class="movie-close" type="button">✕</button><div class="movie-stage"><img class="movie-main-image" alt="Scene"><div class="movie-bubble" id="movieBubble"></div><div class="movie-listening" id="movieListening">🔊 Слушаем картинку</div></div><div class="movie-text"><div class="movie-scene" id="movieScene"></div><div class="movie-en" id="movieEn"></div><div class="movie-ru" id="movieRu"></div></div><div class="movie-progress"><i id="movieProgress"></i></div><div class="movie-controls"><button class="movie-control movie-prev" type="button">← Назад</button><button class="movie-control movie-speak" type="button">🔊 Послушать</button><span class="movie-dots" id="movieDots"></span><button class="movie-control movie-next" type="button">Дальше →</button></div></div>`;
      document.body.appendChild(ov);
      ov.addEventListener('click',e=>{if(e.target===ov||e.target.closest('.movie-close')){ov.classList.remove('show');window.speechSynthesis?.cancel();clearTimeout(speechTimer);ov.querySelector('.movie-main-image')?.classList.remove('listening');ov.querySelector('#movieListening')?.classList.remove('show')}})
    }
    let n=0;const data=scenes[movie.key],img=ov.querySelector('.movie-main-image'),bubble=ov.querySelector('#movieBubble'),scene=ov.querySelector('#movieScene'),en=ov.querySelector('#movieEn'),ru=ov.querySelector('#movieRu'),dots=ov.querySelector('#movieDots'),bar=ov.querySelector('#movieProgress'),badge=ov.querySelector('#movieListening');
    const render=()=>{
      const x=data[n];
      img.src=A(x[3]);img.onerror=()=>{img.onerror=null;img.src=A('Lili.jpg')};
      img.classList.remove('listening');badge.classList.remove('show');
      bubble.textContent=x[0].replace(/[👋🏠💜😊🌸⭐]+/g,'').trim();
      scene.textContent=`${movie.icon} ${movie.title} · Сцена ${n+1} из ${data.length}`;
      en.textContent=x[0];ru.textContent=x[1];dots.textContent=`${n+1} / ${data.length}`;bar.style.width=`${((n+1)/data.length)*100}%`;
      ov.querySelector('.movie-prev').disabled=n===0;
      ov.querySelector('.movie-next').textContent=n===data.length-1?'✓ Закрыть':'Дальше →';
    };
    ov.querySelector('.movie-prev').onclick=()=>{if(n>0){n--;render();speak(data[n][2],img,badge)}};
    ov.querySelector('.movie-next').onclick=()=>{if(n<data.length-1){n++;render();speak(data[n][2],img,badge)}else{ov.classList.remove('show');window.speechSynthesis?.cancel();clearTimeout(speechTimer);img.classList.remove('listening');badge.classList.remove('show')}};
    ov.querySelector('.movie-speak').onclick=()=>speak(data[n][2],img,badge);
    render();ov.classList.add('show');setTimeout(()=>speak(data[0][2],img,badge),250)
  }

  function install(){
    const map=document.querySelector('#worldMap');if(!map||document.getElementById('introMovies'))return;
    const wrap=document.createElement('section');wrap.id='introMovies';wrap.className='intro-movies';
    wrap.innerHTML=`<div class="intro-movies-title">🎬 Сначала посмотрим мини-мультфильмы с Лили</div><div class="intro-movie-grid">${movies.map(m=>`<button class="intro-movie-btn" data-movie="${m.key}" type="button"><span class="intro-movie-icon">${m.icon}</span><span class="intro-movie-name">${m.title}</span><span class="intro-movie-sub">5 сцен · реальные картинки · английская озвучка</span></button>`).join('')}</div>`;
    map.parentNode.insertBefore(wrap,map);wrap.querySelectorAll('.intro-movie-btn').forEach(b=>b.onclick=()=>openMovie(movies.find(m=>m.key===b.dataset.movie)))
  }
  document.addEventListener('DOMContentLoaded',()=>{styles();setTimeout(install,300);setTimeout(install,1000);});
})();
