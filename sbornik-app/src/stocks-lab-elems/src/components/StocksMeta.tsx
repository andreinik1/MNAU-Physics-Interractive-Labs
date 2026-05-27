import React from "react";
import styles from "./LabContainer.module.scss";
import { BlockMath, InlineMath } from "react-katex";
import lab6Pdf from "../physics/lab6.pdf"
import lab_s6Pdf from "../physics/lab_s6.pdf"

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
      <div style={{ display: 'flex', gap: '16px', fontFamily: 'system-ui, -apple-system, sans-serif', margin: '20px 0' }}>

        {/* Кнопка: Методичні рекомендації */}
        <a href={lab6Pdf} download="Методичні_рекомендації.pdf" style={{ textDecoration: 'none' }}>
          <button
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#2563eb',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: 500,
              padding: '10px 20px',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            Методичні рекомендації
          </button>
        </a>

        {/* Кнопка: Оформлення */}
        <a href={lab_s6Pdf} download="Оформлення лабораторної.pdf" style={{ textDecoration: 'none' }}>
          <button
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#ffffff',
              color: '#1f2937',
              fontSize: '14px',
              fontWeight: 500,
              padding: '10px 20px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f9fafb';
              e.currentTarget.style.borderColor = '#9ca3af';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.borderColor = '#d1d5db';
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Оформлення роботи
          </button>
        </a>

      </div>
    </div>
  );
};

export default StocksMeta;