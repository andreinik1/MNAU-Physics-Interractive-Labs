import React from "react";
import styles from "./LabContainer.module.scss";

interface Props {
  timer: number;
  isDipping: boolean;
  isFanRunning: boolean;
  isWet: boolean;
  onDip: () => void;
  onFan: () => void;
  onReset: () => void;
}

const VologControls: React.FC<Props> = ({ timer, isDipping, isFanRunning, isWet, onDip, onFan, onReset }) => {
  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return (
    <section className={styles.inputCard} style={{ marginBottom: "30px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
        <h2>Керування приладом</h2>
        <div style={{ fontSize: "24px", fontWeight: "bold", fontFamily: "monospace", color: "#2563eb" }}>
          {formatTime(timer)}
        </div>
      </div>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <button
          onClick={onDip}
          disabled={isWet || isDipping}
          style={{ padding: "10px", cursor: "pointer", background: isWet ? "#10b981" : "#2563eb", color: "white", border: "none", borderRadius: "4px" }}
        >
          {isDipping ? "Занурення..." : isWet ? "Змочено" : "1. Змочити"}
        </button>

        <button
          onClick={onFan}
          disabled={!isWet}
          style={{ padding: "10px", cursor: "pointer", background: isFanRunning ? "#ef4444" : "#2563eb", color: "white", border: "none", borderRadius: "4px" }}
        >
          {isFanRunning ? "Зупинити вент." : "2. Завести вент."}
        </button>

        <button
          onClick={onReset}
          style={{ padding: "10px", cursor: "pointer", background: "#64748b", color: "white", border: "none", borderRadius: "4px" }}
        >
          Скинути
        </button>
      </div>
    </section>
  );
};

export default VologControls;