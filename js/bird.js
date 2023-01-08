// klasa tworzy ptaki,latające poziomo, pionowo i poziomo strzelające
class Bird {
  constructor(row, column, name, course) {
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
    // this.action = ["kill"];
    this.startDirection = this.startDirection();
    this.runElement = this.moveElement();
    this.time;
    this.explosionInterval;
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).style.backgroundImage = this.imageMove;
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).textContent = this.startName;
  }

  startDirection() {
    if (this.course == "vertical") {
      this.runDirection = this.moveDirection[2];
    } else if (this.course == "horizontal") {
      this.runDirection = this.moveDirection[0];
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
    animExplosion(
      this.startRowPosition,
      this.startColumnPosition,
      this.startName
    );
  }
  bomb() {
    clearTimeout(this.time);
    animExplosion(this.startRowPosition, this.startColumnPosition);
    board.elementContainer.deleteNameObjects(this.startName);
  }
  shot() {
    clearTimeout(this.time);
    animExplosion(this.startRowPosition, this.startColumnPosition);
    board.scoreBoard.scores += 150;
    board.scoreBoard.changeCount("scores");
    board.elementContainer.deleteNameObjects(this.startName);
  }
  moveElement() {
    this.time = setTimeout(() => {
      if (this.course == "vertical") {
        this.counter = 2;
      } else if (this.course == "horizontal") {
        this.counter = 0;
      }
      this.imageMove =
        this.imageMove === this.images[0] ? this.images[1] : this.images[0];
      document.querySelector(
        `.class${this.startRowPosition}x${this.startColumnPosition}`
      ).style.backgroundImage = this.imageMove;

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

          // } else if (this.checkMove.textContent == "STOP") {
        } else {
          this.runDirection =
            this.runDirection === this.moveDirection[0 + this.counter]
              ? this.moveDirection[1 + this.counter]
              : this.moveDirection[0 + this.counter];
        }

        searchRobbo(this.startRowPosition, this.startColumnPosition);
        // console.log(this.checkMove);

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
  move(moveDirection) {}
  nextLevel() {
    clearTimeout(this.time);
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).textContent = "GO";
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).style.backgroundImage = "";
  }
}
