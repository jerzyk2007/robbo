// klasa tworząca tablicę wyników
class ScoreBoard {
  constructor(screw, counter) {
    this.numberMark = [
      "./score board mark/0.png",
      "./score board mark/1.png",
      "./score board mark/2.png",
      "./score board mark/3.png",
      "./score board mark/4.png",
      "./score board mark/5.png",
      "./score board mark/6.png",
      "./score board mark/7.png",
      "./score board mark/8.png",
      "./score board mark/9.png",
    ];
    this.scores = levels.scorePoints;
    this.screw = screw;
    this.live = levels.robboLives;
    this.key = 0;
    this.ammo = 0;
    this.level = levels.levelCounter;
    this.shipReadyToStart = true;
    this.board = this.createCounters();
  }
  createCounters() {
    this.changeScoreBoard(this.scores, "000000", ".score--number");
    this.changeScoreBoard(this.screw, "00", ".screws--number");
    this.changeScoreBoard(this.live, "00", ".lives--number");
    this.changeScoreBoard(this.key, "00", ".keys--number");
    this.changeScoreBoard(this.ammo, "00", ".ammo--number");
    this.changeScoreBoard(this.level, "00", ".level--number");
  }
  changeCount(counter) {
    if (counter == "screw") {
      this.scores += 150;

      this.changeScoreBoard(this.scores, "000000", ".score--number");
      if (this.screw > 0) {
        this.screw -= 1;
      }
      this.changeScoreBoard(this.screw, "00", ".screws--number");
      this.shipReady();
    }

    if (counter == "kill") {
      this.scores += 250;
      this.changeScoreBoard(this.scores, "000000", ".score--number");
    }
    if (counter == "ask") {
      this.scores += 50;
      this.changeScoreBoard(this.scores, "000000", ".score--number");
    }
    if (counter == "bomb") {
      this.scores += 100;
      this.changeScoreBoard(this.scores, "000000", ".score--number");
    }
    if (counter == "scores") {
      // this.scores += 250;
      this.changeScoreBoard(this.scores, "000000", ".score--number");
    }

    if (counter == "ammo") {
      if (this.ammo < 91) {
        this.ammo += 9;
      } else if (this.ammo >= 91) {
        this.ammo = 99;
      }
      this.changeScoreBoard(this.ammo, "00", ".ammo--number");
      this.scores += 50;
      this.changeScoreBoard(this.scores, "000000", ".score--number");
    }

    if (counter == "lives") {
      if (this.live < 99) {
        this.live++;
      }
      this.changeScoreBoard(this.live, "00", ".lives--number");
      this.scores += 150;
      this.changeScoreBoard(this.scores, "000000", ".score--number");
    }

    if (counter == "nextLevel") {
      this.scores += 1000;
      this.changeScoreBoard(this.scores, "000000", ".score--number");
    }

    if (counter == "key") {
      this.key += 1;
      this.changeScoreBoard(this.key, "00", ".keys--number");
      this.scores += 50;
      this.changeScoreBoard(this.scores, "000000", ".score--number");
    }

    if (counter == "shot") {
      this.ammo--;
      this.changeScoreBoard(this.ammo, "00", ".ammo--number");
    }

    if (counter == "lostLives") {
      this.live -= 1;
      if (this.live > 0) {
        setTimeout(() => {
          nextLevel("lostLive");
        }, 1500);
      } else {
        setTimeout(() => {
          window.location.reload(true);
        }, 1500);
      }
      this.changeScoreBoard(this.live, "00", ".lives--number");
    }
  }
  shipReady() {
    if (this.screw == 0 && this.shipReadyToStart) {
      setTimeout(() => {
        board.ship1.shipReady();
        board.ship1.shipReadyAnim();
        this.shipReadyToStart = false;
      }, 0);
    }
  }

  changeScoreBoard(scores, elements, name) {
    let arrayElements = [...elements.toString()];
    let arrayScores = [...scores.toString()];
    for (let i = 1; i <= arrayScores.length; i++) {
      arrayElements[arrayElements.length - i] =
        arrayScores[arrayScores.length - i];
    }
    const scoreNumber = document.querySelectorAll(name);
    for (let i = 0; i < scoreNumber.length; i++) {
      scoreNumber[i].src = this.numberMark[arrayElements[i]];
    }
  }
  nextLevel() {
    levels.scorePoints = this.scores;
    levels.robboLives = this.live;
    this.key = 0;
    this.ammo = 0;
    this.level = 1;
    this.board = this.createCounters();
    this.shipReadyToStart = true;
  }
}
