import { useState } from "react";
import { OberbekCanvas } from "./components/OberbekCanvas";
import OberbekControls from "./components/OberbekControls";
import LabTable from "./components/LabTable";
import styles from "./App.module.scss";
import OberbekMeta from "./components/OberbekMeta";
import { useOberbekAnimation } from "./hooks/useOberbekAnimation";

export default function OberbekLab() {
  const [h, setH] = useState(200); // Теперь 200 см
  const [m, setM] = useState(0.2);
  const [d, setD] = useState(40);
  const [l, setL] = useState(100);

  const { hCurrent, t, isRunning, start } = useOberbekAnimation(h, m, d, l);

  return (
    <main className={styles.app}>
      <h1 className={styles.title}>Лабораторна робота</h1>
      <h2 className={styles.subtitle}>
        Визначення моменту інерції маятника Обербека
      </h2>
      <div className={styles.mainGrid} style={{ minWidth: "100%", maxWidth: "100%" }}>
        <div className={styles.leftCol}>
          <OberbekMeta />
          <OberbekControls
            h={h} setH={setH}
            t={t} setT={() => { }}
            m={m} setM={setM}
            l={l} setL={setL}
            d={d} setD={setD}
            isRunning={isRunning}
            onStart={start}
            hCurrent={hCurrent}
          />
          <LabTable />
        </div>
        <div className={styles.canvasContainer}>
          <OberbekCanvas h={hCurrent} d={d} l={l} />
        </div>
      </div>
    </main>
  );
}