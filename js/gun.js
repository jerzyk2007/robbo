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
    this.burnerCounter = 0;
    this.resetBurenrCounter = 0;
    this.burnerColumn = 0;
    this.burnerRoad = [];
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
              this.rowShot = i;
              this.columnShot = 0;
            } else if (this.runDirection == "down") {
              this.rowShot = -i;
              this.columnShot = 0;
            } else if (this.runDirection == "right") {
              this.rowShot = 0;
              this.columnShot = -i;
            } else if (this.runDirection == "left") {
              this.rowShot = 0;
              this.columnShot = i;
            }
            document.querySelector(
              `.class${this.startShotRowPosition + this.rowShot}x${
                this.startShotColumnPosition + this.columnShot
              }`
            ).style.backgroundImage = this.shotAnimationMove();
            document.querySelector(
              `.class${this.startShotRowPosition + this.rowShot}x${
                this.startShotColumnPosition + this.columnShot
              }`
            ).textContent = "SHOT";
          }
          this.shotLength++;

          this.timeShot = setTimeout(() => {
            this.moveShot();
          }, levels.gameSpeed);
        } else {
          if (this.checkMove.textContent == "board.robbo") {
            this.moveShotBack();
            return eval(this.checkMove.textContent).shot();
          } else if (this.checkMove.textContent == "SHOT") {
          } else {
            eval(this.checkMove.textContent).shot(
              "gun",
              this.checkMove.textContent,
              this.startShotRowPosition,
              this.startShotColumnPosition
            );
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
        if (this.shotLength > 0) {
          this.timeShot = setTimeout(() => {
            this.moveShotBack();
          }, levels.gameSpeed);
        }
      }
    } else if (this.type == "single") {
      this.singleShot(this.startShotDirection);
    }
    /////////////////////////

    //////////////////////
    else if (this.type == "burner") {
      this.checkMove = checkAction(
        this.runDirection,
        this.startShotRowPosition,
        this.startShotColumnPosition + this.burnerColumn
      );
      // console.log(this.checkMove.textContent);

      if (this.checkMove) {
        if (this.checkMove.textContent == "GO") {
          this.burnerRoad.push(this.checkMove);
          this.burnerColumn++;
          if (this.burnerRoad.length == 8) {
            this.burnerRoad[0].style.backgroundImage = "";
            this.burnerRoad[0].textContent = "GO";

            this.burnerRoad.shift();
          }
          for (let i = 0; i < this.burnerRoad.length; i++) {
            setTimeout(() => {
              this.burnerRoad[
                this.burnerRoad.length - i - 1
              ].style.backgroundImage = board.elementContainer.explosionAnim[i];
              this.burnerRoad[this.burnerRoad.length - i - 1].textContent =
                "SHOT";
            }, 0);
          }
          setTimeout(() => {
            this.moveShot();
          }, levels.gameSpeed * 1);
        } else {
          // console.log(this.burnerRoad.length);
          setTimeout(() => {
            if (this.burnerRoad.length < 7) {
              this.burnerInterval = setInterval(() => {
                for (let i = this.burnerRoad.length - 1; i >= 0; i--) {
                  this.burnerRoad[i].style.backgroundImage =
                    board.elementContainer.explosionAnim[this.burnerCounter];
                  this.burnerCounter++;
                  if (this.burnerCounter > 7) {
                    this.burnerRoad[0].style.backgroundImage = "";
                    this.burnerRoad[0].textContent = "GO";
                    this.burnerRoad.splice(0, 1);
                  }
                }
                this.resetBurenrCounter++;
                this.burnerCounter = this.resetBurenrCounter;
                if (this.burnerRoad.length == 0) {
                  clearInterval(this.burnerInterval);
                }
              }, levels.gameSpeed * 1);
            } else {
              this.burnerInterval = setInterval(() => {
                this.burnerRoad[0].style.backgroundImage = "";
                this.burnerRoad[0].textContent = "GO";
                this.burnerRoad.splice(0, 1);
                for (let i = 0; i < this.burnerRoad.length; i++) {
                  this.burnerRoad[i].style.backgroundImage =
                    board.elementContainer.explosionAnim[i];
                }
                if (this.burnerRoad.length == 0) {
                  clearInterval(this.burnerInterval);
                }
              }, levels.gameSpeed * 1);
            }
          }, 0);
        }
      } else {
        this.burnerInterval = setInterval(() => {
          this.burnerRoad[0].style.backgroundImage = "";
          this.burnerRoad[0].textContent = "GO";
          this.burnerRoad.splice(0, 1);
          for (let i = 0; i < this.burnerRoad.length; i++) {
            this.burnerRoad[i].style.backgroundImage =
              board.elementContainer.explosionAnim[i];
          }
          if (this.burnerRoad.length == 0) {
            clearInterval(this.burnerInterval);
          }
        }, levels.gameSpeed * 1);
      }
    }
  }
  moveShotBack() {
    for (let i = 0; i < this.shotLength; i++) {
      if (this.runDirection == "up") {
        this.rowShot = i;
        this.columnShot = 0;
      } else if (this.runDirection == "down") {
        this.rowShot = -i;
        this.columnShot = 0;
      } else if (this.runDirection == "right") {
        this.rowShot = 0;
        this.columnShot = -i;
      } else if (this.runDirection == "left") {
        this.rowShot = 0;
        this.columnShot = i;
      }
      document.querySelector(
        `.class${this.startShotRowPosition + this.rowShot}x${
          this.startShotColumnPosition + this.columnShot
        }`
      ).style.backgroundImage = this.shotAnimationMove();
      document.querySelector(
        `.class${this.startShotRowPosition + this.rowShot}x${
          this.startShotColumnPosition + this.columnShot
        }`
      ).textContent = "SHOT";
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
      if (this.checkMove && this.checkMove.textContent != "SHOT") {
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
        Math.floor((Math.random() * (2000 - 250 + 1)) / levels.gameSpeed) *
          levels.gameSpeed +
        levels.gameSpeed;
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
