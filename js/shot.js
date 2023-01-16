// klasa która tworzy "strzały" i ich animacje
class Shot {
  constructor(direction, row, column, name, robboShot, typeShot) {
    this.images = [
      "url(pictures/shot-LR-first.png)",
      "url(pictures/shot-LR-second.png)",
      "url(pictures/shot-UD-first.png)",
      "url(pictures/shot-UD-second.png)",
    ];
    this.moveDirection = direction;
    this.startRowPosition = row;
    this.startColumnPosition = column;
    this.startName = name;
    this.robboShot = robboShot;
    this.typeShot = typeShot;
    this.burnerRow = 0;
    this.burnerColumn = 0;
    this.burnerCounter = 1;
    this.resetBurnerCounter = 0;
    this.burnerRoad = [];
    this.object = this.addToObject();
    this.imageMove = this.imageDirection();
    this.start = this.startShot();
    this.checkMove;
    this.counter = 2;

    // this.action = ["shot"];
    this.time;
  }
  addToObject() {
    board.elementContainer.objects.push(this.startName);
  }
  imageDirection() {
    if (this.moveDirection == "right" || this.moveDirection == "left") {
      this.imageMove =
        this.imageMove === this.images[1] ? this.images[0] : this.images[1];
      return this.imageMove;
    } else if (this.moveDirection == "up" || this.moveDirection == "down") {
      this.imageMove =
        this.imageMove === this.images[2] ? this.images[3] : this.images[2];
      return this.imageMove;
    }
  }
  bomb() {}
  startShot() {
    if (this.typeShot == "single") {
      this.row = 0;
      this.column = 0;
      if (this.moveDirection === "down") {
        this.row = -1;
      } else if (this.moveDirection === "up") {
        this.row = 1;
      } else if (this.moveDirection === "left") {
        this.column = 1;
      } else if (this.moveDirection === "right") {
        this.column = -1;
      }

      this.checkMove = checkAction(
        this.moveDirection,
        this.startRowPosition + this.row,
        this.startColumnPosition + this.column
      );
      this.emptySpaceForShotAnim = checkAction(
        this.moveDirection,
        this.startRowPosition + this.row + this.row,
        this.startColumnPosition + this.column + this.column
      );

      if (this.checkMove) {
        if (this.checkMove.textContent == "GO") {
          document.querySelector(
            `.class${this.startRowPosition}x${this.startColumnPosition}`
          ).style.backgroundImage = this.imageDirection();
          document.querySelector(
            `.class${this.startRowPosition}x${this.startColumnPosition}`
          ).textContent = this.startName;
          if (this.moveDirection === "down") {
            this.startRowPosition++;
          } else if (this.moveDirection === "up") {
            this.startRowPosition--;
          } else if (this.moveDirection === "left") {
            this.startColumnPosition--;
          } else if (this.moveDirection === "right") {
            this.startColumnPosition++;
          }
          this.time = setTimeout(() => {
            document.querySelector(
              `.class${this.startRowPosition + this.row}x${
                this.startColumnPosition + this.column
              }`
            ).style.backgroundImage = "";
            document.querySelector(
              `.class${this.startRowPosition + this.row}x${
                this.startColumnPosition + this.column
              }`
            ).textContent = "GO";
            return this.startShot();
          }, levels.gameSpeed);
        } else if (this.checkMove.textContent == "STOP") {
          animShot(
            this.startRowPosition + this.row,
            this.startColumnPosition + this.column
          );
          board.elementContainer.deleteNameObjects(this.startName);
        } else if (this.checkMove.textContent == "SHOT") {
          animShot(
            this.startRowPosition + this.row,
            this.startColumnPosition + this.column
          );
          board.elementContainer.deleteNameObjects(this.startName);
        } else {
          clearTimeout(this.time);
          eval(this.checkMove.textContent).shot(
            this.robboShot,
            this.emptySpaceForShotAnim.textContent,
            this.startRowPosition + this.row,
            this.startColumnPosition + this.column
          );

          if (
            document.querySelector(
              `.class${this.startRowPosition + this.row}x${
                this.startColumnPosition + this.column
              }`
            ).textContent == "GO"
          ) {
            //            console.log('sprawdź')
            ///// ******

            //          animShot(
            //            this.startRowPosition + this.row,
            //            this.startColumnPosition + this.column
            //          );

            ///// ******
            board.elementContainer.deleteNameObjects(this.startName);
          }
        }
      } else {
        animShot(
          this.startRowPosition + this.row,
          this.startColumnPosition + this.column
        );
        board.elementContainer.deleteNameObjects(this.startName);
      }
    }

    ///////
    else if (this.typeShot == "burner") {
      this.checkMove = checkAction(
        this.moveDirection,
        this.startRowPosition + this.burnerRow,
        this.startColumnPosition + this.burnerColumn
      );

      if (this.checkMove) {
        if (this.checkMove.textContent == "GO") {
          this.burnerRoad.push(this.checkMove);
          if (this.moveDirection == "right") {
            this.burnerColumn++;
          } else if (this.moveDirection == "left") {
            this.burnerColumn--;
          } else if (this.moveDirection == "up") {
            this.burnerRow--;
          } else if (this.moveDirection == "down") {
            this.burnerRow++;
          }
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
          this.time = setTimeout(() => {
            this.startShot();
          }, levels.gameSpeed);
        } else {
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

              this.resetBurnerCounter++;
              this.burnerCounter = this.resetBurnerCounter;
              if (this.burnerRoad.length == 0) {
                clearInterval(this.burnerInterval);
              }
            }, levels.gameSpeed);
          } else {
            this.burnerRoad[0].style.backgroundImage = "";
            this.burnerRoad[0].textContent = "GO";
            this.burnerRoad.splice(0, 1);
            for (let i = 0; i < this.burnerRoad.length; i++) {
              this.burnerRoad[i].style.backgroundImage =
                board.elementContainer.explosionAnim[i];
            }
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
            }, levels.gameSpeed);
          }
        }
      } else {
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

            this.resetBurnerCounter++;
            this.burnerCounter = this.resetBurnerCounter;
            if (this.burnerRoad.length == 0) {
              clearInterval(this.burnerInterval);
            }
          }, levels.gameSpeed);
        } else {
          this.burnerRoad[0].style.backgroundImage = "";
          this.burnerRoad[0].textContent = "GO";
          this.burnerRoad.splice(0, 1);
          for (let i = 0; i < this.burnerRoad.length; i++) {
            this.burnerRoad[i].style.backgroundImage =
              board.elementContainer.explosionAnim[i];
          }
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
          }, levels.gameSpeed);
        }
      }
      // else {
      //   this.burnerRoad[0].style.backgroundImage = "";
      //   this.burnerRoad[0].textContent = "GO";
      //   this.burnerRoad.splice(0, 1);

      //   for (let i = this.burnerRoad.length - 1; i >= 0; i--) {
      //     this.burnerRoad[i].style.backgroundImage =
      //       board.elementContainer.explosionAnim[i];
      //   }
      //   this.burnerInterval = setInterval(() => {
      //     this.burnerRoad[0].style.backgroundImage = "";
      //     this.burnerRoad[0].textContent = "GO";
      //     this.burnerRoad.splice(0, 1);

      //     for (let i = this.burnerRoad.length - 1; i >= 0; i--) {
      //       this.burnerRoad[i].style.backgroundImage =
      //         board.elementContainer.explosionAnim[i];
      //     }
      //     if (this.burnerRoad.length == 0) {
      //       clearInterval(this.burnerInterval);
      //     }
      //   }, levels.gameSpeed * 1);
      // }
    }
  }
  destroy() {
    clearTimeout(this.time);
    clearInterval(this.burnerInterval);
    if (this.typeShot == "single") {
      animExplosion(
        this.startRowPosition + this.row,
        this.startColumnPosition + this.column
      );
    } else if (this.typeShot == "burner") {
      this.burnerRoad.forEach((burner) => {
        burner.style.backgroundImage = "";
        burner.textContent = "GO";
      });
    }
  }
  shot(robboShot, checkMove, row, column) {}
  move(movedirection) {}
  direction(movedirection) {}
  nextLevel() {
    clearTimeout(this.time);
    clearInterval(this.burnerInterval);
    if (this.typeShot == "single") {
      document.querySelector(
        `.class${this.startRowPosition + this.row}x${
          this.startColumnPosition + this.column
        }`
      ).textContent = "GO";
      document.querySelector(
        `.class${this.startRowPosition + this.row}x${
          this.startColumnPosition + this.column
        }`
      ).style.backgroundImage = "";
    }
  }
}
