// klasa tworzy lawę
class Bench {
  constructor(row, column, name) {
    this.images = [
      "url(pictures/bench-first.png)",
      "url(pictures/bench-second.png)",
    ];
    this.startRowPosition = row;
    this.startColumnPosition = column;
    this.startName = name;
    this.checkMove;
    this.runElement = this.changeImageAnim();

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
  startDirection() {}
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
    clearInterval(this.timeAnim);
    animExplosion(
      this.startRowPosition,
      this.startColumnPosition,
      this.startName
    );
  }
  bomb() {
    clearInterval(this.timeAnim);
    animExplosion(this.startRowPosition, this.startColumnPosition);
    board.elementContainer.deleteNameObjects(this.startName);
  }
  shot(robboShot) {
    clearInterval(this.timeAnim);

    animExplosion(
      this.startRowPosition,
      this.startColumnPosition,
      this.startName
    );
    if (robboShot == "robboShot") {
      board.scoreBoard.scores += 100;
      board.scoreBoard.changeCount("scores");
    }
    board.elementContainer.deleteNameObjects(this.startName);
  }
  moveElement() {}

  move(moveDirection) {}
    burner(){}
  nextLevel() {
    clearInterval(this.timeAnim);

    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).textContent = "GO";
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).style.backgroundImage = "";
  }
}
