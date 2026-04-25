import React, { useState } from "react";
import styles from "./LabContainer.module.scss";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

interface Measure {
  n: string; m0: string; m1: string; M: string; d: string;
  sigma: string; sigma_avg: string; d_sigma: string; d_sigma_avg: string;
}

interface DetailedResult { [key: string]: boolean | undefined; }

const LabTable: React.FC = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [validResults, setValidResults] = useState<DetailedResult[]>([]);

  const createEmptyRow = (): Measure => ({
    n: "50", m0: "", m1: "", M: "", d: "", sigma: "",
    sigma_avg: "", d_sigma: "", d_sigma_avg: ""
  });

  const [measures, setMeasures] = useState<Measure[]>(Array.from({ length: 3 }, createEmptyRow));

  const handleChange = (rowIndex: number, field: keyof Measure, value: string) => {
    setMeasures(prev => prev.map((row, i) => i === rowIndex ? { ...row, [field]: value } : row));
    if (validResults[rowIndex]) {
      setValidResults(prev => prev.map((res, i) => i === rowIndex ? { ...res, [field]: undefined } : res));
    }
  };

  const getFieldClassName = (rowIndex: number, fieldName: string) => {
    const rowResult = validResults[rowIndex];
    if (!rowResult || rowResult[fieldName] === undefined) return "";
    return rowResult[fieldName] ? styles.inputCorrect : styles.inputIncorrect;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8080/poverx-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ experiment: "poverx", measures }),
      });
      const data = await response.json();
      if (data.detailed_results) setValidResults(data.detailed_results);
    } catch {
      setErrors(["Помилка з'єднання з сервером"]);
    }
  };

  return (
    <div className={styles.wrapper} style={{ marginBottom: "30px" }}>
      <section className={styles.inputCard}>
        <h2>Результати вимірювань</h2>
        {errors.length > 0 && <div className={styles.errorBox}>{errors[0]}</div>}
        <form onSubmit={handleSubmit}>
          <div style={{ overflowX: "auto" }}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>№</th>
                  <th><InlineMath math="n, \, \text{шт}" /></th>
                  <th><InlineMath math="M_0, \, \text{кг}" /></th>
                  <th><InlineMath math="M_1, \, \text{кг}" /></th>
                  <th><InlineMath math="M, \, \text{кг}" /></th>
                  <th><InlineMath math="d, \, \text{м}" /></th>
                  <th><InlineMath math="\sigma, \, \text{Н/м}" /></th>
                  <th><InlineMath math="\sigma_{cp}" /></th>
                  <th><InlineMath math="\Delta\sigma" /></th>
                  <th><InlineMath math="\Delta\sigma_{cp}" /></th>
                </tr>
              </thead>
              <tbody>
                {measures.map((row, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    {(Object.keys(row) as Array<keyof Measure>).map(key => (
                      <td key={key}>
                        <input
                          type="number"
                          step="0.000001"
                          value={row[key] || ""}
                          className={getFieldClassName(i, key)}
                          onChange={(e) => handleChange(i, key, e.target.value)}
                          required
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button type="submit" className={styles.downloadBtn} style={{ marginTop: "20px", background: "#3b82f6", color: "#fff" }}>
            Перевірити дані
          </button>
        </form>
      </section>
    </div>
  );
};
export default LabTable;