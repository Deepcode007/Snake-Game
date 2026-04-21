import { useEffect, useRef } from "react";


export function Canvas()
{
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current as HTMLCanvasElement | null;
        // Ensure canvas is available before accessing context
        if (canvas) {
            const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
          
          // Example: Draw a simple rectangle
          ctx.fillStyle = 'blue';
          ctx.fillRect(10, 10, 100, 100);
    
          // Cleanup function for animations or event listeners
          return () => {
            // Cancel animation frames or remove listeners here
          };
        }
      }, [])
    
    
    return <canvas ref={canvasRef} width="500px" height="500px" style={{ backgroundColor: "white" }} />
}