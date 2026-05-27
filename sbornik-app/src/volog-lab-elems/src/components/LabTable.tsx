import React, { useState } from "react";
import styles from "./LabContainer.module.scss";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { validateVolog } from "../../../utils/experimentValidator";

interface Measure {
  t1: string; t2: string; t_diff: string; E_prime: string; H: string;
  E: string; e: string; e_avg: string; delta_e: string; delta_e_avg: string;
  r: string; r_avg: string; delta_r: string; delta_r_avg: string;
}

interface DetailedResult { [key: string]: boolean | undefined; }

const LabTable: React.FC = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [validResults, setValidResults] = useState<DetailedResult[]>([]);

  const createEmptyRow = (): Measure => ({
    t1: "", t2: "", t_diff: "", E_prime: "", H: "101325",
    E: "", e: "", e_avg: "", delta_e: "", delta_e_avg: "",
    r: "", r_avg: "", delta_r: "", delta_r_avg: ""
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    // Отправляем массив напрямую, никаких ошибок типов больше нет
    const results = validateVolog(measures);
    setValidResults(results);
  };

  return (
    <div className={styles.wrapper} style={{ marginBottom: "30px" }}>
      <section className={styles.inputCard}>
        <h2>Результати вимірювань та розрахунків</h2>
        {errors.length > 0 && <div className={styles.errorBox}>{errors[0]}</div>}
        <form onSubmit={handleSubmit}>
          <div style={{ overflowX: "auto" }}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th rowSpan={2}>№</th>
                  <th><InlineMath math="t_1, ^\circ C" /></th>
                  <th><InlineMath math="t_2, ^\circ C" /></th>
                  <th><InlineMath math="t_1-t_2" /></th>
                  <th><InlineMath math="E', Па" /></th>
                  <th><InlineMath math="H, Па" /></th>
                  <th><InlineMath math="E, Па" /></th>
                  <th><InlineMath math="e, Па" /></th>
                  <th><InlineMath math="e_{сер}, Па" /></th>
                  <th><InlineMath math="\Delta e, Па" /></th>
                  <th><InlineMath math="\Delta e_{сер}, Па" /></th>
                  <th><InlineMath math="r, \%" /></th>
                  <th><InlineMath math="r_{сер}, \%" /></th>
                  <th><InlineMath math="\Delta r, \%" /></th>
                  <th><InlineMath math="\Delta r_{сер}, \%" /></th>
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