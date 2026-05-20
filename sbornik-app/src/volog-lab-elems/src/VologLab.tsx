import { useState, useEffect } from "react";
import { VologCanvas } from "./components/VologCanvas";
import VologControls from "./components/VologControls";
import LabTable from "./components/LabTable";
import VologMeta from "./components/VologMeta";
import styles from "./App.module.scss";
import tablePsix from "./table_psix.jpg";

export default function VologLab() {
  // --- СОСТОЯНИЕ (В строковом формате для удобного ввода) ---
  const [t1Input, setT1Input] = useState<string>("22.5");
  const [t2Input, setT2Input] = useState<string>("22.5");

  // Внутреннее числовое состояние для симуляции падения температуры
  const [liveT2, setLiveT2] = useState<number | null>(null);

  const [isWet, setIsWet] = useState(false);
  const [isDipping, setIsDipping] = useState(false);
  const [isFanRunning, setIsFanRunning] = useState(false);
  const [timer, setTimer] = useState(0);

  // Парсим строковые значения для Canvas и вычислений
  const parsedT1 = parseFloat(t1Input.replace(",", ".")) || 0;
  // Если вентилятор запущен, берем текущее динамическое значение liveT2, иначе начальное введенное
  const parsedT2 = liveT2 !== null ? liveT2 : (parseFloat(t2Input.replace(",", ".")) || 0);

  // Функции управления
  const startDipping = () => {
    if (isWet || isDipping) return;
    setIsDipping(true);
    setTimeout(() => {
      setIsDipping(false);
      setIsWet(true);
    }, 3000); // 3 секунды на "макнуть в воду"
  };

  const handleFanToggle = () => {
    setIsFanRunning(prev => {
      const nextState = !prev;
      // Инициализируем liveT2 стартовым числом прямо в момент клика на кнопку "Завести вент."
      if (nextState && liveT2 === null) {
        setLiveT2(parseFloat(t2Input.replace(",", ".")) || 0);
      }
      return nextState;
    });
  };

  const resetLab = () => {
    setLiveT2(null);
    setIsWet(false);
    setIsFanRunning(false);
    setTimer(0);
    setIsDipping(false);
  };

  // Эффект работы вентилятора (теперь без синхронных setState внутри)
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    if (isFanRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
        if (isWet) {
          setLiveT2(prev => {
            const currentT2 = prev !== null ? prev : (parseFloat(t2Input.replace(",", ".")) || 0);
            const targetT2 = parsedT1 - 5.5; // Предел охлаждения относительно выбранной T1
            return currentT2 > targetT2 ? currentT2 - 0.02 : currentT2;
          });
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isFanRunning, isWet, parsedT1, t2Input]);

  return (
    <main className={styles.app}>
      <h1 className={styles.title}>Лабораторна робота</h1>
      <h2 className={styles.subtitle}>Визначення вологості атмосферного повітря</h2>

      <div className={styles.mainGrid} style={{ maxWidth: "100%", minWidth: "100%" }}>
        <div>
          <VologMeta />
          <VologControls
            timer={timer}
            isWet={isWet}
            isDipping={isDipping}
            isFanRunning={isFanRunning}
            onDip={startDipping}
            onFan={handleFanToggle}
            onReset={resetLab}
            t1Input={t1Input}
            t2Input={t2Input}
            onT1Change={setT1Input}
            onT2Change={setT2Input}
          />
        </div>

        <LabTable />

        <div className={styles.canvasContainer}>
          <VologCanvas
            t1={parsedT1}
            t2={parsedT2}
            isDipping={isDipping}
            isFanRunning={isFanRunning}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <img style={{ marginTop: "30px", width: "100%" }} src={tablePsix} alt="Table" />
        </div>
      </div>
    </main>
  );
}