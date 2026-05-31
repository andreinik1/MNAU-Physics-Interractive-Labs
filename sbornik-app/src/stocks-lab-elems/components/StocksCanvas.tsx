import { useEffect, useRef } from "react";
import { drawStocks } from "../canvas/drawStocks";

interface Props {
  l: string | null;
  d: string | null;
  t: number;
}

export function StocksCanvas({ t, l, d }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      canvas.width = wrapperRef.current?.clientWidth || 400;
      canvas.height = wrapperRef.current?.clientHeight || 600;
      drawStocks(ctx, canvas.width, canvas.height, t, l ? parseFloat(l) : 0.2, d ? parseFloat(d) : 0.004);
      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [t, l, d]);

  return (
    <div ref={wrapperRef} style={{ width: "100%", height: "1000px", background: "#fff", borderRadius: "8px", border: "1px solid #ddd", position: "relative" }}>
      <canvas ref={canvasRef} style={{ display: "block" }} />
    </div>
  );
}