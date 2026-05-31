import React from "react";
import styles from "./LabContainer.module.scss";
import { LaTeXFormula } from "../../components/LaTeXFormula";
import lab6Pdf from "../physics/lab6.pdf";
import lab_s6Pdf from "../physics/lab_s6.pdf";

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
        1. Виміряти відстань <LaTeXFormula math="l" /> між мітками „m” та „n” циліндричній посудини, що наповнена рідиною (гліцерин, касторове масло).<br />

        2. Мікрометром виміряти діаметр <LaTeXFormula math="d" /> трьох кульок (приблизно однакових).<br />

        3. Кидати кульку в рідину таким чином, щоб вона рухалась вздовж центральної частини циліндра; зафіксувати час падіння кульки <LaTeXFormula math="t" /> між мітками „m” та „n”.<br />

        4. Результати прямих вимірювань <LaTeXFormula math="d" />, <LaTeXFormula math="l" />, <LaTeXFormula math="t" /> та табличні дані <LaTeXFormula math="\rho_1" />, <LaTeXFormula math="\rho_2" />, <LaTeXFormula math="g" /> занести у таблицю.<br />

        5. Обчислити значення <LaTeXFormula math="\eta" /> за формулою (9) для кожного вимірювання:
        <LaTeXFormula math="\eta = \frac{1}{18} \cdot g \cdot \frac{d^2 t}{l} (\rho_1 - \rho_2)" block={true} />
        потім знайти <LaTeXFormula math="\eta_{\text{сер}}" />, <LaTeXFormula math="\Delta \eta" />, <LaTeXFormula math="\Delta \eta_{\text{сер}}" />. Кінцевий результат подати у вигляді:
        <LaTeXFormula math="\eta = (\eta_{\text{сер}} \pm \Delta \eta_{\text{сер}}) \, \text{Па} \cdot \text{с}" block={true} />
      </p>

      {/* Кнопки залишeні без змін */}
      <div style={{ display: 'flex', gap: '16px', fontFamily: 'system-ui, -apple-system, sans-serif', margin: '20px 0' }}>
        <a href={lab6Pdf} download="Методичні_рекомендації.pdf" style={{ textDecoration: 'none' }}>
          <button style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#2563eb', color: '#ffffff', fontSize: '14px', fontWeight: 500, padding: '10px 20px', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
            Методичні рекомендації
          </button>
        </a>
        <a href={lab_s6Pdf} download="Оформлення лабораторної.pdf" style={{ textDecoration: 'none' }}>
          <button style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#ffffff', color: '#1f2937', fontSize: '14px', fontWeight: 500, padding: '10px 20px', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer' }}>
            Оформлення роботи
          </button>
        </a>
      </div>
    </div>
  );
};

export default StocksMeta;