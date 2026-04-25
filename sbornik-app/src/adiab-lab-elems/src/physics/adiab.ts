export function calculateAdiab(h1: number, h2: number) {
  const denominator = h1 - h2;
  if (denominator <= 0) return { gamma: 0, isValid: false };
  
  const gamma = h1 / denominator;
  return {
    gamma: Number(gamma.toFixed(3)),
    isValid: true
  };
}

export function calculateStats(values: number[]) {
  if (values.length === 0) return { avg: 0, delta: 0 };
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  const errors = values.map(v => Math.abs(avg - v));
  const delta = errors.reduce((a, b) => a + b, 0) / values.length;

  return {
    avg: Number(avg.toFixed(3)),
    delta: Number(delta.toFixed(3))
  };
}