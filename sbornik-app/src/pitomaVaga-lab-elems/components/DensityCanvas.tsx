import { useEffect, useRef } from "react";
import { drawAreometer } from "../canvas/drawAreometr";

interface Props {
  p1: number;
  p2: number;
  p3: number;
  bodyState: 'none' | 'air' | 'water';
  bodyWeightNewtons: number;
  bodyArchimedes: number;
}

export function DensityCanvas({ p1, p2, p3, bodyState, bodyWeightNewtons, bodyArchimedes }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateSize = () => {
      canvas.width = wrapper.clientWidth;
      canvas.height = wrapper.clientHeight;
      drawAreometer(ctx, canvas.width, canvas.height, p1, p2, p3, bodyState, bodyWeightNewtons, bodyArchimedes);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [p1, p2, p3, bodyState, bodyWeightNewtons, bodyArchimedes]);

  return (
    <div ref={wrapperRef} style={{ width: "100%", height: "600px", background: "#fff", borderRadius: "8px", border: "1px solid #ddd", overflow: "hidden", position: "relative", boxSizing: "border-box" }}>
      <canvas ref={canvasRef} style={{ display: "block" }} />
    </div>
  );
}