import React, { useState } from "react";
import styles from "./LabContainer.module.scss";
import { validateLinearExpansion } from "../../utils/experimentValidator";
import { LaTeXFormula } from "../../components/LaTeXFormula";

interface Measure {
  I: string; U: string; l1: string; l2: string; dl: string; R1: string; R2: string; dT: string; alpha: string;
}

interface ValidationResult {
  [key: string]: boolean;
}

const LabTable: React.FC = () => {
  const [measurementsCount, setMeasurementsCount] = useState<string>("3");
  const [validResults, setValidResults] = useState<ValidationResult[]>([]);

  const createRow = (): Measure => ({
    I: "", U: "", l1: "350", l2: "", dl: "", R1: "4.77", R2: "", dT: "", alpha: ""
  });

  const [measures, setMeasures] = useState<Measure[]>(Array.from({ length: 3 }, createRow));

  const handleChange = (rowIndex: number, field: keyof Measure, value: string) => {
    const cleanValue = value.replaceAll(",", ".");
    setMeasures(prev => prev.map((row, i) => i === rowIndex ? { ...row, [field]: cleanValue } : row));
    if (validResults[rowIndex]) {
      setValidResults(prev => prev.map((res, i) => i === rowIndex ? { ...res, [field]: true } : res)); // Сбрасываем подсветку при редактировании
    }
  };

  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10) || 0;
    const newCount = Math.min(15, Math.max(0, val));
    setMeasurementsCount(`${newCount}`);
    setMeasures(prev => {
      if (prev.length === newCount) return prev;
      if (prev.length < newCount) {
        const added = Array.from({ length: newCount - prev.length }, createRow);
        return [...prev, ...added];
      }
      return prev.slice(0, newCount);
    });
    setValidResults([]);
  };

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();

    // Отправляем массив напрямую, никаких ошибок типов больше нет
    const results = validateLinearExpansion(measures);
    setValidResults(results);
  };

  const getFieldClassName = (rowIndex: number, fieldName: string) => {
    const rowResult = validResults[rowIndex];
    if (!rowResult || rowResult[fieldName] === undefined) return "";
    return rowResult[fieldName] ? styles.inputCorrect : styles.inputIncorrect;
  };

  return (
    <section className={styles.inputCard} style={{ marginTop: "30px", marginBottom: "30px" }}>
      <h2>Таблиця вимірювань</h2>

      <div className={styles.formInline}>
        <div className={styles.countContainer}>
          <label>Кількість замірів:</label>
          <input type="number" value={measurementsCount} onChange={handleCountChange} />
        </div>
      </div>

      <form onSubmit={handleCheck}>
        <div style={{ overflowX: "auto", marginTop: "15px" }}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>№</th>
                <th><LaTeXFormula math="I, \, \text{A}" /></th>
                <th><LaTeXFormula math="U, \, \text{B}" /></th>
                <th><LaTeXFormula math="l_1, \, \text{мм}" /></th>
                <th><LaTeXFormula math="l_2, \, \text{мм}" /></th>
                <th><LaTeXFormula math="\Delta l, \, \text{мм}" /></th>
                <th><LaTeXFormula math="R_1, \, \Omega" /></th>
                <th><LaTeXFormula math="R_2, \, \Omega" /></th>
                <th><LaTeXFormula math="\Delta t, \, ^\circ\text{C}" /></th>
                <th><LaTeXFormula math="\alpha, \, \text{град}^{-1}" /></th>
              </tr>
            </thead>
            <tbody>
              {measures.map((row, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  {(Object.keys(row) as Array<keyof Measure>).map(key => (
                    <td key={key}>
                      <input
                        type="number"
                        step="0.000001"
                        value={row[key]}
                        className={getFieldClassName(idx, key)}
                        onChange={(e) => handleChange(idx, key, e.target.value)}
                        required
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button type="submit" className={styles.downloadBtn} style={{ marginTop: "20px", color: "white", backgroundColor: "#3b82f6" }}>
          Перевірити дані
        </button>
      </form>
    </section>
  );
};

export default LabTable;