// src/index.ts
var canvas = document.getElementById("gameCanvas");
var grid_size = 25;
var snake = [{ x: 10 * grid_size, y: 10 * grid_size }];
var ctx = canvas.getContext("2d");
ctx.fillStyle = "darkgreen";
ctx.fillRect(snake[0].x, snake[0].y, grid_size, grid_size);
var del = 1;
var draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(snake[0].x + del, snake[0].y + del, grid_size + del, grid_size + del);
  del++;
};
setInterval(draw, 1000);
