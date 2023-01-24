// klasa tworząca pojazd Robbo do przeniesienia na następny poziom
class Ship {
  constructor(row, column, name, shipReady) {
    this.images = ["url(pictures/ship.png)", "url(pictures/shipReady.png)"];

    this.startRowPosition = row;
    this.startColumnPosition = column;
    this.startName = name;
    this.checkMove;
    this.shipReadyWave = new Audio("sound/shipReady.wav");
    this.soundEndLevel = new Audio("sound/levelEnd.wav");
    this.imageMove = this.images[0];
    this.newShip = this.startNewShip(shipReady);
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
  startNewShip(shipReady) {
    if (shipReady == "shipReady") {
      this.shipReady();
    }
  }
  shipReady() {
    this.time = setTimeout(() => {
      this.imageMove =
        this.imageMove === this.images[0] ? this.images[1] : this.images[0];
      document.querySelector(
        `.class${this.startRowPosition}x${this.startColumnPosition}`
      ).style.backgroundImage = this.imageMove;
      document.querySelector(
        `.class${this.startRowPosition}x${this.startColumnPosition}`
      ).textContent = this.startName;
      this.shipReady();
    }, levels.gameSpeed * 2);
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
      this.soundEndLevel.play();
      this.endLevel = false;
        levels.oneKillRobbo = false;
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
  shot(robboShot, checkMove, row, column) {
    if (checkMove == "GO") {
      animShot(row, column);
    }
  }
  burner() {}
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
    this.shipReadyWave.play();
    const pieceBoard = document.querySelectorAll(".pieceBoard");
    pieceBoard.forEach((piece) => {
      piece.style.backgroundColor = "white";
      setTimeout(() => {
        piece.style.backgroundColor =
          levels.boardColor[levels.boardColorCounter];
      }, 30);
    });
  }
}
