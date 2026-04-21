import { GlobalContext, grid_size, type GlobalContextType } from "@/App";
import { draw } from "@/functions/game";
import { useContext, useEffect, useRef } from "react";

export function Canvas() {
    const { snake, setSnake } = useContext(GlobalContext) as GlobalContextType;
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Define logical dimensions
        const width = 600;
        const height = 600;

        // Handle High DPI displays (Retina screens)
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;

        // Scale context so we can use logical coordinates (0-500)
        ctx.scale(dpr, dpr);

        // Calculate center position aligned to the grid
        const centerX = Math.floor(width / 2 / grid_size) * grid_size;
        const centerY = Math.floor(height / 2 / grid_size) * grid_size;

        // Update global state
        setSnake([{ x: centerX, y: centerY }]);

        // Initial draw
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = "green";
        ctx.fillRect(centerX, centerY, grid_size, grid_size);
        
        const a = setInterval(draw, 500);
        
        return () => {
            clearInterval(a);
        }
    }, [setSnake]);

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
