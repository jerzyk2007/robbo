// klasa tworzy tablicę gry i przechowuje położenie innych obiektów gry lub postaci
class Board {
  constructor(row, column) {
    this.rowCounter = row;
    this.columnCounter = column;
    this.elementContainer = new ElementContainer();
    this.createBoard(this.rowCounter, this.columnCounter);
    this.createElement(this.rowCounter, this.columnCounter);
  }
  createBoard(rowCounter, columnCounter) {
    const gameBoard = document.querySelector(".gameBoard");
    gameBoard.style.backgroundColor =
      levels.boardColor[levels.boardColorCounter];
    gameBoard.style.gridTemplateColumns = `repeat(${columnCounter}, 1fr)`;
    for (let i = 1; i <= rowCounter; i++) {
      for (let j = 1; j <= columnCounter; j++) {
        const pieceBoard = document.createElement("div");
        gameBoard.appendChild(pieceBoard);
        pieceBoard.classList.add(`class${i}x${j}`);
        pieceBoard.classList.add("pieceBoard");
        pieceBoard.textContent = "GO";
        pieceBoard.style.backgroundColor =
          levels.boardColor[levels.boardColorCounter];
      }
    }
  }
  createElement(rowCounter, columnCounter) {
    for (let i = 0; i < rowCounter; i++) {
      for (let j = 0; j < columnCounter; j++) {
        this.addElelemntToBoard(
          i + 1,
          j + 1,
          levels[`level${levels.levelCounter}`][i][j]
        );
      }
    }
    this.scoreBoard = new ScoreBoard(this.elementContainer.screw);
    if (this.elementContainer.screw == 0) {
      this.ship1.shipReady();
    }
  }
  addElelemntToBoard(row, column, element) {
    if (element == "1") {
      this[`border`] = new Border(row, column, "board.border", "border1");
    } else if (element == "2") {
      this[`border`] = new Border(row, column, "board.border", "border2");
    } else if (element == "3") {
      this[`border`] = new Border(row, column, "board.border", "border3");
    } else if (element == "4") {
      this[`border`] = new Border(row, column, "board.border", "border4");
    } else if (element == "5") {
      this[`border`] = new Border(row, column, "board.border", "border5");
    }else if (element == "6") {
      this[`border`] = new Border(row, column, "board.border", "border6");
    }else if (element == "7") {
      this[`border`] = new Border(row, column, "board.border", "border7");
    }else if (element == "8") {
      this[`border`] = new Border(row, column, "board.border", "border8");
    }
      else if (element == "@") {
      this.robbo = new Robbo(row, column, "board.robbo");
      this.elementContainer.objects.push(`board.robbo`);
    } else if (element == "I") {
      this.elementContainer.screw++;
      this[`screw${this.elementContainer.screw}`] = new Screw(
        row,
        column,
        `board.screw${this.elementContainer.screw}`
      );
      this.elementContainer.objects.push(
        `board.screw${this.elementContainer.screw}`
      );
    } else if (element == "N") {
      this.elementContainer.bird++;
      this[`bird${this.elementContainer.bird}`] = new Bird(
        row,
        column,
        `board.bird${this.elementContainer.bird}`,
        "horizontal"
      );
      this.elementContainer.objects.push(
        `board.bird${this.elementContainer.bird}`
      );
    } else if (element == "M") {
      this.elementContainer.bird++;
      this[`bird${this.elementContainer.bird}`] = new Bird(
        row,
        column,
        `board.bird${this.elementContainer.bird}`,
        "vertical"
      );
      this.elementContainer.objects.push(
        `board.bird${this.elementContainer.bird}`
      );
    } else if (element == "O") {
      this.elementContainer.bird++;
      this[`bird${this.elementContainer.bird}`] = new Bird(
        row,
        column,
        `board.bird${this.elementContainer.bird}`,
        "horizontal",
        "shot"
      );
      this.elementContainer.objects.push(
        `board.bird${this.elementContainer.bird}`
      );
    } else if (element == "P") {
      this.elementContainer.magnet++;
      this[`magnet${this.elementContainer.magnet}`] = new Magnet(
        row,
        column,
        `board.magnet${this.elementContainer.magnet}`,
        "left"
      );
      this.elementContainer.objects.push(
        `board.magnet${this.elementContainer.magnet}`
      );
    } else if (element == "Q") {
      this.elementContainer.magnet++;
      this[`magnet${this.elementContainer.magnet}`] = new Magnet(
        row,
        column,
        `board.magnet${this.elementContainer.magnet}`,
        "right"
      );
      this.elementContainer.objects.push(
        `board.magnet${this.elementContainer.magnet}`
      );
    } else if (element == "Y") {
      this.elementContainer.gun++;
      this[`gun${this.elementContainer.gun}`] = new Gun(
        row,
        column,
        `board.gun${this.elementContainer.gun}`,
        "down",
        "laser"
      );
      this.elementContainer.objects.push(
        `board.gun${this.elementContainer.gun}`
      );
    } else if (element == "V") {
      this.elementContainer.gun++;
      this[`gun${this.elementContainer.gun}`] = new Gun(
        row,
        column,
        `board.gun${this.elementContainer.gun}`,
        "right",
        "laser"
      );
      this.elementContainer.objects.push(
        `board.gun${this.elementContainer.gun}`
      );
    } else if (element == "W") {
      this.elementContainer.gun++;
      this[`gun${this.elementContainer.gun}`] = new Gun(
        row,
        column,
        `board.gun${this.elementContainer.gun}`,
        "left",
        "laser"
      );
      this.elementContainer.objects.push(
        `board.gun${this.elementContainer.gun}`
      );
    }
      else if (element == "R") {
      this.elementContainer.gun++;
      this[`gun${this.elementContainer.gun}`] = new Gun(
        row,
        column,
        `board.gun${this.elementContainer.gun}`,
        "right",
        "single"
      );
      this.elementContainer.objects.push(
        `board.gun${this.elementContainer.gun}`
      );
    } else if (element == "U") {
      this.elementContainer.gun++;
      this[`gun${this.elementContainer.gun}`] = new Gun(
        row,
        column,
        `board.gun${this.elementContainer.gun}`,
        "down",
        "single"
      );
      this.elementContainer.objects.push(
        `board.gun${this.elementContainer.gun}`
      );
    } else if (element == "T") {
      this.elementContainer.gun++;
      this[`gun${this.elementContainer.gun}`] = new Gun(
        row,
        column,
        `board.gun${this.elementContainer.gun}`,
        "up",
        "single"
      );
      this.elementContainer.objects.push(
        `board.gun${this.elementContainer.gun}`
      );
    } else if (element == "S") {
      this.elementContainer.gun++;
      this[`gun${this.elementContainer.gun}`] = new Gun(
        row,
        column,
        `board.gun${this.elementContainer.gun}`,
        "left",
        "single"
      );
      this.elementContainer.objects.push(
        `board.gun${this.elementContainer.gun}`
      );
    } else if (element == "X") {
      this.elementContainer.gun++;
      this[`gun${this.elementContainer.gun}`] = new Gun(
        row,
        column,
        `board.gun${this.elementContainer.gun}`,
        "up",
        "laser"
      );
      this.elementContainer.objects.push(
        `board.gun${this.elementContainer.gun}`
      );
    } else if (element == "h") {
      this.elementContainer.gun++;
      this[`gun${this.elementContainer.gun}`] = new Gun(
        row,
        column,
        `board.gun${this.elementContainer.gun}`,
        "up",
        "single",
        "rotate"
      );
      this.elementContainer.objects.push(
        `board.gun${this.elementContainer.gun}`
      );
    } else if (element == "b") {
      this.elementContainer.gun++;
      this[`gun${this.elementContainer.gun}`] = new Gun(
        row,
        column,
        `board.gun${this.elementContainer.gun}`,
        "up",
        "single",
        "moving"
      );
      this.elementContainer.objects.push(
        `board.gun${this.elementContainer.gun}`
      );
    } else if (element == "Z") {
      this.elementContainer.gun++;
      this[`gun${this.elementContainer.gun}`] = new Gun(
        row,
        column,
        `board.gun${this.elementContainer.gun}`,
        "right",
        "single",
        "moving"
      );
      this.elementContainer.objects.push(
        `board.gun${this.elementContainer.gun}`
      );
    } else if (element == "a") {
      this.elementContainer.gun++;
      this[`gun${this.elementContainer.gun}`] = new Gun(
        row,
        column,
        `board.gun${this.elementContainer.gun}`,
        "left",
        "single",
        "moving"
      );
      this.elementContainer.objects.push(
        `board.gun${this.elementContainer.gun}`
      );
    } else if (element == "c") {
      this.elementContainer.gun++;
      this[`gun${this.elementContainer.gun}`] = new Gun(
        row,
        column,
        `board.gun${this.elementContainer.gun}`,
        "down",
        "single",
        "moving"
      );
      this.elementContainer.objects.push(
        `board.gun${this.elementContainer.gun}`
      );
    } else if (element == "d") {
      this.elementContainer.gun++;
      this[`gun${this.elementContainer.gun}`] = new Gun(
        row,
        column,
        `board.gun${this.elementContainer.gun}`,
        "right",
        "burner"
      );
      this.elementContainer.objects.push(
        `board.gun${this.elementContainer.gun}`
      );
    } else if (element == "e") {
      this.elementContainer.gun++;
      this[`gun${this.elementContainer.gun}`] = new Gun(
        row,
        column,
        `board.gun${this.elementContainer.gun}`,
        "left",
        "burner"
      );
      this.elementContainer.objects.push(
        `board.gun${this.elementContainer.gun}`
      );
    } else if (element == "f") {
      this.elementContainer.gun++;
      this[`gun${this.elementContainer.gun}`] = new Gun(
        row,
        column,
        `board.gun${this.elementContainer.gun}`,
        "up",
        "burner"
      );
      this.elementContainer.objects.push(
        `board.gun${this.elementContainer.gun}`
      );
    } else if (element == "g") {
      this.elementContainer.gun++;
      this[`gun${this.elementContainer.gun}`] = new Gun(
        row,
        column,
        `board.gun${this.elementContainer.gun}`,
        "down",
        "burner"
      );
      this.elementContainer.objects.push(
        `board.gun${this.elementContainer.gun}`
      );
    } else if (element == "#") {
      this.elementContainer.hash++;
      this[`hash${this.elementContainer.hash}`] = new Hash(
        row,
        column,
        `board.hash${this.elementContainer.hash}`,
        "hash"
      );
      this.elementContainer.objects.push(
        `board.hash${this.elementContainer.hash}`
      );
    } else if (element == "%") {
      this.elementContainer.hash++;
      this[`hash${this.elementContainer.hash}`] = new Hash(
        row,
        column,
        `board.hash${this.elementContainer.hash}`,
        "autohash"
      );
      this.elementContainer.objects.push(
        `board.hash${this.elementContainer.hash}`
      );
    } else if (element == "A") {
      this.elementContainer.ammo++;
      this[`ammo${this.elementContainer.ammo}`] = new Ammo(
        row,
        column,
        `board.ammo${this.elementContainer.ammo}`
      );
      this.elementContainer.objects.push(
        `board.ammo${this.elementContainer.ammo}`
      );
    } else if (element == "B") {
      this.elementContainer.bomb++;
      this[`bomb${this.elementContainer.bomb}`] = new Bomb(
        row,
        column,
        `board.bomb${this.elementContainer.bomb}`
      );
      this.elementContainer.objects.push(
        `board.bomb${this.elementContainer.bomb}`
      );
    } else if (element == "?") {
      this.elementContainer.ask++;
      this[`ask${this.elementContainer.ask}`] = new Ask(
        row,
        column,
        `board.ask${this.elementContainer.ask}`
      );
      this.elementContainer.objects.push(
        `board.ask${this.elementContainer.ask}`
      );
    } else if (element == "G") {
      this.elementContainer.live++;
      this[`live${this.elementContainer.live}`] = new Live(
        row,
        column,
        `board.live${this.elementContainer.live}`
      );
      this.elementContainer.objects.push(
        `board.live${this.elementContainer.live}`
      );
    } else if (element == "F") {
      this.elementContainer.key++;
      this[`key${this.elementContainer.key}`] = new Key(
        row,
        column,
        `board.key${this.elementContainer.key}`
      );
      this.elementContainer.objects.push(
        `board.key${this.elementContainer.key}`
      );
    } else if (element == "E") {
      this.elementContainer.eye++;
      this[`eye${this.elementContainer.eye}`] = new Eye(
        row,
        column,
        `board.eye${this.elementContainer.eye}`
      );
      this.elementContainer.objects.push(
        `board.eye${this.elementContainer.eye}`
      );
    } else if (element == "C") {
      this.elementContainer.blackHole++;
      this[`blackHole${this.elementContainer.blackHole}`] = new BlackHole(
        row,
        column,
        `board.blackHole${this.elementContainer.blackHole}`
      );
      this.elementContainer.objects.push(
        `board.blackHole${this.elementContainer.blackHole}`
      );
    } else if (element == "J") {
      this.elementContainer.wall++;
      this[`wall${this.elementContainer.wall}`] = new Wall(
        row,
        column,
        `board.wall${this.elementContainer.wall}`
      );
      this.elementContainer.objects.push(
        `board.wall${this.elementContainer.wall}`
      );
    } else if (element == "H") {
      this.elementContainer.bench++;
      this[`bench${this.elementContainer.bench}`] = new Bench(
        row,
        column,
        `board.bench${this.elementContainer.bench}`
      );
      this.elementContainer.objects.push(
        `board.bench${this.elementContainer.bench}`
      );
    } else if (element == "D") {
      this.elementContainer.door++;
      this[`door${this.elementContainer.door}`] = new Door(
        row,
        column,
        `board.door${this.elementContainer.door}`
      );
      this.elementContainer.objects.push(
        `board.door${this.elementContainer.door}`
      );
    } else if (element == "$") {
      this.elementContainer.ship++;
      this[`ship${this.elementContainer.ship}`] = new Ship(
        row,
        column,
        `board.ship${this.elementContainer.ship}`
      );
      this.elementContainer.objects.push(
        `board.ship${this.elementContainer.ship}`
      );
    } else if (element == "+") {
      this.elementContainer.ship++;
      this[`ship${this.elementContainer.ship}`] = new Ship(
        row,
        column,
        `board.ship${this.elementContainer.ship}`,
        "shipReady"
      );
      this.elementContainer.objects.push(
        `board.ship${this.elementContainer.ship}`
      );
    } else if (element == "K") {
      this.elementContainer.beetle++;
      this[`beetle${this.elementContainer.beetle}`] = new Beetle(
        row,
        column,
        `board.beetle${this.elementContainer.beetle}`,
        "left",
        "ant"
      );
      this.elementContainer.objects.push(
        `board.beetle${this.elementContainer.beetle}`
      );
    } else if (element == "L") {
      this.elementContainer.beetle++;
      this[`beetle${this.elementContainer.beetle}`] = new Beetle(
        row,
        column,
        `board.beetle${this.elementContainer.beetle}`,
        "left",
        "beetle"
      );
      this.elementContainer.objects.push(
        `board.beetle${this.elementContainer.beetle}`
      );
    } else if (element == "j") {
      this.elementContainer.teleport++;
      this[`teleport${this.elementContainer.teleport}`] = new Teleport(
        row,
        column,
        `board.teleport${this.elementContainer.teleport}`,
        "A0"
      );
      this.elementContainer.objects.push(
        `board.teleport${this.elementContainer.teleport}`
      );
      this.elementContainer.teleportName.push(
        `board.teleport${this.elementContainer.teleport}`
      );
      this.elementContainer.teleportPair.push("0A");
    } else if (element == "k") {
      this.elementContainer.teleport++;
      this[`teleport${this.elementContainer.teleport}`] = new Teleport(
        row,
        column,
        `board.teleport${this.elementContainer.teleport}`,
        "0A"
      );
      this.elementContainer.objects.push(
        `board.teleport${this.elementContainer.teleport}`
      );
      this.elementContainer.teleportName.push(
        `board.teleport${this.elementContainer.teleport}`
      );
      this.elementContainer.teleportPair.push("A0");
    } else if (element == "l") {
      this.elementContainer.teleport++;
      this[`teleport${this.elementContainer.teleport}`] = new Teleport(
        row,
        column,
        `board.teleport${this.elementContainer.teleport}`,
        "A1"
      );
      this.elementContainer.objects.push(
        `board.teleport${this.elementContainer.teleport}`
      );
      this.elementContainer.teleportName.push(
        `board.teleport${this.elementContainer.teleport}`
      );
      this.elementContainer.teleportPair.push("1A");
    } else if (element == "m") {
      this.elementContainer.teleport++;
      this[`teleport${this.elementContainer.teleport}`] = new Teleport(
        row,
        column,
        `board.teleport${this.elementContainer.teleport}`,
        "1A"
      );
      this.elementContainer.objects.push(
        `board.teleport${this.elementContainer.teleport}`
      );
      this.elementContainer.teleportName.push(
        `board.teleport${this.elementContainer.teleport}`
      );
      this.elementContainer.teleportPair.push("A1");
    } else if (element == "n") {
      this.elementContainer.teleport++;
      this[`teleport${this.elementContainer.teleport}`] = new Teleport(
        row,
        column,
        `board.teleport${this.elementContainer.teleport}`,
        "A2"
      );
      this.elementContainer.objects.push(
        `board.teleport${this.elementContainer.teleport}`
      );
      this.elementContainer.teleportName.push(
        `board.teleport${this.elementContainer.teleport}`
      );
      this.elementContainer.teleportPair.push("2A");
    } else if (element == "o") {
      this.elementContainer.teleport++;
      this[`teleport${this.elementContainer.teleport}`] = new Teleport(
        row,
        column,
        `board.teleport${this.elementContainer.teleport}`,
        "2A"
      );
      this.elementContainer.objects.push(
        `board.teleport${this.elementContainer.teleport}`
      );
      this.elementContainer.teleportName.push(
        `board.teleport${this.elementContainer.teleport}`
      );
      this.elementContainer.teleportPair.push("A2");
    } else if (element == "p") {
      this.elementContainer.teleport++;
      this[`teleport${this.elementContainer.teleport}`] = new Teleport(
        row,
        column,
        `board.teleport${this.elementContainer.teleport}`,
        "A3"
      );
      this.elementContainer.objects.push(
        `board.teleport${this.elementContainer.teleport}`
      );
      this.elementContainer.teleportName.push(
        `board.teleport${this.elementContainer.teleport}`
      );
      this.elementContainer.teleportPair.push("3A");
    } else if (element == "q") {
      this.elementContainer.teleport++;
      this[`teleport${this.elementContainer.teleport}`] = new Teleport(
        row,
        column,
        `board.teleport${this.elementContainer.teleport}`,
        "3A"
      );
      this.elementContainer.objects.push(
        `board.teleport${this.elementContainer.teleport}`
      );
      this.elementContainer.teleportName.push(
        `board.teleport${this.elementContainer.teleport}`
      );
      this.elementContainer.teleportPair.push("A3");
    } else if (element == "r") {
      this.elementContainer.teleport++;
      this[`teleport${this.elementContainer.teleport}`] = new Teleport(
        row,
        column,
        `board.teleport${this.elementContainer.teleport}`,
        "A4"
      );
      this.elementContainer.objects.push(
        `board.teleport${this.elementContainer.teleport}`
      );
      this.elementContainer.teleportName.push(
        `board.teleport${this.elementContainer.teleport}`
      );
      this.elementContainer.teleportPair.push("4A");
    } else if (element == "s") {
      this.elementContainer.teleport++;
      this[`teleport${this.elementContainer.teleport}`] = new Teleport(
        row,
        column,
        `board.teleport${this.elementContainer.teleport}`,
        "4A"
      );
      this.elementContainer.objects.push(
        `board.teleport${this.elementContainer.teleport}`
      );
      this.elementContainer.teleportName.push(
        `board.teleport${this.elementContainer.teleport}`
      );
      this.elementContainer.teleportPair.push("A4");
    } else if (element == "t") {
      this.elementContainer.teleport++;
      this[`teleport${this.elementContainer.teleport}`] = new Teleport(
        row,
        column,
        `board.teleport${this.elementContainer.teleport}`,
        "A5"
      );
      this.elementContainer.objects.push(
        `board.teleport${this.elementContainer.teleport}`
      );
      this.elementContainer.teleportName.push(
        `board.teleport${this.elementContainer.teleport}`
      );
      this.elementContainer.teleportPair.push("5A");
    } else if (element == "u") {
      this.elementContainer.teleport++;
      this[`teleport${this.elementContainer.teleport}`] = new Teleport(
        row,
        column,
        `board.teleport${this.elementContainer.teleport}`,
        "5A"
      );
      this.elementContainer.objects.push(
        `board.teleport${this.elementContainer.teleport}`
      );
      this.elementContainer.teleportName.push(
        `board.teleport${this.elementContainer.teleport}`
      );
      this.elementContainer.teleportPair.push("A5");
    } else if (element == "v") {
      this.elementContainer.teleport++;
      this[`teleport${this.elementContainer.teleport}`] = new Teleport(
        row,
        column,
        `board.teleport${this.elementContainer.teleport}`,
        "A6"
      );
      this.elementContainer.objects.push(
        `board.teleport${this.elementContainer.teleport}`
      );
      this.elementContainer.teleportName.push(
        `board.teleport${this.elementContainer.teleport}`
      );
      this.elementContainer.teleportPair.push("6A");
    } else if (element == "w") {
      this.elementContainer.teleport++;
      this[`teleport${this.elementContainer.teleport}`] = new Teleport(
        row,
        column,
        `board.teleport${this.elementContainer.teleport}`,
        "6A"
      );
      this.elementContainer.objects.push(
        `board.teleport${this.elementContainer.teleport}`
      );
      this.elementContainer.teleportName.push(
        `board.teleport${this.elementContainer.teleport}`
      );
      this.elementContainer.teleportPair.push("A6");
    } else if (element == "x") {
      this.elementContainer.teleport++;
      this[`teleport${this.elementContainer.teleport}`] = new Teleport(
        row,
        column,
        `board.teleport${this.elementContainer.teleport}`,
        "A7"
      );
      this.elementContainer.objects.push(
        `board.teleport${this.elementContainer.teleport}`
      );
      this.elementContainer.teleportName.push(
        `board.teleport${this.elementContainer.teleport}`
      );
      this.elementContainer.teleportPair.push("7A");
    } else if (element == "y") {
      this.elementContainer.teleport++;
      this[`teleport${this.elementContainer.teleport}`] = new Teleport(
        row,
        column,
        `board.teleport${this.elementContainer.teleport}`,
        "7A"
      );
      this.elementContainer.objects.push(
        `board.teleport${this.elementContainer.teleport}`
      );
      this.elementContainer.teleportName.push(
        `board.teleport${this.elementContainer.teleport}`
      );
      this.elementContainer.teleportPair.push("A7");
    } else if (element == "z") {
      this.elementContainer.teleport++;
      this[`teleport${this.elementContainer.teleport}`] = new Teleport(
        row,
        column,
        `board.teleport${this.elementContainer.teleport}`,
        "A8"
      );
      this.elementContainer.objects.push(
        `board.teleport${this.elementContainer.teleport}`
      );
      this.elementContainer.teleportName.push(
        `board.teleport${this.elementContainer.teleport}`
      );
      this.elementContainer.teleportPair.push("8A");
    } else if (element == ",") {
      this.elementContainer.teleport++;
      this[`teleport${this.elementContainer.teleport}`] = new Teleport(
        row,
        column,
        `board.teleport${this.elementContainer.teleport}`,
        "8A"
      );
      this.elementContainer.objects.push(
        `board.teleport${this.elementContainer.teleport}`
      );
      this.elementContainer.teleportName.push(
        `board.teleport${this.elementContainer.teleport}`
      );
      this.elementContainer.teleportPair.push("A8");
    } else if (element == ".") {
      this.elementContainer.teleport++;
      this[`teleport${this.elementContainer.teleport}`] = new Teleport(
        row,
        column,
        `board.teleport${this.elementContainer.teleport}`,
        "A9"
      );
      this.elementContainer.objects.push(
        `board.teleport${this.elementContainer.teleport}`
      );
      this.elementContainer.teleportName.push(
        `board.teleport${this.elementContainer.teleport}`
      );
      this.elementContainer.teleportPair.push("9A");
    } else if (element == "-") {
      this.elementContainer.teleport++;
      this[`teleport${this.elementContainer.teleport}`] = new Teleport(
        row,
        column,
        `board.teleport${this.elementContainer.teleport}`,
        "9A"
      );
      this.elementContainer.objects.push(
        `board.teleport${this.elementContainer.teleport}`
      );
      this.elementContainer.teleportName.push(
        `board.teleport${this.elementContainer.teleport}`
      );
      this.elementContainer.teleportPair.push("A9");
    }
  }
}
