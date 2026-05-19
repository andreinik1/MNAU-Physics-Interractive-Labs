import React from "react";
import styles from "./LabContainer.module.scss";
import { BlockMath, InlineMath } from "react-katex";

const DensityMeta: React.FC = () => {
  return (
    <div className={styles.inputCard} style={{ marginBottom: "30px" }}>
      <h2 style={{ marginBottom: "6px" }}>Мета лабораторної роботи:</h2>
      <p style={{ margin: "0 0 16px 28px" }}>
        Визначити опір не нагрітого і нагрітого металевого дроту, та його видовження при нагріванні та коефіціент лійнійного видовження.
      </p>
      <h2 style={{ marginBottom: "6px" }}>Прилади та обладнання:</h2>
      <p style={{ margin: "0 0 16px 28px" }}>
        1. Ніхромовий дріт (Nx 90%, Сг 10%)<br />
        2. Джерело постійного струму<br />
        3. Вольтметр<br />
        4. Амперметр<br />
        5. Пружина<br />
        6. Шкала для вимірювання дроту
      </p>
      <h2 style={{ marginBottom: "6px" }}>Хід роботи: </h2>
      <p style={{ margin: "0 0 0 28px" }}>
        1. Ввімкнути джерело струму. Зачекати 20 – 30 с. Поки дріт нагрівається до максимальної температури і настане стан теплової рівноваги. Виміряти силу струму, напругу і видовження проводу <InlineMath math="\Delta l" />.<br />

        2. Виміряти температуру повітря <InlineMath math="t_1" /> в лабораторії.<br />

        3. По формулі (6) обчислити опір проводу <InlineMath math="R_1" /> при температурі <InlineMath math="t_1" />.<br />

        4. Для значень <InlineMath math="I" /> та <InlineMath math="U" /> визначити опір проводу <InlineMath math="R_2" /> при температурі <InlineMath math="t_2" />, використовуючи закон Ома (7).<br />

        5. Використовуючи співвідношення (5), обчислити різницю температур <InlineMath math="t_2 - t_1" />. Знайти температуру нагрітого дроту <InlineMath math="t_2" />.<br />

        6. За формулою визначити коефіцієнт лінійного розширення <InlineMath math="\alpha" /> для ніхромового дроту:
        <BlockMath math="\alpha = \frac{\Delta l}{l_1 (t_2 - t_1)}" />

        7. Порівняти кінцевий результат <InlineMath math="\alpha" /> з табличним значенням.<br />

        8. Оформити звіт, обчислення занести у таблицю.
      </p>
    </div>
  );
};

export default DensityMeta;