/* English Quest — word translation + lesson safety + original school art */
(function(){
  const dictionary = {
    what:"что / какой", is:"есть / является", it:"это", a:"неопределённый артикль", an:"неопределённый артикль перед гласным звуком",
    colour:"цвет", color:"цвет", blue:"синий / голубой", circle:"круг", ten:"десять", five:"пять", fifteen:"пятнадцать", twenty:"двадцать",
    choose:"выбери", correct:"правильный", sentence:"предложение", my:"мой / моя / моё", name:"имя", lily:"Лили",
    school:"школа", item:"предмет", pencil:"карандаш", apple:"яблоко", apples:"яблоки", dog:"собака", eraser:"ластик", ruler:"линейка", pen:"ручка", book:"книга", books:"книги",
    bag:"сумка", schoolbag:"школьная сумка", number:"число", thirteen:"тринадцать", three:"три", thirty:"тридцать", one:"один", two:"два",
    family:"семья", moments:"моменты", i:"я", have:"иметь / у меня есть", got:"есть / получил", sister:"сестра", sisters:"сёстры", brother:"брат", you:"ты / вы", he:"он", she:"она",
    mummy:"мама", daddy:"папа", grandma:"бабушка", grandpa:"дедушка", plural:"множественное число", this:"это / этот", who:"кто",
    things:"вещи", like:"нравиться / любить", likes:"нравится", milk:"молоко", pizza:"пицца", drink:"напиток", some:"немного / некоторое количество", any:"какой-нибудь / сколько-нибудь", juice:"сок",
    toys:"игрушки", come:"приходи / приходить", in:"в / внутри", play:"играть", possession:"принадлежность", box:"коробка", boxes:"коробки", teddy:"плюшевый мишка", bear:"медведь", bears:"медведи", room:"комната", bedroom:"спальня", chair:"стул", robot:"робот", ball:"мяч",
    animals:"животные", furry:"пушистый", can:"мочь / уметь", can’t:"не может", "can't":"не может", run:"бегать", fly:"летать", fish:"рыба", walk:"ходить", ear:"ухо", cow:"корова", frog:"лягушка", kangaroo:"кенгуру", mouse:"мышь", paws:"лапы", paw:"лапа",
    home:"дом", sweet:"милый / сладкий", cat:"кошка", on:"на", where:"где", "where’s":"где находится", "where's":"где находится", kitchen:"кухня", table:"стол", lamp:"лампа", bathroom:"ванная", garden:"сад",
    day:"день", off:"выходной", playing:"играет", park:"парк", doing:"делаешь / делаете", drawing:"рисую", action:"действие", riding:"катается / едет", bike:"велосипед", watching:"смотрим", tv:"телевизор", football:"футбол", they:"они", they’re:"они / они сейчас", "they're":"они / они сейчас", we’re:"мы / мы сейчас", "we're":"мы / мы сейчас", running:"бегает", yesterday:"вчера",
    daybyday:"день за днём", get:"получать / вставать", up:"вверх", at:"в / в указанное время", seven:"семь", time:"время", o’clock:"часов", "o'clock":"часов", daily:"ежедневный", brush:"чистить", teeth:"зубы", morning:"утро", now:"сейчас", know:"знать", go:"идти", to:"частица перед глаголом", bed:"кровать / спать",
    open:"открой", your:"твой / ваш", please:"пожалуйста", sit:"сядь", down:"вниз", read:"читать"
  };

  function addStyles(){
    if(document.getElementById("translationTooltipStyles")) return;
    const s=document.createElement("style"); s.id="translationTooltipStyles";
    s.textContent=`
      .translate-word{position:relative;display:inline-block;border-bottom:2px dotted currentColor;cursor:help;transition:background .15s,border-color .15s}
      .translate-word:hover,.translate-word:focus{background:rgba(255,221,90,.45);outline:none;border-bottom-style:solid}
      #translationTip{position:fixed;z-index:99999;display:none;max-width:min(280px,80vw);padding:7px 11px;border-radius:10px;background:#20263a;color:#fff;font-size:14px;line-height:1.25;box-shadow:0 5px 18px rgba(0,0,0,.22);pointer-events:none}
      #translationTip.show{display:block}
      #nextButton[disabled]{opacity:.45;cursor:not-allowed}
      .lesson-art{max-width:100%;border-radius:24px;object-fit:contain}
    `;
    document.head.appendChild(s);
  }

  function showTip(el){
    const text=el&&el.dataset.translation, tip=document.getElementById("translationTip");
    if(!text||!tip) return;
    tip.textContent=text; tip.classList.add("show");
    const r=el.getBoundingClientRect();
    const left=Math.max(8,Math.min(innerWidth-tip.offsetWidth-8,r.left+r.width/2-tip.offsetWidth/2));
    tip.style.left=left+"px"; tip.style.top=Math.max(8,r.top-tip.offsetHeight-8)+"px";
  }
  function hideTip(){document.getElementById("translationTip")?.classList.remove("show");}

  function wrapTextNodes(root){
    if(!root||root.dataset.translationScanned==="1") return;
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode(node){
      if(!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      const p=node.parentElement;
      if(!p||p.closest(".translate-word,.feedback,.translation-tip,script,style")) return NodeFilter.FILTER_REJECT;
      if(!/[A-Za-z]/.test(node.nodeValue)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }});
    const nodes=[]; let n; while(n=walker.nextNode()) nodes.push(n);
    const re=/[A-Za-z]+(?:[’'][A-Za-z]+)?/g;
    nodes.forEach(node=>{
      const text=node.nodeValue; re.lastIndex=0; let m,last=0,changed=false; const frag=document.createDocumentFragment();
      while((m=re.exec(text))){
        const word=m[0], key=word.toLowerCase(), tr=dictionary[key];
        if(!tr) continue;
        changed=true; if(m.index>last) frag.appendChild(document.createTextNode(text.slice(last,m.index)));
        const span=document.createElement("span"); span.className="translate-word"; span.tabIndex=0; span.dataset.translation=tr; span.title=tr; span.textContent=word; frag.appendChild(span); last=m.index+word.length;
      }
      if(changed){if(last<text.length) frag.appendChild(document.createTextNode(text.slice(last))); node.parentNode.replaceChild(frag,node);}
    });
    root.dataset.translationScanned="1";
  }

  function scanLesson(){const root=document.getElementById("lessonContent");if(!root)return;root.dataset.translationScanned="";wrapTextNodes(root);}

  function remapSchoolImages(){
    const map={
      "School bag.jpg":"assets/school/school-bag.svg",
      "pen.jpg":"assets/school/pen.svg",
      "Eraser.jpg":"assets/school/eraser.svg",
      "Pencil case.jpg":"assets/school/pencil-case.svg",
      "book.jpg":"assets/school/book.svg",
      "school.jpg":"assets/school/school.svg",
      "classroom.jpg":"assets/school/classroom.svg"
    };
    document.querySelectorAll("#lessonContent img").forEach(img=>{
      const name=decodeURIComponent(img.src.split("/").pop()||"");
      if(map[name]){img.src=map[name];img.classList.add("lesson-art");}
    });
  }

  function install(){
    addStyles();
    const tip=document.createElement("div"); tip.id="translationTip"; tip.className="translation-tip"; document.body.appendChild(tip);
    document.addEventListener("mouseover",e=>{const el=e.target.closest?.(".translate-word[data-translation]");if(el)showTip(el);});
    document.addEventListener("mouseout",e=>{if(e.target.closest?.(".translate-word[data-translation]"))hideTip();});
    document.addEventListener("focusin",e=>{const el=e.target.closest?.(".translate-word[data-translation]");if(el)showTip(el);});
    document.addEventListener("click",e=>{const el=e.target.closest?.(".translate-word[data-translation]");if(el)showTip(el);});
    window.addEventListener("scroll",hideTip,{passive:true});

    const content=document.getElementById("lessonContent");
    if(content){new MutationObserver(()=>{clearTimeout(window.__translationTimer);window.__translationTimer=setTimeout(()=>{scanLesson();remapSchoolImages();},0);}).observe(content,{childList:true,subtree:true});}
    setTimeout(()=>{scanLesson();remapSchoolImages();},50);

    document.addEventListener("click",event=>{
      const btn=event.target?.closest?.("#nextButton"); if(!btn)return;
      const feedback=document.getElementById("feedback");
      const ok=!!feedback?.classList.contains("success");
      if(!ok){event.preventDefault();event.stopImmediatePropagation();btn.disabled=true;setTimeout(()=>btn.disabled=false,350);}
    },true);

    const fixIcon=()=>document.querySelectorAll(".world-card-item").forEach(card=>{
      if((card.querySelector(".world-name")?.textContent||"").includes("Module 1 · School Days!")){
        const icon=card.querySelector(".world-icon"); if(icon) icon.textContent="📘";
      }
    });
    const map=document.getElementById("worldMap");
    if(map){new MutationObserver(fixIcon).observe(map,{childList:true,subtree:true});fixIcon();}
  }

  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",install); else install();
})();
