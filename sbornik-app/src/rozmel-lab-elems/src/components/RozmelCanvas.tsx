import React, { useEffect, useRef } from "react";
import { drawExpansionLab } from "../canvas/drawRozmel";

interface Props {
  u: number;
  i: number;
  dl: number;
  isOn: boolean;
}

export const RozmelCanvas: React.FC<Props> = ({ u, i, dl, isOn }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      // Используем фиксированные значения 600x400
      drawExpansionLab(ctx, 600, 400, u, i, dl, isOn);
    }
  }, [u, i, dl, isOn]);

  return (
    <canvas 
      ref={canvasRef} 
      width={600} 
      height={400} 
      style={{ 
        background: "#fff", 
        borderRadius: "8px", 
        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
        display: "block",
        margin: "0 auto"
      }} 
    />
  );
};