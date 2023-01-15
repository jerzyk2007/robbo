const levels = new Levels();
let board = null;

// funkcja która uruchamia następny level lub po stracie użycia uruchamia ponownie ten sam
function nextLevel(info) {
  window.removeEventListener("keydown", keyDownListener());

  document.querySelector(".nextLevel").classList.toggle("animationNextLevel");
  setTimeout(() => {
    if (levels.lastLevel > levels.levelCounter) {
      if (info == "nextLevel") {
        levels.levelCounter++;
        board.scoreBoard.changeCount("nextLevel");
      }
    } else {
      levels.levelCounter = 1;
    }
    this.objects = board.elementContainer.objects;
    this.staticObjects = board.elementContainer.staticObjects;
    this.objects.forEach((objects) => {
      eval(objects).nextLevel();
    });
    this.staticObjects.forEach((staticObjects) => {
      eval(staticObjects).nextLevel();
    });
    this.pieceBoard = document.querySelectorAll(".pieceBoard");
    this.pieceBoard.forEach((pieceBoard) => pieceBoard.remove());

    board = new Board(
      eval(`levels.level${levels.levelCounter}[0]`),
      eval(`levels.level${levels.levelCounter}[1]`)
    );
  }, 750);
  setTimeout(() => {
    document.querySelector(".nextLevel").classList.toggle("animationNextLevel");
  }, 1500);
}

// funkcja która sprawdza czy dany obiekt może wykonać ruch
function checkAction(moveDirection, startRowPosition, startColumnPosition) {
  if (moveDirection == "down") {
    return document.querySelector(
      `.class${startRowPosition + 1}x${startColumnPosition}`
    );
  } else if (moveDirection == "up") {
    return document.querySelector(
      `.class${startRowPosition - 1}x${startColumnPosition}`
    );
  } else if (moveDirection == "left") {
    return document.querySelector(
      `.class${startRowPosition}x${startColumnPosition - 1}`
    );
  } else if (moveDirection == "right") {
    return document.querySelector(
      `.class${startRowPosition}x${startColumnPosition + 1}`
    );
  } else if (moveDirection == "stop") {
    return document.querySelector(
      `.class${startRowPosition}x${startColumnPosition}`
    );
  }
}

// funkcja odpowiada za ruch wszytskich obiektów/postaci na planszy
function move(
  moveDirection,
  startRowPosition,
  startColumnPosition,
  imageMove,
  startName,
  action
) {
  let row = 0;
  let column = 0;
  if (moveDirection === "down") {
    row = -1;
  } else if (moveDirection === "up") {
    row = 1;
  } else if (moveDirection === "left") {
    column = -1;
  } else if (moveDirection === "right") {
    column = 1;
  }
  const oldPosition = document.querySelector(
    `.class${startRowPosition}x${startColumnPosition}`
  );
  const newPosiotion = document.querySelector(
    `.class${startRowPosition - row}x${startColumnPosition + column}`
  );
  oldPosition.style.backgroundImage = "";
  oldPosition.textContent = "GO";
  newPosiotion.style.backgroundImage = imageMove;
  newPosiotion.textContent = startName;
  eval(startName).direction(moveDirection);
}

// funkcja która sprawdza czy obiekt który moze zabić robocika ma z nim kolizje
function searchRobbo(rowPosition, columnPosition) {
  let search = [1, -1, 0, 0];
  let moveDirection = ["left", "right", "up", "down"];
  for (let i = 0; i < search.length; i++) {
    let checkMove = checkAction(moveDirection[i], rowPosition, columnPosition);
    if (checkMove) {
      if (checkMove.textContent == "board.robbo") {
        if (board.flag) {
          board.flag = false;
          eval("board.robbo.killRobbo()");
        } else {
          setTimeout(() => {
            board.flag = true;
          }, 1000);
        }
      }
    }
  }
}

// funkcja wywołująca animację eksplozji
function animExplosion(rowPosition, columnPosition) {
  //
  document.querySelector(`.class${rowPosition}x${columnPosition}`).textContent =
    "SHOT";
  let counter = 0;
  let animInterval = setInterval(() => {
    if (document.querySelector(`.class${rowPosition}x${columnPosition}`)) {
      document.querySelector(
        `.class${rowPosition}x${columnPosition}`
      ).style.backgroundImage = board.elementContainer.explosionAnim[counter];
      if (counter == board.elementContainer.explosionAnim.length) {
        clearInterval(animInterval);
        document.querySelector(
          `.class${rowPosition}x${columnPosition}`
        ).style.backgroundImage = "";
        document.querySelector(
          `.class${rowPosition}x${columnPosition}`
        ).textContent = "GO";
      }
      counter++;
    }
  }, 70);
}

