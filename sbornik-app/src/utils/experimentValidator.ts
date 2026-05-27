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

export interface OberbekMeasure {
  // Статические и прямые измерения (не валидируем)
  g: string; m: string; "4m_1": string; 
  h: string; t: string; d: string; r: string;
  // Расчётные формульные поля (валидируем!)
  a: string; epsilon: string; I0: string; I: string;
  I_cep: string; delta_I: string; delta_I_cep: string;
}

export function validateOberbek(measures: OberbekMeasure[]) {
  const detailedResults: Record<string, boolean>[] = [];
  let ISum = 0;
  const msvI: number[] = [];

  // Первый проход: валидация строчных формул (a, epsilon, I0, I)
  for (const m of measures) {
    const check: Record<string, boolean> = { a: true, epsilon: true, I0: true, I: true };
    
    const g = pF(m.g), mMass = pF(m.m);
    const h = pF(m.h), t = pF(m.t), d = pF(m.d), r = pF(m.r);
    
    const aUser = pF(m.a), epsilonUser = pF(m.epsilon);
    const I0User = pF(m.I0), IUser = pF(m.I);

    // 1. Ускорение a = 2h / t^2
    const aCalc = (2 * h) / (t ** 2 || 1);
    if (!isClose(aUser, aCalc, 0.01)) check.a = false;

    // 2. Угловое ускорение epsilon = a / r
    // Если в таблице r — это радиус, используем его, иначе r = d / 2
    const radius = r > 0 ? r : d / 2;
    const epsilonCalc = aCalc / (radius || 1);
    if (!isClose(epsilonUser, epsilonCalc, 0.01)) check.epsilon = false;

    // 3. Момент инерции I0 = m * r^2 * (g/a - 1)
    const I0Calc = mMass * (radius ** 2) * ((g / (aCalc || 1)) - 1);
    if (!isClose(I0User, I0Calc, 0.01)) check.I0 = false;

    // 4. Момент инерции I (в рамках таблицы без h1 принимаем равным основному расчёту моментов)
    if (!isClose(IUser, I0Calc, 0.01)) check.I = false;

    ISum += I0Calc;
    msvI.push(I0Calc);
    detailedResults.push(check);
  }

  const ICep = ISum / (msvI.length || 1);
  const msvDeltaI = msvI.map(iVal => Math.abs(ICep - iVal));
  const deltaICep = msvDeltaI.reduce((sum, dVal) => sum + dVal, 0) / (msvDeltaI.length || 1);

  // Второй проход: валидация средних значений и погрешностей (I_cep, delta_I, delta_I_cep)
  for (let i = 0; i < measures.length; i++) {
    const m = measures[i];
    const check: Record<string, boolean> = { I_cep: true, delta_I: true, delta_I_cep: true };

    if (!isClose(pF(m.I_cep), ICep, 0.01)) check.I_cep = false;
    if (!isClose(pF(m.delta_I), msvDeltaI[i], 0.1)) check.delta_I = false;
    if (!isClose(pF(m.delta_I_cep), deltaICep, 0.05)) check.delta_I_cep = false;

    detailedResults[i] = { ...detailedResults[i], ...check };
  }

  return detailedResults;
}

// ==========================================
// 6. ЛАБОРАТОРНАЯ: Метод Стокса (/stocks-check)
// ==========================================
// Вспомогательные функции остаются вверху файла (isClose, pF)

export function validateStocks(measures: Record<string, string>[]) {
  const detailedResults: Record<string, boolean>[] = [];
  let etaSum = 0;
  const msvEta: number[] = [];

  // 1. Первый проход: вычисляем eta для каждой строки
  for (const m of measures) {
    const check: Record<string, boolean> = { 
      eta: true, eta_avg: true, d_eta: true, d_eta_avg: true 
    };
    
    const rho1 = pF(m.rho1);
    const rho2 = pF(m.rho2);
    const g = pF(m.g);
    const l = pF(m.l);
    const d = pF(m.d);
    const t = pF(m.t);
    const etaUser = pF(m.eta);

    // Формула Стокса
    const etaCalc = (1 / 18) * g * ((d ** 2 * t) / (l || 1)) * (rho1 - rho2);
    
    if (!isClose(etaUser, etaCalc, 0.01)) check.eta = false;

    etaSum += etaCalc;
    msvEta.push(etaCalc);
    detailedResults.push(check);
  }

  const etaAvg = etaSum / (msvEta.length || 1);
  const msvDEta = msvEta.map(e => Math.abs(etaAvg - e));
  const dEtaAvg = msvDEta.reduce((a, b) => a + b, 0) / (msvDEta.length || 1);

  // 2. Второй проход: сверяем средние и погрешности по твоим именам полей
  for (let i = 0; i < measures.length; i++) {
    const m = measures[i];

    if (!isClose(pF(m.eta_avg), etaAvg, 0.01)) detailedResults[i].eta_avg = false;
    if (!isClose(pF(m.d_eta), msvDEta[i], 0.1)) detailedResults[i].d_eta = false;
    if (!isClose(pF(m.d_eta_avg), dEtaAvg, 0.05)) detailedResults[i].d_eta_avg = false;
  }

  return detailedResults;
}