// klasa tworzy teleporty, działają w parach lub pojedyńczo
class Teleport {
  constructor(row, column, name, pairTeleport) {
    this.images = [
      "url(pictures/teleport-first.png)",
      "url(pictures/teleport-second.png)",
    ];
    this.sound = new Audio("sound/teleport.wav");
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
    this.prepareToTeleport(direction);
  }

  prepareToTeleport(direction) {
    setTimeout(() => {
      this.indexTeleportPair = board.elementContainer.teleportPair.indexOf(
        this.pairTeleport
      );
      if (this.indexTeleportPair != -1) {
        this.nextTeleport =
          board.elementContainer.teleportName[this.indexTeleportPair];

        this.teleport(
          direction,
          eval(this.nextTeleport).startRowPosition,
          eval(this.nextTeleport).startColumnPosition
        );
      } else {
        this.teleport(
          direction,
          this.startRowPosition,
          this.startColumnPosition
        );
      }
    }, 0);
  }

  teleport(direction, teleportRow, teleportColumn) {
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
    this.checkMove = checkAction(direction, teleportRow, teleportColumn);

    if (this.checkMove) {
      if (this.checkMove.textContent == "GO") {
        this.sound.play();
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

        this.scrollRow = this.startRowPosition;
        this.scrollColumn = this.startColumnPosition;

        this.scrollTime = setInterval(() => {
          board.robbo.flag = false;

          document
            .querySelector(`.class${this.scrollRow}x${this.scrollColumn}`)
            .scrollIntoView({
              block: "center",
              inline: "center",
            });
          if (this.scrollRow < teleportRow) {
            this.scrollRow++;
          } else if (this.scrollRow > teleportRow) {
            this.scrollRow--;
          }

          if (this.scrollColumn < teleportColumn) {
            this.scrollColumn++;
          } else if (this.scrollColumn > teleportColumn) {
            this.scrollColumn--;
          }

          if (
            this.scrollRow == teleportRow &&
            this.scrollColumn == teleportColumn
          ) {
            clearInterval(this.scrollTime);
            board.robbo.flag = true;
          }
        }, 100);
        board.robbo.startRowPosition = teleportRow + this.rooboRow;
        board.robbo.startColumnPosition = teleportColumn + this.rooboColumn;
        animShot(board.robbo.startRowPosition, board.robbo.startColumnPosition);
      } else {
        this.teleportNoPlace(
          this.teleportDirection,
          teleportRow,
          teleportColumn
        );
      }
    } else {
      this.teleportNoPlace(this.teleportDirection, teleportRow, teleportColumn);
    }
  }
  teleportNoPlace(teleportDirection, teleportRow, teleportColumn) {
    this.checkMove = checkAction(
      teleportDirection[this.teleportDirectionCounter],
      teleportRow,
      teleportColumn
    );
    if (this.checkMove) {
      this.row = 0;
      this.column = 0;
      if (this.checkMove.textContent == "GO") {
        this.move(teleportDirection[this.teleportDirectionCounter]);
      } else {
        this.teleportDirectionCounter++;

        if (this.teleportDirectionCounter == 4) {
          if (this.firstDirection == "right") {
            this.teleportNoPlaceBackToHomeTeleport("left");
          } else if (this.firstDirection == "left") {
            this.teleportNoPlaceBackToHomeTeleport("right");
          } else if (this.firstDirection == "up") {
            this.teleportNoPlaceBackToHomeTeleport("down");
          } else if (this.firstDirection == "down") {
            this.teleportNoPlaceBackToHomeTeleport("up");
          }
          this.teleportDirectionCounter = 0;
        } else {
          this.teleportNoPlace(teleportDirection, teleportRow, teleportColumn);
        }
      }
    } else {
      this.teleportDirectionCounter++;
      this.teleportNoPlace(teleportDirection, teleportRow, teleportColumn);
    }
  }

  teleportNoPlaceBackToHomeTeleport(teleportDirection) {
    this.row = 0;
    this.column = 0;
    this.rooboRow = 0;
    this.rooboColumn = 0;
    if (teleportDirection == "left") {
      this.column = 1;
      this.rooboColumn = -1;
    } else if (teleportDirection == "right") {
      this.column = -1;
      this.rooboColumn = 1;
    } else if (teleportDirection == "up") {
      this.row = 1;
      this.rooboRow = -1;
    } else if (teleportDirection == "down") {
      this.row = -1;
      this.rooboRow = 1;
    }
    this.checkMove = checkAction(
      teleportDirection,
      this.startRowPosition,
      this.startColumnPosition
    );
    board.robbo.flag = false;
    this.checkMove.style.backgroundImage = "";
    this.checkMove.textContent = "GO";
    animShot(
      this.startRowPosition - this.row,
      this.startColumnPosition - this.column
    );
    setTimeout(() => {
      this.checkMove.textContent = board.robbo.startName;
      this.checkMove.style.backgroundImage = board.robbo.changeImageMove(
        this.firstDirection
      );
      board.robbo.flag = true;
    }, levels.gameSpeed * 5);
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
    board.elementContainer.deleteTeleportName(this.startName);
    board.elementContainer.deleteTeleportPair(this.pairTeleport);

    // this.elementContainer.teleportName.push(
    //   `board.teleport${this.elementContainer.teleport}`
    // );
    // this.elementContainer.teleportPair.push("0A");
    // this.pairTeleport = pairTeleport;
    // this.startName = name;
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
