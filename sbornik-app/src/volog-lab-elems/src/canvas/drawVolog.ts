export function drawPsychrometer(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  t1: number,
  t2: number
) {
  ctx.clearRect(0, 0, width, height);

  const centerX = width / 2;
  const baseLine = height - 100;
  const termHeight = 300;
  const spacing = 80;

  // Малюємо оправу
  ctx.fillStyle = "#f1f5f9";
  ctx.strokeStyle = "#94a3b8";
  ctx.lineWidth = 2;
  ctx.roundRect(centerX - 100, 50, 200, 400, 10);
  ctx.fill(); ctx.stroke();

  const drawTerm = (x: number, temp: number, isWet: boolean) => {
    // Скляна трубка
    ctx.strokeStyle = "#334155";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(x, baseLine);
    ctx.lineTo(x, baseLine - termHeight);
    ctx.stroke();

    // Ртуть/Рідина
    const level = (temp / 50) * termHeight; // припустимо макс 50 градусів
    ctx.strokeStyle = "#ef4444";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(x, baseLine);
    ctx.lineTo(x, baseLine - level);
    ctx.stroke();

    // Резервуар
    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.arc(x, baseLine, 10, 0, Math.PI * 2);
    ctx.fill();

    if (isWet) {
      // Тканина (бинт) на вологому
      ctx.fillStyle = "rgba(148, 163, 184, 0.6)";
      ctx.fillRect(x - 12, baseLine - 15, 24, 30);
      // Вода в стаканчику
      ctx.fillStyle = "#3b82f6";
      ctx.fillRect(x - 20, baseLine + 15, 40, 40);
      ctx.strokeStyle = "#1e293b";
      ctx.strokeRect(x - 20, baseLine + 15, 40, 40);
    }

    // Підписи
    ctx.fillStyle = "#1e293b";
    ctx.font = "bold 14px Arial";
    ctx.textAlign = "center";
    ctx.fillText(isWet ? "Вологий" : "Сухий", x, baseLine + 75);
    ctx.fillText(`${temp.toFixed(1)}°C`, x, baseLine - level - 10);
  };

  drawTerm(centerX - spacing/2, t1, false);
  drawTerm(centerX + spacing/2, t2, true);
}