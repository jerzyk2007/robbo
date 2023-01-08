// klasa tworzy tablicę gry i przechowuje położenie innych obiektów gry lub postaci
class Board {
  constructor(row, column) {
    this.rowCounter = row;
    this.columnCounter = column;
    this.elementContainer = new ElemenntContainer();
    this.createBoard(this.rowCounter, this.columnCounter);
    this.createElement(this.rowCounter, this.columnCounter);

    /// flaga pozwala tylko na jednorazowe zabicie robbo w danej sytuacji
    this.flag = true;
  }
  createBoard(rowCounter, columnCounter) {
    const gameBoard = document.querySelector(".gameBoard");
    gameBoard.style.gridTemplateColumns = `repeat(${columnCounter}, 1fr)`;
    for (let i = 1; i <= rowCounter; i++) {
      for (let j = 1; j <= columnCounter; j++) {
        const pieceBoard = document.createElement("div");
        gameBoard.appendChild(pieceBoard);
        pieceBoard.classList.add(`class${i}x${j}`);
        pieceBoard.classList.add("pieceBoard");
        pieceBoard.textContent = "GO";
      }
    }
  }
  createElement(rowCounter, columnCounter) {
    for (let i = 0; i < rowCounter; i++) {
      for (let j = 0; j < columnCounter; j++) {
        if (eval(`levels.level${levels.levelCounter}part${i + 1}`)[j] === "#") {
          eval(`this.border = new Border(i + 1, j + 1, "board.border")`);
        } else if (
          eval(`levels.level${levels.levelCounter}part${i + 1}`)[j] === "R"
        ) {
          this.robbo = new Robbo(i + 1, j + 1, "board.robbo");
          this.elementContainer.objects.push(`board.robbo`);
        } else if (
          eval(`levels.level${levels.levelCounter}part${i + 1}`)[j] === "S"
        ) {
          this.elementContainer.screws++;
          eval(
            `this.screw${this.elementContainer.screws} = new Screw(i + 1, j + 1, 'board.screw${this.elementContainer.screws}')`
          );
          this.elementContainer.objects.push(
            `board.screw${this.elementContainer.screws}`
          );
        } else if (
          eval(`levels.level${levels.levelCounter}part${i + 1}`)[j] === "H"
        ) {
          this.elementContainer.birdHorizontal++;
          eval(
            `this.birdHorizontal${this.elementContainer.birdHorizontal} = new Bird(i+1, j+1, "board.birdHorizontal${this.elementContainer.birdHorizontal}", "horizontal")`
          );
          this.elementContainer.objects.push(
            `board.birdHorizontal${this.elementContainer.birdHorizontal}`
          );
        } else if (
          eval(`levels.level${levels.levelCounter}part${i + 1}`)[j] === "V"
        ) {
          this.elementContainer.birdVertical++;
          eval(
            `this.birdVertical${this.elementContainer.birdVertical} = new Bird(i+1, j+1, "board.birdVertical${this.elementContainer.birdVertical}", "vertical")`
          );
          this.elementContainer.objects.push(
            `board.birdVertical${this.elementContainer.birdVertical}`
          );
        } else if (
          eval(`levels.level${levels.levelCounter}part${i + 1}`)[j] === "G"
        ) {
          this.elementContainer.gunUp++;
          eval(
            `this.gunUp${this.elementContainer.gunUp} = new Gun(i+1, j+1, "board.gunUp${this.elementContainer.gunUp}", "up")`
          );
          this.elementContainer.objects.push(
            `board.gunUp${this.elementContainer.gunUp}`
          );
        } else if (
          eval(`levels.level${levels.levelCounter}part${i + 1}`)[j] === ">"
        ) {
          this.elementContainer.magnetLeft++;
          eval(
            `this.magnetLeft${this.elementContainer.magnetLeft} = new Magnet(i+1, j+1, "board.magnetLeft${this.elementContainer.magnetLeft}", "left")`
          );
          this.elementContainer.objects.push(
            `board.magnetLeft${this.elementContainer.magnetLeft}`
          );
        } else if (
          eval(`levels.level${levels.levelCounter}part${i + 1}`)[j] === "<"
        ) {
          this.elementContainer.magnetRight++;
          eval(
            `this.magnetRight${this.elementContainer.magnetRight} = new Magnet(i+1, j+1, "board.magnetRight${this.elementContainer.magnetRight}", "right")`
          );
          this.elementContainer.objects.push(
            `board.magnetRight${this.elementContainer.magnetRight}`
          );
        } else if (
          eval(`levels.level${levels.levelCounter}part${i + 1}`)[j] === "J"
        ) {
          this.elementContainer.gunDown++;
          eval(
            `this.gunDown${this.elementContainer.gunDown} = new Gun(i+1, j+1, "board.gunDown${this.elementContainer.gunDown}", "down")`
          );
          this.elementContainer.objects.push(
            `board.gunDown${this.elementContainer.gunDown}`
          );
        } else if (
          eval(`levels.level${levels.levelCounter}part${i + 1}`)[j] === "O"
        ) {
          this.elementContainer.gunLeft++;
          eval(
            `this.gunLeft${this.elementContainer.gunLeft} = new Gun(i+1, j+1, "board.gunLeft${this.elementContainer.gunLeft}", "left")`
          );
          this.elementContainer.objects.push(
            `board.gunLeft${this.elementContainer.gunLeft}`
          );
        } else if (
          eval(`levels.level${levels.levelCounter}part${i + 1}`)[j] === "M"
        ) {
          this.elementContainer.gunRight++;
          eval(
            `this.gunRight${this.elementContainer.gunRight} = new Gun(i+1, j+1, "board.gunRight${this.elementContainer.gunRight}", "right")`
          );
          this.elementContainer.objects.push(
            `board.gunRight${this.elementContainer.gunRight}`
          );
        } else if (
          eval(`levels.level${levels.levelCounter}part${i + 1}`)[j] === "Q"
        ) {
          this.elementContainer.hash++;
          eval(
            `this.hash${this.elementContainer.hash} = new Hash(i+1, j+1, "board.hash${this.elementContainer.hash}")`
          );
          this.elementContainer.objects.push(
            `board.hash${this.elementContainer.hash}`
          );
        } else if (
          eval(`levels.level${levels.levelCounter}part${i + 1}`)[j] === "W"
        ) {
          this.elementContainer.autoHash++;
          eval(
            `this.autoHash${this.elementContainer.autoHash} = new AutoHash(i+1, j+1, "board.autoHash${this.elementContainer.autoHash}")`
          );
          this.elementContainer.objects.push(
            `board.autoHash${this.elementContainer.autoHash}`
          );
        } else if (
          eval(`levels.level${levels.levelCounter}part${i + 1}`)[j] === "A"
        ) {
          this.elementContainer.ammo++;
          eval(
            `this.ammo${this.elementContainer.ammo} = new Ammo(i+1, j+1, "board.ammo${this.elementContainer.ammo}")`
          );
          this.elementContainer.objects.push(
            `board.ammo${this.elementContainer.ammo}`
          );
        } else if (
          eval(`levels.level${levels.levelCounter}part${i + 1}`)[j] === "B"
        ) {
          this.elementContainer.bombs++;
          eval(
            `this.bomb${this.elementContainer.bombs} = new Bomb(i+1, j+1, "board.bomb${this.elementContainer.bombs}")`
          );
          this.elementContainer.objects.push(
            `board.bomb${this.elementContainer.bombs}`
          );
        } else if (
          eval(`levels.level${levels.levelCounter}part${i + 1}`)[j] === "L"
        ) {
          this.elementContainer.lives++;
          eval(
            `this.lives${this.elementContainer.lives} = new Lives(i+1, j+1, "board.lives${this.elementContainer.lives}")`
          );
          this.elementContainer.objects.push(
            `board.lives${this.elementContainer.lives}`
          );
        } else if (
          eval(`levels.level${levels.levelCounter}part${i + 1}`)[j] === "K"
        ) {
          this.elementContainer.keys++;
          eval(
            `this.keys${this.elementContainer.keys} = new Keys(i+1, j+1, "board.keys${this.elementContainer.keys}")`
          );
          this.elementContainer.objects.push(
            `board.keys${this.elementContainer.keys}`
          );
        } else if (
          eval(`levels.level${levels.levelCounter}part${i + 1}`)[j] === "X"
        ) {
          // this.elementContainer.keys++;
          eval(`this.blackHole = new BlackHole(i+1, j+1, "board.blackHole")`);
        } else if (
          eval(`levels.level${levels.levelCounter}part${i + 1}`)[j] === "P"
        ) {
          this.elementContainer.wall++;
          eval(
            `this.wall${this.elementContainer.wall} = new Wall(i+1, j+1, "board.wall${this.elementContainer.wall}")`
          );
          this.elementContainer.objects.push(
            `board.wall${this.elementContainer.wall}`
          );
        } else if (
          eval(`levels.level${levels.levelCounter}part${i + 1}`)[j] === "D"
        ) {
          this.elementContainer.door++;
          eval(
            `this.door${this.elementContainer.door} = new Door(i+1, j+1, "board.door${this.elementContainer.door}")`
          );
          this.elementContainer.objects.push(
            `board.door${this.elementContainer.door}`
          );
        } else if (
          eval(`levels.level${levels.levelCounter}part${i + 1}`)[j] === "$"
        ) {
          this.ship = new Ship(i + 1, j + 1, "board.ship");
          this.elementContainer.objects.push(`board.ship`);
        } else if (
          eval(`levels.level${levels.levelCounter}part${i + 1}`)[j] === "C"
        ) {
          this.elementContainer.ant++;
          eval(
            `this.ant${this.elementContainer.ant} = new Beetle(i+1, j+1, "board.ant${this.elementContainer.ant}", "left", "ant")`
          );
          this.elementContainer.objects.push(
            `board.ant${this.elementContainer.ant}`
          );
        } else if (
          eval(`levels.level${levels.levelCounter}part${i + 1}`)[j] === "F"
        ) {
          this.elementContainer.beetle++;
          eval(
            `this.beetle${this.elementContainer.beetle} = new Beetle(i+1, j+1, "board.beetle${this.elementContainer.beetle}", "left", "beetle")`
          );
          this.elementContainer.objects.push(
            `board.beetle${this.elementContainer.beetle}`
          );
        }
      }
    }
    this.scoreBoard = new ScoreBoard(this.elementContainer.screws);
    if (this.elementContainer.screws == 0) {
      this.ship.shipReady();
    }
  }
}
