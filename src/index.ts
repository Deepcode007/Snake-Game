const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;

const grid_size = 25; // 500/25 = 20 x 20 grid_size

interface SnakeSegment {
  x: number;
  y: number;
}


let snake: SnakeSegment[] = [{ x: 10 * grid_size, y: 10 * grid_size }];

const ctx = canvas.getContext("2d") as  CanvasRenderingContext2D; // paint brush
ctx.fillStyle = "darkgreen"; // colour of paint brush

ctx.fillRect(snake[0]!.x, snake[0]!.y, grid_size, grid_size);
let del = "DOWN";


let food = {
  x: 0,
  y: 0
};

// generate between 0.000 to 19.999 and then floor;
const food_where = () => {
  food.x = Math.floor(Math.random() * 20) * grid_size;
  food.y = Math.floor(Math.random() * 20) * grid_size;
};

food_where();

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (del == "UP")
  {
    snake[0]!.y -= grid_size;
  }
  else if (del == "DOWN")
  {
    snake[0]!.y += grid_size;
  }
  else if (del == "RIGHT")
  {
    snake[0]!.x += grid_size;
  }
  else if (del == "LEFT")
  {
    snake[0]!.x -= grid_size;
  }
  ctx.fillStyle = "darkgreen";
  
  ctx.fillRect(snake[0]!.x, snake[0]!.y, grid_size, grid_size);

  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, grid_size, grid_size);

}

setInterval(draw, 1000);

document.addEventListener("keydown", (key) => {
  if (key.key =="ArrowDown") {
    del = "DOWN";
  }
  else if (key.key == "ArrowUp") del = "UP";
  else if (key.key == "ArrowRight") del = "RIGHT";
  else if (key.key == "ArrowLeft") del = "LEFT";
})