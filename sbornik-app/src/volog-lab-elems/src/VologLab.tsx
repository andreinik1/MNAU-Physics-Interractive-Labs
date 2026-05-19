import { useState, useEffect } from "react";
import { VologCanvas } from "./components/VologCanvas";
import VologControls from "./components/VologControls";
import LabTable from "./components/LabTable";
import VologMeta from "./components/VologMeta";
import styles from "./App.module.scss";
import tablePsix from "./table_psix.jpg";

export default function VologLab() {
  // --- СОСТОЯНИЕ (Вся логика теперь тут) ---
  const [t1] = useState(22.5); 
  const [t2, setT2] = useState(22.5); 
  const [isWet, setIsWet] = useState(false); 
  const [isDipping, setIsDipping] = useState(false); 
  const [isFanRunning, setIsFanRunning] = useState(false); 
  const [timer, setTimer] = useState(0); 

  // Функции управления
  const startDipping = () => {
    if (isWet || isDipping) return;
    setIsDipping(true);
    setTimeout(() => {
      setIsDipping(false);
      setIsWet(true);
    }, 3000); // 3 секунды на "макнуть в воду"
  };

  const resetLab = () => {
    setT2(t1);
    setIsWet(false);
    setIsFanRunning(false);
    setTimer(0);
    setIsDipping(false);
  };

  // Эффект работы вентилятора
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (isFanRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
        if (isWet) {
          setT2(prev => {
            const targetT2 = t1 - 5.5; // Предел охлаждения
            return prev > targetT2 ? prev - 0.02 : prev;
          });
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isFanRunning, isWet, t1]);

  return (
    <main className={styles.app}>
      <h1 className={styles.title}>Лабораторна робота</h1>
      <h2 className={styles.subtitle}>Визначення вологості атмосферного повітря</h2>
      
      <div className={styles.mainGrid} style={{maxWidth: "100%", minWidth: "100%"}}>
        <div>
          <VologMeta />
          <VologControls 
            timer={timer} 
            isWet={isWet} 
            isDipping={isDipping} 
            isFanRunning={isFanRunning} 
            onDip={startDipping} 
            onFan={() => setIsFanRunning(!isFanRunning)} 
            onReset={resetLab} 
          />
        </div>
        
        <LabTable />
        
        <div className={styles.canvasContainer}>
          <VologCanvas 
            t1={t1} 
            t2={t2} 
            isDipping={isDipping} 
            isFanRunning={isFanRunning} 
          />
        </div>

        <div style={{display: "flex", justifyContent: "center"}}>
          <img style={{marginTop: "30px", width: "100%"}} src={tablePsix} alt="Table" />
        </div>
      </div>
    </main>
  );
}