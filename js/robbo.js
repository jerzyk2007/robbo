// klasa tworzaca postać Robbo
class Robbo {
  constructor(row, column, name) {
    this.images = [
      "url(pictures/robbo-front-first.png)",
      "url(pictures/robbo-front-second.png)",
      "url(pictures/robbo-back-first.png)",
      "url(pictures/robbo-back-second.png)",
      "url(pictures/robbo-left-first.png)",
      "url(pictures/robbo-left-second.png)",
      "url(pictures/robbo-right-first.png)",
      "url(pictures/robbo-right-second.png)",
    ];
    this.imageMove;
    this.checkMove;
    this.startName = name;
    this.startRowPosition = row;
    this.startColumnPosition = column;
    this.action = ["empty"];
    this.moveDirection;
    this.shotNumber = 1;
    this.flag = true;
    // this.stop = true;
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).style.backgroundImage = this.images[0];
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).textContent = this.startName;
    document
      .querySelector(
        `.class${this.startRowPosition}x${this.startColumnPosition}`
      )
      .scrollIntoView({
        block: "center",
        inline: "center",
      });
  }
  move(moveDirection) {}
  killRobbo() {
    this.flag = false;
    animExplosion(this.startRowPosition, this.startColumnPosition);
    board.scoreBoard.changeCount("lostLives");
    setTimeout(() => {
      destroyAllElements();
    }, 800);
  }

  // tryMove(moveDirection) {
  //   console.log(moveDirection);
  //   if (moveDirection == "up") {
  //     this.search = [-1, 0, 1];

  //     this.arrayMove = [];
  //     this.arrayMatrix = [];
  //     for (let j = 0; j < this.search.length; j++) {
  //       for (let i = 0; i < this.search.length; i++) {
  //         let checkMove = checkAction(
  //           "stop",
  //           this.startRowPosition + this.search[j],
  //           this.startColumnPosition + this.search[i]
  //         );
  //         if (checkMove) {
  //           this.arrayMove.push(checkMove.textContent);
  //         } else {
  //           this.arrayMove.push("STOP");
  //         }
  //       }
  //       this.arrayMatrix.push(this.arrayMove);
  //       this.arrayMove = [];
  //     }
  //   } else if (moveDirection == "down") {
  //     this.search = [-1, 0, 1];

  //     this.arrayMove = [];
  //     this.arrayMatrix = [];
  //     for (let j = 2; j > -1; j--) {
  //       for (let i = 2; i > -1; i--) {
  //         let checkMove = checkAction(
  //           "stop",
  //           this.startRowPosition + this.search[j],
  //           this.startColumnPosition + this.search[i]
  //         );
  //         if (checkMove) {
  //           this.arrayMove.push(checkMove.textContent);
  //         } else {
  //           this.arrayMove.push("STOP");
  //         }
  //       }
  //       this.arrayMatrix.push(this.arrayMove);
  //       this.arrayMove = [];
  //     }
  //   } else if (moveDirection == "right") {
  //     this.search = [-1, 0, 1];
  //     this.arrayMove = [];
  //     this.arrayMatrix = [];
  //     for (let i = 2; i > -1; i--) {
  //       for (let j = 0; j < this.search.length; j++) {
  //         let checkMove = checkAction(
  //           "stop",
  //           this.startRowPosition + this.search[j],
  //           this.startColumnPosition + this.search[i]
  //         );
  //         if (checkMove) {
  //           this.arrayMove.push(checkMove.textContent);
  //         } else {
  //           this.arrayMove.push("STOP");
  //         }
  //       }
  //       this.arrayMatrix.push(this.arrayMove);
  //       this.arrayMove = [];
  //     }
  //   } else if (moveDirection == "left") {
  //     this.search = [-1, 0, 1];
  //     this.arrayMove = [];
  //     this.arrayMatrix = [];
  //     for (let i = 0; i < this.search.length; i++) {
  //       for (let j = 2; j > -1; j--) {
  //         console.log(this.search[j], this.search[i]);
  //         let checkMove = checkAction(
  //           "stop",
  //           this.startRowPosition + this.search[j],
  //           this.startColumnPosition + this.search[i]
  //         );
  //         if (checkMove) {
  //           this.arrayMove.push(checkMove.textContent);
  //         } else {
  //           this.arrayMove.push("STOP");
  //         }
  //       }
  //       this.arrayMatrix.push(this.arrayMove);
  //       this.arrayMove = [];
  //     }
  //   }
  //   console.log(this.arrayMatrix);
  // }
  makeShot() {
    if (board.scoreBoard.ammo > 0) {
      board.scoreBoard.changeCount("shot");
      let row = 0;
      let column = 0;

      if (this.moveDirection) {
        if (this.moveDirection == "left") {
          column = -1;
        }
        if (this.moveDirection == "right") {
          column = 1;
        }
        if (this.moveDirection == "up") {
          row = -1;
        }
        if (this.moveDirection == "down") {
          row = 1;
        }

        this.checkMove = checkAction(
          this.moveDirection,
          this.startRowPosition,
          this.startColumnPosition
        );
        if (this.checkMove.textContent != "SHOT") {
          eval(
            `this.makeShot${this.shotNumber} = new Shot(
            this.moveDirection,
            this.startRowPosition + row,
            this.startColumnPosition + column,
            "board.robbo.makeShot${this.shotNumber}",
            this.checkMove.textContent
          )`
          );
        }
        this.shotNumber++;
        // }
      }
    }
  }

  moveRobbo(moveDirection) {
    if (this.flag) {
      let row = 0;
      let column = 0;
      let image1 = 0;
      let image2 = 0;

      this.checkMove = checkAction(
        moveDirection,
        this.startRowPosition,
        this.startColumnPosition
      );
      if (moveDirection === "down") {
        row = -1;
        image1 = 0;
        image2 = 1;
      } else if (moveDirection === "up") {
        row = 1;
        image1 = 2;
        image2 = 3;
      } else if (moveDirection === "left") {
        column = -1;
        image1 = 4;
        image2 = 5;
      } else if (moveDirection === "right") {
        column = 1;
        image1 = 6;
        image2 = 7;
      }
      if (this.checkMove) {
        if (this.checkMove.textContent == "GO") {
          this.startRowPosition = this.startRowPosition - row;
          this.startColumnPosition = this.startColumnPosition + column;
          const oldPosition = document.querySelector(
            `.class${this.startRowPosition + row}x${
              this.startColumnPosition - column
            }`
          );
          const newPosition = document.querySelector(
            `.class${this.startRowPosition}x${this.startColumnPosition}`
          );
          oldPosition.textContent = "GO";
          oldPosition.style.backgroundImage = "";
          newPosition.textContent = this.startName;
          this.imageMove =
            this.imageMove === this.images[image2]
              ? this.images[image1]
              : this.images[image2];
          newPosition.style.backgroundImage = this.imageMove;
          newPosition.scrollIntoView({
            block: "center",
            inline: "center",
          });
        } else if (this.checkMove.textContent == "SHOT") {
        } else if (this.checkMove.textContent !== "GO") {
          const newPosition = document.querySelector(
            `.class${this.startRowPosition}x${this.startColumnPosition}`
          );
          newPosition.style.backgroundImage =
            this.imageMove === this.images[image2]
              ? this.images[image1]
              : this.images[image2];
          if (this.checkMove.textContent !== "STOP") {
            eval(this.checkMove.textContent).move(moveDirection);
          }
        }
        this.moveDirection = moveDirection;
      }
    }
  }
  position() {}
  destroy() {
    // this.killRobbo();
    // clearTimeout(this.time);
    // this.time = "";
    // animExplosion(this.startRowPosition, this.startColumnPosition);
  }
  bomb() {
    this.killRobbo();
    clearTimeout(this.time);
    this.time = "";
    animExplosion(this.startRowPosition, this.startColumnPosition);
    board.elementContainer.deleteNameObjects(this.startName);
  }
  shot() {
    this.killRobbo();
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
