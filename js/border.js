// klasa tworzaca obwódkę planszy gry
class Border {
  constructor(row, column, name, type) {
    this.images = this.startImage(type);
    this.startRowPosition = row;
    this.startColumnPosition = column;
    this.startName = name;
    this.action = ["empty"];
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).style.backgroundImage = this.images[0];
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).textContent = this.startName;
  }
  startImage(type) {
    if (type == "border1") {
      return ["url(pictures/border1.png)"];
    } else if (type == "border2") {
      return ["url(pictures/border2.png)"];
    } else if (type == "border3") {
      return ["url(pictures/border3.png)"];
    } else if (type == "border4") {
      return ["url(pictures/border4.png)"];
    }
  }
  move(moveDirection) {}
  shot(robboShot, checkMove, row, column) {
    if (checkMove == "GO") {
      animShot(row, column);
    }
  }
  destroy() {}
  bomb() {}
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
