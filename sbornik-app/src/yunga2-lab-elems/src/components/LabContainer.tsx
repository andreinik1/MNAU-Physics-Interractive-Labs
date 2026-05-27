import React, { useState } from "react";
import styles from "./LabContainer.module.scss";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { validateYunga2 } from "../../../utils/experimentValidator"; // Убедись, что путь к файлу правильный


interface Measure {
  F: string; f_nav: string; f_rozv: string; f_avg: string;
  E: string; E_avg: string; delta_E: string; delta_E_avg: string;
  L: string; d: string;
}

interface DetailedResult { [key: string]: boolean | undefined; }

const LabContainer: React.FC = () => {
  const [measurementsCount, setMeasurementsCount] = useState<string>("3");
  const [measures, setMeasures] = useState<Measure[]>(
    Array.from({ length: 3 }, () => ({
      F: "", f_nav: "", f_rozv: "", f_avg: "",
      E: "", E_avg: "", delta_E: "", delta_E_avg: "",
      L: "", d: ""
    }))
  );
  const [validResults, setValidResults] = useState<DetailedResult[]>([]);

  const handleChange = (rowIndex: number, field: keyof Measure, value: string) => {
    setMeasures(prev => prev.map((row, i) => i === rowIndex ? { ...row, [field]: value } : row));
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
        const added = Array.from({ length: newCount - prev.length }, () => ({
          F: "", f_nav: "", f_rozv: "", f_avg: "", E: "", E_avg: "",
          delta_E: "", delta_E_avg: "", L: "", d: ""
        }));
        return [...prev, ...added];
      }
      return prev.slice(0, newCount);
    });
    setValidResults([]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 1. Вызываем JS-валидатор напрямую вместо fetch запроса
    const results = validateYunga2(measures);

    // 2. Записываем готовый результат проверок в стейт
    setValidResults(results);
  };

  const getFieldClass = (idx: number, field: string) => {
    const res = validResults[idx];
    if (!res || res[field] === undefined) return "";
    return res[field] ? styles.inputCorrect : styles.inputIncorrect;
  };

  return (
    <div className={styles.wrapper} style={{ marginBottom: "30px" }}>
      <section className={styles.inputCard}>
        <h2>Лабораторна робота: Визначення модуля Юнга</h2>
        <div className={styles.countContainer}>
          <label>Кількість замірів:</label>
          <input type="number" value={measurementsCount} onChange={handleCountChange} />
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ overflowX: "auto" }}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>№</th>
                  <th><InlineMath math="F, H" /></th>
                  <th><InlineMath math="f_{н}, м" /></th>
                  <th><InlineMath math="f_{р}, м" /></th>
                  <th><InlineMath math="f_{с}, м" /></th>
                  <th><InlineMath math="E" /></th>
                  <th><InlineMath math="E_{с}" /></th>
                  <th><InlineMath math="\Delta E" /></th>
                  <th><InlineMath math="\Delta E_{с}" /></th>
                  <th><InlineMath math="L, м" /></th>
                  <th><InlineMath math="d, м" /></th>
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
                          value={row[key]}
                          className={getFieldClass(i, key)}
                          onChange={e => handleChange(i, key, e.target.value.replace(",", "."))}
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

export default LabContainer;