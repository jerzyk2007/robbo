// klasa do tworzenie ścianek do których można strzelać
class Wall {
  constructor(row, column, name) {
    this.images = ["url(pictures/wall.png)"];
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

  burner() {
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).textContent = "GO";
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).style.backgroundImage = "";
    board.elementContainer.deleteNameObjects(this.startName);
    return "GO";
  }
  move(moveDirection) {}
  destroy() {
    animExplosion(this.startRowPosition, this.startColumnPosition);
  }
  bomb() {
    animExplosion(this.startRowPosition, this.startColumnPosition);
    board.elementContainer.deleteNameObjects(this.startName);
  }
  shot(robboShot) {
    board.elementContainer.deleteNameObjects(this.startName);
    animExplosion(this.startRowPosition, this.startColumnPosition);
    if (robboShot == "robboShot") {
      board.scoreBoard.scores += 100;
      board.scoreBoard.changeCount("scores");
    }
  }
  nextLevel() {
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).textContent = "GO";
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).style.backgroundImage = "";
  }
}
