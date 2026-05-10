import React from "react";
import styles from "./LabContainer.module.scss";

const DensityMeta: React.FC = () => {
  return (
    <div className={styles.inputCard} style={{ marginBottom: "30px", width: "1200px" }}>
      <h2 style={{ marginBottom: "6px" }}>Мета лабораторної роботи:</h2>
      <p style={{ margin: "0 0 16px 28px" }}>
        Визначити опір не нагрітого і нагрітого металевого дроту, та його видовження при нагріванні та коефіціент лійнійного видовження.
      </p>
      <h2 style={{ marginBottom: "6px" }}>Прилади та обладнання:</h2>
      <p style={{ margin: "0 0 0 28px" }}>
        1. Ніхромовий дріт (Nx 90%, Сг 10%).<br />
        2. Джерело постійного струму.<br />
        3. Вольтметр.<br />
        4. Амперметр.<br />
        5. Пружина.<br />
        6. Шкала для вимірювання дроту.
      </p>
    </div>
  );
};

export default DensityMeta;