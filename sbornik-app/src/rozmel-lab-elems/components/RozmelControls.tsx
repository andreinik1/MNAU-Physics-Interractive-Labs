import React from "react";

interface Props {
  u: number;
  setU: (v: number) => void;
  t1: number;
  setT1: (v: number) => void;
  t2: number;
  dl: number;
  isOn: boolean;
}

const RozmelControls: React.FC<Props> = ({ u, setU, t1, setT1, t2, dl, isOn }) => {
  return (
    <div>
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>
          Кімнатна температура (t₁): <strong>{t1} °C</strong>
        </label>
        <input 
          type="range" min="10" max="35" 
          value={t1} onChange={(e) => setT1(+e.target.value)} 
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>
          Напруга (U): <strong>{u.toFixed(1)} В</strong>
        </label>
        <input 
          type="range" min="0" max="12" step="0.1" 
          value={u} onChange={(e) => setU(+e.target.value)} 
          disabled={!isOn}
        />
      </div>

      <div style={{ padding: "10px", background: "#f8fafc", borderRadius: "6px" }}>
        <p>Температура дроту (t₂): <strong>{t2.toFixed(1)}°C</strong></p>
        <p>Видовження (Δl): <strong style={{ color: "#dc2626" }}>{dl.toFixed(4)} мм</strong></p>
      </div>
    </div>
  );
};

export default RozmelControls;