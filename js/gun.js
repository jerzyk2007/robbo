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
    this.shotRoad;
    this.shotDirection = ["up", "down", "left", "right"];
    //    this.course = "vertical";
    this.gunImage = this.startGunImage(direction);
    this.startDirection = this.startDirection();
    this.shotLength = 0;
    this.runElement = (this.moveShot(), this.moveElement());
    this.timeShot;

    this.singleShotInterval;
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
    clearTimeout(this.timeShot);
    clearInterval(this.singleShotInterval);
    clearInterval(this.timeMoving);
    this.destroyShotRoad();
    animExplosion(this.startRowPosition, this.startColumnPosition);
  }
  bomb() {
    clearTimeout(this.timeShot);
    clearInterval(this.singleShotInterval);
    clearInterval(this.timeMoving);
    animExplosion(this.startRowPosition, this.startColumnPosition);
    board.elementContainer.deleteNameObjects(this.startName);
  }
  destroyShotRoad() {
    if (this.type == "laser") {
      for (let i = 0; i < this.shotLength; i++) {
        if (this.runDirection == "up") {
          this.rowRoad = i;
          this.columnRoad = 0;
        } else if (this.runDirection == "down") {
          this.rowRoad = -i;
          this.columnRoad = 0;
        } else if (this.runDirection == "right") {
          this.rowRoad = 0;
          this.columnRoad = -i;
        } else if (this.runDirection == "left") {
          this.rowRoad = 0;
          this.columnRoad = i;
        }

        document.querySelector(
          `.class${this.startShotRowPosition + this.rowRoad}x${
            this.startShotColumnPosition + this.columnRoad
          }`
        ).style.backgroundImage = "";
        document.querySelector(
          `.class${this.startShotRowPosition + this.rowRoad}x${
            this.startShotColumnPosition + this.columnRoad
          }`
        ).textContent = "GO";
      }
    }
  }
  shot(robboShot, checkMove, row, column) {
    if (checkMove == "GO") {
      animShot(row, column);
    }
  }
  shotAnimationMove() {
    if (this.runDirection == "up" || this.runDirection == "down") {
      return (this.shotImage =
        this.shotImage === this.shotImages[0]
          ? this.shotImages[1]
          : this.shotImages[0]);
    } else if (this.runDirection == "left" || this.runDirection == "right") {
      return (this.shotImage =
        this.shotImage === this.shotImages[2]
          ? this.shotImages[3]
          : this.shotImages[2]);
    }
  }
  moveShot() {
    if (this.type == "laser") {
      this.checkMove = checkAction(
        this.runDirection,
        this.startShotRowPosition,
        this.startShotColumnPosition
      );

      if (this.checkMove) {
        if (this.checkMove.textContent == "GO") {
          if (this.runDirection == "up") {
            this.startShotRowPosition--;
          } else if (this.runDirection == "down") {
            this.startShotRowPosition++;
          } else if (this.runDirection == "left") {
            this.startShotColumnPosition--;
          } else if (this.runDirection == "right") {
            this.startShotColumnPosition++;
          }
          for (let i = this.shotLength; i >= 0; i--) {
            if (this.runDirection == "up") {
              document.querySelector(
                `.class${this.startShotRowPosition + i}x${
                  this.startShotColumnPosition
                }`
              ).style.backgroundImage = this.shotAnimationMove();
              document.querySelector(
                `.class${this.startShotRowPosition + i}x${
                  this.startShotColumnPosition
                }`
              ).textContent = "SHOT";
            } else if (this.runDirection == "down") {
              document.querySelector(
                `.class${this.startShotRowPosition - i}x${
                  this.startShotColumnPosition
                }`
              ).style.backgroundImage = this.shotAnimationMove();
              document.querySelector(
                `.class${this.startShotRowPosition - i}x${
                  this.startShotColumnPosition
                }`
              ).textContent = "SHOT";
            } else if (this.runDirection == "right") {
              document.querySelector(
                `.class${this.startShotRowPosition}x${
                  this.startShotColumnPosition - i
                }`
              ).style.backgroundImage = this.shotAnimationMove();
              document.querySelector(
                `.class${this.startShotRowPosition}x${
                  this.startShotColumnPosition - i
                }`
              ).textContent = "SHOT";
            } else if (this.runDirection == "left") {
              document.querySelector(
                `.class${this.startShotRowPosition}x${
                  this.startShotColumnPosition + i
                }`
              ).style.backgroundImage = this.shotAnimationMove();
              document.querySelector(
                `.class${this.startShotRowPosition}x${
                  this.startShotColumnPosition + i
                }`
              ).textContent = "SHOT";
            }
          }
          this.shotLength++;

          this.timeShot = setTimeout(() => {
            this.moveShot();
          }, levels.gameSpeed);
        } else {
          if (this.checkMove.textContent == "board.robbo") {
            return eval(this.checkMove.textContent).shot();
          } else if (this.checkMove.textContent == "SHOT") {
          } else {
            eval(this.checkMove.textContent).shot();
          }
          if (this.shotLength == 0) {
            this.timeShot = setTimeout(() => {
              this.moveShot();
            }, levels.gameSpeed);
          } else {
            this.timeShot = setTimeout(() => {
              this.moveShotBack();
            }, levels.gameSpeed);
          }
        }
      } else {
        this.timeShot = setTimeout(() => {
          this.moveShotBack();
        }, levels.gameSpeed);
      }
    } else if (this.type == "single") {
      this.singleShot(this.startShotDirection);
    }
  }
  moveShotBack() {
    for (let i = 0; i < this.shotLength; i++) {
      if (this.runDirection == "up") {
        document.querySelector(
          `.class${this.startShotRowPosition + i}x${
            this.startShotColumnPosition
          }`
        ).style.backgroundImage = this.shotAnimationMove();
        document.querySelector(
          `.class${this.startShotRowPosition + i}x${
            this.startShotColumnPosition
          }`
        ).textContent = "SHOT";
      } else if (this.runDirection == "down") {
        document.querySelector(
          `.class${this.startShotRowPosition - i}x${
            this.startShotColumnPosition
          }`
        ).style.backgroundImage = this.shotAnimationMove();
        document.querySelector(
          `.class${this.startShotRowPosition - i}x${
            this.startShotColumnPosition
          }`
        ).textContent = "SHOT";
      } else if (this.runDirection == "right") {
        document.querySelector(
          `.class${this.startShotRowPosition}x${
            this.startShotColumnPosition - i
          }`
        ).style.backgroundImage = this.shotAnimationMove();
        document.querySelector(
          `.class${this.startShotRowPosition}x${
            this.startShotColumnPosition - i
          }`
        ).textContent = "SHOT";
      } else if (this.runDirection == "left") {
        document.querySelector(
          `.class${this.startShotRowPosition}x${
            this.startShotColumnPosition + i
          }`
        ).style.backgroundImage = this.shotAnimationMove();
        document.querySelector(
          `.class${this.startShotRowPosition}x${
            this.startShotColumnPosition + i
          }`
        ).textContent = "SHOT";
      }
    }
    document.querySelector(
      `.class${this.startShotRowPosition}x${this.startShotColumnPosition}`
    ).style.backgroundImage = "";
    document.querySelector(
      `.class${this.startShotRowPosition}x${this.startShotColumnPosition}`
    ).textContent = "GO";
    this.shotLength--;
    if (this.runDirection == "up") {
      this.startShotRowPosition++;
    } else if (this.runDirection == "down") {
      this.startShotRowPosition--;
    } else if (this.runDirection == "left") {
      this.startShotColumnPosition++;
    } else if (this.runDirection == "right") {
      this.startShotColumnPosition--;
    }
    // console.log("row back " + this.startShotRowPosition);

    if (this.shotLength == 0) {
      if (this.runDirection == "up") {
        animShot(this.startShotRowPosition - 1, this.startShotColumnPosition);
      } else if (this.runDirection == "down") {
        animShot(this.startShotRowPosition + 1, this.startShotColumnPosition);
      } else if (this.runDirection == "right") {
        animShot(this.startShotRowPosition, this.startShotColumnPosition + 1);
      } else if (this.runDirection == "left") {
        animShot(this.startShotRowPosition, this.startShotColumnPosition - 1);
      }
      this.timeShot = setTimeout(() => {
        return this.moveShot();
      }, 2000);
    } else {
      this.timeShot = setTimeout(() => {
        this.moveShotBack();
      }, levels.gameSpeed);
    }
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
        Math.floor(Math.floor(Math.random() * (3500 + 1)) / 250) * 500;
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
