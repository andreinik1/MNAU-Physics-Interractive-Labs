import { useEffect, useRef } from "react";
import { drawAdiab } from "../canvas/drawAdiab";

interface Props { 
  displayH: number; 
  h1: number; 
  h2: number;
  isCompressorOn: boolean; 
  isSiphonPressed: boolean; 
  isTubeConnected: boolean;
}

export function AdiabCanvas({ h1, h2, isCompressorOn, isSiphonPressed, isTubeConnected }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = () => {
      canvas.width = wrapper.clientWidth;
      canvas.height = wrapper.clientHeight;
      drawAdiab(
        ctx, 
        canvas.width, 
        canvas.height, 
        h1, 
        h2,
        isCompressorOn, 
        isSiphonPressed, 
        isTubeConnected
      );
    };

    render();

    window.addEventListener("resize", render);
    return () => window.removeEventListener("resize", render);
  }, [h1, h2, isCompressorOn, isSiphonPressed, isTubeConnected]);

  return (
    <div ref={wrapperRef} style={{ width: "100%", height: "500px", background: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
      <canvas ref={canvasRef} style={{ display: "block" }} />
    </div>
  );
}