import { useState } from "react";
import { AdiabCanvas } from "./components/AdiabCanvas";
import AdiabControls from "./components/AdiabControls";
import LabTable from "./components/LabTable";
import styles from "./App.module.scss";
import AdiabMeta from "./components/AdiabMeta";

export default function AdiabLab() {
  const [h1, setH1] = useState(0);
  const [h2, setH2] = useState(0);

  return (
    <main className={styles.app}>
      <h1 className={styles.title}>Лабораторна робота</h1>
      <h2 className={styles.subtitle}>
        Визначення відношення молярних теплоємностей повітря методом адіабатичного розширення
      </h2>
      <div className={styles.mainGrid} style={{ maxWidth: "1200px" }}>
        <div className={styles.leftCol}>
          <AdiabMeta />
          <AdiabControls h1={h1} setH1={setH1} h2={h2} setH2={setH2} />
          <LabTable />
        </div>
        <div className={styles.canvasContainer} style={{maxWidth: "1200px"}}>
          <AdiabCanvas h1={h1} h2={h2}/>
        </div>
      </div>
    </main>
  );
}