export function drawOberbek(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  h: number, // теперь в см
  rPulleyMm: number,
  weightsDistMm: number
) {
  ctx.clearRect(0, 0, width, height);
  const centerX = width / 2 - 50;
  const centerY = 150; // Верхняя точка
  const rPulley = rPulleyMm / 2.5; // визуальный масштаб
  const angle = (h / 10) / (rPulley / 10); 

  // 1. Линейка (Шкала в СМ)
  const rulerX = centerX + 120;
  ctx.strokeStyle = "#94a3b8";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(rulerX, centerY);
  ctx.lineTo(rulerX, centerY + 400); // 400px = 200см (1см = 2px)
  ctx.stroke();

  ctx.font = "11px Inter, Arial";
  ctx.textAlign = "left";
  ctx.fillStyle = "#64748b";
  for (let i = 0; i <= 200; i += 10) {
    const y = centerY + (i * 2); // масштаб 1см = 2px
    ctx.beginPath();
    ctx.moveTo(rulerX, y);
    ctx.lineTo(rulerX + (i % 50 === 0 ? 15 : 8), y);
    ctx.stroke();
    if (i % 20 === 0) ctx.fillText(`${i} см`, rulerX + 20, y + 4);
  }

  // 2. Стойка
  ctx.strokeStyle = "#334155";
  ctx.lineWidth = 4;
  ctx.strokeRect(centerX - 5, centerY - 20, 10, 450);

  // 3. Маятник (вращение)
  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate(angle);

  // Хрестовина
  ctx.strokeStyle = "#475569";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(-100, 0); ctx.lineTo(100, 0);
  ctx.moveTo(0, -100); ctx.lineTo(0, 100);
  ctx.stroke();

  // Грузики на стержнях
  ctx.fillStyle = "#1e293b";
  const visualL = (weightsDistMm / 150) * 90;
  [visualL, -visualL].forEach(p => {
    ctx.fillRect(p - 10, -10, 20, 20);
    ctx.fillRect(-10, p - 10, 20, 20);
  });

  // Шкив
  ctx.fillStyle = "#64748b";
  ctx.beginPath();
  ctx.arc(0, 0, rPulley, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // 4. Нитка и груз P
  const dropY = centerY + (h * 2); // 1см = 2px
  ctx.strokeStyle = "#94a3b8";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(centerX + rPulley, centerY);
  ctx.lineTo(centerX + rPulley, dropY);
  ctx.stroke();

  // Грузик
  ctx.fillStyle = "#ef4444";
  ctx.fillRect(centerX + rPulley - 12, dropY, 24, 30);
  
  // Указатель текущего уровня
  ctx.strokeStyle = "#ef4444";
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(centerX + rPulley + 12, dropY);
  ctx.lineTo(rulerX, dropY);
  ctx.stroke();
  ctx.setLineDash([]);
}