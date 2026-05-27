// Вспомогательная функция для проверки близости чисел (аналог math.isclose из Python)
function isClose(a: number, b: number, relTol: number = 0.001): boolean {
  if (isNaN(a) || isNaN(b)) return false;
  return Math.abs(a - b) <= relTol * Math.max(Math.abs(a), Math.abs(b));
}

// Помощник для безопасного парсинга строк с запятыми в нормальные числа
const pF = (val: string | number): number => {
  if (typeof val === "number") return val;
  return parseFloat(val?.replace(",", ".")) || 0;
};

// ==========================================
// 1. ЛАБОРАТОРНАЯ: Маятник (/pendulum-check)
// ==========================================
export interface PendulumMeasure {
  L: string; N: string; t: string; T: string; g: string;
  g_avg: string; delta_g: string; delta_g_avg: string;
}

export function validatePendulum(measures: PendulumMeasure[]) {
  const detailedResults: Record<string, boolean>[] = [];
  let gSum = 0;
  const msvG: number[] = [];

  // Первый проход: проверка Т и g для каждой строки
  for (const m of measures) {
    const check: Record<string, boolean> = { T: true, g: true };
    const L = pF(m.L), N = pF(m.N), t = pF(m.t);
    const TUser = pF(m.T), gUser = pF(m.g);

    const tCalc = t / N;
    if (!isClose(TUser, tCalc, 0.001)) check.T = false;

    const gCalc = (4 * Math.PI ** 2 * L) / TUser ** 2;
    if (!isClose(gUser, gCalc, 0.001)) check.g = false;

    gSum += gCalc;
    msvG.push(gCalc);
    detailedResults.push(check);
  }

  const gAvg = gSum / (msvG.length || 1);
  const msvDeltaG = msvG.map(g => Math.abs(gAvg - g));
  const deltaGAvg = msvDeltaG.reduce((a, b) => a + b, 0) / (msvDeltaG.length || 1);

  // Второй проход: проверка средних значений и погрешностей
  for (let i = 0; i < measures.length; i++) {
    const m = measures[i];
    const check: Record<string, boolean> = { g_avg: true, delta_g: true, delta_g_avg: true };

    if (!isClose(pF(m.g_avg), gAvg, 0.001)) check.g_avg = false;
    if (!isClose(pF(m.delta_g), msvDeltaG[i], 0.1)) check.delta_g = false;
    if (!isClose(pF(m.delta_g_avg), deltaGAvg, 0.01)) check.delta_g_avg = false;

    // Склеиваем результаты первой проверки и второй для текущей строки
    detailedResults[i] = { ...detailedResults[i], ...check };
  }

  return detailedResults;
}

// ==========================================
// 2. ЛАБОРАТОРНАЯ: Модуль Юнга 1 (/yunga1-check)
// ==========================================
export interface Yunga1Measure {
  f_nav: string; f_rozv: string; F: string; L: string; b: string; h: string;
  f_avg: string; E: string; E_avg: string; delta_E: string; delta_E_avg: string;
}

export function validateYunga1(measures: Yunga1Measure[]) {
  const detailedResults: Record<string, boolean>[] = [];
  let ESum = 0;
  const msvE: number[] = [];

  for (const m of measures) {
    const check: Record<string, boolean> = { f_avg: true, E: true };
    const fNav = pF(m.f_nav), fRozv = pF(m.f_rozv), F = pF(m.F);
    const L = pF(m.L), b = pF(m.b), h = pF(m.h);
    const fAvgUser = pF(m.f_avg), EUser = pF(m.E);

    const fAvgCalc = (fNav + fRozv) / 2;
    if (!isClose(fAvgUser, fAvgCalc, 0.001)) check.f_avg = false;

    const ECalc = (F * L ** 3) / (4 * fAvgCalc * b * h ** 3);
    // ИСПРАВЛЕНО: Был баг rel_tol=100000. Поставили адекватный допуск 0.5% (0.005)
    if (!isClose(EUser, ECalc, 0.005)) check.E = false;

    ESum += ECalc;
    msvE.push(ECalc);
    detailedResults.push(check);
  }

  const EAvg = ESum / (msvE.length || 1);
  const msvDeltaE = msvE.map(e => Math.abs(EAvg - e));
  const deltaEAvg = msvDeltaE.reduce((a, b) => a + b, 0) / (msvDeltaE.length || 1);

  for (let i = 0; i < measures.length; i++) {
    const m = measures[i];
    const check: Record<string, boolean> = { E_avg: true, delta_E: true, delta_E_avg: true };

    if (!isClose(pF(m.E_avg), EAvg, 0.001)) check.E_avg = false;
    if (!isClose(pF(m.delta_E), msvDeltaE[i], 0.1)) check.delta_E = false;
    if (!isClose(pF(m.delta_E_avg), deltaEAvg, 0.01)) check.delta_E_avg = false;

    detailedResults[i] = { ...detailedResults[i], ...check };
  }

  return detailedResults;
}

