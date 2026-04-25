export function drawPoverx(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  currentN: number,
  targetN: number,
  d: number,
  isFlowing: boolean,
  currentMass: number,
  m0: number
) {
  ctx.clearRect(0, 0, width, height);
  const centerX = width / 2;
  const nozzleY = 100;
  const cupY = height - 120;
  const cupWidth = 100;
  const cupHeight = 60;

  // 1. Легенда
  ctx.fillStyle = "#64748b";
  ctx.font = "12px monospace";
  ctx.textAlign = "left";
  ctx.fillText(`M₀ (тара): ${m0.toFixed(4)} kg`, 20, 30);
  ctx.fillText(`Капнуло: ${currentN} шт.`, 20, 45);

  // 2. Бюретка
  ctx.strokeStyle = "#94a3b8";
  ctx.lineWidth = 2;
  ctx.strokeRect(centerX - 8, 20, 16, nozzleY - 20);
  
  // 3. Квадратна кювета
  ctx.strokeStyle = "#1e293b";
  ctx.lineWidth = 2;
  ctx.strokeRect(centerX - cupWidth / 2, cupY, cupWidth, cupHeight);

  // 4. Вода в кюветі (рівень піднімається)
  const fillLevel = (currentN / targetN) * (cupHeight - 4);
  ctx.fillStyle = "rgba(59, 130, 246, 0.4)";
  ctx.fillRect(centerX - cupWidth / 2 + 2, cupY + cupHeight - fillLevel - 2, cupWidth - 4, fillLevel);

  // 5. Електронні ваги (Табло)
  ctx.fillStyle = "#1e293b";
  ctx.fillRect(centerX - 50, cupY + cupHeight + 5, 100, 30);
  ctx.fillStyle = "#4ade80"; 
  ctx.font = "bold 16px monospace";
  ctx.textAlign = "center";
  // Виводимо масу, вона оновиться саме в момент "падіння"
  ctx.fillText(currentMass.toFixed(5), centerX, cupY + cupHeight + 25);

  // 6. Анімація краплі (синхронно з інтервалом 800мс)
  if (isFlowing && currentN < targetN) {
    // Цикл анімації 800мс (співпадає з інтервалом у Controls)
    const animDuration = 800;
    const time = (Date.now() % animDuration) / animDuration;
    const visualD = Math.max(6, d * 1500);

    let ballY = nozzleY + 5;
    let ballSize = visualD;

    // Перші 40% часу - крапля росте на носику
    if (time < 0.4) {
        ballSize = visualD * (time / 0.4);
        ballY = nozzleY + 5 + ballSize / 4;
    } 
    // Наступні 30% часу - крапля летить вниз
    else if (time < 0.7) {
        const fallP = (time - 0.4) / 0.3;
        ballY = (nozzleY + 10) + (cupY - nozzleY - 10) * fallP;
        ballSize = visualD;
    }
    // Останні 30% - крапля вже "у воді", малюємо кола або нічого
    else {
        ballSize = 0; // Крапля зникла
    }

    if (ballSize > 0) {
        ctx.fillStyle = "#3b82f6";
        ctx.beginPath();
        ctx.arc(centerX, ballY, ballSize / 2, 0, Math.PI * 2);
        ctx.fill();
    }
  }
}