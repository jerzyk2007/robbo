// klasa do tworzenie kluczy
class Keys {
  constructor(row, column, name) {
    this.images = ["url(pictures/key.png)"];
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
    board.scoreBoard.changeCount("key");
    board.robbo.moveRobbo(moveDirection);
    board.elementContainer.deleteNameObjects(this.startName);
  }
  destroy() {
    animExplosion(this.startRowPosition, this.startColumnPosition);
  }
    bomb(){
        animExplosion(this.startRowPosition, this.startColumnPosition);
        board.elementContainer.deleteNameObjects(this.startName);
    }
  shot() {}
  nextLevel() {
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).textContent = "GO";
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).style.backgroundImage = "";
  }
}