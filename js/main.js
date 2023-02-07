const levels = new Levels();
let board = null;
const keyStates = {
  up: false,
  down: false,
  right: false,
  left: false,
  shoot: false,
  reset: false,
}

// funkcja która uruchamia następny level lub po stracie użycia uruchamia ponownie ten sam
function nextLevel(info) {

  document.querySelector(".nextLevel").classList.toggle("animationNextLevel");
  setTimeout(() => {
    if (levels.lastLevel > levels.levelCounter) {
      if (info == "nextLevel") {
        levels.levelCounter++;
        board.scoreBoard.changeCount("nextLevel");
        levels.boardColorCounter++;
        if (levels.boardColorCounter == levels.boardColor.length) {
          levels.boardColorCounter = 0;
        }
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
      eval(`levels.level${levels.levelCounter}.length`),
      eval(`levels.level${levels.levelCounter}[0].length`)
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
  let moveDirection = ["left", "right", "up", "down"];
  for (let j = 0; j < moveDirection.length; j++) {
    setTimeout(() => {
      for (let i = 0; i < moveDirection.length; i++) {
        let checkMove = checkAction(
          moveDirection[i],
          rowPosition,
          columnPosition
        );
        if (checkMove && checkMove.textContent == "board.robbo") {
          return board.robbo.killRobbo();
        }
      }
    }, levels.gameSpeed * 0.1);
  }
}

// funkcja wywołująca animację eksplozji
function animExplosion(rowPosition, columnPosition) {
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
  board.elementContainer.soundEndShot.play();
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
  }, 70);
}

// funkcja która po śmierci robocika wywołuje ekcpolzję wszystkich obiektów
function destroyAllElements() {
  levels.canMove = false;

  board.elementContainer.objects.forEach((objects) => {
    eval(objects).destroy();
  });
}

function gameMoveLoop() {

  gamepad.update(keyStates);

  let dir = keyStates.up && 'up' || keyStates.down && 'down' || keyStates.left && 'left' || keyStates.right && 'right' || undefined
  
  if (keyStates.reset) {
    return board.robbo.killRobbo()
  }
  if (!dir) return

  if (!levels.canMove) return

  if (keyStates.shoot) {
    board.robbo.makeShot(dir)
  } else {
    board.robbo.moveRobbo(dir)
  }
}

function setKeyState(event, pressed) {
  if (typeof event === "string") {
    keyStates[event] = pressed;
    return true;
  }
  switch (event.keyCode) {
    case 37: keyStates.left  = pressed; return true;
    case 38: keyStates.up    = pressed; return true;
    case 39: keyStates.right = pressed; return true;
    case 40: keyStates.down  = pressed; return true;
    case 32: keyStates.shoot = pressed; return true;
    case 27: keyStates.reset = pressed; return true;
  }  
  return false;
}

function onKeyDown(event) {
  if (setKeyState(event, true)) {
    event.preventDefault()
  }
}

function onKeyUp(event) {
  if (setKeyState(event, false)) {
    event.preventDefault()
  }
}

// mobile key
function mobileKeyListener() {
  for (let key in keyStates) {
    let button = document.querySelector(".buttons__"+key)
    button.addEventListener("touchstart", (ev)=>setKeyState(key, true));
    button.addEventListener("touchend",   (ev)=>setKeyState(key, false));
  }
}

// funkcja zamykająca ekran powitalny gry
function closeWelcomeBoard() {
  clearInterval(indexTyping);
  document.removeEventListener("touchstart", closeWelcomeBoard);
  window.removeEventListener("keydown", closeWelcomeBoardbySpace);
  gamepad.dontWaitForAnyKey();

  document.querySelector(".wrapper").remove();
  document.querySelector(".wrapperLevelCounter").remove();
  const firstLevel = document.createElement("div");
  document.body.appendChild(firstLevel);
  firstLevel.classList.add("firstLevel");
  board = new Board(
    eval(`levels.level${levels.levelCounter}.length`),
    eval(`levels.level${levels.levelCounter}[0].length`)
  );
  setTimeout(() => {
    document.querySelector(".firstLevel").remove();
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup",   onKeyUp);
    mobileKeyListener();
    setInterval(gameMoveLoop, levels.gameSpeed);
    levels.canMove = true;
  }, 1000);
}
function closeWelcomeBoardbySpace(e) {
  if (e.keyCode === 32) {
    console.log("spacja");
    closeWelcomeBoard();
  }
}
createWelcomeBoard();
