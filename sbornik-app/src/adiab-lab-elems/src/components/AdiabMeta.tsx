import React from "react";
import styles from "./LabContainer.module.scss";
import { BlockMath, InlineMath } from "react-katex";
import lab9Pdf from "../physics/lab9.pdf"
import lab_s9Pdf from "../physics/lab_s9.pdf"

const AdiabMeta: React.FC = () => {
  return (
    <div className={styles.inputCard} style={{ marginBottom: "30px" }}>
      <h2 style={{ marginBottom: "6px" }}>Мета лабораторної роботи:</h2>
      <p style={{ margin: "0 0 16px 28px" }}>
        Визначити відношення молярних теплоємностей повітря методом адіабатичного розширення.
      </p>
      <h2 style={{ marginBottom: "6px" }}>Прилади та обладнання:</h2>
      <p style={{ margin: "0 0 16px 28px" }}>
        Установка для визначення коефіцієнта Пуассону газу методом адібатичного розширення
      </p>
      <h2 style={{ marginBottom: "6px" }}>Хід роботи: </h2>
      <p style={{ margin: "0 0 0 28px" }}>
        1. Для подачі повітря у сифон необхідно включити компресор і через деякий час, приблизно через 20 с, відкрити клапан, натиснувши ручку сифона.<br />

        2. Зафіксувати різницю рівнів рідини в манометрі відпустивши ручку сифона і зняти покази <InlineMath math="h_1" />, яке відповідає цій різниці.<br />

        3. Для сполучення сифона з атмосферою необхідно роз'єднавши трубку яка підведена до компресора, натиснути на ручку сифона на 1-2 секунди і знову відпустити.<br />

        4. Під'єднати трубку до сифона і після встановлення рівня рідини в манометрі, зняти показники <InlineMath math="h_2" />, яке відповідає цій різниці.<br />

        5. Дослід повторити 3 рази. Дані внести до таблиці.<br />

        6. Значення <InlineMath math="\gamma" /> знаходиться за формулою (13) для кожного досліду окремо:
        <BlockMath math="\gamma = \frac{h_1}{h_1 - h_2}" />

        7. Знайти похибку для кожного досліду, кінцевий результат записати у вигляді:
        <BlockMath math="\gamma = \gamma_{\text{сер}} \pm \Delta \gamma_{\text{сер}}" />
      </p>
      <div style={{ display: 'flex', gap: '16px', fontFamily: 'system-ui, -apple-system, sans-serif', margin: '20px 0' }}>

        {/* Кнопка: Методичні рекомендації */}
        <a href={lab9Pdf} download="Методичні_рекомендації.pdf" style={{ textDecoration: 'none' }}>
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
        <a href={lab_s9Pdf} download="Оформлення лабораторної.pdf" style={{ textDecoration: 'none' }}>
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

export default AdiabMeta;