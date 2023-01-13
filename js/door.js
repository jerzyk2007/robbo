// klasa do tworzenie drzwi
class Door {
  constructor(row, column, name) {
    this.images = ["url(pictures/door.png)"];
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
    if (board.scoreBoard.keys > 0) {
      board.scoreBoard.keys--;
      board.scoreBoard.changeScoreBoard(
        board.scoreBoard.keys,
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
    bomb(){
        animExplosion(this.startRowPosition, this.startColumnPosition);
        board.elementContainer.deleteNameObjects(this.startName);
    }
    shot(robboShot, checkMove, row, column) {
      if (checkMove == "GO"){
   animShot(row, column);} 
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
