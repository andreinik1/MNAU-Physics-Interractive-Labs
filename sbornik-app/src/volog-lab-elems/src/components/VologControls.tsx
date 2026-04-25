import React from "react";
import styles from "./LabContainer.module.scss";

interface Props {
  t1: number; setT1: (v: number) => void;
  t2: number; setT2: (v: number) => void;
}

const VologControls: React.FC<Props> = ({ t1, setT1, t2, setT2 }) => {
  return (
    <section className={styles.inputCard} style={{ marginBottom: "30px" }}>
      <h2>Налаштування психрометра</h2>
      <div className={styles.formInline}>
        <div>
          <label>Температура сухого (t₁), °C: </label>
          <input type="range" min="15" max="35" step="0.1" value={t1} onChange={(e) => setT1(+e.target.value)} />
          <span>{t1}°C</span>
        </div>
        <div>
          <label>Температура вологого (t₂), °C: </label>
          <input type="range" min="10" max={t1} step="0.1" value={t2} onChange={(e) => setT2(+e.target.value)} />
          <span>{t2}°C</span>
        </div>
      </div>
    </section>
  );
};

export default VologControls;