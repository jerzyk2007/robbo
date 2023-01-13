// klasa do czarnych miejsc na planszy, przewidziane do stosowania przy nieregularnej planszy, poza borderem
class BlackHole {
  constructor(row, column, name) {
    this.images = ["url(pictures/blackHole.png)"];
    this.startRowPosition = row;
    this.startColumnPosition = column;
     this.startName = name;
    // this.action = ["empty"];
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).style.backgroundImage = this.images[0];
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).textContent = this.startName
  }
  move(moveDirection) {}
  destroy() {}
  bomb() {}
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
