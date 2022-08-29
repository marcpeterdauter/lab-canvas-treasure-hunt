// main.js
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const width = canvas.width;
const height = canvas.height;
const gridSize = 50;
const clean = () => {
  context.clearRect(0, 0, 500, 500);
};

function drawGrid() {
  for (let i = 0; i < 11; i++) {
    context.beginPath();
    context.moveTo(0, i * gridSize);
    context.lineTo(width, i * gridSize);
    context.strokeStyle = "black";
    context.lineWidth = 1;
    context.stroke();
    // vertical lines
    context.beginPath();
    context.moveTo(i * gridSize, 0);
    context.lineTo(i * gridSize, height);
    context.strokeStyle = "black";
    context.lineWidth = 1;
    context.stroke();
  }
}

class Character {
  constructor(col, row) {
    this.col = col;
    this.row = row;
    this.dir = "down";
  }
  moveUp() {
    if (player1.row > 0) {
      this.row -= 1;
      this.dir = "up";
    }
  }
  moveRight() {
    if (player1.col < 9) {
      this.col += 1;
      this.dir = "right";
    }
  }
  moveDown() {
    if (player1.row < 9) {
      this.row += 1;
      this.dir = "down";
    }
  }
  moveLeft() {
    if (player1.col > 0) {
      this.col -= 1;
      this.dir = "left";
    }
  }
}

const player1 = new Character(
  Math.floor(Math.random() * 10),
  Math.floor(Math.random() * 10)
);

function drawPlayer() {
  const playerImage = new Image();
  if (player1.dir === "down") {
    playerImage.src = "./images/character-down.png";
  } else if (player1.dir === "up") {
    playerImage.src = "./images/character-up.png";
  } else if (player1.dir === "right") {
    playerImage.src = "./images/character-right.png";
  } else if (player1.dir === "left") {
    playerImage.src = "./images/character-left.png";
  }
  playerImage.onload = function () {
    context.drawImage(
      playerImage,
      player1.col * gridSize,
      player1.row * gridSize
    );
  };
}

class Treasure {
  constructor(col, row) {
    this.col = col;
    this.row = row;
  }
  setRandomPosition() {
    this.col = Math.floor(Math.random() * 10);
    this.row = Math.floor(Math.random() * 10);
  }
}

const treasure = new Treasure();
treasure.setRandomPosition();

function drawTreasure() {
  const treasureImage = new Image();
  treasureImage.src = "./images/treasure.png";
  treasureImage.onload = function () {
    context.drawImage(
      treasureImage,
      treasure.col * gridSize,
      treasure.row * gridSize,
      gridSize,
      gridSize
    );
  };
}

function drawEverything() {
  clean();
  drawGrid();
  drawPlayer();
  drawTreasure();
}

drawEverything();

window.addEventListener("keydown", (event) => {
  // Stop the default behavior (moving the screen to the left/up/right/down)
  event.preventDefault();

  // React based on the key pressed
  switch (event.key) {
    case "ArrowLeft":
      player1.moveLeft();
      break;
    case "ArrowUp":
      player1.moveUp();
      break;
    case "ArrowRight":
      player1.moveRight();
      break;
    case "ArrowDown":
      player1.moveDown();
      break;
  }
  drawEverything();
  if (player1.col === treasure.col && player1.row === treasure.row) {
    setTimeout(() => {
      alert("You reached the treasure!");
      treasure.setRandomPosition();
      drawEverything();
    }, 200);
  }
});
