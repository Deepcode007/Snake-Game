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
let del = 1;
const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);;

  ctx.fillRect(snake[0]!.x + del, snake[0]!.y + del, grid_size + del, grid_size + del);
  del++;

}

setInterval(draw, 1000);