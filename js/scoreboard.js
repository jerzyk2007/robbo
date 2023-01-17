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
    this.screws = screw;
    this.lives = levels.robboLives;
    this.keys = 0;
    this.ammo = 0;
    this.level = levels.levelCounter;
    this.shipReadyToStart = true;
    this.board = this.createCounters();
  }
  createCounters() {
    this.changeScoreBoard(this.scores, "000000", ".score--number");
    this.changeScoreBoard(this.screws, "00", ".screws--number");
    this.changeScoreBoard(this.lives, "00", ".lives--number");
    this.changeScoreBoard(this.keys, "00", ".keys--number");
    this.changeScoreBoard(this.ammo, "00", ".ammo--number");
    this.changeScoreBoard(this.level, "00", ".level--number");
  }
  changeCount(counter) {
    if (counter == "screw") {
      this.scores += 150;

      this.changeScoreBoard(this.scores, "000000", ".score--number");
      this.screws -= 1;
      this.changeScoreBoard(this.screws, "00", ".screws--number");

      this.shipReady();
    }

    if (counter == "kill") {
      this.scores += 250;

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
      if (this.lives < 99) {
        this.lives++;
      }
      this.changeScoreBoard(this.lives, "00", ".lives--number");
      this.scores += 150;
      this.changeScoreBoard(this.scores, "000000", ".score--number");
    }

    if (counter == "nextLevel") {
      this.scores += 1000;
      this.changeScoreBoard(this.scores, "000000", ".score--number");
    }

    if (counter == "key") {
      this.keys += 1;
      this.changeScoreBoard(this.keys, "00", ".keys--number");
      this.scores += 50;
      this.changeScoreBoard(this.scores, "000000", ".score--number");
    }

    if (counter == "shot") {
      this.ammo--;
      this.changeScoreBoard(this.ammo, "00", ".ammo--number");
    }

    if (counter == "lostLives") {
      this.lives -= 1;
      if (this.lives > 0) {
        setTimeout(() => {
          nextLevel("lostLive");
        }, 1500);
      } else {
        setTimeout(() => {
          window.location.reload(true);
        }, 1500);
      }
      this.changeScoreBoard(this.lives, "00", ".lives--number");
    }
  }
  shipReady() {
    if (this.screws == 0 && this.shipReadyToStart) {
//      board.ship.shipReady();
//      board.ship.shipReadyAnim();
      this.shipReadyToStart = false;
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
    levels.robboLives = this.lives;

    //    this.lives = 3;
    this.keys = 0;
    this.ammo = 0;
    this.level = 1;
    this.board = this.createCounters();
    this.shipReadyToStart = true;
  }
}
