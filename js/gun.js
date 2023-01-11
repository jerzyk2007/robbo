// klasa tworzy działa,strzelające pionowo i poziomo
class Gun {
  constructor(row, column, name, direction, typeShot, typeMove) {
    this.shotImages = [
      "url(pictures/shot-UD-first.png)",
      "url(pictures/shot-UD-second.png)",
      "url(pictures/shot-LR-first.png)",
      "url(pictures/shot-LR-second.png)",
    ];
    this.gunImages = [];

    this.gunStopImages = [
      "url(pictures/gunUp.png)",
      "url(pictures/gunDown.png)",
      "url(pictures/gunLeft.png)",
      "url(pictures/gunRight.png)",
    ];
    this.gunMovingImages = [
      "url(pictures/gunUpMoving.png)",
      "url(pictures/gunDownMoving.png)",
      "url(pictures/gunLeftMoving.png)",
      "url(pictures/gunRightMoving.png)",
    ];
    this.startRowPosition = row;
    this.startColumnPosition = column;
    this.startShotRowPosition = this.startRowPosition;
    this.startShotColumnPosition = this.startColumnPosition;
    this.startName = name;
    this.startShotDirection = direction;
    this.movingDirection = direction;
    this.type = typeShot;
    this.typeMove = typeMove;
    this.shotImages;
    this.checkMove;
    this.frequentlyShot = 500;
    this.shotDirection = ["up", "down", "left", "right"];
    this.course = "vertical";
    this.gunImage = this.startGunImage(direction);
    this.startDirection = this.startDirection();
    this.shotLength = 0;
    this.runElement = (this.moveShot(), this.moveElement());
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
    if (this.typeMove == "moving") {
      this.gunImages = this.gunMovingImages;
    } else {
      this.gunImages = this.gunStopImages;
    }
    if (direction == "up") {
      this.counter = 2;
      this.movingGunDirection = "left";
      return this.gunImages[0];
    } else if (direction == "down") {
      this.counter = 2;
      this.movingGunDirection = "right";
      return this.gunImages[1];
    } else if (direction == "left") {
      this.counter = 0;
      this.movingGunDirection = "up";
      return this.gunImages[2];
    } else if (direction == "right") {
      this.counter = 0;
      this.movingGunDirection = "down";
      return this.gunImages[3];
    }
  }

  startDirection() {
    if (this.startShotDirection == "up") {
      this.runDirection = this.shotDirection[0];
    } else if (this.startShotDirection == "down") {
      this.runDirection = this.shotDirection[1];
    } else if (this.startShotDirection == "left") {
      this.runDirection = this.shotDirection[2];
    } else if (this.startShotDirection == "right") {
      this.runDirection = this.shotDirection[3];
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
  destroy() {
    this.clearBombRoad();
    clearTimeout(this.timeShot);
    clearInterval(this.singleShotInterval);
    clearInterval(this.timeMoving);
    animExplosion(this.startRowPosition, this.startColumnPosition);
  }
  bomb() {
    clearTimeout(this.timeShot);
    clearInterval(this.singleShotInterval);
    clearInterval(this.timeMoving);
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
  shot() {}

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
      this.singleShot(this.startShotDirection);
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
    if (direction) {
      if (this.startShotDirection == "left") {
        this.column = -1;
        this.row = 0;
      }
      if (this.startShotDirection == "right") {
        this.column = 1;
        this.row = 0;
      }
      if (this.startShotDirection == "up") {
        this.row = -1;
        this.column = 0;
      }
      if (this.startShotDirection == "down") {
        this.row = 1;
        this.column = 0;
      }
      this.checkMove = checkAction(
        direction,
        this.startRowPosition,
        this.startColumnPosition
      );
      if (this.checkMove) {
        setTimeout(() => {
          eval(
            `this.makeShot${board.elementContainer.shotNumber} = new Shot(
            this.startShotDirection,
            this.startRowPosition + this.row,
            this.startColumnPosition + this.column,
            "${this.startName}.makeShot${board.elementContainer.shotNumber}",
                     )`
          );
          board.elementContainer.shotNumber++;
        }, 0);
      }
      this.frequentlyShot =
        Math.floor(Math.floor(Math.random() * (3500 + 1)) / 250) * 250;
      this.timeShot = setTimeout(() => {
        if (this.typeMove == "rotate") {
          this.rotateGun();
        }
        this.moveShot();
      }, this.frequentlyShot);
    }
  }

  rotateGun() {
    this.roatateDirection = Math.floor(Math.random() * 4);
    this.startShotDirection = this.shotDirection[this.roatateDirection];
    this.gunImage = this.gunImages[this.roatateDirection];
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).style.backgroundImage = this.gunImage;
  }

  move(moveDirection) {
    if (this.typeMove == "moving") {
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
            this.gunImage,
            this.startName
          );
          board.robbo.moveRobbo(moveDirection);
        }
      }
    }
  }

  moveElement() {
    if (this.typeMove == "moving") {
      this.timeMoving = setInterval(() => {
        this.checkMove = checkAction(
          this.movingGunDirection,
          this.startRowPosition,
          this.startColumnPosition
        );
        if (this.checkMove) {
          if (this.checkMove.textContent == "GO") {
            move(
              this.movingGunDirection,
              this.startRowPosition,
              this.startColumnPosition,
              this.gunImage,
              this.startName
            );
          } else {
            this.movingGunDirection =
              this.movingGunDirection === this.shotDirection[0 + this.counter]
                ? this.shotDirection[1 + this.counter]
                : this.shotDirection[0 + this.counter];
          }
        } else {
          this.movingGunDirection =
            this.movingGunDirection === this.shotDirection[0 + this.counter]
              ? this.shotDirection[1 + this.counter]
              : this.shotDirection[0 + this.counter];
        }
      }, levels.gameSpeed * 1.5);
    }
  }

  nextLevel() {
    this.clearBombRoad();
    clearTimeout(this.timeShot);
    clearInterval(this.singleShotInterval);
    clearInterval(this.timeMoving);
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).textContent = "GO";
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).style.backgroundImage = "";
  }
}
