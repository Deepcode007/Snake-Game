import { GlobalContext, grid_size, type GlobalContextType } from "@/App";
import { draw, keypress, initGame, syncContext, THEME } from "@/functions/game";
import { useContext, useEffect, useRef } from "react";

export function Canvas() {
    const globalContext = useContext(GlobalContext) as GlobalContextType;
    const { setSnake } = globalContext;
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const initialized = useRef(false);

    // Sync context to game loop on every render so it has latest dispatchers/state
    syncContext(globalContext);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        if (!ctx) return;

        // Define logical dimensions
        const width = Number(process.env.BUN_PUBLIC_CANVAS_WIDTH);
        const height = Number(process.env.BUN_PUBLIC_CANVAS_HEIGHT);

        // Handle High DPI displays (Retina screens)
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;

        // Scale context so we can use logical coordinates (0-500)
        ctx.scale(dpr, dpr);

        if (!initialized.current) {
            const centerX = Math.floor(width / 2 / grid_size) * grid_size;
            const centerY = Math.floor(height / 2 / grid_size) * grid_size;

            // Initial clear and draw background
            ctx.fillStyle = THEME.background;
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = THEME.snakeHead;
            ctx.fillRect(centerX, centerY, grid_size, grid_size);

            setSnake([{ x: centerX, y: centerY }]);
            initGame(ctx, globalContext);
            initialized.current = true;
        }

        const handleKeydown = (key: KeyboardEvent) => keypress(key);
        document.addEventListener("keydown", handleKeydown);

        const intervalId = setInterval(draw, 300);
        return () => {
            clearInterval(intervalId);
            document.removeEventListener("keydown", handleKeydown);
        };
    }, []);
    return (
        <canvas
            ref={canvasRef}
            style={{
                backgroundColor: "white",
                width: "600px",
                height: "600px",
            }}
        />
    );
}
