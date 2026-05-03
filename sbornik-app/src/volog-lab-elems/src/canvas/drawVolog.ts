export function drawPsychrometer(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  t1: number,
  t2: number,
  isDipping: boolean,
  isFanRunning: boolean
) {
  ctx.clearRect(0, 0, width, height);
  const centerX = width / 2;
  const baseLine = height - 150;
  const termHeight = 250;

  // 1. Корпус приладу
  ctx.fillStyle = "#f1f5f9";
  ctx.strokeStyle = "#94a3b8";
  ctx.lineWidth = 2;
  ctx.strokeRect(centerX - 120, 40, 240, 460);

  // 2. Вентилятор (анімація лопатей)
  ctx.save();
  ctx.translate(centerX, 80);
  if (isFanRunning) ctx.rotate((Date.now() / 150) % (Math.PI * 2));
  ctx.fillStyle = "#334155";
  for (let i = 0; i < 3; i++) {
    ctx.rotate((Math.PI * 2) / 3);
    ctx.fillRect(-4, -35, 8, 35);
  }
  ctx.restore();

  const drawTerm = (x: number, temp: number, label: string, isWetTerm: boolean, offset: number = 0) => {
    const yPos = baseLine + offset;
    
    // Скляна колба
    ctx.strokeStyle = "#475569";
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(x, yPos);
    ctx.lineTo(x, yPos - termHeight);
    ctx.stroke();

    // Шкала (риски)
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 1;
    for (let i = 0; i <= termHeight; i += 25) {
      ctx.beginPath();
      ctx.moveTo(x - 10, yPos - i);
      ctx.lineTo(x + 10, yPos - i);
      ctx.stroke();
    }

    // Рідина (ртуть/спирт)
    const level = (temp / 50) * termHeight;
    ctx.strokeStyle = "#ef4444";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x, yPos);
    ctx.lineTo(x, yPos - level);
    ctx.stroke();

    // Резервуар
    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.arc(x, yPos, 10, 0, Math.PI * 2);
    ctx.fill();

    if (isWetTerm) {
      // Малюємо вологу тканину (бант)
      ctx.fillStyle = "rgba(148, 163, 184, 0.8)";
      ctx.fillRect(x - 12, yPos - 15, 24, 30);
      ctx.strokeStyle = "#64748b";
      ctx.lineWidth = 1;
      ctx.strokeRect(x - 12, yPos - 15, 24, 30);
    }

    // Підписи температур
    ctx.fillStyle = "#0f172a";
    ctx.font = "bold 16px Inter, Arial";
    ctx.textAlign = "center";
    ctx.fillText(`${temp.toFixed(1)}°C`, x, yPos - level - 15);
    ctx.font = "12px Inter, Arial";
    ctx.fillText(label, x, yPos + 35);
  };

  drawTerm(centerX - 60, t1, "СУХИЙ", false);
  const dipOffset = isDipping ? 50 : 0;
  drawTerm(centerX + 60, t2, "ВОЛОГИЙ", true, dipOffset);

  // Склянка з водою (знизу)
  ctx.fillStyle = "rgba(59, 130, 246, 0.2)";
  ctx.fillRect(centerX + 40, baseLine + 50, 40, 45);
  ctx.strokeStyle = "#2563eb";
  ctx.strokeRect(centerX + 40, baseLine + 50, 40, 45);
}