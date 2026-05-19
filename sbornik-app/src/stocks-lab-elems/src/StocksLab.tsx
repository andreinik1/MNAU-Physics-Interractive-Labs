import { useState } from "react";
import { StocksCanvas } from "./components/StocksCanvas";
import StocksControls from "./components/StocksControls";
import LabTable from "./components/LabTable";
import StocksMeta from "./components/StocksMeta";
import styles from "./App.module.scss";

export default function StocksLab() {
  const [l, setL] = useState(0.2);
  const [d, setD] = useState(0.004);
  const [t, setT] = useState(0);

  return (
    <main className={styles.app}>
      <h1 className={styles.title}>Лабораторна робота</h1>
      <h2 className={styles.subtitle}>
        Визначення коефіцієнта в'язкості рідини методом Стокса
      </h2>
      <div style={{ maxWidth: "100%", minWidth: "100%", display: "flex", flexDirection: "column", gap: "2rem" }}>
        <StocksMeta />
        <div>
          <StocksControls l={l} setL={setL} d={d} setD={setD} t={t} setT={setT} />
        </div>
        <LabTable />
        <div className={styles.canvasContainer}>
          <StocksCanvas l={l} d={d} t={t} />
        </div>
      </div>
    </main>
  );
}