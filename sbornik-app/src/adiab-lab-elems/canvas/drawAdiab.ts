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
  ctx.fillRect(centerX - 260, centerY + 20, 60, 40);
  if (isCompressorOn) {
    ctx.fillStyle = "#fbbf24";
    ctx.beginPath();
    ctx.arc(centerX - 230, centerY + 15, 5 + Math.random() * 2, 0, Math.PI * 2);
    ctx.fill();
  }

  // 2. Балон
  ctx.strokeStyle = "#475569";
  ctx.lineWidth = 3;
  ctx.fillStyle = "rgba(186, 230, 253, 0.2)";
  ctx.beginPath();
  ctx.arc(centerX - 100, centerY, 90, 0, Math.PI * 2);
  ctx.fill(); 
  ctx.stroke();

  // 3. З'єднувальна трубка від компресора до балона
  ctx.lineWidth = 4;
  ctx.strokeStyle = isTubeConnected ? "#64748b" : "rgba(100, 116, 139, 0.3)";
  ctx.beginPath();
  ctx.moveTo(centerX - 200, centerY + 40);
  ctx.lineTo(isTubeConnected ? centerX - 185 : centerX - 150, centerY + 40);
  ctx.stroke();

  // 4. Трубка від балона до манометра
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#64748b";
  ctx.beginPath();
  ctx.moveTo(centerX - 50, centerY - 60); 
  ctx.lineTo(centerX + 75, centerY - 60); // Доводимо до нового положення лівої трубки
  ctx.stroke();

  // 5. Клапан сифона
  ctx.fillStyle = isSiphonPressed ? "#ef4444" : "#475569";
  ctx.fillRect(centerX - 110, centerY - 100, 20, 10);

  // --- НАЛАШТУВАННЯ ГЕОМЕТРІЇ МАНОМЕТРА (ЗБІЛЬШЕНО ШИРИНУ ТА РІВЕНЬ) ---
  const manoX = centerX + 130; // Зсунуто манометр трохи вправо, щоб не тиснув на балон
  const manoY = centerY + 20;
  const radius = 55;        // РАДІУС ЗБІЛЬШЕНО (U-подібна трубка стала ширшою)
  const topY = manoY - 140;  // Верх трубок
  const bottomY = manoY + 60; // Центр заокруглення знизу

  // Розрахунок зсуву рідини
  const currentDisplayH = h1 > 0 ? h1 : h2;
  const shift = (currentDisplayH / 300) * 80; 

  // Початкова точка спокою рідини (робимо рівень вищим — піднімаємо ближче до topY)
  // Раніше рідина починалася від bottomY, тепер вона на 40 пікселів вище за замовчуванням
  const baseWaterLevelY = bottomY - 40; 

  // 6. Задня частина трубок манометра (основа)
  ctx.lineWidth = 14;
  ctx.strokeStyle = "#e2e8f0";
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(manoX - radius, topY);
  ctx.lineTo(manoX - radius, bottomY);
  ctx.arc(manoX, bottomY, radius, Math.PI, 0, true);
  ctx.lineTo(manoX + radius, topY);
  ctx.stroke();

  // 7. Стовпчик рідини (Синій)
  ctx.strokeStyle = "#2563eb";
  ctx.lineWidth = 10;
  ctx.lineCap = "butt"; 

  ctx.beginPath();
  // ЛІВЕ КОЛІНО: опускається нижче початкового рівня (baseWaterLevelY + shift)
  ctx.moveTo(manoX - radius, baseWaterLevelY + shift); 
  ctx.lineTo(manoX - radius, bottomY);
  // Заокруглення знизу повністю залите
  ctx.arc(manoX, bottomY, radius, Math.PI, 0, true);
  // ПРАВЕ КОЛІНО: піднімається вище початкового рівня (baseWaterLevelY - shift)
  ctx.lineTo(manoX + radius, baseWaterLevelY - shift);
  ctx.stroke();

  // 8. Масштабна лінійка (Ширину адаптовано під новий радіус)
  const scaleWidth = radius * 2 - 20; // Автоматично розширюється між трубками
  ctx.fillStyle = "#f8fafc";
  ctx.strokeStyle = "#cbd5e1";
  ctx.lineWidth = 1;
  ctx.fillRect(manoX - scaleWidth / 2, topY, scaleWidth, bottomY - topY);
  ctx.strokeRect(manoX - scaleWidth / 2, topY, scaleWidth, bottomY - topY);

  // Міліметрові поділки
  ctx.strokeStyle = "#64748b";
  ctx.fillStyle = "#64748b";
  ctx.font = "12px monospace";
  ctx.textAlign = "center";

  for (let y = topY + 10; y <= bottomY; y += 10) {
    ctx.beginPath();
    const isMajor = (y - topY - 10) % 50 === 0;
    const tickLength = isMajor ? 8 : 4;

    // Риски з лівого та правого боку лінійки біля самих трубок
    ctx.moveTo(manoX - scaleWidth / 2, y);
    ctx.lineTo(manoX - scaleWidth / 2 + tickLength, y);
    
    ctx.moveTo(manoX + scaleWidth / 2, y);
    ctx.lineTo(manoX + scaleWidth / 2 - tickLength, y);
    ctx.stroke();

    // Текст по центру лінійки
    if (isMajor && y < bottomY) {
      const labelVal = Math.abs(baseWaterLevelY - y); // Нуль шкали тепер збігається з новим рівнем води
      ctx.fillText(labelVal.toString(), manoX, y + 3);
    }
  }

  // 9. Текст знизу
  ctx.fillStyle = "#1e293b";
  ctx.font = "bold 16px Inter, Arial";
  ctx.textAlign = "center";
  let text = "";
  if (h1 > 0) text += `h1: ${h1} мм `;
  if (h2 > 0) text += `h2: ${h2} мм`;
  if (!text) text = "h: 0 мм";
  ctx.fillText(text, manoX, bottomY + 90);
}