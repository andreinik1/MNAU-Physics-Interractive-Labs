import React from "react";
import styles from "./LabContainer.module.scss";

interface Props {
  p1: string | null; setP1: (v: string) => void;
  p2: string | null; setP2: (v: string) => void;
  p3: string | null; setP3: (v: string) => void;
  material: string; setMaterial: (v: string) => void;
  generateBody: () => void;
  putBodyOnTop: () => void;
  submergeBody: () => void;
  resetExperiment: () => void;
  isBodyGenerated: boolean;
  bodyState: 'none' | 'air' | 'water';
}

const DensityControls: React.FC<Props> = ({
  p1, setP1,
  p2, setP2,
  p3, setP3,
  material, setMaterial,
  generateBody,
  putBodyOnTop,
  submergeBody,
  resetExperiment,
  isBodyGenerated,
  bodyState
}) => {
  return (
    <section className={styles.inputCard} style={{ marginBottom: "30px" }}>
      <h2>Керування установкою</h2>

      {/* 1. Генератор тела */}
      <div style={{ marginBottom: "20px", padding: "10px", border: "1px dashed #ccc", borderRadius: "6px" }}>
        <h3>Генератор дослідного тіла</h3>
        <div style={{ display: "flex", gap: "15px", alignItems: "center", marginTop: "10px", flexWrap: "wrap" }}>
          <label>
            Матеріал тіла:
            <select
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              disabled={bodyState !== 'none'}
              style={{ marginLeft: "8px", padding: "4px" }}
            >
              <option value="aluminum">Алюміній (2600 кг/м³)</option>
              <option value="steel">Сталь (7800 кг/м³)</option>
              <option value="rubber">Гума (1350 кг/м³)</option>
            </select>
          </label>
          <button
            type="button"
            onClick={generateBody}
            disabled={isBodyGenerated}
            style={{ padding: "6px 12px", cursor: "pointer", backgroundColor: isBodyGenerated ? "#94a3b8" : "#10b981", color: "white", border: "none", borderRadius: "4px" }}
          >
            {isBodyGenerated ? "Тіло згенеровано" : "Створити випадкове тіло"}
          </button>
          {isBodyGenerated && (
            <button
              type="button"
              onClick={resetExperiment}
              style={{ padding: "6px 12px", cursor: "pointer", backgroundColor: "#ef4444", color: "white", border: "none", borderRadius: "4px" }}
            >
              Скинути
            </button>
          )}
        </div>
      </div>

      {/* 2. Шаги эксперимента */}
      <div style={{ marginBottom: "20px" }}>
        <h3>Етапи експерименту</h3>
        <div style={{ display: "flex", gap: "10px", marginTop: "10px", flexWrap: "wrap" }}>
          <button
            type="button"
            disabled={!isBodyGenerated || bodyState !== 'none'}
            onClick={putBodyOnTop}
            style={{ padding: "8px 14px", cursor: "pointer", borderRadius: "4px", border: "1px solid #3b82f6", backgroundColor: bodyState === 'air' || bodyState === 'water' ? "#3b82f6" : "#fff", color: bodyState === 'air' || bodyState === 'water' ? "#fff" : "#3b82f6" }}
          >
            1. Покласти тіло зверху
          </button>
          <button
            type="button"
            disabled={bodyState !== 'air'}
            onClick={submergeBody}
            style={{ padding: "8px 14px", cursor: "pointer", borderRadius: "4px", border: "1px solid #3b82f6", backgroundColor: bodyState === 'water' ? "#3b82f6" : "#fff", color: bodyState === 'water' ? "#fff" : "#3b82f6" }}
          >
            2. Перевісити тіло під воду
          </button>
        </div>
      </div>

      {/* 3. Изменяемые инпуты грузиков */}
      <div className={styles.formInline}>
        <div>
          <label>P₁ (Важки порожнього), Н: </label>
          <input
            type="number"
            step="0.001"
            min="0"
            value={p1 == null ? "" : p1}
            onChange={(e) => setP1(e.target.value)}
            disabled={bodyState !== 'none'}
          />
        </div>
        <div>
          <label>P₂ (Важки з тілом зверху), Н: </label>
          <input
            type="number"
            step="0.001"
            min="0"
            value={p2 == null ? "" : p2}
            onChange={(e) => setP2(e.target.value)}
            disabled={bodyState !== 'air'} // Доступно только на 2-м этапе, студент уменьшает вес вручную
          />
        </div>
        <div>
          <label>P₃ (Важки з тілом знизу), Н: </label>
          <input
            type="number"
            step="0.001"
            min="0"
            value={p3 == null ? "" : p3}
            onChange={(e) => setP3(e.target.value)}
            disabled={bodyState !== 'water'} // Доступно только на 3-м этапе, студент увеличивает вес вручную
          />
        </div>
      </div>
    </section>
  );
};

export default DensityControls;