import { useState } from "react";
import { DensityCanvas } from "./components/DensityCanvas";
import DensityControls from "./components/DensityControls";
import DensityMeta from "./components/DensityMeta";
import LabTable from "./components/LabTable";
import styles from "./App.module.scss";

const DENSITIES: Record<string, number> = {
  aluminum: 2600,
  steel: 7800,
  rubber: 1350,
};

const G = 9.81;
const RHO_WATER = 1000;

interface GeneratedBody {
  material: string;
  density: number;
  massGrams: number;
  weightNewtons: number;
  archimedesForce: number;
}

export default function DensityLab() {
  const [p1, setP1] = useState<string | null>("0");
  const [p2, setP2] = useState<string | null>(null);
  const [p3, setP3] = useState<string | null>(null);

  const [material, setMaterial] = useState<string>("aluminum");
  const [body, setBody] = useState<GeneratedBody | null>(null);
  const [bodyState, setBodyState] = useState<'none' | 'air' | 'water'>('none');

  const handleGenerateBody = () => {
    const density = DENSITIES[material];
    // Генерация случайного тела от 10 до 24 грамм
    const massGrams = Math.random() * (24 - 10) + 10;
    const massKg = massGrams / 1000;
    const volume = massKg / density;
    const weightNewtons = massKg * G;
    const archimedesForce = RHO_WATER * G * volume;

    setBody({
      material,
      density,
      massGrams,
      weightNewtons,
      archimedesForce
    });
    setBodyState('none');
    setP2(null);
    setP3(null);
  };

  // Шаг 1: Положить тело наверх. P2 инста копирует значение P1, ареометр тонет
  const handlePutBodyOnTop = () => {
    if (!body) return;

    setBodyState('air');
    // Изначально P2 равен P1, из-за веса тела ареометр резко погрузится под воду
    setP2(p1);
    setP3(null);
  };

  // Шаг 2: Перевесить под воду. P3 инста копирует текущее значение P2, ареометр всплывает от Архимеда
  const handleSubmergeBody = () => {
    if (!body || !p2) return;

    setBodyState('water');
    // Изначально P3 равен P2, из-за Архимеда ареометр всплывет вверх
    setP3(p2);
  };

  const handleResetExperiment = () => {
    setBody(null);
    setBodyState('none');
    setP1("0");
    setP2(null);
    setP3(null);
  };

  return (
    <main className={styles.app}>
      <h1 className={styles.title}>Лабораторна робота</h1>
      <h2 className={styles.subtitle}>Визначення питомої ваги та густини тіла</h2>
      <div className={styles.mainGrid} style={{ minWidth: "100%", maxWidth: "100%" }}>
        <div>
          <DensityMeta />
          <DensityControls
            p1={p1} setP1={setP1}
            p2={p2} setP2={setP2}
            p3={p3} setP3={setP3}
            material={material} setMaterial={setMaterial}
            generateBody={handleGenerateBody}
            putBodyOnTop={handlePutBodyOnTop}
            submergeBody={handleSubmergeBody}
            resetExperiment={handleResetExperiment}
            isBodyGenerated={body !== null}
            bodyState={bodyState}
          />
        </div>
        <LabTable />
        <div className={styles.canvasContainer}>
          <DensityCanvas
            p1={p1 ? +p1 : 0}
            p2={p2 ? +p2 : 0}
            p3={p3 ? +p3 : 0}
            bodyState={bodyState}
            bodyWeightNewtons={body ? body.weightNewtons : 0}
            bodyArchimedes={body ? body.archimedesForce : 0}
          />
        </div>
      </div>
    </main>
  );
}