import React, { useState } from "react";
import styles from "./LabContainer.module.scss";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { validateOberbek } from "../../../utils/experimentValidator";

interface Measure {
  g: string; m: string; "4m_1": string; h: string; t: string; d: string; r: string; // Прямі
  a: string; epsilon: string; I0: string; I: string; I_cep: string; delta_I: string; delta_I_cep: string; // Непрямі
}

interface DetailedResult { [key: string]: boolean | undefined; }

const LabTable: React.FC = () => {
  const [validResults, setValidResults] = useState<DetailedResult[]>([]);
  const [measures, setMeasures] = useState<Measure[]>(
    Array.from({ length: 3 }, () => ({
      g: "9.81", m: "", "4m_1": "", h: "", t: "", d: "", r: "",
      a: "", epsilon: "", I0: "", I: "", I_cep: "", delta_I: "", delta_I_cep: ""
    }))
  );

  const handleChange = (rowIndex: number, field: keyof Measure, value: string) => {
    const cleanValue = value.replaceAll(",", ".");
    setMeasures(prev => prev.map((row, i) => i === rowIndex ? { ...row, [field]: cleanValue } : row));
  };

  const getFieldClassName = (rowIndex: number, fieldName: string) => {
    const rowResult = validResults[rowIndex];
    if (!rowResult || rowResult[fieldName] === undefined) return "";
    return rowResult[fieldName] ? styles.inputCorrect : styles.inputIncorrect;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Прямой синхронный вызов валидатора Обербека без сетевых запросов
    const results = validateOberbek(measures);

    // Записываем массив с булевыми флагами проверки полей в стейт результатов
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
                <th rowSpan={2}>№</th>
                <th colSpan={7}>Результати прямих вимірювань</th>
                <th colSpan={7}>Результати непрямих вимірювань</th>
              </tr>
              <tr>
                <th><InlineMath math="g" /></th>
                <th><InlineMath math="m" /></th>
                <th><InlineMath math="4m_1" /></th>
                <th><InlineMath math="h" /></th>
                <th><InlineMath math="t" /></th>
                <th><InlineMath math="d" /></th>
                <th><InlineMath math="r" /></th>
                <th><InlineMath math="a" /></th>
                <th><InlineMath math="\varepsilon" /></th>
                <th><InlineMath math="I_0" /></th>
                <th><InlineMath math="I" /></th>
                <th><InlineMath math="I_{сер}" /></th>
                <th><InlineMath math="\Delta I" /></th>
                <th><InlineMath math="\Delta I_{сер}" /></th>
              </tr>
            </thead>
            <tbody>
              {measures.map((row, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  {(Object.keys(row) as Array<keyof Measure>).map((key) => (
                    <td key={key}>
                      <input
                        type="text"
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