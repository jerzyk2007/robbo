// klasa tworzy znak zapytania, do którego można strzelac i wylosowac przedmiot
class Ask {
  constructor(row, column, name) {
    this.images = ["url(pictures/ask.png)"];
    this.startRowPosition = row;
    this.startColumnPosition = column;
    this.startName = name;
    this.checkMove;
    this.imageMove = this.images[0];
    this.drawAsk = [
      "board.screw",
      "board.ship",
      "board.hash",
      "board.ask",
      "board.ammo",
      "board.bomb",
      "board.key",
      "board.live",
      "board.screw",
      "",
    ];
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).style.backgroundImage = this.imageMove;
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).textContent = this.startName;
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
  move(moveDirection) {
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
          this.imageMove,
          this.startName
        );
        board.robbo.moveRobbo(moveDirection);
      }
    }
  }
  bomb() {
    animExplosion(this.startRowPosition, this.startColumnPosition);
    board.elementContainer.deleteNameObjects(this.startName);
  }
  destroy() {
    animExplosion(this.startRowPosition, this.startColumnPosition);
  }
  shot(robboShot) {
    animExplosion(this.startRowPosition, this.startColumnPosition);
    board.elementContainer.deleteNameObjects(this.startName);
    setTimeout(() => {
      board.elementContainer.beetle++;
      console.log(board.elementContainer.beetle);

      eval(
        `board.beetle${board.elementContainer.beetle} = new Beetle(${this.startRowPosition}, ${this.startColumnPosition}, "board.beetle${board.elementContainer.beetle}", "left", "ant")`
      );
      board.elementContainer.objects.push(
        `board.beetle${board.elementContainer.beetle}`
      );

      if (robboShot == "robboShot") {
        board.scoreBoard.changeCount("bomb");
        board.elementContainer.deleteNameObjects(this.startName);
      }
    }, levels.gameSpeed);
  }
  burner() {
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).textContent = "GO";
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).style.backgroundImage = "";
    board.elementContainer.deleteNameObjects(this.startName);
    return "GO";
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
