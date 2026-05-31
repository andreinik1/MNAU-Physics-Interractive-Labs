import React from "react";
import styles from "./LabContainer.module.scss";
import { LaTeXFormula } from "../../components/LaTeXFormula";
import lab3Pdf from "../physics/lab3.pdf";
import lab_s3Pdf from "../physics/lab_s3.pdf";

const Yunga1Meta: React.FC = () => {
  return (
    <div className={styles.inputCard} style={{ marginBottom: "30px" }}>
      <h2 style={{ marginBottom: "6px" }}>Мета лабораторної роботи: </h2>
      <p style={{ margin: "0 0 16px 28px" }}>
        Ознайомитись з основними положеннями теорії та експериментально визначити модуль Юнга при розтязі дроту.
      </p>
      <h2 style={{ marginBottom: "6px" }}>Прилади та обладнання: </h2>
      <p style={{ margin: "0 0 16px 28px" }}>
        1. Прилад для визначення модуля пружності<br />
        2. Мікрометр<br />
        3. Масштабна лінійка<br />
        4. Тягарці
      </p>
      <h2 style={{ marginBottom: "6px" }}>Хід роботи: </h2>
      <p style={{ margin: "0 0 0 28px" }}>
        1. Довжину дроту <LaTeXFormula math="L" /> беруть з таблиці, що розміщена поряд з установкою.<br />
        2. Вимірюють 3 рази мікрометром в різних точках діаметр дроту.<br />
        3. Встановлюють індикатор <LaTeXFormula math="H" /> на 0.<br />
        4. Покласти на площадку тягарці, кожний з яких 5Н, і визначити величину деформації <LaTeXFormula math="\Delta l" /> за допомогою індикатора. Навантаження довести до 25Н, а потім в зворотному порядку проводити розвантаження, кожен раз знімаючи тягарці і визначаючи величину деформації індикатора. Визначити середню величину видовження <LaTeXFormula math="\Delta l" /> при навантаженні за формулою:
        <LaTeXFormula math="\Delta l_{\text{сер}} = \frac{\Delta l_{\text{нав}} + \Delta l_{\text{розв}}}{2}" block={true} />
        5. Обчислити значення модуля Юнга за формулою (3), використовуючи середні значення <LaTeXFormula math="\Delta l" />.<br />
        6. Отримані дані занести у таблицю.
      </p>

      <div style={{ display: 'flex', gap: '16px', fontFamily: 'system-ui, -apple-system, sans-serif', margin: '20px 0' }}>
        <a href={lab3Pdf} download="Методичні_рекомендації.pdf" style={{ textDecoration: 'none' }}>
          <button
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#2563eb',
              color: '#ffffff', fontSize: '14px', fontWeight: 500, padding: '10px 20px',
              border: 'none', borderRadius: '6px', cursor: 'pointer', transition: 'background-color 0.2s ease'
            }}
          >
            Методичні рекомендації
          </button>
        </a>
        <a href={lab_s3Pdf} download="Оформлення лабораторної.pdf" style={{ textDecoration: 'none' }}>
          <button
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#ffffff',
              color: '#1f2937', fontSize: '14px', fontWeight: 500, padding: '10px 20px',
              border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer'
            }}
          >
            Оформлення роботи
          </button>
        </a>
      </div>
    </div>
  );
};

export default Yunga1Meta;