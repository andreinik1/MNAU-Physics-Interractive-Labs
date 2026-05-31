import { useEffect, useRef } from "react";
import { drawOberbek } from "../canvas/drawOberbek";

interface Props { h: number; d: number; l: number; }

export function OberbekCanvas({ h, d, l }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const render = () => {
      const rect = wrapper.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      const ctx = canvas.getContext("2d");
      if (ctx) drawOberbek(ctx, canvas.width, canvas.height, h, d / 2, l);
    };

    render();
    window.addEventListener("resize", render);
    return () => window.removeEventListener("resize", render);
  }, [h, d, l]);

  return (
    <div ref={wrapperRef} style={{ width: "100%", height: "600px", background: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0", position: "relative", overflow: "hidden" }}>
      <canvas ref={canvasRef} style={{ display: "block" }} />
    </div>
  );
}