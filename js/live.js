// klasa do tworzenie ikonki "nowe życie"
class Lives {
  constructor(row, column, name) {
    this.images = ["url(pictures/lives.png)"];
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
    board.scoreBoard.changeCount("lives");
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
      
        shot(robboShot) {
animExplosion(this.startRowPosition, this.startColumnPosition);
    
if (robboShot=="robboShot"){

    board.scoreBoard.scores += 50;
    board.scoreBoard.changeCount("scores");
    }
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