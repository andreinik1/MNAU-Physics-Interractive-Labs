export function drawAdiab(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  displayH: number,
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
  ctx.lineTo(centerX + 75, centerY - 60); 
  ctx.stroke();

  // 5. Клапан сифона
  ctx.fillStyle = isSiphonPressed ? "#ef4444" : "#475569";
  ctx.fillRect(centerX - 110, centerY - 100, 20, 10);

  // --- НАЛАШТУВАННЯ ГЕОМЕТРІЇ МАНОМЕТРА ---
  const manoX = centerX + 130; 
  const manoY = centerY + 20;
  const radius = 55;         
  const topY = manoY - 140;  
  const bottomY = manoY + 60; 

  // Визначаємо поточний рівень тиску для відображення
  let currentDisplayH = displayH;
  if (h1 > 0) currentDisplayH = h1;
  if (h2 > 0) currentDisplayH = h2;

  // Масштабування зсуву (розподіляємо h навпіл між двома колінами)
  const shift = currentDisplayH / 2; 

  // НАЧАЛЬНЫЙ ВИЗУАЛЬНЫЙ УРОВЕНЬ ВОДЫ (Здесь будет отметка "75" на шкале)
  // Поднимаем мениск повыше от дна манометра
  const baseWaterLevelY = bottomY - 60; 

  // Вычисляем, где относительно baseWaterLevelY должен находиться физический "0" шкалы
  // Т.к. 1 деление = 1 пиксель, ноль будет на 75 пикселей ниже начального уровня воды
  const zeroLevelY = baseWaterLevelY + 75;

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
  // ЛІВЕ КОЛІНО: опускається вниз від стартових 75 мм під тиском
  ctx.moveTo(manoX - radius, baseWaterLevelY + shift); 
  ctx.lineTo(manoX - radius, bottomY);
  // Заокруглення знизу (завжди заповнене водою)
  ctx.arc(manoX, bottomY, radius, Math.PI, 0, true);
  // ПРАВЕ КОЛІНО: піднімається вгору вище стартових 75 мм
  ctx.lineTo(manoX + radius, baseWaterLevelY - shift);
  ctx.stroke();

  // 8. Масштабна лінійка
  const scaleWidth = radius * 2 - 20; 
  ctx.fillStyle = "#f8fafc";
  ctx.strokeStyle = "#cbd5e1";
  ctx.lineWidth = 1;
  // Продлеваем линеечку чуть ниже, чтобы спрятать виртуальный ноль под изгиб
  ctx.fillRect(manoX - scaleWidth / 2, topY, scaleWidth, zeroLevelY - topY + 5);
  ctx.strokeRect(manoX - scaleWidth / 2, topY, scaleWidth, zeroLevelY - topY + 5);

  // Міліметрові поділки (малюємо знизу вгору від линии виртуального нуля)
  ctx.strokeStyle = "#64748b";
  ctx.fillStyle = "#64748b";
  ctx.font = "11px monospace";
  ctx.textAlign = "center";

  // Рисуем деления с шагом 10 пикселей (10 мм) вверх от точки нуля
  for (let y = zeroLevelY; y >= topY; y -= 10) {
    const labelVal = zeroLevelY - y;
    const isMajor = labelVal % 50 === 0;
    const tickLength = isMajor ? 8 : 4;

    ctx.beginPath();
    ctx.moveTo(manoX - scaleWidth / 2, y);
    ctx.lineTo(manoX - scaleWidth / 2 + tickLength, y);
    
    ctx.moveTo(manoX + scaleWidth / 2, y);
    ctx.lineTo(manoX + scaleWidth / 2 - tickLength, y);
    ctx.stroke();

    // Текст по центру лінійки (0, 50, 75(на уровне воды), 100, 150...)
    if (isMajor && y > topY) {
      ctx.fillText(labelVal.toString(), manoX, y + 4);
    }
  }

  // 9. Текст знизу
  ctx.fillStyle = "#1e293b";
  ctx.font = "bold 16px Inter, Arial";
  ctx.textAlign = "center";
  
  let text = "";
  if (h1 > 0) text += `h1: ${h1} мм `;
  if (h2 > 0) text += ` | h2: ${h2} мм`;
  if (!text && displayH > 0) text = `h: ${displayH} мм`;
  if (!text) text = "h: 0 мм";
  ctx.fillText(text, manoX, bottomY + 90);
}