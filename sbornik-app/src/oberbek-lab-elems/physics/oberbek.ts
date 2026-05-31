export function calculateStats(values: number[]) {
  if (values.length === 0) return { avg: 0, delta: 0 };
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  const errors = values.map(v => Math.abs(avg - v));
  const delta = errors.reduce((a, b) => a + b, 0) / values.length;

  return {
    avg: Number(avg.toFixed(6)),
    delta: Number(delta.toFixed(6))
  };
}

export function calculatePhysicsTime(m: number, rMm: number, hCm: number, I: number) {
  const g = 9.81;
  const r = rMm / 1000;
  const h = hCm / 100;
  // t = sqrt(2h(I + mr^2) / (mgr^2))
  const t = Math.sqrt((2 * h * (I + m * r * r)) / (m * g * r * r));
  return t;
}

export function calculateOberbek(m: number, r: number, h: number, t: number, g: number = 9.81) {
  if (t <= 0 || h <= 0) return { a: 0, eps: 0, I0: 0, isValid: false };
  const a = (2 * h) / (t * t);
  const eps = a / r;
  const I0 = m * r * (g / a - 1); 
  return { a: Number(a.toFixed(4)), eps: Number(eps.toFixed(4)), I0: Number(I0.toFixed(6)), isValid: true };
}