import React, { useState } from "react";
import styles from "./LabContainer.module.scss";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { validateAdiab } from "../../../utils/experimentValidator";

interface Measure {
  h1: string; h2: string; gamma: string;
  gamma_avg: string; delta_gamma: string;
  delta_gamme_avg: string;
}

interface DetailedResult { [key: string]: boolean | undefined; }

const LabTable: React.FC = () => {
  const [validResults, setValidResults] = useState<DetailedResult[]>([]);
  const [measures, setMeasures] = useState<Measure[]>(
    Array.from({ length: 3 }, () => ({ h1: "", h2: "", gamma: "", gamma_avg: "", delta_gamma: "", delta_gamme_avg: "" }))
  );

  const handleChange = (rowIndex: number, field: keyof Measure, value: string) => {
    const cleanValue = value.replaceAll(",", ".");
    setMeasures(prev => prev.map((row, i) => i === rowIndex ? { ...row, [field]: cleanValue } : row));
    if (validResults[rowIndex]) {
      setValidResults(prev => prev.map((res, i) => i === rowIndex ? { ...res, [field]: undefined } : res));
    }
  };

  const getFieldClassName = (rowIndex: number, fieldName: string) => {
    const rowResult = validResults[rowIndex];
    if (!rowResult || rowResult[fieldName] === undefined) return "";
    return rowResult[fieldName] ? styles.inputCorrect : styles.inputIncorrect;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Если у тебя есть стейт для ошибок (например, setErrors), раскомментируй:
    // setErrors([]);

    // Вызываем наш валидатор напрямую. Никаких ругательств от TS!
    const results = validateAdiab(measures);
    setValidResults(results);
  };

  return (
    <section className={styles.inputCard} style={{ marginBottom: "30px" }}>
      <h2>Результати вимірювань</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ overflowX: "auto" }}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>№</th>
                <th><InlineMath math="h_1" /></th>
                <th><InlineMath math="h_2" /></th>
                <th><InlineMath math="\gamma" /></th>
                <th><InlineMath math="\gamma_{сер}" /></th>
                <th><InlineMath math="\Delta \gamma" /></th>
                <th><InlineMath math="\Delta \gamma_{сер}" /></th>
              </tr>
            </thead>
            <tbody>
              {measures.map((row, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  {(Object.keys(row) as Array<keyof Measure>).map((key) => (
                    <td key={key}>
                      <input
                        type="number" step="0.001"
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
  );
};

export default LabTable;