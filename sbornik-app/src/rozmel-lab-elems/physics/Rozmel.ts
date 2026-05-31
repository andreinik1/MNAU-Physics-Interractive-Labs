export interface PhysicsResult {
  R1: number;
  R2: number;
  dT: number;
  t2: number;
  dl: number;
  i: number;
}

export function calculateExpansion(u: number, t1: number, isOn: boolean): PhysicsResult {
  const l1 = 350; // мм
  const beta = 0.0004; // Температурний коефіцієнт опору ніхрому
  const alpha_ref = 0.000014; // Коефіцієнт лінійного розширення ніхрому
  const R1 = 4.77; // Опір при t1 (кімнатній)

  if (!isOn || u === 0) {
    return { R1, R2: R1, dT: 0, t2: t1, dl: 0, i: 0 };
  }

  // Розрахунок струму (I = U / R)
  // Припускаємо, що дріт нагрівається пропорційно потужності U^2
  const powerFactor = (u * u) / 10; 
  const dT = powerFactor * 15; // Емпіричний нагрів для лаби
  const t2 = t1 + dT;
  
  // Опір при нагріванні: R2 = R1 * (1 + beta * dT)
  const R2 = R1 * (1 + beta * dT);
  const i = u / R2;

  // Видовження: dl = alpha * l1 * dT
  const dl = alpha_ref * l1 * dT;

  return { R1, R2, dT, t2, dl, i };
}