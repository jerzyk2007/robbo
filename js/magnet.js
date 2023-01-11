// klasa do tworzenie magnesów
class Magnet {
  constructor(row, column, name, direction) {
    this.images = [
      "url(pictures/magnetLeft.png)",
      "url(pictures/magnetRight.png)",
    ];
    this.startRowPosition = row;
    this.startColumnPosition = column;
    this.startMagneticRowPosition = this.startRowPosition;
    this.startMagneticColumnPosition = this.startColumnPosition;
    this.startName = name;
    this.magnetImage = this.startMagnetImage(direction);
    this.start = this.startMagnet(direction);
    this.checkMove;
    this.counter = 0;
    this.robboStop = false;
    this.setTimeMagnetic;
    this.robboDirection;
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).style.backgroundImage = this.magnetImage;
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).textContent = this.startName;
  }
  //

  startMagnetImage(direction) {
    if (direction == "left") {
      return this.images[0];
    } else if (direction == "right") {
      return this.images[1];
    }
  }

  startMagnet(direction) {
    this.setTimeMagnetic = setTimeout(() => {
      this.checkMove = checkAction(
        direction,
        this.startMagneticRowPosition,
        this.startMagneticColumnPosition
      );
      if (this.checkMove) {
        if (this.checkMove.textContent == "GO") {
          if (direction == "left") {
            this.startMagneticColumnPosition--;
            this.robboDirection = "right";
            this.counter = 1;
          } else if (direction == "right") {
            this.startMagneticColumnPosition++;
            this.robboDirection = "left";
            this.counter = -1;
          }
          this.startMagnet(direction);
        } else if (this.checkMove.textContent == "board.robbo") {
          if (!levels.activeMagnet || levels.activeMagnet == this.startName) {
            levels.activeMagnet = this.startName;
            this.robboStop = true;
            this.startMagneticColumnPosition = this.startColumnPosition;
            clearTimeout(levels.canMoveSetTime);

            levels.canMove = false;
            setTimeout(() => {
              if (
                this.startRowPosition == board.robbo.startRowPosition &&
                this.startColumnPosition - this.counter ==
                  board.robbo.startColumnPosition
              ) {
                return board.robbo.killRobbo();
              }
              board.robbo.moveRobbo(this.robboDirection);
              this.startMagnet(direction);
            }, levels.gameSpeed);
          }
        } else {
          if (this.robboStop) {
            levels.canMove = true;
            this.robboStop = false;
          }
          levels.activeMagnet = null;
          this.startMagneticColumnPosition = this.startColumnPosition;
          setTimeout(() => {
            this.startMagnet(direction);
          }, 150);
        }
      }
    }, 0);
  }

  //
  move(moveDirection) {}
  destroy() {
    animExplosion(this.startRowPosition, this.startColumnPosition);
  }
  bomb() {
    //      clearTimeout(this.setTimeMagnetic);
    //         animExplosion(this.startRowPosition, this.startColumnPosition);
    //    board.elementContainer.deleteNameObjects(this.startName);
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
