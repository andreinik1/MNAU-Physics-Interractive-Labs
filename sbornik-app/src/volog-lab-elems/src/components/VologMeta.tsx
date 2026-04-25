import React from "react";
import styles from "./LabContainer.module.scss";

const VologMeta: React.FC = () => {
  return (
    <div className={styles.inputCard} style={{ marginBottom: "30px" }}>
      <h2 style={{ marginBottom: "6px" }}>Мета лабораторної роботи:</h2>
      <p style={{ margin: "0 0 16px 28px" }}>
        Визначити абсолютну і відносну вологість повітря психрометром Августа.
      </p>
      <h2 style={{ marginBottom: "6px" }}>Прилади та обладнання:</h2>
      <p style={{ margin: "0 0 0 28px" }}>
        1. Психрометр Августа.<br />
        2. Колба з дистильованою водою.<br />
        3. Таблиця тиску насиченої водяної пари при різних температурах.
      </p>
    </div>
  );
};

export default VologMeta;