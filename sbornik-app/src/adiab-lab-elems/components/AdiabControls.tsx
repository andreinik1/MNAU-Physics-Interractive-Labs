import React from "react";
import styles from "./LabContainer.module.scss";

interface Props {
  isCompressorOn: boolean; isSiphonPressed: boolean; isTubeConnected: boolean;
  status: string; onCompressor: () => void; onSiphon: (s: boolean) => void;
  onTube: () => void; onReset: () => void;
}

const AdiabControls: React.FC<Props> = (p) => (
  <section className={styles.inputCard} style={{ marginBottom: "30px" }}>
    <h2>Керування</h2>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
      <button className={styles.downloadBtn} onClick={p.onCompressor} style={{ background: p.isCompressorOn ? "#ef4444" : "#2563eb", margin: 0 }}>
        {p.isCompressorOn ? "Вимкнути компресор" : "1. Включити компресор"}
      </button>
      <button className={styles.downloadBtn} onMouseDown={() => p.onSiphon(true)} onMouseUp={() => p.onSiphon(false)} style={{ margin: 0 }}>
        {p.isSiphonPressed ? "Відкрито" : "2. Натиснути сифон"}
      </button>
      <button className={styles.downloadBtn} onClick={p.onTube} style={{ background: p.isTubeConnected ? "#64748b" : "#10b981", margin: 0 }}>
        {p.isTubeConnected ? "3. Від'єднати трубку" : "Приєднати трубку"}
      </button>
      <button className={styles.downloadBtn} onClick={p.onReset} style={{ background: "#94a3b8", margin: 0 }}>Скинути</button>
    </div>
    <div style={{ marginTop: "10px", fontSize: "14px" }}><b>Статус:</b> {p.status}</div>
  </section>
);

export default AdiabControls;