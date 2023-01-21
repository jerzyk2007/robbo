// klasa do tworzenie drzwi
class Door {
  constructor(row, column, name) {
    this.images = ["url(pictures/door.png)"];
    this.sound = new Audio("sound/door.wav");
    this.startRowPosition = row;
    this.startColumnPosition = column;
    this.startName = name;
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).style.backgroundImage = this.images;
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).textContent = this.startName;
  }
  move(moveDirection) {
    if (board.scoreBoard.key > 0) {
      this.sound.play();
      board.scoreBoard.key--;
      board.scoreBoard.changeScoreBoard(
        board.scoreBoard.key,
        "00",
        ".keys--number"
      );
      document.querySelector(
        `.class${this.startRowPosition}x${this.startColumnPosition}`
      ).textContent = "GO";
      board.scoreBoard.scores += 50;
      board.scoreBoard.changeCount("score");
      board.robbo.moveRobbo(moveDirection);
      board.elementContainer.deleteNameObjects(this.startName);
    }
  }
  destroy() {
    animExplosion(this.startRowPosition, this.startColumnPosition);
  }
  bomb() {
    animExplosion(this.startRowPosition, this.startColumnPosition);
    board.elementContainer.deleteNameObjects(this.startName);
  }
  shot(robboShot, checkMove, row, column) {
    if (checkMove == "GO") {
      animShot(row, column);
    }
  }
  burner() {}
  nextLevel() {
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).textContent = "GO";
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).style.backgroundImage = "";
  }
}
