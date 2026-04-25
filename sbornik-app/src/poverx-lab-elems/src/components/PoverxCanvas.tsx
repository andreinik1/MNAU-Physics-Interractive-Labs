import { useEffect, useRef } from "react";
import { drawPoverx } from "../canvas/drawPoverx";

interface Props {
  n: number;
  targetN: number;
  d: number;
  isFlowing: boolean;
  mass: number;
  m0: number;
}

export function PoverxCanvas({ n, targetN, d, isFlowing, mass, m0 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frameId: number;
    const render = () => {
      canvas.width = wrapper.clientWidth;
      canvas.height = wrapper.clientHeight;
      drawPoverx(ctx, canvas.width, canvas.height, n, targetN, d, isFlowing, mass, m0);
      frameId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(frameId);
  }, [n, targetN, d, isFlowing, mass, m0]);

  return (
    <div ref={wrapperRef} style={{ width: "100%", height: "500px", background: "#fff", borderRadius: "8px", border: "1px solid #ddd", overflow: "hidden" }}>
      <canvas ref={canvasRef} style={{ display: "block" }} />
    </div>
  );
}