import { useState } from "react";
import { VologCanvas } from "./components/VologCanvas";
import VologControls from "./components/VologControls";
import LabTable from "./components/LabTable";
import VologMeta from "./components/VologMeta";
import styles from "./App.module.scss";

export default function VologLab() {
  const [t1, setT1] = useState(22.0);
  const [t2, setT2] = useState(18.5);

  return (
    <main className={styles.app}>
      <h1 className={styles.title}>Лабораторна робота</h1>
      <h2 className={styles.subtitle}>Визначення вологості атмосферного повітря</h2>
      <div className={styles.mainGrid} style={{maxWidth: "1200px"}}>
        <div>
          <VologMeta />
          <VologControls t1={t1} setT1={setT1} t2={t2} setT2={setT2} />
        </div>
        <LabTable />
        <div className={styles.canvasContainer}>
          <VologCanvas t1={t1} t2={t2} />
        </div>
      </div>
    </main>
  );
}