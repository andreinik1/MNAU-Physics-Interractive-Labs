import React from "react";
import styles from "./LabContainer.module.scss";
import lab5Pdf from "../physics/lab5.pdf";
import lab_s5Pdf from "../physics/lab_s5.pdf";
import { LaTeXFormula } from "../../components/LaTeXFormula";

const OberbekMeta: React.FC = () => {
  return (
    <div className={styles.inputCard} style={{ marginBottom: "30px" }}>
      <h2 style={{ marginBottom: "6px" }}>Мета лабораторної роботи:</h2>
      <p style={{ margin: "0 0 16px 28px" }}>
        Визначити відношення молярних теплоємностей повітря методом адіабатичного розширення.
      </p>
      <h2 style={{ marginBottom: "6px" }}>Прилади та обладнання:</h2>
      <p style={{ margin: "0 0 16px 28px" }}>
        1. Маятник Обербека <br />
        2. Масштабна лінійка <br />
        3. Секундомір <br />
        4. Штангенциркуль
      </p>
      <h2 style={{ marginBottom: "6px" }}>Хід роботи: </h2>
      <p style={{ margin: "0 0 0 28px" }}>
        1. Штангенциркулем вимірюють (<LaTeXFormula math="d" /> шківа).<br />

        2. З допомогою масштабної лінійки вимірюють відстань <LaTeXFormula math="h_0" /> між нижньою поверхнею вантажу і підлогою при повністю розкрученій нитці. Потім, обертаючи хрестовину, піднімають вантаж <LaTeXFormula math="P" /> на висоту <LaTeXFormula math="h" /> і знову роблять відлік з допомогою масштабної лінійки з точністю до 1 мм.<br />

        3. Вимірюють час падіння вантажу <LaTeXFormula math="P" /> з висоти <LaTeXFormula math="h" />, вмикаючи секундомір одночасно з початком обертання хрестовини і вимикаючи його при максимальному зниженні вантажу.<br />
        Після вимикання секундоміра слідкують за підйомом вантажу <LaTeXFormula math="P" /> і відмічають з допомогою масштабної лінійки максимальну висоту підйому <LaTeXFormula math="h_0" />. Ці вимірювання роблять 3 рази і записують результати у таблицю.<br />

        4. Оформити звіт, провести обчислення моменту інерції та обчислити абсолютну та відносну похибки, кінцевий результат записати у вигляді:
        <LaTeXFormula math="I = (I_{\text{ср}} \pm \Delta I_{\text{ср}}) \text{ кг/м}^2" block={true} />
      </p>

      {/* Кнопки остались без изменений */}
      <div style={{ display: 'flex', gap: '16px', fontFamily: 'system-ui, -apple-system, sans-serif', margin: '20px 0' }}>
        <a href={lab5Pdf} download="Методичні_рекомендації.pdf" style={{ textDecoration: 'none' }}>
          <button style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#2563eb', color: '#ffffff', fontSize: '14px', fontWeight: 500, padding: '10px 20px', border: 'none', borderRadius: '6px', cursor: 'pointer', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', transition: 'background-color 0.2s ease' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            Методичні рекомендації
          </button>
        </a>
        <a href={lab_s5Pdf} download="Оформлення лабораторної.pdf" style={{ textDecoration: 'none' }}>
          <button style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#ffffff', color: '#1f2937', fontSize: '14px', fontWeight: 500, padding: '10px 20px', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', transition: 'all 0.2s ease' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Оформлення роботи
          </button>
        </a>
      </div>
    </div>
  );
};

export default OberbekMeta;