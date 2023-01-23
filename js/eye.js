// klasa tworzy teleporty, działają w parach lub pojedyńczo
class Eye {
  constructor(row, column, name) {
    this.images = [
      "url(pictures/eye-first.png)",
      "url(pictures/eye-second.png)",
    ];
    this.startRowPosition = row;
    this.startColumnPosition = column;
    this.startName = name;
    this.checkMove;
    this.startEye = this.changeImageAnim();
    this.eyeDirection;
    this.time;
    this.timeMove;
    this.findNewWay = [];
    this.changeWay = ["left", "up", "right", "down"];
    this.waitForStart();
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).textContent = this.startName;
  }
  changeImageAnim() {
    this.timeAnim = setInterval(() => {
      this.imageMove =
        this.imageMove === this.images[0] ? this.images[1] : this.images[0];
      document.querySelector(
        `.class${this.startRowPosition}x${this.startColumnPosition}`
      ).style.backgroundImage = this.imageMove;
    }, levels.gameSpeed * 1.5);
  }
  waitForStart() {
    setTimeout(() => {
      this.eyeMove();
    }, levels.gameSpeed * 15);
  }
  move(direction) {}
  eyeMove() {
    this.timeMove = setInterval(() => {
      if (
        this.startColumnPosition < board.robbo.startColumnPosition &&
        this.startRowPosition < board.robbo.startRowPosition
      ) {
        this.pathfinder = ["right", "down"];
        this.eyeDirection =
          this.pathfinder[Math.floor(Math.random() * this.pathfinder.length)];
      } else if (
        this.startColumnPosition < board.robbo.startColumnPosition &&
        this.startRowPosition > board.robbo.startRowPosition
      ) {
        this.pathfinder = ["right", "up"];
        this.eyeDirection =
          this.pathfinder[Math.floor(Math.random() * this.pathfinder.length)];
      } else if (
        this.startColumnPosition > board.robbo.startColumnPosition &&
        this.startRowPosition < board.robbo.startRowPosition
      ) {
        this.pathfinder = ["left", "down"];
        this.eyeDirection =
          this.pathfinder[Math.floor(Math.random() * this.pathfinder.length)];
      } else if (
        this.startColumnPosition > board.robbo.startColumnPosition &&
        this.startRowPosition > board.robbo.startRowPosition
      ) {
        this.pathfinder = ["left", "up"];
        this.eyeDirection =
          this.pathfinder[Math.floor(Math.random() * this.pathfinder.length)];
      }
      this.changeDirection = this.findNewWay.every(
        (val, i, arr) => val === arr[0]
      );
      if (this.changeDirection) {
        this.eyeDirection =
          this.changeWay[Math.floor(Math.random() * this.changeWay.length)];
      }
      this.checkMove = checkAction(
        this.eyeDirection,
        this.startRowPosition,
        this.startColumnPosition
      );
      if (this.checkMove && this.checkMove.textContent == "GO") {
        move(
          this.eyeDirection,
          this.startRowPosition,
          this.startColumnPosition,
          this.imageMove,
          this.startName
        );

        searchRobbo(this.startRowPosition, this.startColumnPosition);
      } else {
      }
      if (this.findNewWay.length == 4) {
        this.findNewWay.splice(0, 1);
      }
      this.findNewWay.push(
        document.querySelector(
          `.class${this.startRowPosition}x${this.startColumnPosition}`
        )
      );
    }, levels.gameSpeed);
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
    clearInterval(this.timeAnim);
    clearInterval(this.timeMove);
    animExplosion(this.startRowPosition, this.startColumnPosition);
  }
  bomb() {
    clearInterval(this.timeAnim);
    clearInterval(this.timeMove);
    animExplosion(this.startRowPosition, this.startColumnPosition);
    board.elementContainer.deleteNameObjects(this.startName);
  }
  shot(robboShot) {
    clearInterval(this.timeAnim);
    clearInterval(this.timeMove);
    animExplosion(this.startRowPosition, this.startColumnPosition);
    if (robboShot == "robboShot") {
      board.scoreBoard.scores += 150;
      board.scoreBoard.changeCount("scores");
    }
    board.elementContainer.deleteNameObjects(this.startName);
  }
  burner() {}
  nextLevel() {
    clearInterval(this.timeAnim);
    clearInterval(this.timeMove);

    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).textContent = "GO";
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).style.backgroundImage = "";
  }
}
