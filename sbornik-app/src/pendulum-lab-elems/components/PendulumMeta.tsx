import React from "react";
import styles from "./LabContainer.module.scss";
import lab1Pdf from "../physics/lab1.pdf";
import lab_s1Pdf from "../physics/lab_s1.pdf";
import { LaTeXFormula } from "../../components/LaTeXFormula";

const PendulumMeta: React.FC = () => {
  return (
    <div className={styles.inputCard} style={{ marginBottom: "30px" }}>
      <h2 style={{ marginBottom: "6px" }}>Мета лабораторної роботи: </h2>
      <p style={{ margin: "0 0 16px 28px" }}>
        1. Виміряти прискорення вільного падіння по періоду коливання математичного маятника.<br />
        2. Визначити закони гармонічного коливального руху.
      </p>

      <h2 style={{ marginBottom: "6px" }}>Прилади та обладнання: </h2>
      <p style={{ margin: "0 0 16px 28px" }}>
        1. Важка кулька, яка підвішена на легкій нитці, що не розтягується<br />
        2. Секундомір
      </p>

      <h2 style={{ marginBottom: "6px" }}>Хід роботи: </h2>
      <p style={{ margin: "0 0 0 28px" }}>
        1. Штангенциркулем вимірюють діаметр <LaTeXFormula math="D" /> кульки та довжину маятника. Довжина маятника знаходиться за формулою:
        <LaTeXFormula math="l = l_0 + l_1 + \frac{D}{2}" block={true} />
        де <LaTeXFormula math="l_0" /> – відстань від точки кріплення на стінці до місця кріплення нитки на кульці; <br />
        <LaTeXFormula math="l_1" /> – відстань від місця кріплення нитки на кульці до поверхні кульки.<br />
        Вимірювання <LaTeXFormula math="l" /> та <LaTeXFormula math="D" /> необхідно робити не менше ніж три рази і взяти середні значення.<br />

        2. Для зменшення похибки при вимірюванні періода коливання маятника секундоміром вимірюють час, під час якого маятник робить (20,30,40,50) повних коливань, які робить маятник.<br />
        Після кількох повних коливань, коли кулька досягне крайнього правого положення, пускають секундомір і одночасно вимовляють голосно слово "нуль". Коли кулька знову повернеться в крайнє праве положення рахують "раз" і т.д. доки маятник не зробить потрібну (задану) кількість повних коливань, секундомір зупиняють.<br />
        Відрахунок по секундоміру, поділений на число коливань дозволяє отримати величину періода коливання маятника з точністю в сто разів більшою ніж точність його безпосереднього вимірювання.<br />
        Визначення тривалості кількості коливань маятника необхідно виконати що найменше три рази.<br />

        3. Дані усіх вимірювань записують у таблицю.<br />

        4. <LaTeXFormula math="T" /> – період коливань маятника знаходиться за формулою:
        <LaTeXFormula math="T = \frac{t}{N}" block={true} />
        де <LaTeXFormula math="t" /> – час за який відбувається <LaTeXFormula math="N" /> – повних коливань.<br />

        5. Прискорення вільного падіння знаходиться із формули періоду математичного маятника:
        <LaTeXFormula math="g = \frac{4\pi^2}{T^2} \cdot l" block={true} />
      </p>

      {/* Кнопки остались без изменений */}
      <div style={{ display: 'flex', gap: '16px', fontFamily: 'system-ui, -apple-system, sans-serif', margin: '20px 0' }}>
        <a href={lab1Pdf} download="Методичні_рекомендації.pdf" style={{ textDecoration: 'none' }}>
          <button style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#2563eb', color: '#ffffff', fontSize: '14px', fontWeight: 500, padding: '10px 20px', border: 'none', borderRadius: '6px', cursor: 'pointer', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', transition: 'background-color 0.2s ease' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            Metодичні рекомендації
          </button>
        </a>

        <a href={lab_s1Pdf} download="Оформлення лабораторної.pdf" style={{ textDecoration: 'none' }}>
          <button style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#ffffff', color: '#1f2937', fontSize: '14px', fontWeight: 500, padding: '10px 20px', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', transition: 'all 0.2s ease' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Оформлення роботи
          </button>
        </a>
      </div>
    </div>
  );
};

export default PendulumMeta;