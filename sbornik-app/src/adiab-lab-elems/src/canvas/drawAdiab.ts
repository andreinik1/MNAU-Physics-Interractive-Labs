export function drawAdiab(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  h1: number,
  h2: number
) {
  ctx.clearRect(0, 0, width, height);
  const centerX = width / 2;
  const centerY = height / 2;

  // Балон
  ctx.strokeStyle = "#475569";
  ctx.lineWidth = 3;
  ctx.fillStyle = "rgba(186, 230, 253, 0.2)";
  ctx.beginPath();
  ctx.arc(centerX - 80, centerY, 90, 0, Math.PI * 2);
  ctx.fill(); ctx.stroke();

  // Манометр
  const manoX = centerX + 110;
  const manoY = centerY + 20;
  ctx.lineWidth = 12;
  ctx.strokeStyle = "#e2e8f0";
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(manoX - 35, manoY - 140);
  ctx.lineTo(manoX - 35, manoY + 60);
  ctx.arc(manoX, manoY + 60, 35, Math.PI, 0, true);
  ctx.lineTo(manoX + 35, manoY - 140);
  ctx.stroke();

  // Логіка рівнів рідини
  // h1 впливає на загальний зсув, h2 показує стан після "випуску" повітря
  const displayH = h1 > 0 ? h1 : 0;
  const shift = displayH / 10; 

  ctx.strokeStyle = "#2563eb";
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(manoX - 35, manoY + 60); 
  // Ліве коліно (йде вниз від тиску)
  ctx.lineTo(manoX - 35, manoY + 10 + shift);
  ctx.arc(manoX, manoY + 60, 35, Math.PI, 0, true);
  // Праве коліно (йде вгору)
  ctx.lineTo(manoX + 35, manoY + 10 - shift);
  ctx.stroke();

  // Риски для h2 (показуємо де був рівень)
  if (h2 > 0) {
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = "#ef4444";
    ctx.lineWidth = 2;
    const h2Shift = h2 / 10;
    ctx.beginPath();
    ctx.moveTo(manoX + 20, manoY + 10 - h2Shift);
    ctx.lineTo(manoX + 50, manoY + 10 - h2Shift);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  // Трубка
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#64748b";
  ctx.beginPath();
  ctx.moveTo(centerX - 80, centerY - 90);
  ctx.lineTo(centerX - 80, centerY - 160);
  ctx.lineTo(manoX - 35, centerY - 160);
  ctx.lineTo(manoX - 35, manoY - 140);
  ctx.stroke();

  ctx.fillStyle = "#1e293b";
  ctx.font = "bold 14px Arial";
  ctx.textAlign = "center";
  ctx.fillText(`h1: ${h1} мм`, manoX, manoY + 110);
  if (h2 > 0) ctx.fillText(`h2: ${h2} мм`, manoX, manoY + 130);
}