import { grid_size, type GlobalContextType, type SnakeSegment } from "@/App";
import { flushSync } from "react-dom";

let ctx: CanvasRenderingContext2D | null = null;
let globalCtx: GlobalContextType | null = null;
let temp = "UP";

const width = Number(process.env.BUN_PUBLIC_CANVAS_WIDTH);
const height = Number(process.env.BUN_PUBLIC_CANVAS_HEIGHT);

const free_cells:SnakeSegment[] = [];

const mp = new Map<number, number>();

const cellKey = ({ x, y }: SnakeSegment) => x * width + y;

const rebuildFreeCells = (snake: SnakeSegment[]) => {
    free_cells.length = 0;
    mp.clear();

    const occupied = new Set(snake.map(cellKey));

    for (let i = 0; i < width; i += grid_size) {
        for (let j = 0; j < height; j += grid_size) {
            const cell = { x: i, y: j };
            if (!occupied.has(cellKey(cell))) {
                mp.set(cellKey(cell), free_cells.length);
                free_cells.push(cell);
            }
        }
    }
};

const addFreeCell = (cell: SnakeSegment) => {
    const key = cellKey(cell);
    if (mp.has(key)) return;

    mp.set(key, free_cells.length);
    free_cells.push({ x: cell.x, y: cell.y });
};

const removeFreeCell = (cell: SnakeSegment) => {
    const key = cellKey(cell);
    const idx = mp.get(key);
    if (idx === undefined) return;

    const last = free_cells[free_cells.length - 1];
    if (!last) return;

    free_cells[idx] = last;
    mp.set(cellKey(last), idx);
    free_cells.pop();
    mp.delete(key);
};

export const THEME = {
  background: "#121212",    // Deep matte gray/black
  gridLines: "#2A2A2A",     // Subtle contrast for the grid
  snakeHead: "#50FA7B",     // Vibrant neon green
  snakeBody: "#38A169",     // Muted green for depth
  food: "#FF5555",          // Bright punchy red
  glow: 15                  // Intensity of the neon effect
};


export const initGame = (
    canvasCtx: CanvasRenderingContext2D,
    context: GlobalContextType,
) => {
    ctx = canvasCtx;
    globalCtx = context;
    temp = context.dir as string;
    const {snake} = globalCtx;

    rebuildFreeCells(snake);
    ctx.fillStyle = "darkgreen";
    food_where();
    draw_food();
};

export const syncContext = (context: GlobalContextType) => {
    globalCtx = context;
};


// use flushSync to force a synchronous update
const updateDir = (temp:string) => {
    flushSync(() => {
        const { setDir } = globalCtx as GlobalContextType;
      setDir(temp);
    });

}

export const check_valid_direction = () => {
    if (!globalCtx) return;
    const { dir } = globalCtx;
    if (dir === "UP" && temp !== "DOWN") updateDir(temp);
    else if (dir === "DOWN" && temp !== "UP") updateDir(temp);
    else if (dir === "LEFT" && temp !== "RIGHT") updateDir(temp);
    else if (dir === "RIGHT" && temp !== "LEFT") updateDir(temp);
};

export const keypress = (key: KeyboardEvent) => {
    if (!globalCtx) return;
    const { dir } = globalCtx;
    if (key.key === "ArrowDown" && dir !== "UP") temp = "DOWN";
    else if (key.key === "ArrowUp" && dir !== "DOWN") temp = "UP";
    else if (key.key === "ArrowRight" && dir !== "LEFT") temp = "RIGHT";
    else if (key.key === "ArrowLeft" && dir !== "RIGHT") temp = "LEFT";
};

// generate between 0.000 to 19.999 and then floor;
const food_where = () => {
    if (!globalCtx) return;
    
    const { food, setFood } = globalCtx;
    if (free_cells.length === 0) return;
    
    const new_location = free_cells[Math.floor(Math.random() * free_cells.length)] as SnakeSegment;
    const nextFood = { x: new_location.x, y: new_location.y };
    
    food.x = nextFood.x;
    food.y = nextFood.y;
    setFood(nextFood);
    if (!ctx || ! globalCtx) return;
    ctx.shadowBlur = THEME.glow;
    ctx.shadowColor = THEME.food;

};

