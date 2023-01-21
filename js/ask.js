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
      "board.gunRotate",
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
    this.draw = Math.floor(Math.random() * this.drawAsk.length);
    setTimeout(() => {
      if (this.draw == 0) {
        board.elementContainer.screw++;
        eval(
          `board.screw${board.elementContainer.screw} = new Screw(${this.startRowPosition}, ${this.startColumnPosition}, "board.screw${board.elementContainer.screw}")`
        );
        board.elementContainer.objects.push(
          `board.screw${board.elementContainer.screw}`
        );
      } else if (this.draw == 1) {
        board.elementContainer.ship++;
        eval(
          `board.ship${board.elementContainer.ship} = new Ship(${this.startRowPosition}, ${this.startColumnPosition}, "board.ship${board.elementContainer.ship}", "shipReady")`
        );
        board.elementContainer.objects.push(
          `board.ship${board.elementContainer.ship}`
        );
      } else if (this.draw == 2) {
        board.elementContainer.hash++;
        eval(
          `board.hash${board.elementContainer.hash} = new Hash(${this.startRowPosition}, ${this.startColumnPosition}, "board.hash${board.elementContainer.hash}", "hash")`
        );
        board.elementContainer.objects.push(
          `board.hash${board.elementContainer.hash}`
        );
      } else if (this.draw == 3) {
        board.elementContainer.ask++;
        eval(
          `board.ask${board.elementContainer.ask} = new Ask(${this.startRowPosition}, ${this.startColumnPosition}, "board.ask${board.elementContainer.ask}")`
        );
        board.elementContainer.objects.push(
          `board.ask${board.elementContainer.ask}`
        );
      } else if (this.draw == 4) {
        board.elementContainer.ammo++;
        eval(
          `board.ammo${board.elementContainer.ammo} = new Ammo(${this.startRowPosition}, ${this.startColumnPosition}, "board.ammo${board.elementContainer.ammo}")`
        );
        board.elementContainer.objects.push(
          `board.ammo${board.elementContainer.ammo}`
        );
      } else if (this.draw == 5) {
        board.elementContainer.bomb++;
        eval(
          `board.bomb${board.elementContainer.bomb} = new Bomb(${this.startRowPosition}, ${this.startColumnPosition}, "board.bomb${board.elementContainer.bomb}")`
        );
        board.elementContainer.objects.push(
          `board.bomb${board.elementContainer.bomb}`
        );
      } else if (this.draw == 6) {
        board.elementContainer.key++;
        eval(
          `board.key${board.elementContainer.key} = new Key(${this.startRowPosition}, ${this.startColumnPosition}, "board.key${board.elementContainer.key}")`
        );
        board.elementContainer.objects.push(
          `board.key${board.elementContainer.key}`
        );
      } else if (this.draw == 7) {
        board.elementContainer.live++;
        eval(
          `board.key${board.elementContainer.key} = new Key(${this.startRowPosition}, ${this.startColumnPosition}, "board.key${board.elementContainer.key}")`
        );
        board.elementContainer.objects.push(
          `board.key${board.elementContainer.key}`
        );
      } else if (this.draw == 8) {
        board.elementContainer.gun++;
        eval(
          `board.gun${board.elementContainer.gun} = new Gun(${this.startRowPosition}, ${this.startColumnPosition}, "board.gun${board.elementContainer.gun}", "up", "single", "rotate")`
        );
        board.elementContainer.objects.push(
          `board.gun${board.elementContainer.gun}`
        );
      }
      if (robboShot == "robboShot") {
        board.scoreBoard.changeCount("bomb");
        board.elementContainer.deleteNameObjects(this.startName);
      }
    }, levels.gameSpeed * 5);
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
