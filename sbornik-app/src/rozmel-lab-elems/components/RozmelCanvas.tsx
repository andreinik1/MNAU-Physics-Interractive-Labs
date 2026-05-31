import React, { useEffect, useRef, useState } from "react";
import { drawExpansionLab } from "../canvas/drawRozmel"; // Укажи правильный путь к файлу отрисовки

interface Props {
  u: number;
  i: number;
  dl: number;
  isOn: boolean;
}

export const RozmelCanvas: React.FC<Props> = ({ u, i, dl, isOn }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 400 });

  // Отслеживаем ширину родительского контейнера для адаптивности
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width } = entry.contentRect;
        // Высоту оставляем фиксированной (400px), ширину берем от родителя
        setDimensions({ width: width, height: 400 });
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Вызываем отрисовку при изменении пропсов или размеров экрана
  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      drawExpansionLab(ctx, dimensions.width, dimensions.height, u, i, dl, isOn);
    }
  }, [u, i, dl, isOn, dimensions]);

  return (
    <div ref={containerRef} style={{ width: "100%", maxWidth: "800px", margin: "0 auto" }}>
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        style={{
          background: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
          display: "block",
        }}
      />
    </div>
  );
};