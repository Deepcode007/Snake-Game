// src/index.ts
var canvas = document.getElementById("gameCanvas");
var grid_size = 25;
var snake = [{ x: 10 * grid_size, y: 10 * grid_size }];
var ctx = canvas.getContext("2d");
ctx.fillStyle = "darkgreen";
ctx.fillRect(snake[0].x, snake[0].y, grid_size, grid_size);
var del = "DOWN";
var temp = del;
var check_valid_direction = () => {
  if (del === "UP" && temp !== "DOWN")
    del = temp;
  else if (del === "DOWN" && temp !== "UP")
    del = temp;
  else if (del === "LEFT" && temp !== "RIGHT")
    del = temp;
  else if (del === "RIGHT" && temp !== "LEFT")
    del = temp;
};
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
var check_if_overlap = () => {
  let { x, y } = snake[0];
  for (let i = 1;i < snake.length; i++) {
    if (snake[i]?.x == x && snake[i]?.y == y)
      return true;
  }
  return false;
};
food_where();
draw_food();
var draw = () => {
  check_valid_direction();
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
  if (snake[0].x >= 500) {
    snake[0].x = 0;
  } else if (snake[0].x < 0)
    snake[0].x = 500 - grid_size;
  if (snake[0].y >= 500) {
    snake[0].y = 0;
  } else if (snake[0].y < 0)
    snake[0].y = 500 - grid_size;
  if (food.x == snake[0].x && food.y == snake[0].y) {
    food_where();
    draw_food();
  } else {
    ctx.clearRect(snake[snake.length - 1].x, snake[snake.length - 1].y, grid_size, grid_size);
    snake.pop();
  }
  ctx.fillStyle = "darkgreen";
  ctx.fillRect(snake[0].x, snake[0].y, grid_size, grid_size);
  if (check_if_overlap())
    alert("Overlap");
};
setInterval(draw, 500);
document.addEventListener("keydown", (key) => {
  if (key.key == "ArrowDown" && del != "UP") {
    temp = "DOWN";
  } else if (key.key == "ArrowUp" && del != "DOWN")
    temp = "UP";
  else if (key.key == "ArrowRight" && del != "LEFT")
    temp = "RIGHT";
  else if (key.key == "ArrowLeft" && del != "RIGHT")
    temp = "LEFT";
});
