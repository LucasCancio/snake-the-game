let canvas = document.getElementById("snake"); //criar elemento que irá rodar o jogo
let context = canvas.getContext("2d"); //....

let box = 32;
let snake = [];
let direction = "";

const foodImage = new Image();
foodImage.src = "https://opengameart.org/sites/default/files/apple_1.png";

let jogo;

let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box,
};

function createGame() {
  snake = [
    {
      x: 8 * box,
      y: 8 * box,
    },
  ];
  direction = "right";

  createFood();
  jogo = setInterval(iniciarJogo, 100);
}

function drawBackground() {
  context.fillStyle = "#618833";
  context.fillRect(0, 0, 16 * box, 16 * box);
}

function drawSnake() {
  for (i = 0; i < snake.length; i++) {
    context.fillStyle = "#8bc34a";
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

function createFood() {
  do {
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;
  } while (snake.some((s) => s.y == food.y || s.x == food.x));
}

function drawFood() {
  context.drawImage(foodImage, food.x, food.y, box, box);
}

document.addEventListener("keydown", update);

const btnRestart = document.getElementById("btnRestart");

btnRestart.addEventListener("click", function () {
  createGame();
  btnRestart.style.display = "none";
});

function update(event) {
  if (event.keyCode == 37 && direction != "right") direction = "left";
  if (event.keyCode == 38 && direction != "down") direction = "up";
  if (event.keyCode == 39 && direction != "left") direction = "right";
  if (event.keyCode == 40 && direction != "up") direction = "down";
}

function iniciarJogo() {
  if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
  if (snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
  if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
  if (snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

  for (i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(jogo);
      alert("Game Over :(");
      btnRestart.style.display = "block";
    }
  }

  drawBackground();
  drawSnake();
  drawFood();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction == "right") snakeX += box;
  if (direction == "left") snakeX -= box;
  if (direction == "up") snakeY -= box;
  if (direction == "down") snakeY += box;

  if (snakeX != food.x || snakeY != food.y) {
    snake.pop();
  } else {
    createFood();
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  snake.unshift(newHead);
}

createGame();
