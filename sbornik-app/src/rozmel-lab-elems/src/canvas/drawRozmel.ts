export function drawExpansionLab(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  u: number,
  i: number,
  dl: number,
  isOn: boolean
) {
  ctx.clearRect(0, 0, width, height);

  // Динамические опорные точки схемы (зависят от переданной ширины)
  const startX = width * 0.2;       // Левая стена и клемма 2
  const endX = width * 0.65;       // Стартовая координата клеммы 3 (без нагрева)
  const powerX = width * 0.85;     // Правая стена и разъёмы питания
  
  const centerY = 120;             // Горизонтальная линия (ось провода и пружины)
  const bottomY = 320;             // Нижняя линия цепи (ось амперметра)

  // Текущее положение клеммы 3 с учетом теплового удлинения
  const currentKlemma3X = endX + dl * 25;

  // Позиция вольтметра по вертикали (опустили ниже, теперь ровно посередине)
  const voltmeterY = centerY + 110; 

  // ---------------------------------------------------------
  // 1. ОПОРНЫЕ СТЕНЫ (Крепления со штриховкой)
  // ---------------------------------------------------------
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 2;
  
  // Левое крепление (возле клеммы 2)
  ctx.beginPath();
  ctx.moveTo(startX - 40, centerY); ctx.lineTo(startX, centerY);
  ctx.moveTo(startX - 40, centerY - 15); ctx.lineTo(startX - 40, centerY + 15);
  for (let m = 0; m < 5; m++) {
    ctx.moveTo(startX - 40, centerY - 15 + m * 7);
    ctx.lineTo(startX - 47, centerY - 10 + m * 7);
  }
  
  // Правое крепление (после пружины)
  ctx.moveTo(powerX, centerY); ctx.lineTo(powerX + 40, centerY);
  ctx.moveTo(powerX + 40, centerY - 15); ctx.lineTo(powerX + 40, centerY + 15);
  for (let m = 0; m < 5; m++) {
    ctx.moveTo(powerX + 40, centerY - 15 + m * 7);
    ctx.lineTo(powerX + 47, centerY - 10 + m * 7);
  }
  ctx.stroke();

  // ---------------------------------------------------------
  // 2. СОЕДИНИТЕЛЬНЫЕ ПРОВОДА (Замкнутый контур)
  // ---------------------------------------------------------
  ctx.beginPath();
  // От клеммы 2 вертикально вниз к амперметру
  ctx.moveTo(startX, centerY);
  ctx.lineTo(startX, bottomY);
  
  // Нижняя магистраль: от левого угла через амперметр к клемме питания (-)
  ctx.lineTo(powerX, bottomY);
  
  // Провод вольтметра: идет от подвижной клеммы 3 СВЕРХУ ВНИЗ до самого низа (к нижней магистрали)
  ctx.moveTo(currentKlemma3X, centerY);
  ctx.lineTo(currentKlemma3X, bottomY);
  
  // Горизонтальный отвод от корпуса вольтметра направо к клемме питания (+)
  ctx.moveTo(currentKlemma3X, voltmeterY);
  ctx.lineTo(powerX, voltmeterY);
  ctx.stroke();

  // Выводы источника питания (кружочки)
  ctx.fillStyle = "#fff";
  ctx.beginPath(); ctx.arc(powerX, voltmeterY, 6, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.arc(powerX, bottomY, 6, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  
  // Текст полярности и источника
  ctx.fillStyle = "#000";
  ctx.font = "14px system-ui, sans-serif";
  ctx.fillText("+", powerX - 20, voltmeterY + 5);
  ctx.fillText("-", powerX - 18, bottomY + 5);
  ctx.fillText("12 В", powerX + 15, bottomY - 30);

  // ---------------------------------------------------------
  // 3. ИССЛЕДУЕМЫЙ ДРОТ (1) — Меняет цвет при нагреве
  // ---------------------------------------------------------
  const heatColor = isOn && u > 0 ? `rgb(${160 + u * 15}, 40, 40)` : "#1e293b";
  ctx.strokeStyle = heatColor;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(startX, centerY);
  ctx.lineTo(currentKlemma3X, centerY);
  ctx.stroke();
  
  ctx.fillStyle = "#000";
  ctx.font = "bold 14px system-ui, sans-serif";
  ctx.fillText("1", (startX + endX) / 2, centerY - 15);

  // ---------------------------------------------------------
  // 4. КЛЕММЫ НА ДРОТЕ (2 и 3)
  // ---------------------------------------------------------
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#000";
  ctx.fillStyle = "#000";
  
  // Клемма 2
  ctx.beginPath(); ctx.arc(startX, centerY, 5, 0, Math.PI * 2); ctx.fill();
  ctx.fillText("2", startX - 5, centerY - 15);
  
  // Клемма 3
  ctx.beginPath(); ctx.arc(currentKlemma3X, centerY, 5, 0, Math.PI * 2); ctx.fill();
  ctx.fillText("3", currentKlemma3X - 5, centerY - 15);

  // ---------------------------------------------------------
  // 5. ПРУЖИНА (4) — Реагирует на сжатие дрота
  // ---------------------------------------------------------
  const springWidth = powerX - currentKlemma3X;
  ctx.strokeStyle = "#475569";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(currentKlemma3X, centerY);
  
  const turns = 10; 
  for (let k = 0; k < turns; k++) {
    const x = currentKlemma3X + (k * springWidth) / turns;
    ctx.lineTo(x, centerY + (k % 2 === 0 ? -12 : 12));
  }
  ctx.lineTo(powerX, centerY);
  ctx.stroke();
  ctx.fillText("4", currentKlemma3X + springWidth / 2 - 5, centerY - 20);

  // ---------------------------------------------------------
  // 6. АМПЕРМЕТР (А)
  // ---------------------------------------------------------
  const ammeterX = startX + (powerX - startX) * 0.35;
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(ammeterX, bottomY, 24, 0, Math.PI * 2);
  ctx.fillStyle = "#ffffff"; ctx.fill();
  ctx.stroke();
  
  ctx.fillStyle = "#000";
  ctx.font = "18px system-ui, sans-serif";
  ctx.fillText("A", ammeterX - 6, bottomY + 6);
  
  if (isOn) {
    ctx.font = "13px system-ui, sans-serif";
    ctx.fillStyle = "#059669"; 
    ctx.fillText(`${i.toFixed(2)} A`, ammeterX - 20, bottomY + 45);
  }

  // ---------------------------------------------------------
  // 7. ВОЛЬТМЕТР (V) — Опущен ниже, перекрывает сквозной провод
  // ---------------------------------------------------------
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(currentKlemma3X, voltmeterY, 24, 0, Math.PI * 2);
  ctx.fillStyle = "#ffffff"; ctx.fill(); // Белая заливка маскирует линию под ним
  ctx.stroke();
  
  ctx.fillStyle = "#000";
  ctx.font = "18px system-ui, sans-serif";
  ctx.fillText("V", currentKlemma3X - 6, voltmeterY + 6);
  
  if (isOn) {
    ctx.font = "13px system-ui, sans-serif";
    ctx.fillStyle = "#059669";
    ctx.fillText(`${u.toFixed(1)} В`, currentKlemma3X - 18, voltmeterY + 45);
  }

  // ---------------------------------------------------------
  // 8. СТАТИЧЕСКАЯ ШКАЛА (5) И ПОДВИЖНЫЙ УКАЗАТЕЛЬ
  // ---------------------------------------------------------
  const scaleY = centerY + 45;
  const scaleBaseX = endX - 35; 
  
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(scaleBaseX - 50, scaleY); 
  ctx.lineTo(scaleBaseX + 110, scaleY);
  ctx.stroke();
  
  // Засечки шкалы
  ctx.font = "12px system-ui, sans-serif";
  ctx.fillStyle = "#000";
  for (let s = 0; s <= 15; s++) {
    const x = scaleBaseX - 40 + s * 10;
    ctx.beginPath();
    ctx.moveTo(x, scaleY);
    ctx.lineTo(x, scaleY + (s % 5 === 0 ? 10 : 5));
    ctx.stroke();
    
    if (s === 5) ctx.fillText("35", x - 7, scaleY + 24);
    if (s === 10) ctx.fillText("36", x - 7, scaleY + 24);
  }
  ctx.fillText("5", scaleBaseX - 50, scaleY + 20);

  // Красный индикатор (перемещается строго за клеммой 3)
  ctx.strokeStyle = "#dc2626";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(currentKlemma3X, centerY + 5);
  ctx.lineTo(currentKlemma3X, scaleY + 2);
  ctx.stroke();
}