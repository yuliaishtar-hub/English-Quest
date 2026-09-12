const IMG = "https://yuliaishtar-hub.github.io/inglish-adventure/";

const zones = [
  {
    key: "school",
    icon: "🏫",
    title: "Глава 1 · School Days",
    sub: "Школьные вещи, чтение и вопрос What is it?"
  },
  {
    key: "family",
    icon: "🏠",
    title: "Глава 2 · Family Moments",
    sub: "Семья, чтение и фразы с have got"
  }
];

const levels = {
  school: {
    name: "🏫 Глава 1 · School Days",
    questions: [
      {
        type: "choice",
        question: "What is it?",
        image: IMG + "School bag.jpg",
        options: ["It's a school bag.", "It's a pencil.", "It's a ruler."],
        correctIndex: 0,
        tip: "Скажи: It's a school bag."
      },
      {
        type: "choice",
        question: "What is it?",
        image: IMG + "pen.jpg",
        options: ["It's a pen.", "It's an eraser.", "It's a book."],
        correctIndex: 0,
        tip: "Вопрос: What's this? — It's a pen."
      },
      {
        type: "build",
        question: "Собери предложение: «Это карандаш».",
        words: ["a", "It's", "pencil", "ruler"],
        answer: "It's a pencil.",
        tip: "Начинай с It's."
      },
      {
        type: "choice",
        question: "What is it?",
        image: IMG + "book.jpg",
        options: ["It's a pencil case.", "It's a book.", "It's a school bag."],
        correctIndex: 1,
        tip: "Прочитай слово book."
      },
      {
        type: "build",
        question: "Собери вопрос: «Что это?»",
        words: ["this?", "What's", "It", "a"],
        answer: "What's this?",
        tip: "Вопросительное слово стоит в начале."
      },
      {
        type: "choice",
        question: "What is it?",
        image: IMG + "Eraser.jpg",
        options: ["It's a ruler.", "It's an eraser.", "It's a pen."],
        correctIndex: 1,
        tip: "Повтори: an eraser."
      },
      {
        type: "build",
        question: "Собери ответ.",
        words: ["ruler.", "a", "It's", "What's"],
        answer: "It's a ruler.",
        tip: "Артикль a идёт перед ruler."
      }
    ]
  },

  family: {
    name: "🏠 Глава 2 · Family Moments",
    questions: [
      {
        type: "choice",
        question: "Who is she?",
        image: IMG + "mummy.jpg",
        options: ["She's my mummy.", "She's my sister.", "She's my grandma."],
        correctIndex: 0,
        tip: "She's = She is."
      },
      {
        type: "choice",
        question: "Who is he?",
        image: IMG + "daddy.jpg",
        options: ["He's my grandpa.", "He's my daddy.", "He's my brother."],
        correctIndex: 1,
        tip: "He's = He is."
      },
      {
        type: "build",
        question: "Собери: «У меня есть сестра».",
        words: ["a", "have", "sister.", "I", "got"],
        answer: "I have got a sister.",
        tip: "I have got = у меня есть."
      },
      {
        type: "choice",
        question: "Who is she?",
        image: IMG + "grandmagrandpa.jpg",
        options: ["She's my grandma.", "She's my mummy.", "She's my sister."],
        correctIndex: 0,
        tip: "Прочитай: grandma."
      },
      {
        type: "build",
        question: "Собери вопрос о брате.",
        words: ["got", "a", "brother?", "Have", "you"],
        answer: "Have you got a brother?",
        tip: "В вопросе Have стоит первым."
      },
      {
        type: "build",
        question: "Собери короткий ответ.",
        words: ["have.", "Yes,", "I", "got"],
        answer: "Yes, I have.",
        tip: "После Yes ставим запятую."
      },
      {
        type: "choice",
        question: "Выбери фразу про семью.",
        image: "👨‍👩‍👧",
        options: [
          "I have got a family.",
          "It's a school bag.",
          "What's this?"
        ],
        correctIndex: 0,
        tip: "Повтори фразу целиком."
      }
    ]
  }
};

let state = loadState();
let currentKey = "";
let currentIndex = 0;
let answered = false;
let levelStartXP = 0;
let levelStartGems = 0;

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem("english_quest_v3"));
    if (saved) {
      return {
        xp: saved.xp || 0,
        gems: saved.gems || 0,
        completed: saved.completed || []
      };
    }
  } catch (error) {
    console.log("No saved progress yet.");
  }

  return {
    xp: 0,
    gems: 0,
    completed: []
  };
}

