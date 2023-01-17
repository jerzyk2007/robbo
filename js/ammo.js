// klasa do tworzenie amunicji
class Ammo {
  constructor(row, column, name) {
    this.images = ["url(pictures/ammo.png)"];
    this.startRowPosition = row;
    this.startColumnPosition = column;
    this.startName = name;
    this.action = ["empty"];
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).style.backgroundImage = this.images;
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).textContent = this.startName;
  }
  move(moveDirection) {
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).textContent = "GO";
    board.scoreBoard.changeCount("ammo");
    board.elementContainer.deleteNameObjects(this.startName);
    board.robbo.moveRobbo(moveDirection);
  }
  destroy() {
    animExplosion(this.startRowPosition, this.startColumnPosition);
  }
  bomb() {
    animExplosion(this.startRowPosition, this.startColumnPosition);
    board.elementContainer.deleteNameObjects(this.startName);
  }
  shot(robboShot) {
    animShot(this.startRowPosition, this.startColumnPosition);

    if (robboShot == "robboShot") {
      board.scoreBoard.scores += 50;
      board.scoreBoard.changeCount("scores");
    }
    board.elementContainer.deleteNameObjects(this.startName);
  }
    burner(){ document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).textContent = "GO";
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).style.backgroundImage = "";
          board.elementContainer.deleteNameObjects(this.startName);
        return "GO"
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
