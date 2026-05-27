import styles from "./LabContainer.module.scss";
import { BlockMath, InlineMath } from "react-katex";
import lab3Pdf from "../physics/lab3.pdf"
import lab_s3Pdf from "../physics/lab_s3.pdf"

const Yunga1Meta: React.FC = () => {


  return (
    <div className={styles.inputCard} style={{ marginBottom: "30px" }}>
      <h2 style={{ marginBottom: "6px" }}>Мета лабораторної роботи: </h2>
      <p style={{ margin: "0 0 16px 28px" }}>Ознайомитись з основними положеннями теорії та експериментально визначити модуль Юнга при розтязі дроту.      </p>
      <h2 style={{ marginBottom: "6px" }}>Прилади та обладнання: </h2>
      <p style={{ margin: "0 0 16px 28px" }}>1.	Прилад для визначення модуля пружності<br />
        2.  Мікрометр <br />
        3.  Масштабна лінійка<br />
        4.  Рівноваги
      </p>
      <h2 style={{ marginBottom: "6px" }}>Хід роботи: </h2>
      <p style={{ margin: "0 0 0 28px" }}>1. Довжину дроту <InlineMath math="L" /> беруть з таблиці, що розміщена поряд з установкою.<br />
        2.  Вимірюють 3 рази мікрометром в різних точках діаметрдроту. <br />
        3.  Встановлюють індикатор <InlineMath math="H" />  на 0.<br />
        4.  Покласти на площадку тягарці кожний з яких 5Н і визначити величину деформації <InlineMath math="\Delta l" /> за допомогою індикатора. Навтаження довести до 25Н, а потім в зворотному порядку проводити розавнтаження, кожен раз знміаючи тягарці і визначаючи величину деформації індикатора. Визначити середню величину видовження <InlineMath math="\Delta l" /> при навантаженні за формулую <BlockMath math="\Delta l_{\text{сер}} = \frac{\Delta l_{\text{нав}} + \Delta l_{\text{розв}}}{2}" /> .<br />
        5.  Обчислити значення модуля Юнга за формулою (3), використовуючи середні значення. <InlineMath math="\Delta l" /><br />
        6.  Отримані данні занести у таблицю.
      </p>
      <div style={{ display: 'flex', gap: '16px', fontFamily: 'system-ui, -apple-system, sans-serif', margin: '20px 0' }}>

        {/* Кнопка: Методичні рекомендації */}
        <a href={lab3Pdf} download="Методичні_рекомендації.pdf" style={{ textDecoration: 'none' }}>
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
        <a href={lab_s3Pdf} download="Оформлення лабораторної.pdf" style={{ textDecoration: 'none' }}>
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
