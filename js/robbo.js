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
    //    this.shotNumber = 1;
    this.flag = true;
    this.robboShot = "robboShot";
    this.robboScrollStart = this.scrollStart();
    this.scrollRow = levels[`level${levels.levelCounter}`][0];
    this.scrollColumn = levels[`level${levels.levelCounter}`][1];

    // this.stop = true;
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).style.backgroundImage = "url(pictures/ship.png)";
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).textContent = this.startName;
  }
  scrollStart() {
    levels.canMove = false;
    this.scrollTime = setInterval(() => {
      document
        .querySelector(`.class${this.scrollRow}x${this.scrollColumn}`)
        .scrollIntoView({
          block: "center",
          inline: "center",
        });
      if (this.scrollRow > this.startRowPosition) {
        this.scrollRow--;
      }
      if (this.scrollColumn > this.startColumnPosition) {
        this.scrollColumn--;
      }

      if (
        this.scrollRow == this.startRowPosition &&
        this.scrollColumn == this.startColumnPosition
      ) {
        clearInterval(this.scrollTime);
        this.createRobbo();
      }
    }, 100);
  }
  createRobbo() {
    setTimeout(() => {
      document.querySelector(
        `.class${this.startRowPosition}x${this.startColumnPosition}`
      ).style.backgroundImage = "";
      animExplosion(this.startRowPosition, this.startColumnPosition);
    }, 500);
    setTimeout(() => {
      document.querySelector(
        `.class${this.startRowPosition}x${this.startColumnPosition}`
      ).style.backgroundImage = this.images[0];
      document.querySelector(
        `.class${this.startRowPosition}x${this.startColumnPosition}`
      ).textContent = this.startName;
      levels.canMove = true;
    }, 1300);
  }
  move(moveDirection) {}
  killRobbo() {
    clearInterval(this.scrollTime);
    this.flag = false;
    animExplosion(this.startRowPosition, this.startColumnPosition);
    board.scoreBoard.changeCount("lostLives");
    setTimeout(() => {
      destroyAllElements();
    }, 800);
  }

  makeShot(shotDirection) {
    this.moveDirection = shotDirection;
    this.counter;
    if (board.scoreBoard.ammo > 0) {
      board.scoreBoard.changeCount("shot");
      let row = 0;
      let column = 0;

      if (shotDirection) {
        if (shotDirection == "left") {
          column = -1;
          this.counter = 4;
        }
        if (shotDirection == "right") {
          column = 1;
          this.counter = 6;
        }
        if (shotDirection == "up") {
          row = -1;
          this.counter = 2;
        }
        if (shotDirection == "down") {
          row = 1;
          this.counter = 0;
        }
        document.querySelector(
          `.class${this.startRowPosition}x${this.startColumnPosition}`
        ).style.backgroundImage = this.images[0 + this.counter];

        this.checkMove = checkAction(
          shotDirection,
          this.startRowPosition,
          this.startColumnPosition
        );
        if (this.checkMove.textContent != "SHOT") {
          eval(
            `board.robbo${board.elementContainer.shotNumber} = new Shot(
            shotDirection,
            this.startRowPosition + row,
            this.startColumnPosition + column,
            "board.robbo${board.elementContainer.shotNumber}",
            this.robboShot
          )`
          );
        }
        board.elementContainer.shotNumber++;
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
  destroy() {}
  bomb() {
    this.killRobbo();
    clearTimeout(this.time);
    clearInterval(this.scrollTime);

    this.time = "";
    animExplosion(this.startRowPosition, this.startColumnPosition);
    board.elementContainer.deleteNameObjects(this.startName);
  }
  shot() {
    this.killRobbo();
  }
  nextLevel() {
    clearInterval(this.scrollTime);

    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).textContent = "GO";
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).style.backgroundImage = "";
  }
}
