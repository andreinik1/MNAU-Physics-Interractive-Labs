import React, { useState, useRef } from "react";
import styles from "./LabContainer.module.scss";

const getNow = () => Date.now();

interface Props {
  l: number; setL: (v: number) => void;
  d: number; setD: (v: number) => void;
  t: number; setT: (v: number) => void;
}

const StocksControls: React.FC<Props> = ({ l, setL, d, setD, t, setT }) => {
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  // Фізичний час падіння для автостопу (щоб зупинявся на мітці n)
  const physicalTime = (18 * 1.48 * (l || 0.2)) / (Math.pow(d || 0.004, 2) * (7800 - 1260) * 9.81);

  const handleStart = () => {
    setIsActive(true);
    setT(0);
    startTimeRef.current = getNow();
    timerRef.current = window.setInterval(() => {
      const elapsed = (getNow() - startTimeRef.current) / 1000;
      
      if (elapsed >= physicalTime) {
        handleStop(physicalTime);
      } else {
        setT(elapsed);
      }
    }, 10);
  };

  const handleStop = (finalTime?: number) => {
    setIsActive(false);
    if (timerRef.current) clearInterval(timerRef.current);
    if (finalTime) setT(finalTime);
  };

  return (
    <section className={styles.inputCard}>
      <h2>Керування установкою</h2>
      <div className={styles.formInline}>
        <div>
          <label>l (м): </label>
          <input 
            type="number" 
            step="0.01" 
            value={l || ""} 
            onChange={(e) => setL(parseFloat(e.target.value))} 
          />
        </div>
        <div>
          <label>d (м): </label>
          <input 
            type="number" 
            step="0.001" 
            value={d || ""} 
            onChange={(e) => setD(parseFloat(e.target.value))} 
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <div style={{ fontSize: "20px", fontWeight: "bold", minWidth: "80px", color: "#3b82f6" }}>
            {t.toFixed(3)} с
          </div>
          {!isActive ? (
            <button type="button" onClick={handleStart} className={styles.downloadBtn} style={{ background: "#22c55e", color: "white" }}>Старт</button>
          ) : (
            <button type="button" onClick={() => handleStop()} className={styles.downloadBtn} style={{ background: "#ef4444", color: "white" }}>Стоп</button>
          )}
        </div>
      </div>
    </section>
  );
};

export default StocksControls;