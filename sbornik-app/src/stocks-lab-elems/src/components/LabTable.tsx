import React, { useState } from "react";
import styles from "./LabContainer.module.scss";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

interface Measure {
  rho1: string; rho2: string; g: string;
  l: string; d: string; t: string;
  eta: string; eta_avg: string;
  d_eta: string; d_eta_avg: string;
}

interface DetailedResult { [key: string]: boolean | undefined; }

const LabTable: React.FC = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [validResults, setValidResults] = useState<DetailedResult[]>([]);

  const createEmptyRow = (): Measure => ({
    rho1: "7800", rho2: "1260", g: "9.81",
    l: "", d: "", t: "",
    eta: "", eta_avg: "", d_eta: "", d_eta_avg: ""
  });

  const [measures, setMeasures] = useState<Measure[]>(Array.from({ length: 3 }, createEmptyRow));

  const handleChange = (rowIndex: number, field: keyof Measure, value: string) => {
    setMeasures((prev) => prev.map((row, i) => (i === rowIndex ? { ...row, [field]: value } : row)));
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
      const response = await fetch("http://127.0.0.1:8080/stocks-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ experiment: "stocks", measures }),
      });
      const data = await response.json();
      if (data.detailed_results) setValidResults(data.detailed_results);
    } catch {
      setErrors(["Не вдалося з'єднатися з сервером"]);
    }
  };

  return (
    <div className={styles.wrapper}>
      <section className={styles.inputCard}>
        <h2>Результати вимірювань</h2>
        {errors.length > 0 && <div className={styles.errorBox}>{errors[0]}</div>}
        <form onSubmit={handleSubmit}>
          <div style={{ overflowX: "auto" }}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>№</th>
                  <th><InlineMath math="\rho_1" /></th>
                  <th><InlineMath math="\rho_2" /></th>
                  <th><InlineMath math="g" /></th>
                  <th><InlineMath math="l, \text{м}" /></th>
                  <th><InlineMath math="d, \text{м}" /></th>
                  <th><InlineMath math="t, \text{с}" /></th>
                  <th><InlineMath math="\eta" /></th>
                  <th><InlineMath math="\eta_{cep}" /></th>
                  <th><InlineMath math="\Delta\eta" /></th>
                  <th><InlineMath math="\Delta\eta_{cep}" /></th>
                </tr>
              </thead>
              <tbody>
                {measures.map((row, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    {(Object.keys(row) as Array<keyof Measure>).map((key) => (
                      <td key={key}>
                        <input
                          type="number"
                          step="0.000001"
                          value={row[key]}
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
          <button type="submit" className={styles.downloadBtn} style={{ marginTop: "20px", color: "white", backgroundColor: "#3b82f6" }}>
            Перевірити дані
          </button>
        </form>
      </section>
    </div>
  );
};

export default LabTable;