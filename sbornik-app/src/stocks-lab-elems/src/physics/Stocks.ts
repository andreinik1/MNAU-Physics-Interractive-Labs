export function calculateStocksLab(
  l: number,
  d: number,
  t: number,
  rho1: number = 7800, // Свинець за замовчуванням
  rho2: number = 1260, // Гліцерин за замовчуванням
  g: number = 9.81
) {
  if (l <= 0 || t <= 0) return { eta: 0 };
  
  // Формула 9 з методички
  const eta = (Math.pow(d, 2) * (rho1 - rho2) * g * t) / (18 * l);
  
  return { eta };
}