// ==========================================
// 3. ЛАБОРАТОРНАЯ: Модуль Юнга 2 (/yunga2-check)
// ==========================================
export interface Yunga2Measure {
  f_nav: string; f_rozv: string; F: string; L: string; d: string;
  f_avg: string; E: string; E_avg: string; delta_E: string; delta_E_avg: string;
}

export function validateYunga2(measures: Yunga2Measure[]) {
  const detailedResults: Record<string, boolean>[] = [];
  let ESum = 0;
  const msvE: number[] = [];

  for (const m of measures) {
    const check: Record<string, boolean> = { f_avg: true, E: true };
    const fNav = pF(m.f_nav), fRozv = pF(m.f_rozv), F = pF(m.F), L = pF(m.L), d = pF(m.d);
    const fAvgUser = pF(m.f_avg), EUser = pF(m.E);

    // Имитация банковского округления ROUND_HALF_UP до 6 знаков из Python
    let fAvgCalc = (fNav + fRozv) / 2;
    fAvgCalc = Math.round(fAvgCalc * 1000000) / 1000000;
    
    if (!isClose(fAvgUser, fAvgCalc, 0.005)) check.f_avg = false;

    let ECalc = (4 * L * F) / (Math.PI * d ** 2 * fAvgCalc);
    // ИСПРАВЛЕНО: В Python было округление до "1000000" (миллионов), что калечило точность. 
    // Округляем до целых, погрешность rel_tol=0.01 (1%) покроет мелкие расхождения.
    ECalc = Math.round(ECalc);
    if (!isClose(EUser, ECalc, 0.01)) check.E = false;

    ESum += ECalc;
    msvE.push(ECalc);
    detailedResults.push(check);
  }

  const EAvg = ESum / (msvE.length || 1);
  const msvDeltaE = msvE.map(e => Math.abs(EAvg - e));
  const deltaEAvg = msvDeltaE.reduce((a, b) => a + b, 0) / (msvDeltaE.length || 1);

  for (let i = 0; i < measures.length; i++) {
    const m = measures[i];
    const check: Record<string, boolean> = { E_avg: true, delta_E: true, delta_E_avg: true };

    if (!isClose(pF(m.E_avg), EAvg, 0.001)) check.E_avg = false;
    if (!isClose(pF(m.delta_E), msvDeltaE[i], 0.1)) check.delta_E = false;
    if (!isClose(pF(m.delta_E_avg), deltaEAvg, 0.01)) check.delta_E_avg = false;

    detailedResults[i] = { ...detailedResults[i], ...check };
  }

  return detailedResults;
}

// ==========================================
// 4. ЛАБОРАТОРНАЯ: Плотность (/density-check)
// ==========================================
export interface DensityMeasure {
  V: string; gamma: string; rho: string; P1: string; P2: string; P3: string;
}

export function validateDensity(measures: DensityMeasure[]) {
  const detailedResults: Record<string, boolean>[] = [];

  for (const m of measures) {
    const check: Record<string, boolean> = { V: true, gamma: true, rho: true };
    const VUser = pF(m.V), gammaUser = pF(m.gamma), rhoUser = pF(m.rho);
    const P1 = pF(m.P1), P2 = pF(m.P2), P3 = pF(m.P3);

    const gammaw = 9807;

    const VCalc = (P3 - P2) / gammaw;
    if (!isClose(VUser, VCalc, 0.005)) check.V = false;

    // ИСПРАВЛЕНО: В Python-коде проверялся V_user вместо gamma_user! Теперь сверяется корректно.
    const gammaCalc = ((P1 - P2) / (P3 - P2)) * gammaw;
    if (!isClose(gammaUser, gammaCalc, 0.005)) check.gamma = false;

    // ИСПРАВЛЕНО: В Python-коде проверялся V_user вместо rho_user! Теперь сверяется корректно.
    const rhoCalc = gammaCalc / 9.81;
    if (!isClose(rhoUser, rhoCalc, 0.005)) check.rho = false;

    detailedResults.push(check);
  }

  return detailedResults;
}