import React, { useEffect, useRef } from "react";
import styles from "./LabContainer.module.scss";

interface Props {
  n: string | null;
  setN: (v: string | null) => void;
  d: string | null;
  setD: (v: string | null) => void;
  currentN: number;
  setCurrentN: React.Dispatch<React.SetStateAction<number>>;
  isFlowing: boolean;
  setIsFlowing: (v: boolean) => void;
  mass: number;
  setMass: React.Dispatch<React.SetStateAction<number>>;
  m0: number;
}

const PoverxControls: React.FC<Props> = ({
  n, setN, d, setD, currentN, setCurrentN, isFlowing, setIsFlowing, setMass, m0
}) => {
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startFlow = () => {
    setCurrentN(0);
    setMass(m0); 
    setIsFlowing(true);
  };

  useEffect(() => {
    if (isFlowing && currentN < (n ? parseInt(n) : 50)) {
      // Інтервал між появою крапель (збільшив до 800мс для плавності)
      timerRef.current = setInterval(() => {
        setCurrentN((prev: number) => {
          if (prev >= (n ? parseInt(n) : 50)) {
            setIsFlowing(false);
            return prev;
          }
          const next = prev + 1;

          // ФІЗИКА РОЗРАХУНКУ
          const sigmaWater = 0.072; 
          const baseDropMass = (Math.PI * (d ? parseFloat(d) : 0.004) * sigmaWater) / 9.81;
          const randomFactor = 0.98 + Math.random() * 0.04;
          const dropWeight = baseDropMass * randomFactor;

          // ЗАТРИМКА: додаємо масу через 350мс (час польоту каплі на канвасі)
          setTimeout(() => {
            setMass((prevMass: number) => prevMass + dropWeight);
          }, 350);

          if (next >= (n ? parseInt(n) : 50)) {
            setIsFlowing(false);
            if (timerRef.current) clearInterval(timerRef.current);
          }
          return next;
        });
      }, 800); 
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isFlowing, n, d, m0, setCurrentN, setMass, setIsFlowing, currentN]);

  return (
    <section className={styles.inputCard} style={{marginBottom: "30px"}}>
      <h2>Керування установкою</h2>
      <div className={styles.formInline}>
        <div>
          <label>n (ціль): </label>
          <input type="number" value={n || ""} onChange={(e) => setN(e.target.value)} disabled={isFlowing}/>
        </div>
        <div>
          <label>d (м): </label>
          <input type="number" step="0.0001" value={d || ""} onChange={(e) => setD(e.target.value)} disabled={isFlowing}/>
        </div>
        <div style={{ display: "flex", gap: "10px"}}>
          <button 
            className={styles.downloadBtn} 
            onClick={startFlow}
            style={{ background: "#22c55e", color: "white",  display: "block"}}
            disabled={isFlowing}
          >
            Старт
          </button>
          <button 
            className={styles.downloadBtn} 
            onClick={() => setIsFlowing(false)}
            style={{ background: "#ef4444", color: "white", display: "inline-block"}}
            disabled={!isFlowing}
          >
            Стоп
          </button>
        </div>
      </div>
    </section>
  );
};

export default PoverxControls;