import React, { useState } from "react";
import styles from "./LabContainer.module.scss";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { validateDensity } from "../../../utils/experimentValidator";

interface Measure {
  P1: string;    // P1, H
  P2: string;    // P2, H
  P3: string;    // P3, H
  V: string;     // V, м^3
  gamma: string; // γ, Н/м^3
  rho: string;   // ρ, кг/м^3
}

interface DetailedResult {
  [key: string]: boolean | undefined;
}

const LabTable: React.FC = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [measurementsCount, setMeasurementsCount] = useState<string>("3");

  const createEmptyRow = (): Measure => ({
    P1: "",
    P2: "",
    P3: "",
    V: "",
    gamma: "",
    rho: "",
  });

  const [measures, setMeasures] = useState<Measure[]>(
    Array.from({ length: 3 }, createEmptyRow)
  );

  const [validResults, setValidResults] = useState<DetailedResult[]>([]);

  const validateMeasures = (): string[] => {
    const errs: string[] = [];
    measures.forEach((m, i) => {
      const row = i + 1;
      if (m.P1 && Number(m.P1) <= 0) errs.push(`Рядок ${row}: P1 має бути > 0`);
      if (m.P2 && Number(m.P2) <= 0) errs.push(`Рядок ${row}: P2 має бути > 0`);
      if (m.P3 && Number(m.P3) <= 0) errs.push(`Рядок ${row}: P3 має бути > 0`);
      if (m.P1 && m.P2 && Number(m.P1) <= Number(m.P2)) {
        errs.push(`Рядок ${row}: P1 має бути більшим за P2 (вага зменшується, коли поклали тіло)`);
      }
      if (m.P2 && m.P3 && Number(m.P3) <= Number(m.P2)) {
        errs.push(`Рядок ${row}: P3 має бути більшим за P2 (додаємо важки у воді)`);
      }
    });
    return errs;
  };

  const handleChange = (rowIndex: number, field: keyof Measure, value: string) => {
    setMeasures((prev) =>
      prev.map((row, i) => (i === rowIndex ? { ...row, [field]: value } : row))
    );
    if (validResults[rowIndex]) {
      setValidResults((prev) =>
        prev.map((res, i) =>
          i === rowIndex ? { ...res, [field]: undefined } : res
        )
      );
    }
  };

  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10) || 0;
    const newCount = Math.min(15, Math.max(0, val));
    setMeasurementsCount(`${newCount}`);
    setMeasures((prev) => {
      if (prev.length === newCount) return prev;
      if (prev.length < newCount) {
        return [...prev, ...Array.from({ length: newCount - prev.length }, createEmptyRow)];
      }
      return prev.slice(0, newCount);
    });
    setValidResults([]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateMeasures();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors([]);
    const results = validateDensity(measures);
    setValidResults(results);
  };

  const getFieldClassName = (rowIndex: number, fieldName: string) => {
    const rowResult = validResults[rowIndex];
    if (!rowResult || rowResult[fieldName] === undefined) return "";
    return rowResult[fieldName] ? styles.inputCorrect : styles.inputIncorrect;
  };

  return (
    <div className={styles.wrapper} style={{ marginBottom: "30px" }}>
      <section className={styles.inputCard}>
        <h2>Результати вимірювань та розрахунків</h2>

        <div className={styles.formInline}>
          <div className={styles.countContainer}>
            <label>Кількість замірів:</label>
            <input
              type="number"
              min="1"
              max="15"
              value={measurementsCount}
              onChange={handleCountChange}
            />
          </div>
        </div>

        {errors.length > 0 && (
          <div className={styles.errorBox}>
            <ul>{errors.map((err, i) => <li key={i}>{err}</li>)}</ul>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
          <div style={{ overflowX: "auto" }}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>№</th>
                  <th><InlineMath math="P_1, \, \text{Н}" /></th>
                  <th><InlineMath math="P_2, \, \text{Н}" /></th>
                  <th><InlineMath math="P_3, \, \text{Н}" /></th>
                  <th><InlineMath math="V, \, \text{м}^3" /></th>
                  <th><InlineMath math="\gamma, \, \text{Н/м}^3" /></th>
                  <th><InlineMath math="\rho, \, \text{кг/м}^3" /></th>
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
                          step="0.00000001"
                          value={row[key]}
                          onChange={(e) => handleChange(i, key, e.target.value.replaceAll(",", "."))}
                          className={getFieldClassName(i, key)}
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