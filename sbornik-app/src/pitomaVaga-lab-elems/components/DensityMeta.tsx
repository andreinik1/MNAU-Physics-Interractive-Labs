import React from "react";
import styles from "./LabContainer.module.scss";
import lab4Pdf from "../physics/lab4.pdf";
import lab_s4Pdf from "../physics/lab_s4.pdf";
import { LaTeXFormula } from "../../components/LaTeXFormula";

const DensityMeta: React.FC = () => {
  return (
    <div className={styles.inputCard} style={{ marginBottom: "30px" }}>
      <h2 style={{ marginBottom: "6px" }}>Мета лабораторної роботи:</h2>
      <p style={{ margin: "0 0 16px 28px" }}>
        Ознайомитись із теорією густини та питомої ваги і експериментально
        визначити ці величини для тіла за допомогою ареометра.
      </p>
      <h2 style={{ marginBottom: "6px" }}>Прилади та обладнання:</h2>
      <p style={{ margin: "0 0 16px 28px" }}>
        1. Ареометр з постійним об'ємом<br />
        2. Посудина з водою<br />
        3. Експериментальні тіла<br />
        4. Терези
      </p>
      <h2 style={{ marginBottom: "6px" }}>Хід роботи: </h2>
      <p style={{ margin: "0 0 0 28px" }}>
        Згідно формули (1), для визначення питомої ваги даного тіла потрібно визначити його вагу <LaTeXFormula math="P" /> та об'єм <LaTeXFormula math="V" />.<br />

        а) визначення ваги:<br />
        Зануривши ареометр у воду і звільнивши його від бульбашок, навантажують верхню чашку ареометра різновагами до того часу, доки ареометр не зануриться в воду до риски. Нехай вага необхідних для цього різноваг дорівнює <LaTeXFormula math="P_1" />.<br />
        Потім кладуть на верхню чашку ареометра досліджуване тіло і знімають частину різноваг, намагаючись, щоб ареометр знову занурився до тієї ж риски. Якщо вага різноваг, що залишилися в чашці, дорівнює <LaTeXFormula math="P_2" />, то вага досліджуваного тіла в повітрі знаходиться за формулою:
        <LaTeXFormula math="P = P_1 - P_2" block={true} />

        б) визначення об'єму:<br />
        Після визначення ваги тіла в повітрі досліджуване тіло перекладають з верхньої чашки ареометра на нижню. Якщо воно плаває, то його прив'язують. Для того, щоб утримати ареометр зануреним до риски, на верхню чашку добавляють різноваги. Якщо вага різноваг на верхній чашці буде дорівнювати <LaTeXFormula math="P_3" />, то вага води <LaTeXFormula math="P_{\text{в}}" />, що витіснило досліджуване тіло, дорівнюватиме:
        <LaTeXFormula math="P_{\text{в}} = P_3 - P_2" block={true} />
        Об'єм <LaTeXFormula math="V" /> тіла дорівнює об'єму води, витісненої тілом при його зануренні у воду, а об'єм води <LaTeXFormula math="V_{\text{в}}" /> дорівнює вазі води <LaTeXFormula math="P_{\text{в}}" />, поділеній на питому вагу води <LaTeXFormula math="\gamma_{\text{в}}" /> при температурі досліду (тому що питома вага води залежить від температури):
        <LaTeXFormula math="V = V_{\text{в}} = \frac{P_{\text{в}}}{\gamma_{\text{в}}}" block={true} />
        Підставляючи замість <LaTeXFormula math="P_{\text{в}}" /> його значення, отримаємо:
        <LaTeXFormula math="V = \frac{P_3 - P_2}{\gamma_{\text{в}}}" block={true} />
        Виходячи з отриманих формул, питома вага тіла <LaTeXFormula math="\gamma" /> обчислюється як:
        <LaTeXFormula math="\gamma = \frac{P_1 - P_2}{P_3 - P_2} \cdot \gamma_{\text{в}}" block={true} />

        Великий вплив на результати вимірювання можуть мати капілярні сили, що діють на ареометр. Тому при проведенні вимірювань необхідно слідкувати за тим, щоб поверхня води в посудині та ареометр були весь час чисті. Дослід необхідно зробити не менше чим три рази.<br />
        Величину <LaTeXFormula math="\gamma_{\text{в}}" /> знаходять по таблиці, з урахуванням температури води. Можна вважати, що температура води дорівнює температурі повітря, якщо вода довгий час знаходилась в лабораторії. В цій роботі визначається питома вага тіла, густина якого більше густини води.
      </p>

      {/* Блок кнопок остается без изменений */}
      <div style={{ display: 'flex', gap: '16px', fontFamily: 'system-ui, -apple-system, sans-serif', margin: '20px 0' }}>
        <a href={lab4Pdf} download="Методичні_рекомендації.pdf" style={{ textDecoration: 'none' }}>
          <button style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#2563eb', color: '#ffffff', fontSize: '14px', fontWeight: 500, padding: '10px 20px', border: 'none', borderRadius: '6px', cursor: 'pointer', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', transition: 'background-color 0.2s ease' }}>
            Методичні рекомендації
          </button>
        </a>
        <a href={lab_s4Pdf} download="Оформлення лабораторної.pdf" style={{ textDecoration: 'none' }}>
          <button style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#ffffff', color: '#1f2937', fontSize: '14px', fontWeight: 500, padding: '10px 20px', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', transition: 'all 0.2s ease' }}>
            Оформлення роботи
          </button>
        </a>
      </div>
    </div>
  );
};

export default DensityMeta;