import { useEffect, useRef } from "react";
import { drawAdiab } from "../canvas/drawAdiab";

interface Props { h1: number; h2: number; }

export function AdiabCanvas({ h1, h2 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const render = () => {
      // Фіксуємо розмір без зміни CSS Scale
      const rect = wrapper.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      const ctx = canvas.getContext("2d");
      if (ctx) drawAdiab(ctx, canvas.width, canvas.height, h1, h2);
    };

    render();
    window.addEventListener("resize", render);
    return () => window.removeEventListener("resize", render);
  }, [h1, h2]);

  return (
    <div 
      ref={wrapperRef} 
      style={{ 
        width: "100%", 
        height: "500px", // Фіксована висота рятує від розтягування
        background: "#fff", 
        borderRadius: "12px", 
        border: "1px solid #e2e8f0",
        position: "relative",
        overflow: "hidden" 
      }}
    >
      <canvas ref={canvasRef} style={{ display: "block" }} />
    </div>
  );
}