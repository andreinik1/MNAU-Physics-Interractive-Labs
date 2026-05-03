import React from "react";
import styles from "./LabContainer.module.scss";

interface Props {
  h: number; setH: (v: number) => void;
  t: number; setT: (v: number) => void;
  m: number; setM: (v: number) => void;
  l: number; setL: (v: number) => void;
  d: number; setD: (v: number) => void;
  isRunning?: boolean;
  onStart?: () => void;
  hCurrent?: number;
}

const OberbekControls: React.FC<Props> = ({ h, setH, t, m, setM, l, setL, d, setD, isRunning, onStart, hCurrent }) => {
  return (
    <section className={styles.inputCard} style={{ marginBottom: "30px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2>Керування</h2>
        <div style={{ textAlign: "right" }}>
          <span style={{ fontSize: "14px", display: "block", color: "#64748b" }}>Поточна висота:</span>
          <span style={{ fontSize: "24px", fontWeight: "bold", color: "#ef4444" }}>
            {hCurrent?.toFixed(1) || 0} см
          </span>
        </div>
        <div style={{ textAlign: "right" }}>
          <span style={{ fontSize: "24px", fontWeight: "bold", marginRight: "20px", color: "#2563eb" }}>
            {t} с
          </span>
          <button
            onClick={onStart}
            disabled={isRunning}
            className={styles.downloadBtn}
            style={{ background: isRunning ? "#94a3b8" : "#2563eb", color: "white", margin: 0 }}
          >
            {isRunning ? "Йде запис..." : "ПУСК"}
          </button>
        </div>
      </div>

      <div className={styles.formInline}>
        <div style={{ flex: 1, padding: "10px" }}>
          <label>Висота h (см): <b>{h}</b></label>
          <input type="range" min="50" max="200" value={h} onChange={(e) => setH(+e.target.value)} style={{ width: "100%" }} />
          <label>Відстань тягарців l (мм): <b>{l}</b></label>
          <input type="range" min="20" max="150" value={l} onChange={(e) => setL(+e.target.value)} style={{ width: "100%" }} />
        </div>
        <div style={{ width: "40px" }}></div>
        <div style={{ flex: 1, padding: "10px" }}>
          <label>Маса вантажу m (кг):</label>
          <input type="number" step="0.01" value={m} onChange={(e) => setM(+e.target.value)} />
          <br />
          <br />
          <label>Діаметр шківа d (мм):</label>
          <input type="number" value={d} onChange={(e) => setD(+e.target.value)} />
        </div>
      </div>
    </section>
  );
};

export default OberbekControls;