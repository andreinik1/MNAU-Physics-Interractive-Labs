import { useState, useRef } from "react";

export function useOberbekAnimation(h: number, m: number, d: number, l: number) {
  const [hCurrent, setHCurrent] = useState(0);
  const [t, setT] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  
  const requestRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const animate = (time: number) => {
    const elapsed = (time - startTimeRef.current) / 1000;
    const r = (d / 2) / 1000; // диаметр в метры для физики
    const hM = h / 100;       // см в метры
    
    // Момент инерции (база + 4 груза по 0.1кг)
    const mockI = 0.015 + (4 * 0.1 * (l / 1000) ** 2); 
    const accel = (m * 9.81 * r * r) / (mockI + m * r * r);
    const tFall = Math.sqrt((2 * hM) / accel);
    
    if (elapsed <= tFall) {
      // Падение
      const currentPos = 0.5 * accel * elapsed ** 2;
      setHCurrent(currentPos * 100); // обратно в см для канваса
      setT(Number(elapsed.toFixed(2)));
      requestRef.current = requestAnimationFrame(animate);
    } else {
      // Подъем (затухание из-за трения)
      const tRise = tFall * 0.82; 
      const elapsedRise = elapsed - tFall;
      
      if (elapsedRise <= tRise) {
        const vMax = accel * tFall;
        const decel = vMax / tRise;
        const riseDist = vMax * elapsedRise - 0.5 * decel * elapsedRise ** 2;
        setHCurrent((hM - riseDist) * 100);
        requestRef.current = requestAnimationFrame(animate);
      } else {
        setIsRunning(false);
      }
    }
  };

  const start = () => {
    if (isRunning) return;
    setIsRunning(true);
    setT(0);
    setHCurrent(0);
    startTimeRef.current = performance.now();
    requestRef.current = requestAnimationFrame(animate);
  };

  return { hCurrent, t, isRunning, start };
}