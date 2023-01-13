// klasa która tworzy "strzały" i ich animacje
class Shot {
  constructor(direction, row, column, name, robboShot) {
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
      this.startRowPosition + this.row+ this.row,
      this.startColumnPosition + this.column+ this.column
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
          
//          document.querySelector(
//            `.class${this.startRowPosition + this.row}x${
//              this.startColumnPosition + this.column
//            }`
//          ).style.backgroundImage = "";
          document.querySelector(
            `.class${this.startRowPosition + this.row}x${
              this.startColumnPosition + this.column
            }`
          ).textContent = "GO";
          return this.startShot();
        }, levels.gameSpeed);
      } else if (this.checkMove.textContent == "STOP"  ) {
        animShot(
          this.startRowPosition + this.row,
          this.startColumnPosition + this.column
        );
        board.elementContainer.deleteNameObjects(this.startName);
      } else if (this.checkMove.textContent == "SHOT") {

        animShot(this.startRowPosition+ this.row, this.startColumnPosition+ this.column);
        board.elementContainer.deleteNameObjects(this.startName);
      } else {
        clearTimeout(this.time);
        eval(this.checkMove.textContent).shot(this.robboShot,this.emptySpaceForShotAnim.textContent,  (this.startRowPosition + this.row), (this.startColumnPosition + this.column));

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
  destroy() {
    clearTimeout(this.time);
    animExplosion(
      this.startRowPosition + this.row,
      this.startColumnPosition + this.column
    );
  }
      shot(robboShot, checkMove, row, column) {
     
  }
  move(movedirection) {}
  direction(movedirection) {}
  nextLevel() {
    clearTimeout(this.time);

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