const draw_food = () => {
    if (!ctx || ! globalCtx) return;
    
    const { food } = globalCtx;
    // ctx.fillStyle = THEME.food;
    // ctx.fillRect(food.x, food.y, grid_size, grid_size);
    
    
    ctx.fillStyle = THEME.food;
    ctx.beginPath();

    ctx.arc(food.x + grid_size / 2, food.y + grid_size / 2, grid_size / 2.5, 0, 2 * Math.PI);

    ctx.fill();
    
    ctx.shadowBlur = 0;
    ctx.shadowColor = "transparent";
};

const check_if_overlap = () => {
    if (!globalCtx) return false;
    const { snake } = globalCtx;
    if (!snake || snake.length === 0) return false;

    let { x, y } = snake[0] as SnakeSegment;

    for (let i = 1; i < snake.length; i++) {
        if (snake[i]?.x === x && snake[i]?.y === y) return true;
    }
    return false;
};

export const draw_grid = (ctx:CanvasRenderingContext2D) => {
    ctx.strokeStyle = THEME.gridLines;
    ctx.lineWidth = 1;
    ctx.beginPath();
    
    // Vertical lines
    for (let x = 0; x <= width; x += grid_size)
    {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
    }
      // Horizontal lines
    for (let y = 0; y <= height; y += grid_size)
    {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
    }
    ctx.stroke();
}

export const draw = () => {
    if (!ctx || !globalCtx) return;
    check_valid_direction();
    
    const { snake, dir, setSnake, food } = globalCtx;
    if (!snake || snake.length === 0) return;
    
    // draw the grid
    draw_grid(ctx);

    // redraw the food
    draw_food();

    let newHead: SnakeSegment = {
        x: snake[0]!.x,
        y: snake[0]!.y,
    };

    if (dir === "UP") newHead.y -= grid_size;
    else if (dir === "DOWN") newHead.y += grid_size;
    else if (dir === "RIGHT") newHead.x += grid_size;
    else if (dir === "LEFT") newHead.x -= grid_size;

    snake.unshift(newHead);

    // boundary logic x
    if (snake[0]!.x >= width) snake[0]!.x = 0;
    else if (snake[0]!.x < 0) snake[0]!.x = width - grid_size;

    // boundary logic y
    if (snake[0]!.y >= height) snake[0]!.y = 0;
    else if (snake[0]!.y < 0) snake[0]!.y = height - grid_size;

    const ateFood = food.x === snake[0]!.x && food.y === snake[0]!.y;

    if (!ateFood) {
        // remove tail
        const tail = snake[snake.length - 1];
        ctx.fillStyle = THEME.background;
        ctx.fillRect(tail!.x, tail!.y, grid_size, grid_size);
        addFreeCell(tail!);
        snake.pop();
    }

    ctx.fillStyle = THEME.snakeHead;
    ctx.fillRect(snake[0]!.x, snake[0]!.y, grid_size, grid_size);

    removeFreeCell(snake[0]!);

    if (ateFood) {
        food_where();
        draw_food();
    }
    
    ctx.fillStyle = THEME.snakeBody;
    if(snake.length>1 ) ctx.fillRect(snake[1]!.x, snake[1]!.y, grid_size, grid_size);

    if (check_if_overlap())
    {
        const centerX = Math.floor(width / 2 / grid_size) * grid_size;
        const centerY = Math.floor(height / 2 / grid_size) * grid_size;
        alert("Overlap");
        const resetSnake = [{ x: centerX, y: centerY }];
        setSnake(resetSnake);
        ctx.fillStyle = THEME.background;
        ctx.fillRect(0, 0, width, height);
        snake.length=0;
        snake.push(resetSnake[0] as SnakeSegment);
        rebuildFreeCells(resetSnake);
        food_where();
        draw_food();
        updateDir("UP");
        temp = "UP";
    }
};
