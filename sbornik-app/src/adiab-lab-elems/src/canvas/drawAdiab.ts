export function drawAdiab(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  h1: number,
  h2: number,
  isCompressorOn: boolean,
  isSiphonPressed: boolean,
  isTubeConnected: boolean
) {
  ctx.clearRect(0, 0, width, height);
  const centerX = width / 2;
  const centerY = height / 2;

  // 1. Компресор
  ctx.fillStyle = "#334155";
  ctx.fillRect(centerX - 240, centerY + 20, 60, 40);
  if (isCompressorOn) {
    ctx.fillStyle = "#fbbf24";
    ctx.beginPath();
    ctx.arc(centerX - 210, centerY + 15, 5 + Math.random() * 2, 0, Math.PI * 2);
    ctx.fill();
  }

  // 2. Балон
  ctx.strokeStyle = "#475569";
  ctx.lineWidth = 3;
  ctx.fillStyle = "rgba(186, 230, 253, 0.2)";
  ctx.beginPath();
  ctx.arc(centerX - 80, centerY, 90, 0, Math.PI * 2);
  ctx.fill(); 
  ctx.stroke();

  // 3. Манометр (Трубка)
  const manoX = centerX + 110;
  const manoY = centerY + 20;
  const radius = 35;
  ctx.lineWidth = 12;
  ctx.strokeStyle = "#e2e8f0";
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(manoX - radius, manoY - 140);
  ctx.lineTo(manoX - radius, manoY + 60);
  ctx.arc(manoX, manoY + 60, radius, Math.PI, 0, true);
  ctx.lineTo(manoX + radius, manoY - 140);
  ctx.stroke();

  // 4. Рідина (ВИПРАВЛЕНО)
  const currentDisplayH = h1 > 0 ? h1 : h2;
  const shift = currentDisplayH / 4; 

  ctx.strokeStyle = "#2563eb";
  ctx.lineWidth = 8; // Вужче за трубку, щоб не вилазило
  ctx.lineCap = "butt"; 

  ctx.beginPath();
  ctx.moveTo(manoX - radius, manoY + 60 + shift); 
  ctx.arc(manoX, manoY + 60, radius, Math.PI, 0, true);
  ctx.lineTo(manoX + radius, manoY + 60 - shift);
  ctx.stroke();

  // 5. Трубка від компресора
  ctx.lineWidth = 4;
  ctx.strokeStyle = isTubeConnected ? "#64748b" : "rgba(100, 116, 139, 0.3)";
  ctx.beginPath();
  ctx.moveTo(centerX - 180, centerY + 40);
  ctx.lineTo(isTubeConnected ? centerX - 80 : centerX - 130, centerY + 40);
  ctx.stroke();

  // 6. Клапан сифона
  ctx.fillStyle = isSiphonPressed ? "#ef4444" : "#475569";
  ctx.fillRect(centerX - 90, centerY - 110, 20, 10);

  // 7. Текст (h1 та h2 разом)
  ctx.fillStyle = "#1e293b";
  ctx.font = "bold 16px Inter, Arial";
  ctx.textAlign = "center";
  let text = "";
  if (h1 > 0) text += `h1: ${h1} мм `;
  if (h2 > 0) text += `h2: ${h2} мм`;
  if (!text) text = "h: 0 мм";
  ctx.fillText(text, manoX, manoY + 130);
}