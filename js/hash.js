// klasa tworzy kratkę, którą można przesuwać
class Hash {
  constructor(row, column, name) {
    this.images = ["url(pictures/hash.png)"];
    this.startRowPosition = row;
    this.startColumnPosition = column;
    this.startName = name;
    this.checkMove;
    this.imageMove = this.images[0];
    this.action = ["empty"];
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).style.backgroundImage = this.images[0];
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
      if(this.checkMove){
    if (this.checkMove.textContent == "GO") {
      move(
        moveDirection,
        this.startRowPosition,
        this.startColumnPosition,
        this.imageMove,
        this.startName
      );
      board.robbo.moveRobbo(moveDirection);
    }}
  }
  destroy() {
    animExplosion(this.startRowPosition, this.startColumnPosition);
  }
    bomb(){
        animExplosion(this.startRowPosition, this.startColumnPosition);
        board.elementContainer.deleteNameObjects(this.startName);
    }
  shot() {}
  nextLevel() {
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).textContent = "GO";
    document.querySelector(
      `.class${this.startRowPosition}x${this.startColumnPosition}`
    ).style.backgroundImage = "";
  }
}
