// funkcja tworzy ekran powitalny gry
function createWelcomeBoard() {
  this.counter = 0;
  this.indexText = 0;
  this.addLetterTime = 50;
  // create letter "R"
  this.letterR0 = ["X", "X", "X", "X", "X", "X", " ", " "];
  this.letterR1 = ["X", "X", "X", " ", " ", "X", "X", " "];
  this.letterR2 = ["X", "X", "X", " ", " ", " ", "X", "X"];
  this.letterR3 = ["X", "X", "X", " ", " ", " ", "X", "X"];
  this.letterR4 = ["X", "X", "X", " ", " ", "X", "X", " "];
  this.letterR5 = ["X", "X", "X", "X", "X", "X", " ", " "];
  this.letterR6 = ["X", "X", "X", " ", " ", "X", "X", " "];
  this.letterR7 = ["X", "X", "X", " ", " ", " ", "X", "X"];
  // create letter "O"
  this.letterO0 = [" ", " ", " ", " ", " ", " ", " ", " "];
  this.letterO1 = [" ", " ", "X", "X", "X", "X", " ", " "];
  this.letterO2 = [" ", "X", "X", "X", " ", "X", "X", " "];
  this.letterO3 = ["X", "X", "X", " ", " ", " ", "X", "X"];
  this.letterO4 = ["X", "X", "X", " ", " ", " ", "X", "X"];
  this.letterO5 = ["X", "X", "X", " ", " ", " ", "X", "X"];
  this.letterO6 = ["X", "X", "X", " ", " ", " ", "X", "X"];
  this.letterO7 = [" ", "X", "X", "X", "X", "X", "X", " "];
  // create letter "B"
  this.letterB0 = ["X", "X", "X", " ", " ", " ", " ", " "];
  this.letterB1 = ["X", "X", "X", "X", "X", "X", " ", " "];
  this.letterB2 = ["X", "X", "X", " ", " ", "X", "X", " "];
  this.letterB3 = ["X", "X", "X", " ", " ", " ", "X", "X"];
  this.letterB4 = ["X", "X", "X", " ", " ", " ", "X", "X"];
  this.letterB5 = ["X", "X", "X", " ", " ", " ", "X", "X"];
  this.letterB6 = ["X", "X", "X", " ", " ", " ", "X", "X"];
  this.letterB7 = ["X", "X", "X", "X", "X", "X", "X", " "];
  this.class = ["R", "O1", "B1", "B2", "O2"];
  this.title = ["R", "O", "B", "B", "O"];
  // textContent for scrolling text
  this.info0 = " Instrukcja: ";
  this.info1 = "     Robbo  musi  przebyć  trudną  drogę";
  this.info2 = "przez   56  planet,   aby  wydostać  się";
  this.info3 = "z  wrogiego   układu   planetarnego,  na";
  this.info4 = "którym  został   podstępnie   uwięziony.";
  this.info5 = "     Na każdej  planecie czeka  na niego";
  this.info6 = "mała kapsuła, którą  może przelecieć  na";
  this.info7 = "następną  planetę.  Niestety,  większość";
  this.info8 = "kapsuł jest  niekompletna, dlatego Robbo";
  this.info9 = "musi zebrać  odpowiednią  liczbę  części";
  this.info10 = "rozrzuconych  po całej planecie. Będą mu";
  this.info11 = "w  tym   przeszkadzać   złe   stworki  –";
  this.info12 = "mieszkańcy  systemu.  W swojej  wędrówce";
  this.info13 = "Robbo znajdzie różne przedmioty.  Odkryj";
  this.info14 = "ich  przeznaczenie.   Próbuj  je  pchać,";
  this.info15 = "zbierać  lub  strzelać  do  nich.  Jeśli";
  this.info16 = "Robbo   znajdzie  się   w  sytuacji  bez";
  this.info17 = "wyjścia, wciśnij klawisz: ";
  this.info18 = "ESC";
  this.info19 = "Pamiętaj, że każdą planetę można przejść";
  this.info20 = "Miłej zabawy życzy Ci autor.";
  this.infoCounter = 21;
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
  document.body.appendChild(wrapper);
  wrapper.classList.add("wrapper");
  wrapper.appendChild(welcomeBoard);
  welcomeBoard.classList.add("welcomeBoard");

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
            if (eval(`this.letter${this.title[counterTilte]}${i}`)[j] === "X") {
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

  for (let i = 0; i < this.infoCounter; i++) {
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
    document.querySelector(".container").clientHeight / this.infoCounter;
  this.containerTop =
    document.querySelector(".robboStory").clientHeight -
    this.containerTopStep -
    12;

  containerToTop();

  function containerToTop() {
    setTimeout(() => {
      if (counter < this.infoCounter) {
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
      spnText[counter - 1].textContent += eval(
        `this.info${counter - 1}[indexText]`
      );
      indexText++;
      if (indexText === eval(`this.info${counter - 1}.length`)) {
        spnText[counter - 1].setAttribute("data-value", "");
        clearInterval(indexTyping);
        containerToTop();
      }
    };
    indexTyping = setInterval(addLetter, addLetterTime);
  }

  // document.addEventListener("touchstart", closeWelcomeBoard);
  document.addEventListener("touchstart", closeWelcomeBoard);
  window.addEventListener("keydown", closeWelcomeBoardbySpace);
}
