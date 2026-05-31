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

  // Исправлено: Накачка идет при выключенном (не зажатом) сифоне!
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (isCompressorOn && !isSiphonPressed && isTubeConnected && !isH1Fixed) {
      interval = setInterval(() => {
        setDisplayH(prev => (prev < 220 ? prev + 2 : prev));
      }, 30);
    }
    return () => clearInterval(interval);
  }, [isCompressorOn, isSiphonPressed, isTubeConnected, isH1Fixed]);

  const handleSiphonChange = (pressed: boolean) => {
    setIsSiphonPressed(pressed);

    // Логика зажатия/отпускания сифона при накачке
    if (pressed && isCompressorOn && isTubeConnected && displayH > 0 && !isH1Fixed) {
      setH1(displayH);
      setIsH1Fixed(true);
    }

    // Сброс давления во время "пшика"
    if (pressed && !isTubeConnected && isH1Fixed && h2 === 0) {
      setDisplayH(0);
      setH1(0);
    }

    // Появление h2 после стабилизации температуры (через 1 секунду после закрытия сифона)
    if (!pressed && !isTubeConnected && isH1Fixed && h2 === 0) {
      setTimeout(() => {
        // Берем сохраненный уровень, либо базовый ориентир, если сбросился
        const baseH1 = displayH > 0 ? displayH : 180;
        const calculatedH2 = Math.round(baseH1 * (0.28 + Math.random() * 0.05));
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
      <div className={styles.mainGrid} style={{ minWidth: "100%", maxWidth: "100%" }}>
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
          {/* Исправлено: Добавлен проп displayH={displayH} */}
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