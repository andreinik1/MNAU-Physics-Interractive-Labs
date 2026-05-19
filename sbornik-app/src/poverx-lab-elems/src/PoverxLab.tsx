import { useState } from "react";
import { PoverxCanvas } from "./components/PoverxCanvas";
import PoverxControls from "./components/PoverxControls";
import PoverxMeta from "./components/PoverxMeta";
import LabTable from "./components/LabTable";
import styles from "./App.module.scss";

export default function PoverxLab() {
  const [n, setN] = useState(50);
  const [d, setD] = useState(0.004);
  const [currentN, setCurrentN] = useState(0);
  const [isFlowing, setIsFlowing] = useState(false);
  const [m0] = useState(0.0420);
  const [mass, setMass] = useState(0.0420);
  
  return (
    <main className={styles.app}>
      <h1 className={styles.title}>Лабораторна робота</h1>
      <h2 className={styles.subtitle}>Визначення коефіцієнта поверхневого натягу</h2>
      <div className={styles.mainGrid} style={{ maxWidth: "100%", minWidth: "100%" }}>
        <PoverxMeta />
        <PoverxControls
          n={n} setN={setN}
          d={d} setD={setD}
          currentN={currentN} setCurrentN={setCurrentN}
          isFlowing={isFlowing} setIsFlowing={setIsFlowing}
          mass={mass} setMass={setMass}
          m0={m0}
        />
        <LabTable />
        <div className={styles.canvasContainer}>
          <PoverxCanvas n={currentN} targetN={n} d={d} isFlowing={isFlowing} mass={mass} m0={m0} />
        </div>
      </div>
    </main>
  );
}