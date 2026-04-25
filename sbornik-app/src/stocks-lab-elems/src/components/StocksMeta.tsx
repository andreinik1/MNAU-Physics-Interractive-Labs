import React from "react";
import styles from "./LabContainer.module.scss";

const StocksMeta: React.FC = () => {
  return (
    <div className={styles.inputCard} style={{ marginBottom: "30px", width: "1144px" }}>
      <h2 style={{ marginBottom: "6px" }}>Мета лабораторної роботи:</h2>
      <p style={{ margin: "0 0 16px 28px" }}>
        1. Визначити механізм виникнення сил внутрішнього тертя.<br />
        2. Визначити коефіцієнт внутрішнього тертя за швидкістю падіння кульки.
      </p>
      <h2 style={{ marginBottom: "6px" }}>Прилади та обладнання:</h2>
      <p style={{ margin: "0 0 0 28px" }}>
        1. Скляний циліндр заповнений рідиною.<br />
        2. Секундомір.<br />
        3. Мікрометр.<br />
        4. Міліметрова лінійка.<br />
        5. Свинцеві кульки.
      </p>
    </div>
  );
};

export default StocksMeta;