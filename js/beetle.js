// klasa tworzy robale chodzące po planszy
class Beetle {
  constructor(row, column, name, course, type) {
    this.images = [
      "url(pictures/beetle-first.png)",
      "url(pictures/beetle-second.png)",
      "url(pictures/ant-first.png)",
      "url(pictures/ant-second.png)"
    ];
    this.startRowPosition = row;
    this.startColumnPosition = column;
    this.startName = name;
    this.type = type;
    this.checkMove;
    this.moveDirection = ["left", "up", "right", "down"];
    this.tryMoveCounter = 0;
    this.course = course;
    this.startDirection = this.startDirection();
    this.startPathfinder = this.tryMove(this.runDirection);
    this.time;
    this.moveLoop = 0;
    this.explosionInterval;
    this.moveCounter = 0;
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).style.backgroundImage = this.imageMove;
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).textContent = this.startName;
  }

  tryMove(moveDirection) {

    setTimeout(() => {
      this.search = [-1, 0, 1];
      this.arrayMove = [];
      this.arrayMatrix = [];
      if (moveDirection == "up") {
        for (let j = 0; j < this.search.length; j++) {
          for (let i = 0; i < this.search.length; i++) {
            let checkMove = checkAction(
              "stop",
              this.startRowPosition + this.search[j],
              this.startColumnPosition + this.search[i]
            );
            if (checkMove) {
              this.arrayMove.push(checkMove.textContent);
            } else {
              this.arrayMove.push("STOP");
            }
          }
          this.arrayMatrix.push(this.arrayMove);
          this.arrayMove = [];
        }
      } else if (moveDirection == "down") {
        for (let j = 2; j > -1; j--) {
          for (let i = 2; i > -1; i--) {
            let checkMove = checkAction(
              "stop",
              this.startRowPosition + this.search[j],
              this.startColumnPosition + this.search[i]
            );
            if (checkMove) {
              this.arrayMove.push(checkMove.textContent);
            } else {
              this.arrayMove.push("STOP");
            }
          }
          this.arrayMatrix.push(this.arrayMove);
          this.arrayMove = [];
        }
      } else if (moveDirection == "right") {
        for (let i = 2; i > -1; i--) {
          for (let j = 0; j < this.search.length; j++) {
            let checkMove = checkAction(
              "stop",
              this.startRowPosition + this.search[j],
              this.startColumnPosition + this.search[i]
            );
            if (checkMove) {
              this.arrayMove.push(checkMove.textContent);
            } else {
              this.arrayMove.push("STOP");
            }
          }
          this.arrayMatrix.push(this.arrayMove);
          this.arrayMove = [];
        }
      } else if (moveDirection == "left") {
        for (let i = 0; i < this.search.length; i++) {
          for (let j = 2; j > -1; j--) {
            let checkMove = checkAction(
              "stop",
              this.startRowPosition + this.search[j],
              this.startColumnPosition + this.search[i]
            );
            if (checkMove) {
              this.arrayMove.push(checkMove.textContent);
            } else {
              this.arrayMove.push("STOP");
            }
          }
          this.arrayMatrix.push(this.arrayMove);
          this.arrayMove = [];
        }
      }
      // console.log(this.arrayMatrix);
      this.suggestMove(this.arrayMatrix, moveDirection);
    }, 0);
  }

  suggestMove(arrayMatrix, moveDirection) {
    this.tryDirection;
    // console.log("robbo move: " + moveDirection);
    if (moveDirection == "up") {
      this.possibleDirection = [
        ["", "up", ""],
        ["left", "", "right"],
        ["", "down", ""],
      ];
    } else if (moveDirection == "down") {
      this.possibleDirection = [
        ["", "down", ""],
        ["right", "", "left"],
        ["", "up", ""],
      ];
    } else if (moveDirection == "left") {
      this.possibleDirection = [
        ["", "left", ""],
        ["down", "", "up"],
        ["", "right", ""],
      ];
    } else if (moveDirection == "right") {
      this.possibleDirection = [
        ["", "right", ""],
        ["up", "", "down"],
        ["", "left", ""],
      ];
    }
if (this.type == "ant") {
    if (arrayMatrix[1][2] == "GO") {
      this.tryDirection = this.possibleDirection[1][2];
    } else if (arrayMatrix[1][2] != "GO" && arrayMatrix[0][1] == "GO") {
      this.tryDirection = this.possibleDirection[0][1];
    } else if (
      arrayMatrix[1][2] != "GO" &&
      arrayMatrix[0][1] != "GO" &&
      arrayMatrix[1][0] == "GO"
    ) {
      this.tryDirection = this.possibleDirection[1][0];
    }
} 
      else if (this.type == "beetle") {
            if (arrayMatrix[1][0] == "GO") {
      this.tryDirection = this.possibleDirection[1][0];
    } else if (arrayMatrix[1][0] != "GO" && arrayMatrix[0][1] == "GO") {
      this.tryDirection = this.possibleDirection[0][1];
    } else if (
      arrayMatrix[1][0] != "GO" &&
      arrayMatrix[0][1] != "GO" &&
      arrayMatrix[1][2] == "GO"
    ) {
        
      this.tryDirection = this.possibleDirection[1][2];
    }
    }
    this.moveElement(this.tryDirection);
  }
  startDirection() {
    if (this.type == "ant") {
      this.imageMove = this.images[2];
      this.runDirection = this.moveDirection[2];
    } else if (this.type == "beetle") {
      this.imageMove = this.images[0];
      this.runDirection = this.moveDirection[0];
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
    clearTimeout(this.time);
    animExplosion(
      this.startRowPosition,
      this.startColumnPosition,
      this.startName
    );
  }
  bomb() {
    clearTimeout(this.time);
    animExplosion(this.startRowPosition, this.startColumnPosition);
    board.elementContainer.deleteNameObjects(this.startName);
  }
  shot(robboShot) {
    clearTimeout(this.time);
    animExplosion(this.startRowPosition, this.startColumnPosition);
                 if (robboShot=="robboShot"){

    board.scoreBoard.scores += 150;
    board.scoreBoard.changeCount("scores");
    board.elementContainer.deleteNameObjects(this.startName);}
  }
  moveElement(tryDirection) {
    this.time = setTimeout(() => {
      if (this.type == "ant") {
        this.counter = 2;
      } else if (this.type == "beetle") {
        this.counter = 0;
      }
      this.imageMove =
        this.imageMove === this.images[0 + this.counter]
          ? this.images[1 + this.counter]
          : this.images[0 + this.counter];
      document.querySelector(
        `.class${this.startRowPosition}x${this.startColumnPosition}`
      ).style.backgroundImage = this.imageMove;
      this.checkMove = checkAction(
        tryDirection,
        this.startRowPosition,
        this.startColumnPosition
      );
      if (this.checkMove) {
        if (this.checkMove.textContent == "GO") {
          move(
            tryDirection,
            this.startRowPosition,
            this.startColumnPosition,
            this.imageMove,
            this.startName
          );
            searchRobbo(this.startRowPosition, this.startColumnPosition);
          this.tryMove(tryDirection);
        } else {
          this.tryMove(this.moveDirection[this.tryMoveCounter]);
          this.tryMoveCounter++;
          if (this.tryMoveCounter == 4) {
            this.tryMoveCounter = 0;
          }
        }
      } 
        else {
       
          this.tryMove(this.moveDirection[this.tryMoveCounter]);
          this.tryMoveCounter++;
          if (this.tryMoveCounter == 4) {
            this.tryMoveCounter = 0;
          }
      }
     
    }, levels.gameSpeed);
  }
  move(moveDirection) {}
   burner(){ document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).textContent = "GO";
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).style.backgroundImage = "";
          board.elementContainer.deleteNameObjects(this.startName);
        return "GO"
    }
  nextLevel() {
    clearTimeout(this.time);
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).textContent = "GO";
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).style.backgroundImage = "";
  }
}
