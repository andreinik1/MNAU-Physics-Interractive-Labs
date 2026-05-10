import { useState } from "react";
import { RozmelCanvas } from "./components/RozmelCanvas";
import RozmelControls from "./components/RozmelControls";
import LabTable from "./components/LabTable";
import RozmelMeta from "./components/RozmelMeta";
import { calculateExpansion } from "./physics/Rozmel";
import styles from "./App.module.scss";

export default function ExpansionLab() {
  const [u, setU] = useState(0);
  const [t1, setT1] = useState(20);
  const [isOn, setIsOn] = useState(false);

  // Получаем только те данные, которые реально используем в UI
  const { i, dl, t2 } = calculateExpansion(u, t1, isOn);

  return (
    <main className={styles.app}>
      <h1 className={styles.title}>Лабораторна робота</h1>
      <h2 className={styles.subtitle}>Коефіцієнт лінійного розширення металу</h2>
      <RozmelMeta />

      <div className={styles.mainGrid}>
        <div className={styles.controlsCol}>
          <section className={styles.inputCard}>
            <h3>Керування установкою</h3>
            <div style={{ marginBottom: "15px" }}>
              <button
                onClick={() => setIsOn(!isOn)}
                style={{
                  background: isOn ? "#dc2626" : "#16a34a",
                  color: "#fff", padding: "10px 20px", borderRadius: "6px", cursor: "pointer", border: "none"
                }}
              >
                {isOn ? "ВИМКНУТИ ЖИВЛЕННЯ" : "УВІМКНУТИ ЖИВЛЕННЯ"}
              </button>
            </div>

            <RozmelControls
              u={u}
              setU={setU}
              t1={t1}
              setT1={setT1}
              t2={t2}
              dl={dl}
              isOn={isOn}
            />
          </section>
        </div>

        <div className={styles.canvasWrapper}>
          <RozmelCanvas u={u} i={i} dl={dl} isOn={isOn} />
        </div>
      </div>

      <LabTable />
    </main>
  );
}