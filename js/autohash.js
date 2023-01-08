// klasa do tworzenia kratki, która porusza się samoczynnie do napotkania przeszkody
class AutoHash {
  constructor(row, column, name) {
    this.images = ["url(pictures/autohash.png)"];
    this.startRowPosition = row;
    this.startColumnPosition = column;
    this.startName = name;
    this.checkMove;
    this.imageMove = this.images[0];
    this.counter = 0;
    this.action = ["shot"];
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).style.backgroundImage = this.imageMove;
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).textContent = this.startName;
  }
  direction(moveDirection) {
    if (moveDirection === "down") {
      this.startRowPosition++;
    } else if (moveDirection === "up") {
      this.startRowPosition--;
    } else if (moveDirection === "left") {
      this.startColumnPosition--;
    } else if (moveDirection === "right") {
      this.startColumnPosition++;
    }
  }
  move(moveDirection) {
    this.counter++;
    setTimeout(() => {
      this.checkMove = checkAction(
        moveDirection,
        this.startRowPosition,
        this.startColumnPosition
      );
      if (this.checkMove) {
        if (this.checkMove.textContent == "GO") {
          move(
            moveDirection,
            this.startRowPosition,
            this.startColumnPosition,
            this.imageMove,
            this.startName
          );
          if (this.counter == 1) {
            board.robbo.moveRobbo(moveDirection);
          }
          this.move(moveDirection);
          this.counter = 0;
        } else if (this.checkMove.textContent == "STOP") {
        } else if (this.checkMove.textContent == "SHOT") {
        } else {
          if (this.counter == 0) {
            eval(this.checkMove.textContent).shot();
          }
        }
      }
    }, levels.gameSpeed);
  }
  destroy() {
    animExplosion(this.startRowPosition, this.startColumnPosition);
  }
  bomb() {
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
