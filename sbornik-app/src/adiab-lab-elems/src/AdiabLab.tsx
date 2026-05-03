import { useState, useEffect } from "react";
import { AdiabCanvas } from "./components/AdiabCanvas";
import AdiabControls from "./components/AdiabControls";
import LabTable from "./components/LabTable";
import AdiabMeta from "./components/AdiabMeta";
import styles from "./App.module.scss";

export default function AdiabLab() {
  const [h1, setH1] = useState(0);
  const [h2, setH2] = useState(0);
  const [displayH, setDisplayH] = useState(0);

  const [isCompressorOn, setIsCompressorOn] = useState(false);
  const [isSiphonPressed, setIsSiphonPressed] = useState(false);
  const [isTubeConnected, setIsTubeConnected] = useState(true);
  const [isH1Fixed, setIsH1Fixed] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (isCompressorOn && isSiphonPressed && isTubeConnected && !isH1Fixed) {
      interval = setInterval(() => {
        setDisplayH(prev => (prev < 220 ? prev + 2 : prev));
      }, 30);
    }
    return () => clearInterval(interval);
  }, [isCompressorOn, isSiphonPressed, isTubeConnected, isH1Fixed]);

  const handleSiphonChange = (pressed: boolean) => {
    setIsSiphonPressed(pressed);

    // Фіксація h1 при відпусканні кнопки
    if (!pressed && isCompressorOn && isTubeConnected && displayH > 0 && !isH1Fixed) {
      setH1(displayH);
      setIsH1Fixed(true);
      setDisplayH(0); // Скидаємо лічильник накачки, бо значення вже в h1
    }

    // Скидання тиску (адіабата)
    if (pressed && !isTubeConnected && isH1Fixed && h2 === 0) {
      setDisplayH(0);
      setH1(0); // Візуально прибираємо h1 під час "пшику"
    }

    // Поява h2
    if (!pressed && !isTubeConnected && isH1Fixed && h2 === 0) {
      setTimeout(() => {
        const calculatedH2 = Math.round((h1 || 180) * (0.28 + Math.random() * 0.05));
        setH2(calculatedH2);
      }, 1000);
    }
  };

  const reset = () => {
    setH1(0); setH2(0); setDisplayH(0);
    setIsCompressorOn(false); setIsSiphonPressed(false);
    setIsTubeConnected(true); setIsH1Fixed(false);
  };

  return (
    <main className={styles.app}>
      <h1 className={styles.title}>Лабораторна робота</h1>
      <div className={styles.mainGrid} style={{ maxWidth: "1200px" }}>
        <div className={styles.leftCol}>
          <AdiabMeta />
          <AdiabControls
            isCompressorOn={isCompressorOn}
            isSiphonPressed={isSiphonPressed}
            isTubeConnected={isTubeConnected}
            onCompressor={() => setIsCompressorOn(!isCompressorOn)}
            onSiphon={handleSiphonChange}
            onTube={() => setIsTubeConnected(!isTubeConnected)}
            onReset={reset}
            status={h2 > 0 ? "Готово" : isH1Fixed ? "Випустіть повітря" : "Накачуйте"}
          />
          <LabTable />
        </div>
        <div className={styles.canvasContainer}>
          <AdiabCanvas
            displayH={displayH}
            h1={h1}
            h2={h2}
            isCompressorOn={isCompressorOn}
            isSiphonPressed={isSiphonPressed}
            isTubeConnected={isTubeConnected}
          />
        </div>
      </div>
    </main>
  );
}