// funkcja wywołująca animację wybuchu strzału
function animShot(rowPosition, columnPosition) {
  let counter = 3;
  document.querySelector(`.class${rowPosition}x${columnPosition}`).textContent =
    "SHOT";
  let animInterval = setInterval(() => {
    if (document.querySelector(`.class${rowPosition}x${columnPosition}`)) {
      document.querySelector(
        `.class${rowPosition}x${columnPosition}`
      ).style.backgroundImage = board.elementContainer.explosionAnim[counter];
      if (counter == 0) {
        clearInterval(animInterval);
        document.querySelector(
          `.class${rowPosition}x${columnPosition}`
        ).style.backgroundImage = "";
        document.querySelector(
          `.class${rowPosition}x${columnPosition}`
        ).textContent = "GO";
      }
      counter--;
    }
  }, 50);
}

// funkcja która po śmierci robocika wywołuje ekcpolzję wszystkich obiektów
function destroyAllElements() {
  levels.canMove = false;

  board.elementContainer.objects.forEach((objects) => {
    eval(objects).destroy();
  });
}
// funkcja obsługująca klawisze sterujące
function keyDownListener(direction) {
  return function (event) {
    if (!levels.canMove) return false;
    levels.canMove = false;
    levels.canMoveSetTime = setTimeout(function () {
      levels.canMove = true;
    }, levels.gameSpeed * 0.9);

    if (!direction) {
      switch (event.keyCode) {
        case 39:
          if (levels.spaceShot) {
            return board.robbo.makeShot("right");
          } else {
            return board.robbo.moveRobbo("right");
          }
        case 40:
          if (levels.spaceShot) {
            return board.robbo.makeShot("down");
          } else {
            return board.robbo.moveRobbo("down");
          }
        case 37:
          if (levels.spaceShot) {
            return board.robbo.makeShot("left");
          } else {
            return board.robbo.moveRobbo("left");
          }
        case 38:
          if (levels.spaceShot) {
            return board.robbo.makeShot("up");
          } else {
            return board.robbo.moveRobbo("up");
          }
        case 32:
          levels.spaceShot = true;
          break;
        case 27:
          return board.robbo.killRobbo();
      }
    } else {
      if (direction == "esc") {
        return board.robbo.killRobbo();
      } else {
        if (levels.spaceShot) {
          return board.robbo.makeShot(direction);
        } else {
          board.robbo.moveRobbo(direction);
        }
      }
    }
  };
}
document.addEventListener("keyup", function (event) {
  if (event.keyCode === 32) {
    levels.spaceShot = false;
  }
});
// mobile key
function mobileKeyListener() {
  document
    .querySelector(".buttons__right")
    .addEventListener("touchstart", keyDownListener("right"));

  document
    .querySelector(".buttons__left")
    .addEventListener("touchstart", keyDownListener("left"));

  document
    .querySelector(".buttons__up")
    .addEventListener("touchstart", keyDownListener("up"));

  document
    .querySelector(".buttons__down")
    .addEventListener("touchstart", keyDownListener("down"));

  document
    .querySelector(".buttons__shot")
    .addEventListener("touchstart", () => {
      levels.spaceShot = true;
    });
  document.querySelector(".buttons__shot").addEventListener("touchend", () => {
    levels.spaceShot = false;
  });

  document
    .querySelector(".buttons__ESC")
    .addEventListener("touchstart", keyDownListener("esc"));
}

// funkcja zamykająca ekran powitalny gry
function closeWelcomeBoard() {
  clearInterval(indexTyping);
  document.removeEventListener("touchstart", closeWelcomeBoard);
  window.removeEventListener("keydown", closeWelcomeBoardbySpace);

  document.querySelector(".wrapper").remove();
  const firstLevel = document.createElement("div");
  document.body.appendChild(firstLevel);
  firstLevel.classList.add("firstLevel");
  board = new Board(
    eval(`levels.level${levels.levelCounter}[0]`),
    eval(`levels.level${levels.levelCounter}[1]`)
  );
  setTimeout(() => {
    document.querySelector(".firstLevel").remove();
    window.addEventListener("keydown", keyDownListener());
    mobileKeyListener();
  }, 1000);
}
function closeWelcomeBoardbySpace(e) {
  if (e.keyCode === 32) {
    closeWelcomeBoard();
  }
}
createWelcomeBoard();
