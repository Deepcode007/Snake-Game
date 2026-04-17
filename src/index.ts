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
let temp = del;


const check_valid_direction = () => {
  if ( del === "UP" && temp !== "DOWN") del = temp;
  else if (del === "DOWN" && temp !== "UP") del=temp;
  else if (del === "LEFT" && temp !== "RIGHT") del = temp;
  else if (del === "RIGHT" && temp !== "LEFT") del = temp;
}

let food = {
  x: 1,
  y: 1
};

// generate between 0.000 to 19.999 and then floor;
const food_where = () => {
  food.x = Math.floor(Math.random() * 20) * grid_size;
  food.y = Math.floor(Math.random() * 20) * grid_size;
};

const draw_food = () => {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, grid_size, grid_size);
}

// spawn food
food_where();
draw_food();

const draw = () => {
  // change to last changed logic
  check_valid_direction();
  // redraw the food
  draw_food();
  
  let newHead: SnakeSegment = {
    x: snake[0]!.x,
    y: snake[0]!.y
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
  
  // boundary logic x
  if (snake[0]!.x >= 500)
  {
    snake[0]!.x = 0;
  }
  else if (snake[0]!.x < 0) snake[0]!.x = 500 - grid_size;
  
  
  // boundary logic y
  if (snake[0]!.y >= 500)
  {
    snake[0]!.y = 0;
  }
  else if (snake[0]!.y < 0) snake[0]!.y = 500 - grid_size;
  
  ctx.fillRect(snake[0]!.x, snake[0]!.y, grid_size, grid_size);
  

  
  if (food.x == snake[0]!.x && food.y == snake[0]!.y) {
    food_where();
    draw_food();
  }
  else
  {
    // remove tail
    ctx.clearRect(snake[snake.length -1]!.x, snake[snake.length -1]!.y, grid_size, grid_size);
    snake.pop();
  }
  

}

setInterval(draw, 1000);

document.addEventListener("keydown", (key) => {
  if (key.key =="ArrowDown" && del != "UP") {
    temp = "DOWN";
  }
  else if (key.key == "ArrowUp" && del != "DOWN") temp = "UP";
  else if (key.key == "ArrowRight" && del != "LEFT") temp = "RIGHT";
  else if (key.key == "ArrowLeft" && del != "RIGHT") temp = "LEFT";
})