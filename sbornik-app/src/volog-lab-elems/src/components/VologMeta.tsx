import React from "react";
import styles from "./LabContainer.module.scss";
import { BlockMath, InlineMath } from "react-katex";
import lab8Pdf from "../physics/lab8.pdf"
import lab_s8Pdf from "../physics/lab_s8.pdf"

const VologMeta: React.FC = () => {
  return (
    <div className={styles.inputCard} style={{ marginBottom: "30px" }}>
      <h2 style={{ marginBottom: "6px" }}>Мета лабораторної роботи:</h2>
      <p style={{ margin: "0 0 16px 28px" }}>
        Визначити абсолютну і відносну вологість повітря психрометром Августа.
      </p>
      <h2 style={{ marginBottom: "6px" }}>Прилади та обладнання:</h2>
      <p style={{ margin: "0 0 16px 28px" }}>
        1. Психрометр Августа<br />
        2. Колба з дистильованою водою<br />
        3. Таблиця тиску насиченої водяної пари при різних температурах
      </p>
      <h2 style={{ marginBottom: "6px" }}>3. ХІД РОБОТИ </h2>
      <p style={{ margin: "0 0 0 28px" }}>
        1. Змочити тканину на резервуарі 2, для цього правий термометр занурити в колбочку з водою на 20 с.<br />
        
        2. Обережно, щоб не зірвати пружину, завести вентилятор.<br />
        
        3. На четвертій хвилині, після пуску вентилятора, зафіксувати температуру на правому термометрі.<br />
        
        4. Пружині вентилятора дати повністю розкрутитися, після чого дослід повторити.<br />
        
        5. Вимірювання <InlineMath math="t_2" /> необхідно зробити не менше 3-х разів, і результати занести в таблицю.<br />
        Значення <InlineMath math="E" /> і <InlineMath math="E'" /> беруть із таблиці в кінці роботи. (<InlineMath math="E" /> відповідає температурі <InlineMath math="t_2" />, а <InlineMath math="E'" /> температурі навколишнього повітря <InlineMath math="t_1" />). При користуванні таблицею значення <InlineMath math="E" /> та <InlineMath math="E'" /> перерахувати в системі СІ, тобто в Па.<br />
        Щоб перевести величини <InlineMath math="E'" /> і <InlineMath math="E" /> з мм.рт.ст. у Па необхідно скористатись наступною пропорцією, врахувавши що 1 мм.рт.ст. = 133,3 Па.<br />
        
        6. Величину <InlineMath math="e" /> визначити за формулою (4). Кінцевий результат для пружності водяних парів записати у вигляді:
        <BlockMath math="e = (e_{\text{сер}} \pm \Delta e_{\text{сер}}) \text{ Па}" />
        
        7. Відносну вологість визначити за формулою (1). Кінцевий результат записати у вигляді:
        <BlockMath math="r = (r_{\text{сер}} \pm \Delta r_{\text{сер}}) \, (\%)" />
      </p>
            <div style={{ display: 'flex', gap: '16px', fontFamily: 'system-ui, -apple-system, sans-serif', margin: '20px 0' }}>

        {/* Кнопка: Методичні рекомендації */}
        <a href={lab8Pdf} download="Методичні_рекомендації.pdf" style={{ textDecoration: 'none' }}>
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
        <a href={lab_s8Pdf} download="Оформлення лабораторної.pdf" style={{ textDecoration: 'none' }}>
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

export default VologMeta;