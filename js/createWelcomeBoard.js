// funkcja tworzy ekran powitalny gry
function createWelcomeBoard() {
  this.counter = 0;
  this.indexText = 0;
  this.addLetterTime = 50;

  // create letter "R"
  this.letterR = [
    [...`XXXXXX  `],
    [...`XXX  XX `],
    [...`XXX   XX`],
    [...`XXX   XX`],
    [...`XXX  XX `],
    [...`XXXXXX  `],
    [...`XXX  XX `],
    [...`XXX   XX`],
  ];
  // create letter "O"
  this.letterO = [
    [...`        `],
    [...`  XXX  `],
    [...` XXX XX `],
    [...`XXX   XX`],
    [...`XXX   XX`],
    [...`XXX   XX`],
    [...`XXX   XX`],
    [...` XXXXXX `],
  ];
  // create letter "B"
  this.letterB = [
    [...`XXX     `],
    [...`XXXXXX  `],
    [...`XXX  XX `],
    [...`XXX   XX`],
    [...`XXX   XX`],
    [...`XXX   XX`],
    [...`XXX   XX`],
    [...`XXXXXXX `],
  ];
  this.class = ["R", "O1", "B1", "B2", "O2"];
  this.title = ["R", "O", "B", "B", "O"];
  // textContent for scrolling text

  this.info = [
    [...` Instrukcja: `],
    [...`     Robbo  musi  przebyć  trudną  drogę`],
    [...`przez   56  planet,   aby  wydostać  się`],
    [...`z  wrogiego   układu   planetarnego,  na`],
    [...`którym  został   podstępnie   uwięziony.`],
    [...`     Na każdej  planecie czeka  na niego`],
    [...`mała kapsuła, którą  może przelecieć  na`],
    [...`następną  planetę.  Niestety,  większość`],
    [...`kapsuł jest  niekompletna, dlatego Robbo`],
    [...`musi zebrać  odpowiednią  liczbę  części`],
    [...`rozrzuconych  po całej planecie. Będą mu`],
    [...`w  tym   przeszkadzać   złe   stworki  -`],
    [...`mieszkańcy  systemu.  W swojej  wędrówce`],
    [...`Robbo znajdzie różne przedmioty.  Odkryj`],
    [...`ich  przeznaczenie.   Próbuj  je  pchać,`],
    [...`zbierać  lub  strzelać  do  nich.  Jeśli`],
    [...`Robbo   znajdzie  się   w  sytuacji  bez`],
    [...`wyjścia, wciśnij klawisz: `],
    [...`ESC`],
    [...`Pamiętaj, że każdą planetę można przejść`],
    [...`Miłej zabawy życzy Ci autor.`],
  ];
  this.indexTyping = null;
  this.HTMLSectionaName = [
    "container__title",
    "author",
    "information",
    "robboStory",
  ];
  this.steeringSpan = ["steering", "steering--info", "shot", "shot--info"];
  this.steeringSpanContent = [
    "Sterowanie:",
    "klawisze",
    "Strzał:",
    "klawisz SPACJA",
  ];
  this.spanArrowContent = [
    "arrow_back",
    "arrow_forward",
    "arrow_upward",
    "arrow_downward",
  ];
  const wrapper = document.createElement("div");
  const welcomeBoard = document.createElement("div");
  const wrapperLevelCounter = document.createElement("div");
  const levelPlus = document.createElement("div");
  const levelMinus = document.createElement("div");
  const levelCounter = document.createElement("div");
  document.body.appendChild(wrapper);
  wrapper.classList.add("wrapper");
  wrapper.appendChild(welcomeBoard);
  document.body.appendChild(wrapperLevelCounter);
  wrapperLevelCounter.appendChild(levelMinus);
  wrapperLevelCounter.appendChild(levelCounter);
  wrapperLevelCounter.appendChild(levelPlus);
  welcomeBoard.classList.add("welcomeBoard");
  wrapperLevelCounter.classList.add("wrapperLevelCounter");

  // wrapper.appendChild(wrapperLevelCounter);
  // wrapperLevelCounter.classList.add("wrapperLevelCounter");

  levelPlus.classList.add("levelPlus");
  levelCounter.classList.add("levelCounter");
  levelMinus.classList.add("levelMinus");
  levelPlus.textContent = "Level +";
  levelCounter.textContent = levels.levelCounter;
  levelMinus.textContent = "Level -";

  if ("ontouchstart" in levelMinus) {
    levelMinus.addEventListener("touchstart", changeLevelMinus);
  } else {
    levelMinus.addEventListener("click", changeLevelMinus);
  }
  if ("ontouchstart" in levelPlus) {
    levelPlus.addEventListener("touchstart", changeLevelPlus);
  } else {
    levelPlus.addEventListener("click", changeLevelPlus);
  }

  function changeLevelPlus() {
    levels.levelCounter++;
    if (levels.levelCounter > levels.lastLevel) {
      levels.levelCounter = 1;
    }
    levelCounter.textContent = levels.levelCounter;
  }

  function changeLevelMinus() {
    levels.levelCounter--;
    if (levels.levelCounter < 1) {
      levels.levelCounter = levels.lastLevel;
    }
    levelCounter.textContent = levels.levelCounter;
  }

  for (let i = 0; i < this.HTMLSectionaName.length; i++) {
    const welcomeBoard = document.querySelector(".welcomeBoard");
    const section = document.createElement("section");
    welcomeBoard.appendChild(section);
    section.classList.add(`${this.HTMLSectionaName[i]}`);
    if (i == 0) {
      for (let i = 0; i < 5; i++) {
        const sectionLetter = document.createElement("div");
        section.appendChild(sectionLetter);
        sectionLetter.classList.add("letter");
        sectionLetter.classList.add(`letter--${this.class[i]}`);
      }

      for (
        let counterTilte = 0;
        counterTilte < this.title.length;
        counterTilte++
      ) {
        for (let i = 0; i < 8; i++) {
          for (let j = 0; j < 8; j++) {
            const sectionLetter = document.querySelector(
              `.letter--${this.class[counterTilte]}`
            );
            const letterElement = document.createElement("div");
            sectionLetter.appendChild(letterElement);
            letterElement.classList.add("letterElement");
            letterElement.classList.add(
              `${this.class[counterTilte]}xclass${i}x${j}`
            );
            if (eval(`this.letter${this.title[counterTilte]}[i][j]`) === "X") {
              const square = document.querySelector(
                `.${this.class[counterTilte]}xclass${i}x${j}`
              );
              square.classList.add("titleAnimation");
              const titleAnimation =
                document.querySelectorAll(".titleAnimation");
              for (let i = 0; i < titleAnimation.length; i++) {
                titleAnimation[i].style.animationDuration = `.6s`;
                titleAnimation[i].style.animationDelay = `${-i * 0.1}s`;
              }
            }
          }
        }
      }
    }
    if (i == 1) {
      const h1Author = document.createElement("h1");
      const h2Author = document.createElement("h2");
      const h3Author = document.createElement("h3");
      const spanCopyright = document.createElement("span");
      const spanH1 = document.createElement("span");

      section.appendChild(h1Author);
      section.appendChild(h2Author);
      section.appendChild(h3Author);
      h1Author.classList.add("author__h1");
      h2Author.classList.add("author__h2");
      h3Author.classList.add("author__h3");
      h2Author.textContent = "Program i grafika: Janusz Pelc";
      h3Author.textContent = "JavaScript: Jerzy Komorowski";
      h1Author.appendChild(spanCopyright);
      h1Author.appendChild(spanH1);
      spanCopyright.classList.add("material-symbols-outlined");
      spanCopyright.textContent = "copyright";
      spanH1.textContent = "1989 by Avalon";
    }
    if (i == 2) {
      for (let i = 0; i < 4; i++) {
        const spanInfo = document.createElement("span");
        section.appendChild(spanInfo);
        spanInfo.classList.add("information__span");
        spanInfo.classList.add(this.steeringSpan[i]);
        spanInfo.textContent = this.steeringSpanContent[i];
        if (i == 1) {
          for (let j = 0; j < 4; j++) {
            const spanArrow = document.createElement("span");
            spanInfo.appendChild(spanArrow);
            spanArrow.classList.add("material-symbols-outlined");
            spanArrow.textContent = this.spanArrowContent[j];
          }
        }
      }
    }

    if (i == 3) {
      const container = document.createElement("div");
      section.appendChild(container);
      container.classList.add("container");
    }
  }

  for (let i = 0; i < this.info.length; i++) {
    const container = document.querySelector(".container");
    const infoText = document.createElement("span");
    container.appendChild(infoText);
    infoText.classList.add("scroll");
    this.counter++;
  }

  this.counter = 0;
  const container = document.querySelector(".container");
  const spnText = document.querySelectorAll(".scroll");
  this.containerTopStep =
    document.querySelector(".container").clientHeight / this.info.length;
  this.containerTop =
    document.querySelector(".robboStory").clientHeight -
    this.containerTopStep -
    12;

  containerToTop();

  function containerToTop() {
    setTimeout(() => {
      if (counter < this.info.length) {
        if (counter != 18) {
          container.style.top = `${containerTop}px`;
          containerTop -= containerTopStep;
        }
        counter++;
        indexText = 0;
        letterByLetter();
      }
    }, 10);
  }
  function letterByLetter() {
    const addLetter = function () {
      spnText[counter - 1].setAttribute("data-value", " ");
      spnText[counter - 1].textContent += this.info[counter - 1][indexText];
      indexText++;
      if (indexText === this.info[counter - 1].length) {
        spnText[counter - 1].setAttribute("data-value", "");

        clearInterval(indexTyping);
        containerToTop();
      }
    };
    indexTyping = setInterval(addLetter, addLetterTime);
  }
  wrapper.addEventListener("touchstart", closeWelcomeBoard);
  document.addEventListener("keydown", closeWelcomeBoardbySpace);
}
