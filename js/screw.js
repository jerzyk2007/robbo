// klasa tworząca śrubki
class Screw {
  constructor(row, column, name) {
    this.images = ["url(pictures/screw.png)"];
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
    board.scoreBoard.changeCount("screw");
    board.robbo.moveRobbo(moveDirection);
    board.elementContainer.deleteNameObjects(this.startName);
  }
  destroy() {
    animExplosion(this.startRowPosition, this.startColumnPosition);
  }
  shot() {}
   bomb(){
        animExplosion(this.startRowPosition, this.startColumnPosition);
        board.elementContainer.deleteNameObjects(this.startName);
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
