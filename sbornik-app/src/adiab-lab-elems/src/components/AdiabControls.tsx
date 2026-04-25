import React from "react";
import styles from "./LabContainer.module.scss";

interface Props {
  h1: number; setH1: (v: number) => void;
  h2: number; setH2: (v: number) => void;
}

const AdiabControls: React.FC<Props> = ({ h1, setH1, h2, setH2 }) => {
  const handleH1Change = (val: number) => {
    setH1(val);
    if (h2 > val) setH2(val); // h2 завжди <= h1
  };

  return (
    <section className={styles.inputCard} style={{ minHeight: "100px", marginBottom: "30px" }}>
      <h2>Керування манометром</h2>
      <div className={styles.formInline}>
        <div style={{ flex: 1, padding: "10px" }}>
          <label>Різниця h₁ (нагнітання): <b>{h1}</b> мм</label>
          <input
            type="range" min="0" max="250"
            value={h1}
            onChange={(e) => handleH1Change(+e.target.value)}
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ flex: 1, padding: "10px" }}>
          <label>Різниця h₂ (після розширення): <b>{h2}</b> мм</label>
          <input
            type="range" min="0" max={h1}
            value={h2}
            onChange={(e) => setH2(+e.target.value)}
            style={{ width: "100%" }}
          />
        </div>
      </div>
    </section>
  );
};

export default AdiabControls;