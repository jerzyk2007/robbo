// klasa tworzy działa,strzelające pionowo i poziomo
class Gun {
  constructor(row, column, name, direction, type) {
    this.shotImages = [
      "url(pictures/shot-UD-first.png)",
      "url(pictures/shot-UD-second.png)",
      "url(pictures/shot-LR-first.png)",
      "url(pictures/shot-LR-second.png)",
    ];
    this.gunImages = [
      "url(pictures/gunUp.png)",
      "url(pictures/gunDown.png)",
      "url(pictures/gunLeft.png)",
      "url(pictures/gunRight.png)",
    ];
    this.startRowPosition = row;
    this.startColumnPosition = column;
    this.startShotRowPosition = this.startRowPosition;
    this.startShotColumnPosition = this.startColumnPosition;
    this.startName = name;
    this.direction = direction;
    this.type = type;
    this.shotImages;
    this.checkMove;
    this.frequentlyShot = 500;
    this.shotDirection = ["left", "right", "up", "down"];
    this.course = "vertical";
    //    this.action = ["kill"];
    this.gunImage = this.startGunImage(direction);
    this.startDirection = this.startDirection();
    this.shotLength = 0;

    this.runElement = this.moveShot();
    this.timeShot;
    this.timeShotBack;
      this.singleShotInterval;
    this.shotRoad = [];

    this.explosionInterval;
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).style.backgroundImage = this.gunImage;
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).textContent = this.startName;
  }
  startGunImage(direction) {
    if (direction == "up") {
      return this.gunImages[0];
    } else if (direction == "down") {
      return this.gunImages[1];
    } else if (direction == "left") {
      return this.gunImages[2];
    } else if (direction == "right") {
      return this.gunImages[3];
    }
  }
  startDirection() {
    if (this.direction == "up") {
      this.runDirection = this.shotDirection[2];
    } else if (this.direction == "down") {
      this.runDirection = this.shotDirection[3];
    } else if (this.direction == "left") {
      this.runDirection = this.shotDirection[0];
    } else if (this.direction == "right") {
      this.runDirection = this.shotDirection[1];
    }
  }
  direction(shotDirection) {
    // if (shotDirection === "down") {
    //   this.startShotRowPosition++;
    // } else if (shotDirection === "up") {
    //   this.startShotRowPosition--;
    // } else if (shotShotDirection === "left") {
    //   this.startColumnPosition--;
    // } else if (shotDirection === "right") {
    //   this.startShotColumnPosition++;
    // }
  }
  destroy() {
    this.clearBombRoad();
    clearInterval(this.singleShotInterval);
    animExplosion(
      this.startRowPosition,
      this.startColumnPosition,
      this.startName
    );
  }
  bomb() {
    clearInterval(this.singleShotInterval);
    this.clearBombRoad();
    animExplosion(this.startRowPosition, this.startColumnPosition);
    board.elementContainer.deleteNameObjects(this.startName);
  }
  clearBombRoad() {
    clearTimeout(this.timeShot);
    clearTimeout(this.timeShotBack);
    for (let i = 0; i < this.shotRoad.length; i++) {
      eval(this.shotRoad[i]).textContent = "GO";
      eval(this.shotRoad[i]).classList.remove(`${this.nameAnimShot}`);
    }
  }
  shot() {
    console.log("działa");
  }

  moveShot() {
    if (this.type == "laser") {
      this.timeShot = setTimeout(() => {
        if (this.runDirection == "up" || this.runDirection == "down") {
          this.shotImage = this.shotImages[0];

          this.nameAnimShot = "gunAnimShotUD";
        }
        if (this.runDirection == "left" || this.runDirection == "right") {
          this.shotImage = this.shotImages[3];
          this.nameAnimShot = "gunAnimShotLR";
        }
        this.checkMove = checkAction(
          this.runDirection,
          this.startShotRowPosition,
          this.startShotColumnPosition
        );
        if (this.checkMove) {
          if (this.checkMove.textContent == "GO") {
            this.shotRoad.push(this.checkMove);
            this.checkMove.classList.add(`${this.nameAnimShot}`);
            this.checkMove.textContent = "SHOT";
            this.shotLength++;
            if (this.runDirection == "up") {
              this.startShotRowPosition--;
            } else if (this.runDirection == "down") {
              this.startShotRowPosition++;
            } else if (this.runDirection == "left") {
              this.startShotColumnPosition--;
            } else if (this.runDirection == "right") {
              this.startShotColumnPosition++;
            }
            this.moveShot();
          } else if (
            this.checkMove.textContent == "SHOT" ||
            this.checkMove.textContent == "STOP"
          ) {
            clearTimeout(this.time);

            if (this.shotLength == 0) {
              return this.moveShot();
            } else {
              return this.moveShotBack();
            }
          } else {
            eval(this.checkMove.textContent).shot();
            if (this.shotLength == 0) {
              this.timeShotBack = setTimeout(() => {
                clearTimeout(this.time);
                return this.moveShot();
              }, 2000);
            } else {
              return this.moveShotBack();
            }
          }
        } else {
          return this.moveShotBack();
        }
      }, levels.gameSpeed);
    } else if (this.type == "single") {
      this.singleShot(this.direction);
//              this.singleShot(this.direction);

    }
  }
  moveShotBack() {
    clearTimeout(this.timeShot);
    this.timeShotBack = setTimeout(() => {
      eval(this.shotRoad[this.shotLength - 1]).textContent = "GO";
      eval(this.shotRoad[this.shotLength - 1]).classList.remove(
        `${this.nameAnimShot}`
      );
      this.shotLength--;
      if (this.runDirection == "up") {
        this.startShotRowPosition++;
        this.row = -1;
        this.column = 0;
      } else if (this.runDirection == "down") {
        this.startShotRowPosition--;
        this.row = 1;
        this.column = 0;
      } else if (this.runDirection == "left") {
        this.startShotColumnPosition++;
        this.row = 0;
        this.column = -1;
      } else if (this.runDirection == "right") {
        this.startShotColumnPosition--;
        this.row = 0;
        this.column = 1;
      }
      if (this.shotLength == 0) {
        animShot(
          this.startShotRowPosition + this.row,
          this.startShotColumnPosition + this.column
        );
        this.shotRoad = [];
        this.timeShot = setTimeout(() => {
          return this.moveShot();
        }, 2000);
      } else {
        this.moveShotBack();
      }
    }, levels.gameSpeed);
  }
    singleShot(direction) {
    let row = 0;
    let column = 0;

    if (this.direction) {
      if (this.direction == "left") {
        column = -1;
      }
      if (this.direction == "right") {
        column = 1;
      }
      if (this.direction == "up") {
        row = -1;
      }
      if (this.direction == "down") {
        row = 1;
      }

      this.checkMove = checkAction(
        this.direction,
        this.startRowPosition,
        this.startColumnPosition
      );
      if (this.checkMove.textContent == "GO") {
        setTimeout(() => {
          eval(
            `this.makeShot${board.elementContainer.shotNumber} = new Shot(
            this.direction,
            this.startRowPosition + row,
            this.startColumnPosition + column,
            "${this.startName}.makeShot${board.elementContainer.shotNumber}",
            this.checkMove.textContent
          )`
          );
          board.elementContainer.shotNumber++;
        }, 0);
      }
      this.frequentlyShot =
        (Math.floor(Math.floor(Math.random() * (3000 - 500 + 1) + 500) / 250) *
        250);
      this.timeShot = setTimeout(() => {
        this.singleShot(direction);
      }, this.frequentlyShot);
    }
  }
    
//  singleShot(direction) {
//       this.frequentlyShot =
//        (Math.floor(Math.floor(Math.random() * (1500 - 250 + 1) + 250) / 250) *
//        250);
////      console.log(this.frequentlyShot)
//      this.singleShotInterval = setInterval(() => {
////          console.log(direction)
//        singleShot(direction, this.startRowPosition, this.startColumnPosition, `${this.startName}${board.elementContainer.shotNumber}`);
//          clearInterval(this.singleShotInterval);
//           board.elementContainer.shotNumber++;
//         this.singleShot(direction)
//         
//      }, this.frequentlyShot);
//  }
  move(shotDirection) {}
  nextLevel() {
    this.clearBombRoad();
clearInterval(this.singleShotInterval);
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).textContent = "GO";
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).style.backgroundImage = "";
  }
}
