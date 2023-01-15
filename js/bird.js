// klasa tworzy ptaki,latające poziomo, pionowo i poziomo strzelające
class Bird {
  constructor(row, column, name, course, shot) {
    this.images = [
      "url(pictures/bird-first.png)",
      "url(pictures/bird-second.png)",
    ];
    this.startRowPosition = row;
    this.startColumnPosition = column;
    this.startName = name;
    this.checkMove;
    this.moveDirection = ["left", "right", "up", "down"];
    this.course = course;
    this.armedBird = shot;
    this.startDirection = this.startDirection();
    this.runElement = (this.moveElement(), this.changeImageAnim());
    this.time;
    this.timeStartShot;

    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).textContent = this.startName;
  }
  changeImageAnim() {
    this.timeAnim = setInterval(() => {
      this.imageMove =
        this.imageMove === this.images[0] ? this.images[1] : this.images[0];
      document.querySelector(
        `.class${this.startRowPosition}x${this.startColumnPosition}`
      ).style.backgroundImage = this.imageMove;
    }, levels.gameSpeed * 2);
  }
  startDirection() {
    if (this.course == "vertical") {
      this.runDirection = this.moveDirection[2];
    } else if (this.course == "horizontal") {
      this.runDirection = this.moveDirection[0];
    }
    if (this.armedBird == "shot") {
      this.timeStartShot = setTimeout(() => {
        this.singleShot("down");
      }, 1000);
    }
  }
  direction(moveDirection) {
    if (moveDirection === "down") {
      this.startRowPosition++;
    } else if (moveDirection === "up") {
      this.startRowPosition--;
    } else if (moveDirection === "left") {
      this.startColumnPosition--;
    } else if (moveDirection === "right") {
      this.startColumnPosition++;
    }
  }
  destroy() {
    clearTimeout(this.time);
    clearTimeout(this.timeShot);
    clearTimeout(this.timeStartShot);
    clearInterval(this.timeAnim);
    animExplosion(
      this.startRowPosition,
      this.startColumnPosition,
      this.startName
    );
  }
  bomb() {
    clearTimeout(this.time);
    clearTimeout(this.timeShot);
    clearTimeout(this.timeStartShot);
    clearInterval(this.timeAnim);
    animExplosion(this.startRowPosition, this.startColumnPosition);
    board.elementContainer.deleteNameObjects(this.startName);
  }
  shot(robboShot) {
    clearTimeout(this.time);
    clearTimeout(this.timeShot);
    clearTimeout(this.timeStartShot);
    clearInterval(this.timeAnim);

    animExplosion(
      this.startRowPosition,
      this.startColumnPosition,
      this.startName
    );
    if (robboShot == "robboShot") {
      board.scoreBoard.scores += 150;
      board.scoreBoard.changeCount("scores");
    }
    board.elementContainer.deleteNameObjects(this.startName);
  }
  moveElement() {
    this.time = setTimeout(() => {
      if (this.course == "vertical") {
        this.counter = 2;
      } else if (this.course == "horizontal") {
        this.counter = 0;
      }
      // this.imageMove =
      //   this.imageMove === this.images[0] ? this.images[1] : this.images[0];
      // document.querySelector(
      //   `.class${this.startRowPosition}x${this.startColumnPosition}`
      // ).style.backgroundImage = this.imageMove;

      this.checkMove = checkAction(
        this.runDirection,
        this.startRowPosition,
        this.startColumnPosition
      );
      if (this.checkMove) {
        if (this.checkMove.textContent == "GO") {
          move(
            this.runDirection,
            this.startRowPosition,
            this.startColumnPosition,
            this.imageMove,
            this.startName
          );
        } else {
          this.runDirection =
            this.runDirection === this.moveDirection[0 + this.counter]
              ? this.moveDirection[1 + this.counter]
              : this.moveDirection[0 + this.counter];
        }

        searchRobbo(this.startRowPosition, this.startColumnPosition);
        this.moveElement();
      } else {
        this.runDirection =
          this.runDirection === this.moveDirection[0 + this.counter]
            ? this.moveDirection[1 + this.counter]
            : this.moveDirection[0 + this.counter];
        this.moveElement();
      }
    }, levels.gameSpeed);
  }

  singleShot(direction) {
    this.checkMove = checkAction(
      direction,
      this.startRowPosition,
      this.startColumnPosition
    );
    if (this.checkMove) {
      // console.log(this.checkMove.textContent);
      if (this.checkMove.textContent != "SHOT") {
        setTimeout(() => {
          eval(
            `this.makeShot${board.elementContainer.shotNumber} = new Shot(
            direction,
            this.startRowPosition +1,
            this.startColumnPosition ,
            "${this.startName}.makeShot${board.elementContainer.shotNumber}"
          )`
          );
          board.elementContainer.shotNumber++;
        }, 0);
      }
    }
    this.frequentlyShot =
      Math.floor(Math.floor(Math.random() * (2000 - 250 + 1) + 250) / 250) *
      250;
    this.timeShot = setTimeout(() => {
      this.singleShot(direction);
    }, this.frequentlyShot);
  }
  move(moveDirection) {}
  nextLevel() {
    clearTimeout(this.time);
    clearTimeout(this.timeShot);
    clearTimeout(this.timeStartShot);
    clearInterval(this.timeAnim);

    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).textContent = "GO";
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).style.backgroundImage = "";
  }
}
