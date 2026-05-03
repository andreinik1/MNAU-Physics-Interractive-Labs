import { useEffect, useRef } from "react";
import { drawPsychrometer } from "../canvas/drawVolog";

interface Props {
  t1: number;
  t2: number;
  isDipping: boolean;
  isFanRunning: boolean;
}

export function VologCanvas({ t1, t2, isDipping, isFanRunning }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Анимация через requestAnimationFrame для плавности вентилятора
    let animationFrame: number;
    
    const render = () => {
      canvas.width = wrapper.clientWidth;
      canvas.height = wrapper.clientHeight;
      drawPsychrometer(ctx, canvas.width, canvas.height, t1, t2, isDipping, isFanRunning);
      animationFrame = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrame);
  }, [t1, t2, isDipping, isFanRunning]);

  return (
    <div ref={wrapperRef} style={{ width: "100%", height: "600px", background: "#fff", borderRadius: "8px", border: "1px solid #ddd", overflow: "hidden" }}>
      <canvas ref={canvasRef} style={{ display: "block" }} />
    </div>
  );
}