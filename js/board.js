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
        if (eval(`levels.level${levels.levelCounter}part${i + 1}`)[j] === "*") {
          eval(`this.border = new Border(i + 1, j + 1, "board.border")`);
        } else if (
          eval(`levels.level${levels.levelCounter}part${i + 1}`)[j] === "@"
        ) {
          this.robbo = new Robbo(i + 1, j + 1, "board.robbo");
          this.elementContainer.objects.push(`board.robbo`);
        } else if (
          eval(`levels.level${levels.levelCounter}part${i + 1}`)[j] === "%"
        ) {
          this.elementContainer.screws++;
          eval(
            `this.screw${this.elementContainer.screws} = new Screw(i + 1, j + 1, 'board.screw${this.elementContainer.screws}')`
          );
          this.elementContainer.objects.push(
            `board.screw${this.elementContainer.screws}`
          );
        } else if (
          eval(`levels.level${levels.levelCounter}part${i + 1}`)[j] === "Q"
        ) {
          this.elementContainer.bird++;
          eval(
            `this.bird${this.elementContainer.bird} = new Bird(i+1, j+1, "board.bird${this.elementContainer.bird}", "horizontal")`
          );
          this.elementContainer.objects.push(
            `board.bird${this.elementContainer.bird}`
          );
        } else if (
          eval(`levels.level${levels.levelCounter}part${i + 1}`)[j] === "P"
        ) {
          this.elementContainer.bird++;
          eval(
            `this.bird${this.elementContainer.bird} = new Bird(i+1, j+1, "board.bird${this.elementContainer.bird}", "vertical")`
          );
          this.elementContainer.objects.push(
            `board.bird${this.elementContainer.bird}`
          );
        } else if (
          eval(`levels.level${levels.levelCounter}part${i + 1}`)[j] === "q"
        ) {
          this.elementContainer.bird++;
          eval(
            `this.bird${this.elementContainer.bird} = new Bird(i+1, j+1, "board.bird${this.elementContainer.bird}", "horizontal", "shot")`
          );
          this.elementContainer.objects.push(
            `board.bird${this.elementContainer.bird}`
          );
        }  else if (
          eval(`levels.level${levels.levelCounter}part${i + 1}`)[j] === ">"
        ) {
          this.elementContainer.magnet++;
          eval(
            `this.magnet${this.elementContainer.magnet} = new Magnet(i+1, j+1, "board.magnet${this.elementContainer.magnet}", "left")`
          );
          this.elementContainer.objects.push(
            `board.magnet${this.elementContainer.magnet}`
          );
        } else if (
          eval(`levels.level${levels.levelCounter}part${i + 1}`)[j] === "<"
        ) {
          this.elementContainer.magnet++;
          eval(
            `this.magnet${this.elementContainer.magnet} = new Magnet(i+1, j+1, "board.magnet${this.elementContainer.magnet}", "right")`
          );
          this.elementContainer.objects.push(
            `board.magnet${this.elementContainer.magnet}`
          );
        } else if (
          eval(`levels.level${levels.levelCounter}part${i + 1}`)[j] === "h"
        ) {
          this.elementContainer.gun++;
          eval(
            `this.gun${this.elementContainer.gun} = new Gun(i+1, j+1, "board.gun${this.elementContainer.gun}", "down", "laser")`
          );
          this.elementContainer.objects.push(
            `board.gun${this.elementContainer.gun}`
          );
        } else if (
          eval(`levels.level${levels.levelCounter}part${i + 1}`)[j] === "f"
        ) {
          this.elementContainer.gun++;
          eval(
            `this.gun${this.elementContainer.gun} = new Gun(i+1, j+1, "board.gun${this.elementContainer.gun}", "left", "laser")`
          );
          this.elementContainer.objects.push(
            `board.gun${this.elementContainer.gun}`
          );
        } else if (
          eval(`levels.level${levels.levelCounter}part${i + 1}`)[j] === "e"
        ) {
          this.elementContainer.gunRight++;
          eval(
            `this.gunRight${this.elementContainer.gunRight} = new Gun(i+1, j+1, "board.gunRight${this.elementContainer.gunRight}", "right", "laser")`
          );
          this.elementContainer.objects.push(
            `board.gunRight${this.elementContainer.gunRight}`
          );
        } else if (
          eval(`levels.level${levels.levelCounter}part${i + 1}`)[j] === "E"
        ) {
          this.elementContainer.gun++;
          eval(
            `this.gun${this.elementContainer.gun} = new Gun(i+1, j+1, "board.gun${this.elementContainer.gun}", "right", "single")`
          );
          this.elementContainer.objects.push(
            `board.gun${this.elementContainer.gun}`
          );
        } else if (
          eval(`levels.level${levels.levelCounter}part${i + 1}`)[j] === "H"
        ) {
          this.elementContainer.gun++;
          eval(
            `this.gun${this.elementContainer.gun} = new Gun(i+1, j+1, "board.gun${this.elementContainer.gun}", "down", "single")`
          );
          this.elementContainer.objects.push(
            `board.gun${this.elementContainer.gun}`
          );
        } else if (
          eval(`levels.level${levels.levelCounter}part${i + 1}`)[j] === "G"
        ) {
          this.elementContainer.gun++;
          eval(
            `this.gun${this.elementContainer.gun} = new Gun(i+1, j+1, "board.gun${this.elementContainer.gun}", "up", "single")`
          );
          this.elementContainer.objects.push(
            `board.gun${this.elementContainer.gun}`
          );
        } else if (
          eval(`levels.level${levels.levelCounter}part${i + 1}`)[j] === "F"
        ) {
          this.elementContainer.gun++;
          eval(
            `this.gun${this.elementContainer.gun} = new Gun(i+1, j+1, "board.gun${this.elementContainer.gun}", "left", "single")`
          );
          this.elementContainer.objects.push(
            `board.gun${this.elementContainer.gun}`
          );
        }
          else if (
          eval(`levels.level${levels.levelCounter}part${i + 1}`)[j] === "g"
        ) {
          this.elementContainer.gun++;
          eval(
            `this.gun${this.elementContainer.gun} = new Gun(i+1, j+1, "board.gun${this.elementContainer.gun}", "up", "laser")`
          );
          this.elementContainer.objects.push(
            `board.gun${this.elementContainer.gun}`
          );
        }
          else if (
          eval(`levels.level${levels.levelCounter}part${i + 1}`)[j] === "M"
        ) {
          this.elementContainer.gun++;
          eval(
            `this.gun${this.elementContainer.gun} = new Gun(i+1, j+1, "board.gun${this.elementContainer.gun}", "up", "single", "rotate")`
          );
          this.elementContainer.objects.push(
            `board.gun${this.elementContainer.gun}`
          );
        }
           else if (
          eval(`levels.level${levels.levelCounter}part${i + 1}`)[j] === "k"
        ) {
          this.elementContainer.gun++;
          eval(
            `this.gun${this.elementContainer.gun} = new Gun(i+1, j+1, "board.gun${this.elementContainer.gun}", "up", "single", "moving")`
          );
          this.elementContainer.objects.push(
            `board.gun${this.elementContainer.gun}`
          );
        }
          else if (
          eval(`levels.level${levels.levelCounter}part${i + 1}`)[j] === "i"
        ) {
          this.elementContainer.gun++;
          eval(
            `this.gun${this.elementContainer.gun} = new Gun(i+1, j+1, "board.gun${this.elementContainer.gun}", "right", "single", "moving")`
          );
          this.elementContainer.objects.push(
            `board.gun${this.elementContainer.gun}`
          );
        }
          else if (
          eval(`levels.level${levels.levelCounter}part${i + 1}`)[j] === "j"
        ) {
          this.elementContainer.gun++;
          eval(
            `this.gun${this.elementContainer.gun} = new Gun(i+1, j+1, "board.gun${this.elementContainer.gun}", "left", "single", "moving")`
          );
          this.elementContainer.objects.push(
            `board.gun${this.elementContainer.gun}`
          );
        }
          else if (
          eval(`levels.level${levels.levelCounter}part${i + 1}`)[j] === "l"
        ) {
          this.elementContainer.gun++;
          eval(
            `this.gun${this.elementContainer.gun} = new Gun(i+1, j+1, "board.gun${this.elementContainer.gun}", "down", "single", "moving")`
          );
          this.elementContainer.objects.push(
            `board.gun${this.elementContainer.gun}`
          );
        }
          else if (
          eval(`levels.level${levels.levelCounter}part${i + 1}`)[j] === "#"
        ) {
          this.elementContainer.hash++;
          eval(
            `this.hash${this.elementContainer.hash} = new Hash(i+1, j+1, "board.hash${this.elementContainer.hash}", "hash")`
          );
          this.elementContainer.objects.push(
            `board.hash${this.elementContainer.hash}`
          );
        } else if (
          eval(`levels.level${levels.levelCounter}part${i + 1}`)[j] === "$"
        ) {
          this.elementContainer.hash++;
          eval(
            `this.hash${this.elementContainer.hash} = new Hash(i+1, j+1, "board.hash${this.elementContainer.hash}", "autohash")`
          );
          this.elementContainer.objects.push(
            `board.hash${this.elementContainer.hash}`
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
          eval(`levels.level${levels.levelCounter}part${i + 1}`)[j] === "!"
        ) {
          this.elementContainer.lives++;
          eval(
            `this.lives${this.elementContainer.lives} = new Lives(i+1, j+1, "board.lives${this.elementContainer.lives}")`
          );
          this.elementContainer.objects.push(
            `board.lives${this.elementContainer.lives}`
          );
        } 
          
          else if (
          eval(`levels.level${levels.levelCounter}part${i + 1}`)[j] === "^"
        ) {
          this.elementContainer.keys++;
          eval(
            `this.keys${this.elementContainer.keys} = new Keys(i+1, j+1, "board.keys${this.elementContainer.keys}")`
          );
          this.elementContainer.objects.push(
            `board.keys${this.elementContainer.keys}`
          );
        } 
          
          else if (
          eval(`levels.level${levels.levelCounter}part${i + 1}`)[j] === "X"
        ) {
           this.elementContainer.blackHole++;
          eval(`this.blackHole${this.elementContainer.blackHole} = new BlackHole(i+1, j+1, "board.blackHole${this.elementContainer.blackHole}")`);
               this.elementContainer.objects.push(
            `board.blackHole${this.elementContainer.blackHole}`
          ); 
              
        } else if (
          eval(`levels.level${levels.levelCounter}part${i + 1}`)[j] === "C"
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
          eval(`levels.level${levels.levelCounter}part${i + 1}`)[j] === "&"
        ) {
          this.ship = new Ship(i + 1, j + 1, "board.ship");
          this.elementContainer.objects.push(`board.ship`);
        } else if (
          eval(`levels.level${levels.levelCounter}part${i + 1}`)[j] === "N"
        ) {
          this.elementContainer.beetle++;
          eval(
            `this.beetle${this.elementContainer.beetle} = new Beetle(i+1, j+1, "board.beetle${this.elementContainer.beetle}", "left", "ant")`
          );
          this.elementContainer.objects.push(
            `board.beetle${this.elementContainer.beetle}`
          );
        } else if (
          eval(`levels.level${levels.levelCounter}part${i + 1}`)[j] === "O"
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
