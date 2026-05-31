import React from "react";
import styles from "./LabContainer.module.scss";
import { LaTeXFormula } from "../../components/LaTeXFormula";
import lab8Pdf from "../physics/lab8.pdf";
import lab_s8Pdf from "../physics/lab_s8.pdf";

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

        5. Вимірювання <LaTeXFormula math="t_2" /> необхідно зробити не менше 3-х разів, і результати занести в таблицю.
        Значення <LaTeXFormula math="E" /> і <LaTeXFormula math="E'" /> беруть із таблиці в кінці роботи. (<LaTeXFormula math="E" /> відповідає температурі <LaTeXFormula math="t_2" />, а <LaTeXFormula math="E'" /> температурі навколишнього повітря <LaTeXFormula math="t_1" />). При користуванні таблицею значення <LaTeXFormula math="E" /> та <LaTeXFormula math="E'" /> перерахувати в системі СІ, тобто в Па.
        Щоб перевести величини <LaTeXFormula math="E'" /> і <LaTeXFormula math="E" /> з мм.рт.ст. у Па необхідно скористатись наступною пропорцією, врахувавши що 1 мм.рт.ст. = 133,3 Па.<br />

        6. Величину <LaTeXFormula math="e" /> визначити за формулою (4). Кінцевий результат для пружності водяних парів записати у вигляді:
        <LaTeXFormula math="e = (e_{\text{сер}} \pm \Delta e_{\text{сер}}) \, \text{Па}" block={true} />

        7. Відносну вологість визначити за формулою (1). Кінцевий результат записати у вигляді:
        <LaTeXFormula math="r = (r_{\text{сер}} \pm \Delta r_{\text{сер}}) \, (\%)" block={true} />
      </p>

      <div style={{ display: 'flex', gap: '16px', fontFamily: 'system-ui, -apple-system, sans-serif', margin: '20px 0' }}>
        <a href={lab8Pdf} download="Методичні_рекомендації.pdf" style={{ textDecoration: 'none' }}>
          <button style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#2563eb', color: '#ffffff', fontSize: '14px', fontWeight: 500, padding: '10px 20px', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
            Методичні рекомендації
          </button>
        </a>
        <a href={lab_s8Pdf} download="Оформлення лабораторної.pdf" style={{ textDecoration: 'none' }}>
          <button style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#ffffff', color: '#1f2937', fontSize: '14px', fontWeight: 500, padding: '10px 20px', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer' }}>
            Оформлення роботи
          </button>
        </a>
      </div>
    </div>
  );
};

export default VologMeta;