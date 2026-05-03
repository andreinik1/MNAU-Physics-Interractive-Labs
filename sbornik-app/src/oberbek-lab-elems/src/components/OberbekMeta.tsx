import React from "react";
import styles from "./LabContainer.module.scss";

const AdiabMeta: React.FC = () => {
  return (
    <div className={styles.inputCard} style={{ marginBottom: "30px" }}>
      <h2 style={{ marginBottom: "6px" }}>Мета лабораторної роботи:</h2>
      <p style={{ margin: "0 0 16px 28px" }}>
        Визначити відношення молярних теплоємностей повітря методом адіабатичного розширення.
      </p>
      <h2 style={{ marginBottom: "6px" }}>Прилади та обладнання:</h2>
      <p style={{ margin: "0 0 0 28px" }}>
        1. Маятник Обербека <br />
        2. Масштабна лінійка <br />
        3. Секундомір <br />
        4. Штангенциркуль
      </p>
    </div>
  );
};

export default AdiabMeta;