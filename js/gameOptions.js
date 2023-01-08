class GameOptions {
  constructor() {
    // this.levelCounter = 1;
    this.screws = 0;
    this.birdHorizontal = 0;
    this.birdVertical = 0;
    this.hash = 0;
    this.autoHash = 0;
    this.ammo = 0;
    this.border = 0;
    this.objects = [];
    this.staticObjects = ["board.gameOptions", "board.scoreBoard"];
    this.explosionAnim = [
      "",
      "url(pictures/boom1.png)",
      "url(pictures/boom2.png)",
      "url(pictures/boom3.png)",
      "url(pictures/boom4.png)",
      "url(pictures/boom5.png)",
      "url(pictures/boom6.png)",
      "url(pictures/boom7.png)",
      "",
    ];
  }
  deleteNameObjects(startName) {
    for (let i = 0; i < this.objects.length; i++) {
      if (this.objects[i] == startName) {
        this.objects.splice(i, 1);
      }
    }
  }
  nextLevel() {
    this.screws = 0;
    this.birdHorizontal = 0;
    this.birdVertical = 0;
    this.hash = 0;
    this.autoHash = 0;
    this.ammo = 0;
    this.border = 0;
    this.objects = [];
  }
}
