import React from "react";
import styles from "./LabContainer.module.scss";
import { BlockMath, InlineMath } from "react-katex";

const StocksMeta: React.FC = () => {
  return (
    <div className={styles.inputCard}>
      <h2 style={{ marginBottom: "6px" }}>Мета лабораторної роботи:</h2>
      <p style={{ margin: "0 0 16px 28px" }}>
        1. Визначити механізм виникнення сил внутрішнього тертя.<br />
        2. Визначити коефіцієнт внутрішнього тертя за швидкістю падіння кульки.
      </p>
      <h2 style={{ marginBottom: "6px" }}>Прилади та обладнання:</h2>
      <p style={{ margin: "0 0 16px 28px" }}>
        1. Скляний циліндр заповнений рідиною<br />
        2. Секундомір<br />
        3. Мікрометр<br />
        4. Міліметрова лінійка<br />
        5. Свинцеві кульки
      </p>
      <h2 style={{ marginBottom: "6px" }}>ХІД РОБОТИ: </h2>
      <p style={{ margin: "0 0 0 28px" }}>
        1. Виміряти відстань <InlineMath math="l" /> між мітками „m” та „n” циліндричній посудини, що наповнена рідиною (гліцерин, касторове масло).<br />

        2. Мікрометром виміряти діаметр <InlineMath math="d" /> трьох кульок (приблизно однакових).<br />

        3. Кидати кульку в рідину таким чином, щоб вона рухалась вздовж центральної частини циліндра; зафіксувати час падіння кульки <InlineMath math="t" /> між мітками „m” та „n”.<br />

        4. Результати прямих вимірювань <InlineMath math="d" />, <InlineMath math="l" />, <InlineMath math="t" /> та табличні дані <InlineMath math="\rho_1" />, <InlineMath math="\rho_2" />, <InlineMath math="g" /> занести у таблицю.<br />

        5. Обчислити значення <InlineMath math="\eta" /> за формулою (9) для кожного вимірювання:
        <BlockMath math="\eta = \frac{1}{18} \cdot g \cdot \frac{d^2 t}{l} (\rho_1 - \rho_2)" />
        потім знайти <InlineMath math="\eta_{\text{сер}}" />, <InlineMath math="\Delta \eta" />, <InlineMath math="\Delta \eta_{\text{сер}}" />. Кінцевий результат подати у вигляді:
        <BlockMath math="\eta = (\eta_{\text{сер}} \pm \Delta \eta_{\text{сер}}) \text{ [Па} \cdot \text{с]}" />
      </p>
    </div>
  );
};

export default StocksMeta;