export function calculateSurfaceTension(
  n: number,
  m0: number,
  m1: number,
  d: number,
  g: number = 9.81
) {
  const M = m1 - m0;
  const m_drop = n > 0 ? M / n : 0;
  const sigma = (Math.PI * d) !== 0 ? (m_drop * g) / (Math.PI * d) : 0;

  return { M, m_drop, sigma };
}