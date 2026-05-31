import React, { useState } from "react";
import styles from "./LabContainer.module.scss";
import "katex/dist/katex.min.css";
import { validateStocks } from "../../utils/experimentValidator";
import { LaTeXFormula } from "../../components/LaTeXFormula";

interface Measure {
  rho1: string; rho2: string; g: string;
  l: string; d: string; t: string;
  eta: string; eta_avg: string;
  d_eta: string; d_eta_avg: string;
}

interface DetailedResult { [key: string]: boolean | undefined; }

const LabTable: React.FC = () => {
  const [measurementsCount, setMeasurementsCount] = useState<string>("3");
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

  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10) || 0;
    const newCount = Math.min(15, Math.max(0, val));
    setMeasurementsCount(`${newCount}`);
    setMeasures(prev => {
      if (prev.length === newCount) return prev;
      if (prev.length < newCount) {
        const added = Array.from({ length: newCount - prev.length }, createEmptyRow);
        return [...prev, ...added];
      }
      return prev.slice(0, newCount);
    });
    setValidResults([]);
  };

  const getFieldClassName = (rowIndex: number, fieldName: string) => {
    const rowResult = validResults[rowIndex];
    if (!rowResult || rowResult[fieldName] === undefined) return "";
    return rowResult[fieldName] ? styles.inputCorrect : styles.inputIncorrect;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Приводим тип "measures" к типу "StocksMeasure[]", используя ключевое слово "as"
    const results = validateStocks(measures as unknown as Record<string, string>[]);

    // Записываем результат проверки в стейт для подсветки
    setValidResults(results);
  };

  return (
    <div className={styles.wrapper}>
      <section className={styles.inputCard}>
        <h2>Результати вимірювань</h2>

        <div className={styles.formInline}>
          <div className={styles.countContainer}>
            <label>Кількість замірів:</label>
            <input type="number" value={measurementsCount} onChange={handleCountChange} />
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ overflowX: "auto" }}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>№</th>
                  <th><LaTeXFormula math="\rho_1" /></th>
                  <th><LaTeXFormula math="\rho_2" /></th>
                  <th><LaTeXFormula math="g" /></th>
                  <th><LaTeXFormula math="l, \, \text{м}" /></th>
                  <th><LaTeXFormula math="d, \, \text{м}" /></th>
                  <th><LaTeXFormula math="t, \, \text{с}" /></th>
                  <th><LaTeXFormula math="\eta" /></th>
                  <th><LaTeXFormula math="\eta_{\text{сер}}" /></th>
                  <th><LaTeXFormula math="\Delta\eta" /></th>
                  <th><LaTeXFormula math="\Delta\eta_{\text{сер}}" /></th>
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