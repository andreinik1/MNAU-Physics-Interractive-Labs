import React from "react";
import styles from "./LabContainer.module.scss";

const PoverxMeta: React.FC = () => {
  return (
    <div className={styles.inputCard} style={{ marginBottom: "30px" }}>
      <h2 style={{ marginBottom: "6px" }}>Мета лабораторної роботи:</h2>
      <p style={{ margin: "0 0 16px 28px" }}>
        1. Вивчити явище поверхневого натягу. <br />
        2. Визначити коефіцієнт поверхневого натягу рідини.
      </p>
      <h2 style={{ marginBottom: "6px" }}>Прилади та обладнання:</h2>
      <p style={{ margin: "0 0 0 28px" }}>
        1. Скляна бюретка з краном.<br />
        2. Колбочка.<br />
        3. Технічні терези з рівновагами.<br />
        4. Мікрометр.
      </p>
    </div>
  );
};

export default PoverxMeta;