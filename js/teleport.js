// klasa tworzy teleporty, działają w parach lub pojedyńczo
class Teleport {
  constructor(row, column, name, pairTeleport) {
    this.images = [
      "url(pictures/teleport-first.png)",
      "url(pictures/teleport-second.png)",
    ];
    this.startRowPosition = row;
    this.startColumnPosition = column;
    this.startName = name;
    this.checkMove;
    this.pairTeleport = pairTeleport;
    this.startTeleport = this.changeImageAnim();
    this.time;
    this.timeStartShot;
    this.teleportDirectionCounter = 0;

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
    }, levels.gameSpeed * 3);
  }
  move(direction) {
    this.firstDirection = direction;
    this.row = 0;
    this.column = 0;
    this.rooboRow = 0;
    this.rooboColumn = 0;
    this.teleportDirection = ["left", "right", "up", "down"];
    if (direction == "left") {
      this.column = 1;
      this.rooboColumn = -1;
    } else if (direction == "right") {
      this.column = -1;
      this.rooboColumn = 1;
    } else if (direction == "up") {
      this.row = 1;
      this.rooboRow = -1;
    } else if (direction == "down") {
      this.row = -1;
      this.rooboRow = 1;
    }
    this.checkMove = checkAction(
      direction,
      this.startRowPosition,
      this.startColumnPosition
    );

    if (this.checkMove) {
      if (this.checkMove.textContent == "GO") {
        animShot(board.robbo.startRowPosition, board.robbo.startColumnPosition);
        board.robbo.flag = false;
        this.teleportDirectionCounter = 0;
        document.querySelector(
          `.class${board.robbo.startRowPosition}x${board.robbo.startColumnPosition}`
        ).textContent = "GO";
        document.querySelector(
          `.class${board.robbo.startRowPosition}x${board.robbo.startColumnPosition}`
        ).style.backgroundImage = "";
        setTimeout(() => {
          this.checkMove.textContent = board.robbo.startName;
          this.checkMove.style.backgroundImage =
            board.robbo.changeImageMove(direction);

          board.robbo.flag = true;
        }, levels.gameSpeed * 3);
        board.robbo.startRowPosition = this.startRowPosition + this.rooboRow;
        board.robbo.startColumnPosition =
          this.startColumnPosition + this.rooboColumn;
      } else {
        this.teleport(this.teleportDirection);
      }
    }
  }
  teleport(teleportDirection) {
    this.checkMove = checkAction(
      teleportDirection[this.teleportDirectionCounter],
      this.startRowPosition,
      this.startColumnPosition
    );
    // console.log(this.checkMove);
    if (this.checkMove) {
      this.row = 0;
      this.column = 0;
      if (this.checkMove.textContent == "GO") {
        this.move(teleportDirection[this.teleportDirectionCounter]);
      } else {
        this.teleportDirectionCounter++;
        if (this.teleportDirectionCounter == 4) {
          if (this.firstDirection == "right") {
            this.firstDirection = "left";
            this.column = -1;
          } else if (this.firstDirection == "left") {
            this.firstDirection = "right";
            this.column = 1;
          } else if (this.firstDirection == "up") {
            this.firstDirection = "down";
            this.row = 1;
          } else if (this.firstDirection == "down") {
            this.firstDirection = "up";
            this.row = -1;
          }
          this.checkMove = checkAction(
            this.firstDirection,
            this.startRowPosition,
            this.startColumnPosition
          );
          board.robbo.flag = false;
          this.checkMove.style.backgroundImage = "";
          this.checkMove.textContent = "GO";
          animShot(
            this.startRowPosition + this.row,
            this.startColumnPosition + this.column
          );
          setTimeout(() => {
            this.checkMove.textContent = board.robbo.startName;
            this.checkMove.style.backgroundImage = board.robbo.changeImageMove(
              this.firstDirection
            );
            board.robbo.flag = true;
          }, levels.gameSpeed * 3);

          this.teleportDirectionCounter = 0;
        } else {
          this.teleport(teleportDirection);
        }
      }
    }
  }
  direction(moveDirection) {}
  destroy() {
    clearInterval(this.timeAnim);
    animExplosion(this.startRowPosition, this.startColumnPosition);
  }
  bomb() {
    clearInterval(this.timeAnim);
    animExplosion(this.startRowPosition, this.startColumnPosition);
    board.elementContainer.deleteNameObjects(this.startName);
  }
  shot(robboShot) {}
  burner() {}
  nextLevel() {
    clearInterval(this.timeAnim);
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).textContent = "GO";
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).style.backgroundImage = "";
  }
}
