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
    if (direction == "right") {
      this.checkMove = checkAction(
        direction,
        this.startRowPosition,
        this.startColumnPosition
      );
      board.robbo.teleport(
        this.startRowPosition,
        this.startColumnPosition - 1,
        this.checkMove,
        direction
      );
      animShot(this.startRowPosition, this.startColumnPosition - 1);
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
