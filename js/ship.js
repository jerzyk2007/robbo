// klasa tworząca pojazd Robbo do przeniesienia na następny poziom
class Ship {
  constructor(row, column, name) {
    this.images = ["url(pictures/ship.png)", "url(pictures/shipReady.png)"];
    this.startRowPosition = row;
    this.startColumnPosition = column;
    this.startName = name;
    this.checkMove;
    this.imageMove = this.images[0];
    // this.action = ["empty"];
    this.endLevel = false;
    this.time;
    this.flag = true;
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).style.backgroundImage = this.imageMove;
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).textContent = this.startName;
  }

  shipReady() {
    this.time = setTimeout(() => {
      this.imageMove =
        this.imageMove === this.images[0] ? this.images[1] : this.images[0];
      document.querySelector(
        `.class${this.startRowPosition}x${this.startColumnPosition}`
      ).style.backgroundImage = this.imageMove;
      this.shipReady();
    }, 350);
    this.endLevel = true;
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
    if (!this.endLevel) {
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
    } else {
      this.endLevel = false;
      board.robbo.flag = false;
      clearTimeout(this.time);
      nextLevel("nextLevel");
    }
  }

  destroy() {
    clearTimeout(this.time);
    animExplosion(this.startRowPosition, this.startColumnPosition);
  }
  bomb() {}
  shot() {}
  nextLevel() {
    clearTimeout(this.time);
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).textContent = "GO";
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).style.backgroundImage = "";
  }

  shipReadyAnim() {
    const pieceBoard = document.querySelectorAll(".pieceBoard");
    pieceBoard.forEach((piece) => {
      piece.style.backgroundColor = "white";
      setTimeout(() => {
        piece.style.backgroundColor = "rgb(28, 109, 25)";
      }, 30);
    });
  }
}
