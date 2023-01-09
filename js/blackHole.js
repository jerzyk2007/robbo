// klasa do czarnych miejsc na planszy, przewidziane do stosowania przy nieregularnej planszy, poza borderem
class BlackHole {
  constructor(row, column) {
    this.images = ["url(pictures/blackHole.png)"];
    this.startRowPosition = row;
    this.startColumnPosition = column;
    // this.startName = name;
    // this.action = ["empty"];
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).style.backgroundImage = this.images[0];
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).textContent = "STOP";
  }
  move(moveDirection) {}
  destroy() {}
  bomb() {}
  shot() {}
  nextLevel() {}
}
