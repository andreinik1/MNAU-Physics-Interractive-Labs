import React from "react";
import styles from "./LabContainer.module.scss";
import { LaTeXFormula } from "../../components/LaTeXFormula";
import lab2Pdf from "../physics/lab2.pdf";
import lab_s2Pdf from "../physics/lab_s2.pdf";

const Yunga1Meta: React.FC = () => {
  return (
    <div className={styles.inputCard} style={{ marginBottom: "30px" }}>
      <h2 style={{ marginBottom: "6px" }}>Мета лабораторної роботи: </h2>
      <p style={{ margin: "0 0 16px 28px" }}>
        Визначити модуль пружності (модуль Юнга) для сталі при згині стержня.
      </p>
      <h2 style={{ marginBottom: "6px" }}>Прилади та обладнання: </h2>
      <p style={{ margin: "0 0 16px 28px" }}>
        1. Прилад для визначення модуля пружності<br />
        2. Індикатор<br />
        3. Мікрометр<br />
        4. Масштабна лінійка
      </p>
      <h2 style={{ marginBottom: "6px" }}>Хід роботи: </h2>
      <p style={{ margin: "0 0 0 28px" }}>
        1. За допомогою масштабнох лінійки вимірюють <LaTeXFormula math="L" /> між ребрами опорних приз <LaTeXFormula math="0" /> та <LaTeXFormula math="0_{1}" />.<br />
        2. За допомогою мікрометра вимірюють ширину <LaTeXFormula math="b" /> та висоту <LaTeXFormula math="h" /> стержня.<br />
        3. Кладуть досліджуваний стержень на опорні призми так, щоб він був перпендикулярний їх ребрам. Підвішують скобу посередині між опорними призмами <LaTeXFormula math="0" /> та <LaTeXFormula math="0_{1}" />.<br />
        4. Переміщуючи муфту <LaTeXFormula math="M" />, встановлюють індикатор так, щоб його штифт уперся в стердень під ребром призми скобки. При цьому стрілка індикатора повернеться на кілька поділок, що засвідчує про відсутність щілини між штифтом індикатора і досліджуваним стержнем. Перед дослідом встановлюють індикатор на 0.<br />
        5. Покласти на чашку скоби тягарці кожний з яких 5Н і визначити величину деформації <LaTeXFormula math="f_{\text{нав}}" /> за допомогою індикатора. Навантаження довести до 25Н, а потім в зворотному порядку проводити розвантаження, кожен раз знімаючи тягарці і визначаючи величину деформації індикатора <LaTeXFormula math="f_{\text{розв}}" />. Визначити середню величину деформації прогину <LaTeXFormula math="f_{\text{сер}}" /> при навантаженні і розвантаженні за формулою:
        <LaTeXFormula math="f_{\text{сер}} = \frac{f_{\text{нав}} + f_{\text{розв}}}{2}" block={true} />
        6. Побудувати графік залежності <LaTeXFormula math="f_{\text{сер}}" /> від <LaTeXFormula math="F" /> при навантаженні і розвантаженні (вони практично зливаються в одну пряму лінію, що проходить через початок координат, оскільки при вказаних навантаженнях, деформація згину є пружною). <br />
        7. Обчислити значення модуля Юнга за формулою:
        <LaTeXFormula math="E = \frac{L^3 F}{4 b h^3 f_{\text{сер}}}" block={true} />
        8. Отриманні данні занести у таблицю.
      </p>

      {/* Кнопки та інший код без змін */}
      <div style={{ display: 'flex', gap: '16px', fontFamily: 'system-ui, -apple-system, sans-serif', margin: '20px 0' }}>
        <a href={lab2Pdf} download="Методичні_рекомендації.pdf" style={{ textDecoration: 'none' }}>
          <button style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#2563eb', color: '#ffffff', fontSize: '14px', fontWeight: 500, padding: '10px 20px', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
            Методичні рекомендації
          </button>
        </a>
        <a href={lab_s2Pdf} download="Оформлення лабораторної.pdf" style={{ textDecoration: 'none' }}>
          <button style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#ffffff', color: '#1f2937', fontSize: '14px', fontWeight: 500, padding: '10px 20px', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer' }}>
            Оформлення роботи
          </button>
        </a>
      </div>
    </div>
  );
};

export default Yunga1Meta;