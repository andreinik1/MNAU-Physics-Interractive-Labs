import React from "react";
import styles from "./LabContainer.module.scss";
import { LaTeXFormula } from "../../components/LaTeXFormula";
import lab10Pdf from "../physics/lab10.pdf";
import lab_s10Pdf from "../physics/lab_s10.pdf";

const RozmelMeta: React.FC = () => {
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
        1. Ввімкнути джерело струму. Зачекати 20 – 30 с. Поки дріт нагрівається до максимальної температури і настане стан теплової рівноваги. Виміряти силу струму, напругу і видовження проводу <LaTeXFormula math="\Delta l" />.<br />

        2. Виміряти температуру повітря <LaTeXFormula math="t_1" /> в лабораторії.<br />

        3. По формулі (6) обчислити опір проводу <LaTeXFormula math="R_1" /> при температурі <LaTeXFormula math="t_1" />.<br />

        4. Для значень <LaTeXFormula math="I" /> та <LaTeXFormula math="U" /> визначити опір проводу <LaTeXFormula math="R_2" /> при температурі <LaTeXFormula math="t_2" />, використовуючи закон Ома (7).<br />

        5. Використовуючи співвідношення (5), обчислити різницю температур <LaTeXFormula math="t_2 - t_1" />. Знайти температуру нагрітого дроту <LaTeXFormula math="t_2" />.<br />

        6. За формулою визначити коефіцієнт лінійного розширення <LaTeXFormula math="\alpha" /> для ніхромового дроту:
        <LaTeXFormula math="\alpha = \frac{\Delta l}{l_1 (t_2 - t_1)}" block={true} />

        7. Порівняти кінцевий результат <LaTeXFormula math="\alpha" /> з табличним значенням.<br />

        8. Оформити звіт, обчислення занести у таблицю.
      </p>
      <div style={{ display: 'flex', gap: '16px', fontFamily: 'system-ui, -apple-system, sans-serif', margin: '20px 0' }}>

        {/* Кнопка: Методичні рекомендації */}
        <a href={lab10Pdf} download="Методичні_рекомендації.pdf" style={{ textDecoration: 'none' }}>
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
        <a href={lab_s10Pdf} download="Оформлення лабораторної.pdf" style={{ textDecoration: 'none' }}>
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

export default RozmelMeta;