function saveState() {
  localStorage.setItem("english_quest_v3", JSON.stringify(state));
  updateStats();
}

function updateStats() {
  const xpIds = ["playerXP", "mapXP", "lessonXP"];
  const gemIds = ["playerGems", "mapGems", "lessonGems"];

  xpIds.forEach((id) => {
    const element = document.getElementById(id);
    if (element) element.textContent = state.xp;
  });

  gemIds.forEach((id) => {
    const element = document.getElementById(id);
    if (element) element.textContent = state.gems;
  });
}

function showScreen(id) {
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.remove("active");
  });

  const screen = document.getElementById(id);
  if (screen) screen.classList.add("active");

  window.scrollTo(0, 0);
}

function speak(text, slow = false) {
  if (!("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();

  const phrase = new SpeechSynthesisUtterance(text);
  phrase.lang = "en-US";
  phrase.rate = slow ? 0.75 : 0.9;
  phrase.pitch = 1.05;

  window.speechSynthesis.speak(phrase);
}

function showMap() {
  const map = document.getElementById("worldMap");
  map.innerHTML = "";

  zones.forEach((zone) => {
    const done = state.completed.includes(zone.key);

    const card = document.createElement("button");
    card.type = "button";
    card.className = "world-card-item";

    card.innerHTML = `
      <div class="world-card-top">
        <div class="world-icon">${zone.icon}</div>
        <span class="chapter-pill">${done ? "✓ Пройдено" : "Играть"}</span>
      </div>
      <div class="world-name">${zone.title}</div>
      <div class="world-description">${zone.sub}</div>
    `;

    card.addEventListener("click", () => {
      startLevel(zone.key);
    });

    map.appendChild(card);
  });

  updateStats();
  showScreen("mapScreen");
}

function startLevel(key) {
  currentKey = key;
  currentIndex = 0;
  levelStartXP = state.xp;
  levelStartGems = state.gems;

  document.getElementById("lessonTitle").textContent = levels[key].name;

  showScreen("lessonScreen");
  renderLesson();
}

function renderLesson() {
  const level = levels[currentKey];
  const item = level.questions[currentIndex];
  const total = level.questions.length;

  document.getElementById("lessonCounter").textContent =
    `${currentIndex + 1} / ${total}`;

  document.getElementById("progressBar").style.width =
    `${(currentIndex / total) * 100}%`;

  if (item.type === "build") {
    renderBuilder(item);
  } else {
    renderChoice(item);
  }
}

function lessonImage(image) {
  if (typeof image === "string" && image.startsWith("http")) {
    return `<img class="big-image" src="${image}" alt="English learning picture">`;
  }

  return `<div class="big-image emoji-image">${image}</div>`;
}

function renderChoice(item) {
  answered = false;

  const content = document.getElementById("lessonContent");

  content.innerHTML = `
    ${lessonImage(item.image)}
    <div class="lesson-kind">СЛОВО И ФРАЗА</div>
    <div class="question">${item.question}</div>

    <button id="listenQuestion" class="listen-button" type="button">
      🔊 Слушать
    </button>

    <div id="answers" class="answer-grid"></div>
    <div id="feedback" class="feedback"></div>

    <div class="lesson-actions">
      <button id="nextButton" class="next-button" type="button" hidden>
        Дальше ➜
      </button>
    </div>
  `;

  document.getElementById("listenQuestion").addEventListener("click", () => {
    speak(item.options[item.correctIndex], true);
  });

  document.getElementById("nextButton").addEventListener("click", nextItem);

  const answers = document.getElementById("answers");

  item.options.forEach((text, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-button";
    button.textContent = text;

    button.addEventListener("click", () => {
      chooseAnswer(index, button, item);
    });

    answers.appendChild(button);
  });
}

function chooseAnswer(index, button, item) {
  if (answered) return;

  const feedback = document.getElementById("feedback");

  if (index === item.correctIndex) {
    answered = true;

    button.classList.add("correct");

    document.querySelectorAll(".answer-button").forEach((answer) => {
      answer.disabled = true;
    });

    state.xp += 10;
    state.gems += 1;
    saveState();

    feedback.textContent = `Верно! ${item.tip} +10 XP ⭐`;
    feedback.className = "feedback success";

    document.getElementById("nextButton").hidden = false;

    speak(item.options[item.correctIndex], true);
  } else {
    button.classList.add("wrong");
    button.disabled = true;

    feedback.textContent = "Попробуй ещё раз. 🔎";
    feedback.className = "feedback error";
  }
}

function renderBuilder(item) {
  let selectedWords = [];

  const content = document.getElementById("lessonContent");

  content.innerHTML = `
    <div class="builder-hero">🧩</div>
    <div class="lesson-kind">СОБЕРИ ФРАЗУ</div>
    <div class="question">${item.question}</div>

    <button id="listenAnswer" class="listen-button" type="button">
      🔊 Послушать ответ
    </button>

    <div class="sentence-slot" id="sentenceSlot">
      <span>Нажимай слова по порядку</span>
    </div>

    <div class="word-bank" id="wordBank"></div>
    <div id="feedback" class="feedback"></div>

    <div class="lesson-actions">
      <button id="resetSentence" class="secondary-button small-button" type="button">
        ↺ Заново
      </button>
      <button id="checkSentence" class="next-button" type="button">
        Проверить ✓
      </button>
      <button id="nextButton" class="next-button" type="button" hidden>
        Дальше ➜
      </button>
    </div>
  `;

  const shuffledWords = [...item.words].sort(() => Math.random() - 0.5);
  const bank = document.getElementById("wordBank");

  shuffledWords.forEach((word) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "word-tile";
    button.textContent = word;

    button.addEventListener("click", () => {
      selectedWords.push(word);
      button.disabled = true;

      document.getElementById("sentenceSlot").textContent =
        selectedWords.join(" ");
    });

    bank.appendChild(button);
  });

  document.getElementById("listenAnswer").addEventListener("click", () => {
    speak(item.answer, true);
  });

  document.getElementById("resetSentence").addEventListener("click", () => {
    selectedWords = [];

    document.querySelectorAll(".word-tile").forEach((tile) => {
      tile.disabled = false;
    });

    document.getElementById("sentenceSlot").innerHTML =
      "<span>Нажимай слова по порядку</span>";
  });

  document.getElementById("checkSentence").addEventListener("click", () => {
    const answer = selectedWords.join(" ");

    if (normalize(answer) === normalize(item.answer)) {
      state.xp += 10;
      state.gems += 1;
      saveState();

      const feedback = document.getElementById("feedback");
      feedback.textContent = `Отлично! ${item.answer} +10 XP ⭐`;
      feedback.className = "feedback success";

      document.getElementById("checkSentence").hidden = true;
      document.getElementById("nextButton").hidden = false;

      speak(item.answer, true);
    } else {
      const feedback = document.getElementById("feedback");
      feedback.textContent = `Почти! ${item.tip}`;
      feedback.className = "feedback error";

      speak(item.answer, true);
    }
  });

  document.getElementById("nextButton").addEventListener("click", nextItem);
}

function normalize(text) {
  return String(text)
    .toLowerCase()
    .replace(/[.,!?;:]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function nextItem() {
  currentIndex += 1;

  if (currentIndex >= levels[currentKey].questions.length) {
    finishLevel();
    return;
  }

  renderLesson();
}

function finishLevel() {
  if (!state.completed.includes(currentKey)) {
    state.completed.push(currentKey);
  }

  saveState();

  const xp = state.xp - levelStartXP;
  const gems = state.gems - levelStartGems;

  document.getElementById("rewardTitle").textContent = "Глава пройдена!";
  document.getElementById("rewardText").textContent =
    `Ты заработал ${xp} XP и ${gems} 💎. Самое время повторить фразы вслух!`;

  document.getElementById("rewardXP").textContent = `+${xp} XP`;
  document.getElementById("rewardGems").textContent = `+${gems}`;

  showScreen("rewardScreen");
  speak("Well done!", true);
}

function init() {
  updateStats();

  document.getElementById("startQuest").addEventListener("click", showMap);

  document.getElementById("gamesBtn").addEventListener("click", () => {
    startLevel("school");
  });

  document.getElementById("mapHome").addEventListener("click", () => {
    showScreen("homeScreen");
  });

  document.getElementById("lessonBack").addEventListener("click", showMap);

  document.getElementById("rewardMap").addEventListener("click", showMap);

  document.getElementById("rewardHome").addEventListener("click", () => {
    showScreen("homeScreen");
  });
}

document.addEventListener("DOMContentLoaded", init);
