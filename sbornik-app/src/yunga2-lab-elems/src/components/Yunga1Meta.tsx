import styles from "./LabContainer.module.scss";
import { BlockMath, InlineMath } from "react-katex";

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
    </div>
  );
};

export default Yunga1Meta;
