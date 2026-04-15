// src/index.ts
var canvas = document.getElementById("gameCanvas");
var grid_size = 25;
var snake = [{ x: 10 * grid_size, y: 10 * grid_size }];
var ctx = canvas.getContext("2d");
ctx.fillStyle = "darkgreen";
ctx.fillRect(snake[0].x, snake[0].y, grid_size, grid_size);
var del = "DOWN";
var food = {
  x: 1,
  y: 1
};
var food_where = () => {
  food.x = Math.floor(Math.random() * 20) * grid_size;
  food.y = Math.floor(Math.random() * 20) * grid_size;
};
var draw_food = () => {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, grid_size, grid_size);
};
food_where();
draw_food();
var draw = () => {
  draw_food();
  let newHead = {
    x: snake[0].x,
    y: snake[0].y
  };
  if (del == "UP")
    newHead.y -= grid_size;
  else if (del == "DOWN")
    newHead.y += grid_size;
  else if (del == "RIGHT")
    newHead.x += grid_size;
  else if (del == "LEFT")
    newHead.x -= grid_size;
  snake.unshift(newHead);
  ctx.fillStyle = "darkgreen";
  ctx.fillRect(snake[0].x, snake[0].y, grid_size, grid_size);
  if (food.x == snake[0].x && food.y == snake[0].y) {
    food_where();
    draw_food();
  } else {
    ctx.clearRect(snake[snake.length - 1].x, snake[snake.length - 1].y, grid_size, grid_size);
    snake.pop();
  }
};
setInterval(draw, 1000);
document.addEventListener("keydown", (key) => {
  if (key.key == "ArrowDown") {
    del = "DOWN";
  } else if (key.key == "ArrowUp")
    del = "UP";
  else if (key.key == "ArrowRight")
    del = "RIGHT";
  else if (key.key == "ArrowLeft")
    del = "LEFT";
});
