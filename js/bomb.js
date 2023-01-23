// klasa tworzy bombę
class Bomb {
  constructor(row, column, name) {
    this.images = ["url(pictures/bomb.png)"];
    this.startRowPosition = row;
    this.startColumnPosition = column;
    this.startName = name;
    this.checkMove;
    this.imageMove = this.images[0];
    this.soundExlopsion = new Audio("sound/bomb.wav");
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
    this.checkMove = checkAction(
      moveDirection,
      this.startRowPosition,
      this.startColumnPosition
    );
    if (this.checkMove && this.checkMove.textContent == "GO") {
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
  bomb() {
    animExplosion(this.startRowPosition, this.startColumnPosition);
    board.elementContainer.deleteNameObjects(this.startName);
    this.shot();
  }
  destroy() {
    // this.soundExlopsion.play();
    animExplosion(this.startRowPosition, this.startColumnPosition);
  }
  shot(robboShot) {
    setTimeout(() => {
      this.soundExlopsion.play();
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          let checkRange = checkAction(
            "stop",
            this.startRowPosition + i,
            this.startColumnPosition + j
          );
          if (checkRange) {
            if (
              checkRange.textContent == "GO" ||
              checkRange.textContent == "STOP"
            ) {
              animExplosion(
                this.startRowPosition + i,
                this.startColumnPosition + j
              );
            } else if (checkRange.textContent == "SHOT") {
            } else {
              eval(checkRange.textContent).bomb();
            }
          }
        }
      }
      if (robboShot == "robboShot") {
        board.scoreBoard.changeCount("bomb");
        board.elementContainer.deleteNameObjects(this.startName);
      }
    }, 200);
  }
  burner() {
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).textContent = "GO";
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).style.backgroundImage = "";
    board.elementContainer.deleteNameObjects(this.startName);
    return "GO";
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
