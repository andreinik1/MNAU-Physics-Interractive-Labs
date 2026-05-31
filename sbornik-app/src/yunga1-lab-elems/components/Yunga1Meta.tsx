import { BlockMath, InlineMath } from "react-katex";
import styles from "./LabContainer.module.scss";
import lab2Pdf from "../physics/lab2.pdf"
import lab_s2Pdf from "../physics/lab_s2.pdf"

const Yunga1Meta: React.FC = () => {


  return (
    <div className={styles.inputCard} style={{ marginBottom: "30px" }}>
      <h2 style={{ marginBottom: "6px" }}>Мета лабораторної роботи: </h2>
      <p style={{ margin: "0 0 16px 28px" }}>Визначити модуль пружності (модуль Юнга) для сталі при згині стержня.
      </p>
      <h2 style={{ marginBottom: "6px" }}>Прилади та обладнання: </h2>
      <p style={{ margin: "0 0 16px 28px" }}>1.	Прилад для визначення модуля пружності<br />
        2.	Індикатор<br />
        3.  Мікрометр<br />
        4.  Масштабна лінійка
      </p>
      <h2 style={{ marginBottom: "6px" }}>Хід роботи: </h2>
      <p style={{ margin: "0 0 0 28px" }}>1. За допомогою масштабнох лінійки вимірюють <InlineMath math="L" /> між ребрами опорних приз <InlineMath math="0" /> та <InlineMath math="0_{1}" />.<br />
        2.  За допомогою мікрометра вимірюють ширину <InlineMath math="b" /> та висоту <InlineMath math="h" /> стержня.<br />
        3.  Кладуть досліджуваний стержень на опорні призми так, щоб він був перпендикулярний їх ребрам. Підвішують скобу посередині між опорними призмами <InlineMath math="0" /> та <InlineMath math="0_{1}" />.<br />
        4.  Переміщуючи муфту <InlineMath math="M" />, встановлюють індикатор так, щоб його штифт уперся в стердень під ребром призми скобки. При цьому стрілка індикатора повернеться на кілька поділок, що засвідчує про відсутність щілини між штифтом індикатора і досліджуваним стержнем. Перед дослідом встановлюють індикатор на 0.<br />
        5.  Покласти на чашку скоби тягарці кожний з яких 5Н і визначити величину деформації <InlineMath math="f_{нав}" /> за допомогою індикатора. Навантаження довести до 25Н, а потім в зворотному порядку проводити розавнтаження, кожен раз знімаючи тягарці і визначаючи величину деформації індикатора <InlineMath math="f_{розв}" />. Визначити середню величину деформації прогину <InlineMath math="f_{сер}" /> при навтаженні і розвантаженні за формулою: <BlockMath math="\Delta f_{\text{сер}} = \frac{\Delta f_{\text{нав}} + \Delta f_{\text{розв}}}{2}" /><br />
        6.  Побудувати графік залежності <InlineMath math="f_{сер}" /> від Ф при навантаженні і розвантаженні (вони практично зливаються в одну пряму лінію, що проходить через початок координат, оскільки при вказаних навантаженнях, деформація згину є пружиною). <br />
        7.  Обчислити значення модуля Юнга за формулою: <BlockMath math="E = \frac{L^3 F}{4 b h^3 f_{\text{сер}}}" />.<br />
        8.  Отриманні данні занести у таблицю.
      </p>
      <div style={{ display: 'flex', gap: '16px', fontFamily: 'system-ui, -apple-system, sans-serif', margin: '20px 0' }}>

        {/* Кнопка: Методичні рекомендації */}
        <a href={lab2Pdf} download="Методичні_рекомендації.pdf" style={{ textDecoration: 'none' }}>
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
        <a href={lab_s2Pdf} download="Оформлення лабораторної.pdf" style={{ textDecoration: 'none' }}>
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

export default Yunga1Meta;
