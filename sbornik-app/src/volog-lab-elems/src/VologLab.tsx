import { useState, useEffect } from "react";
import { VologCanvas } from "./components/VologCanvas";
import VologControls from "./components/VologControls";
import LabTable from "./components/LabTable";
import VologMeta from "./components/VologMeta";
import styles from "./App.module.scss";
import tablePsix from "./table_psix.jpg";

export default function VologLab() {
  // --- СОСТОЯНИЕ ---
  const [t1Input, setT1Input] = useState<string>("22.5");
  const [t2Input, setT2Input] = useState<string>("22.5");
  const [pInput, setPInput] = useState<string>("1013.25"); // Добавили давление (hPa)

  // Внутреннее числовое состояние для симуляции падения температуры
  const [liveT2, setLiveT2] = useState<number | null>(null);

  const [isWet, setIsWet] = useState(false);
  const [isDipping, setIsDipping] = useState(false);
  const [isFanRunning, setIsFanRunning] = useState(false);
  const [timer, setTimer] = useState(0);

  // Парсим значения
  const parsedT1 = parseFloat(t1Input.replace(",", ".")) || 0;
  const parsedT2 = liveT2 !== null ? liveT2 : (parseFloat(t2Input.replace(",", ".")) || 0);
  const parsedP = parseFloat(pInput.replace(",", ".")) || 1013.25; // Числовое давление

  // Функции управления
  const startDipping = () => {
    if (isWet || isDipping) return;
    setIsDipping(true);
    setTimeout(() => {
      setIsDipping(false);
      setIsWet(true);
    }, 3000);
  };

  const handleFanToggle = () => {
    setIsFanRunning(prev => {
      const nextState = !prev;
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

  // Эффект работы вентилятора
  // Ефект роботи вентилятора з чесною лінійною фізикою охолодження
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    if (isFanRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
        if (isWet) {
          setLiveT2(prev => {
            const currentT2 = prev !== null ? prev : (parseFloat(t2Input.replace(",", ".")) || 0);

            // 1. Коефіцієнт впливу тиску на граничну температуру
            // Нормальний тиск = 1013.25 hPa. Якщо тиск менший — випаровування сильніше, дельта більша.
            const pressureFactor = parsedP / 1013.25;
            const baseMaxDelta = 6.0;
            const targetT2 = parsedT1 - (baseMaxDelta / pressureFactor);

            // 2. Чесна швидкість падіння температури в секунду (залежить від тиску)
            // При нормальному тиску крок = 0.02°C в секунду.
            // Якщо тиск високий (наприклад, 1035), ділимо на 1.02 -> крок менший (падає повільніше).
            // Якщо тиск низький (наприклад, 980), ділимо на 0.96 -> крок більший (падає швидше).
            const baseStep = 0.02;
            const dynamicStep = baseStep / pressureFactor;

            // Перевіряємо, чи ми вже не досягли ліміту
            if (currentT2 > targetT2) {
              const nextT2 = currentT2 - dynamicStep;
              // Щоб випадково не проскочити targetT2 через математику плаваючої крапки
              return nextT2 < targetT2 ? targetT2 : nextT2;
            } else {
              return targetT2; // Стабілізація, температура більше не падає
            }
          });
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isFanRunning, isWet, parsedT1, t2Input, parsedP]);

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
            pInput={pInput} // Передаем давление
            onT1Change={setT1Input}
            onT2Change={setT2Input}
            onPChange={setPInput}  // Передаем хэндлер изменения давления
          />
        </div>

        <LabTable />

        <div className={styles.canvasContainer}>
          <VologCanvas
            t1={parsedT1}
            t2={parsedT2}
            p={parsedP} // Передаем в канвас
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