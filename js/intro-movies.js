(() => {
  const IMG = "https://yuliaishtar-hub.github.io/inglish-adventure/";
  const movies = [
    {
      key: "family", icon: "👨‍👩‍👧", title: "Лили рассказывает: My Family",
      scenes: [
        ["Hi! I'm Lily! 👋", "Привет! Я Лили!", "Hi! I'm Lily!"],
        ["This is my family.", "Это моя семья.", "This is my family."],
        ["This is my mum and this is my dad.", "Это моя мама, а это мой папа.", "This is my mum and this is my dad."],
        ["I have got a sister.", "У меня есть сестра.", "I have got a sister."],
        ["I love my family! 💜", "Я люблю свою семью!", "I love my family!"]
      ]
    },
    {
      key: "home", icon: "🏠", title: "Лили рассказывает: My Home",
      scenes: [
        ["Welcome to my home! 🏠", "Добро пожаловать в мой дом!", "Welcome to my home!"],
        ["This is my house.", "Это мой дом.", "This is my house."],
        ["There is a kitchen and a living room.", "Здесь есть кухня и гостиная.", "There is a kitchen and a living room."],
        ["My home is warm and nice.", "Мой дом тёплый и уютный.", "My home is warm and nice."],
        ["Come in! 😊", "Заходи!", "Come in!"]
      ]
    },
    {
      key: "room", icon: "🛏️", title: "Лили рассказывает: My Room",
      scenes: [
        ["This is my room.", "Это моя комната.", "This is my room."],
        ["I have got a bed and a desk.", "У меня есть кровать и письменный стол.", "I have got a bed and a desk."],
        ["My books are on the shelf.", "Мои книги на полке.", "My books are on the shelf."],
        ["My school bag is by the desk.", "Мой школьный рюкзак рядом со столом.", "My school bag is by the desk."],
        ["I like my room! 🌸", "Мне нравится моя комната!", "I like my room!"]
      ]
    },
    {
      key: "school", icon: "🏫", title: "Лили рассказывает: My School",
      scenes: [
        ["This is my school! 🏫", "Это моя школа!", "This is my school!"],
        ["This is my classroom.", "Это мой класс.", "This is my classroom."],
        ["I have got a school bag, a pen and an eraser.", "У меня есть школьный рюкзак, ручка и ластик.", "I have got a school bag, a pen and an eraser."],
        ["I listen, read and write at school.", "В школе я слушаю, читаю и пишу.", "I listen, read and write at school."],
        ["Let's learn English together! ⭐", "Давай учить английский вместе!", "Let's learn English together!"]
      ]
    }
  ];

  function styles() {
    if (document.getElementById('introMovieStyles')) return;
    const s = document.createElement('style');
    s.id = 'introMovieStyles';
    s.textContent = `
      .intro-movies{margin:22px 0 26px}.intro-movies-title{font-weight:900;font-size:18px;margin-bottom:12px;color:#39326e}
      .intro-movie-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
      .intro-movie-btn{border:0;border-radius:20px;padding:16px 12px;background:linear-gradient(135deg,#f5efff,#eaf7ff);cursor:pointer;text-align:left;box-shadow:0 8px 22px rgba(70,65,120,.09);transition:.18s}
      .intro-movie-btn:hover{transform:translateY(-3px);box-shadow:0 12px 28px rgba(70,65,120,.15)}
      .intro-movie-icon{font-size:30px}.intro-movie-name{display:block;margin-top:8px;font-weight:900;color:#39326e}.intro-movie-sub{display:block;margin-top:4px;font-size:12px;color:#68738a}
      .movie-overlay{position:fixed;inset:0;background:rgba(25,30,55,.62);display:none;align-items:center;justify-content:center;padding:18px;z-index:7000}.movie-overlay.show{display:flex}
      .movie-box{width:min(760px,100%);background:linear-gradient(145deg,#fff,#f7f5ff);border-radius:30px;padding:22px;box-shadow:0 30px 90px rgba(0,0,0,.3);position:relative}
      .movie-close{position:absolute;right:16px;top:14px;border:0;background:#eeeefa;border-radius:12px;padding:8px 12px;font-weight:900;cursor:pointer}
      .movie-screen{min-height:410px;border-radius:24px;background:linear-gradient(160deg,#dff4ff,#f7e7ff);display:flex;align-items:center;justify-content:center;gap:25px;padding:30px;overflow:hidden}
      .movie-lily{width:190px;height:240px;object-fit:contain;border-radius:22px;filter:drop-shadow(0 12px 15px rgba(50,50,90,.18))}.movie-fallback{font-size:120px}
      .movie-text{flex:1}.movie-en{font-size:27px;font-weight:900;color:#302b63;line-height:1.25}.movie-ru{font-size:19px;color:#68738a;margin-top:14px;line-height:1.4}.movie-scene{font-size:13px;color:#8a7bbd;margin-bottom:10px;font-weight:800}
      .movie-controls{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:16px}.movie-control{border:0;border-radius:14px;padding:11px 16px;font-weight:900;cursor:pointer}.movie-prev{background:#eeeefa}.movie-next{background:#7567d9;color:#fff}.movie-speak{background:#e8f7ff}.movie-dots{font-weight:800;color:#68738a}
      @media(max-width:700px){.intro-movie-grid{grid-template-columns:1fr 1fr}.movie-screen{flex-direction:column;min-height:520px;text-align:center}.movie-lily{height:190px;width:160px}.movie-en{font-size:23px}}
      @media(max-width:430px){.intro-movie-grid{grid-template-columns:1fr}}
    `;
    document.head.appendChild(s);
  }

  function speak(text){
    if(!window.speechSynthesis)return;
    speechSynthesis.cancel();
    const u=new SpeechSynthesisUtterance(text); u.lang='en-US'; u.rate=.72; speechSynthesis.speak(u);
  }

  function openMovie(movie){
    styles();
    let ov=document.getElementById('movieOverlay');
    if(!ov){
      ov=document.createElement('div'); ov.id='movieOverlay'; ov.className='movie-overlay';
      ov.innerHTML=`<div class="movie-box"><button class="movie-close" type="button">✕</button><div class="movie-screen"><div id="movieArt"></div><div class="movie-text"><div class="movie-scene" id="movieScene"></div><div class="movie-en" id="movieEn"></div><div class="movie-ru" id="movieRu"></div></div></div><div class="movie-controls"><button class="movie-control movie-prev" type="button">← Назад</button><button class="movie-control movie-speak" type="button">🔊 Послушать</button><span class="movie-dots" id="movieDots"></span><button class="movie-control movie-next" type="button">Дальше →</button></div></div>`;
      document.body.appendChild(ov);
      ov.addEventListener('click',e=>{if(e.target===ov||e.target.closest('.movie-close')){ov.classList.remove('show');speechSynthesis?.cancel()}});
    }
    let n=0;
    const art=ov.querySelector('#movieArt'), scene=ov.querySelector('#movieScene'), en=ov.querySelector('#movieEn'), ru=ov.querySelector('#movieRu'), dots=ov.querySelector('#movieDots');
    const render=()=>{const x=movie.scenes[n];scene.textContent=`${movie.icon} ${movie.title} · ${n+1}/${movie.scenes.length}`;en.textContent=x[0];ru.textContent=x[1];dots.textContent=`${n+1} / ${movie.scenes.length}`;art.innerHTML=`<img class="movie-lily" src="${IMG}Lili.jpg" alt="Lily">`;ov.querySelector('.movie-prev').disabled=n===0;ov.querySelector('.movie-next').textContent=n===movie.scenes.length-1?'✓ Закрыть':'Дальше →';};
    ov.querySelector('.movie-prev').onclick=()=>{if(n>0){n--;render()}};
    ov.querySelector('.movie-next').onclick=()=>{if(n<movie.scenes.length-1){n++;render()}else ov.classList.remove('show')};
    ov.querySelector('.movie-speak').onclick=()=>speak(movie.scenes[n][2]);
    render();ov.classList.add('show');setTimeout(()=>speak(movie.scenes[0][2]),250);
  }

  function install(){
    const map=document.querySelector('#worldMap'); if(!map || document.getElementById('introMovies')) return;
    const wrap=document.createElement('section'); wrap.id='introMovies'; wrap.className='intro-movies';
    wrap.innerHTML=`<div class="intro-movies-title">🎬 Сначала посмотрим вводные истории с Лили</div><div class="intro-movie-grid">${movies.map(m=>`<button class="intro-movie-btn" data-movie="${m.key}" type="button"><span class="intro-movie-icon">${m.icon}</span><span class="intro-movie-name">${m.title.replace('Лили рассказывает: ','')}</span><span class="intro-movie-sub">5 коротких сцен · слушаем и читаем</span></button>`).join('')}</div>`;
    map.parentNode.insertBefore(wrap,map);
    wrap.querySelectorAll('.intro-movie-btn').forEach(b=>b.onclick=()=>openMovie(movies.find(m=>m.key===b.dataset.movie)));
  }
  document.addEventListener('DOMContentLoaded',()=>{styles();const tryInstall=()=>install();setTimeout(tryInstall,300);setTimeout(tryInstall,1000);new MutationObserver(tryInstall).observe(document.body,{childList:true,subtree:true})});
})();
