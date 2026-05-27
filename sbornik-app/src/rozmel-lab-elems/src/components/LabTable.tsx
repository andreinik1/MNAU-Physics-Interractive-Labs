import React, { useState } from "react";
import styles from "./LabContainer.module.scss";
import { InlineMath } from "react-katex";
import { validateLinearExpansion } from "../../../utils/experimentValidator";

interface Measure {
  I: string; U: string; l1: string; l2: string; dl: string; R1: string; R2: string; dT: string; alpha: string;
}

interface ValidationResult {
  [key: string]: boolean;
}

const LabTable: React.FC = () => {
  const [measurementsCount, setMeasurementsCount] = useState("3");
  const [validResults, setValidResults] = useState<ValidationResult[]>([]);
  const createRow = (): Measure => ({ I: "", U: "", l1: "350", l2: "", dl: "", R1: "4.77", R2: "", dT: "", alpha: "" });
  const [measures, setMeasures] = useState<Measure[]>(Array.from({ length: 3 }, createRow));

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();

    // Отправляем массив напрямую, никаких ошибок типов больше нет
    const results = validateLinearExpansion(measures);
    setValidResults(results);
  };

  return (
    <section className={styles.inputCard} style={{ marginTop: "30px", marginBottom: "30px" }}>
      <h2>Таблиця вимірювань</h2>
      <input
        type="number" value={measurementsCount}
        onChange={(e) => {
          setMeasurementsCount(e.target.value);
          setMeasures(Array.from({ length: Number(e.target.value) || 1 }, createRow));
        }}
      />

      <div style={{ overflowX: "auto", marginTop: "15px" }}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>№</th>
              <th><InlineMath math="I, A" /></th>
              <th><InlineMath math="U, B" /></th>
              <th><InlineMath math="l_1, mm" /></th>
              <th><InlineMath math="l_2, mm" /></th>
              <th><InlineMath math="\Delta l, mm" /></th>
              <th><InlineMath math="R_1, \Omega" /></th>
              <th><InlineMath math="R_2, \Omega" /></th>
              <th><InlineMath math="\Delta t, ^\circ C" /></th>
              <th><InlineMath math="\alpha, grad^{-1}" /></th>
            </tr>
          </thead>
          <tbody>
            {measures.map((row, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                {Object.keys(row).map(key => (
                  <td key={key}>
                    <input
                      type="number"
                      value={row[key as keyof Measure]}
                      className={validResults[idx]?.[key] === false ? styles.inputIncorrect : ""}
                      onChange={(e) => {
                        const newM = [...measures];
                        newM[idx][key as keyof Measure] = e.target.value;
                        setMeasures(newM);
                      }}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={handleCheck} className={styles.downloadBtn} style={{ marginTop: "20px", color: "white", backgroundColor: "#3b82f6" }}>
        Перевірити дані
      </button>
    </section>
  );
};

export default LabTable;