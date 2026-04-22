import { grid_size, type GlobalContextType, type SnakeSegment } from "@/App";
import { flushSync } from "react-dom";

let ctx: CanvasRenderingContext2D | null = null;
let globalCtx: GlobalContextType | null = null;
let temp = "UP";

const width = Number(process.env.BUN_PUBLIC_CANVAS_WIDTH);
const height = Number(process.env.BUN_PUBLIC_CANVAS_HEIGHT);


export const initGame = (
    canvasCtx: CanvasRenderingContext2D,
    context: GlobalContextType,
) => {
    ctx = canvasCtx;
    globalCtx = context;
    temp = context.dir as string;
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
    
    const { snake, food, setFood } = globalCtx;
    
    food.x = Math.floor(Math.random() * 20) * grid_size;
    food.y = Math.floor(Math.random() * 20) * grid_size;
    // check for food spawn on the snake
    for (let { x, y } of snake)
    {
        if (x === food.x && y === food.y)
        {
            food_where();
            break;
        }
    }
};

const draw_food = () => {
    if (!ctx || ! globalCtx) return;
    
    const { food } = globalCtx;
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, grid_size, grid_size);
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

export const draw = () => {
    if (!ctx || !globalCtx) return;
    check_valid_direction();
    
    const { snake, dir, setSnake, setDir, food } = globalCtx;
    if (!snake || snake.length === 0) return;

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

    if (food.x === snake[0]!.x && food.y === snake[0]!.y) {
        food_where();
        draw_food();
    } else {
        // remove tail
        const tail = snake[snake.length - 1];
        ctx.clearRect(tail!.x, tail!.y, grid_size, grid_size);
        snake.pop();
    }

    ctx.fillStyle = "darkgreen";
    ctx.fillRect(snake[0]!.x, snake[0]!.y, grid_size, grid_size);

    if (check_if_overlap())
    {
        const centerX = Math.floor(width / 2 / grid_size) * grid_size;
        const centerY = Math.floor(height / 2 / grid_size) * grid_size;
        alert("Overlap");
        setSnake([{ x: centerX, y: centerY }]);
        ctx.clearRect(0, 0, height, width);
        food_where();
        setDir("UP");
    }
};
