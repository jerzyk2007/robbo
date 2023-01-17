// klasa tworzy kratkę, którą można przesuwać
class Hash {
  constructor(row, column, name, type) {
    this.images = ["url(pictures/hash.png)", "url(pictures/autohash.png)"];
    this.startRowPosition = row;
    this.startColumnPosition = column;
    this.startName = name;
    this.type = type;
    this.checkMove;
    this.counter = 0;
    this.imageMove = this.startImage(type);
    this.action = ["empty"];
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).style.backgroundImage = this.imageMove;
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).textContent = this.startName;
  }
  startImage(type) {
    if (type == "hash") {
      return this.images[0];
    } else if (type == "autohash") {
      return this.images[1];
    }
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
    if (this.type == "hash") {
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
          board.robbo.moveRobbo(moveDirection);
        }
      }
    } else if (this.type == "autohash") {
      this.autoMove(moveDirection);
    }
  }
  autoMove(moveDirection) {
    this.counter++;
    this.time = setTimeout(() => {
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
          this.autoMove(moveDirection);
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
    clearTimeout(this.time);
    animExplosion(this.startRowPosition, this.startColumnPosition);
  }
  bomb() {
    clearTimeout(this.time);
    animExplosion(this.startRowPosition, this.startColumnPosition);
    board.elementContainer.deleteNameObjects(this.startName);
  }
     shot(robboShot, checkMove, row, column) {
      if (checkMove == "GO"){
   animShot(row, column);} 
  }
    burner(){}
  nextLevel() {
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).textContent = "GO";
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).style.backgroundImage = "";
  }
}
