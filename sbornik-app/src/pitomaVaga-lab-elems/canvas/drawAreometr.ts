export function drawAreometer(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  p1: number,
  p2: number,
  p3: number,
  bodyState: 'none' | 'air' | 'water',
  bodyWeightNewtons: number,
  bodyArchimedes: number
) {
  ctx.clearRect(0, 0, width, height);

  const centerX = width / 2;
  const waterLevel = height * 0.55;

  // --- НАСТРОЙКА ЧУВСТВИТЕЛЬНОСТИ И МАСШТАБА ---
  // При p1 = 0 риска плавает выше воды ровно на 110 пикселей (колба в воде, горлышко снаружи)
  const baseStartingY = waterLevel - 110;
  
  // Коэффициент погружения: 220 пикселей на 1 Ньютон. 
  // При весе грузиков ровно 0.5 Н прибор опустится на 110 пикселей (220 * 0.5 = 110) и встанет на риску!
  const pixelsPerNewton = 220; 

  let addedWeight = 0;

  // --- ЛОГІКА СИЛ ДЛЯ КОНКРЕТНОГО ЕТАПУ ---
  if (bodyState === 'none') {
    // Отрисовка и расчет идут чисто по P1
    addedWeight = p1;
  } else if (bodyState === 'air') {
    // Отрисовка идет по P2. Тело лежит сверху -> добавляет свой вес, утягивая ареометр под воду
    addedWeight = p2 + bodyWeightNewtons;
  } else if (bodyState === 'water') {
    // Отрисовка идет по P3. Тело висит в воде -> добавляет вес, но выталкивается силой Архимеда вверх
    addedWeight = p3 + bodyWeightNewtons - bodyArchimedes;
  }

  // Финальная координата риски по Y
  const currentY = baseStartingY + (addedWeight * pixelsPerNewton);

  // Ограничитель, чтобы прибор не улетал в космос или на дно полностью
  const clampedY = Math.max(waterLevel - 180, Math.min(waterLevel + 180, currentY));

  // --- ВІЗУАЛІЗАЦІЯ ---
  // Вода
  ctx.fillStyle = "#e0f2fe";
  ctx.fillRect(0, waterLevel, width, height - waterLevel);

  // Ареометр (Колба)
  ctx.strokeStyle = "#475569";
  ctx.lineWidth = 2;
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.beginPath();
  ctx.ellipse(centerX, clampedY + 110, 32, 58, 0, 0, Math.PI * 2);
  ctx.fill(); ctx.stroke();
  
  // Горлышко
  ctx.fillRect(centerX - 5, clampedY - 90, 10, 145);
  ctx.strokeRect(centerX - 5, clampedY - 90, 10, 145);

  // Красная риска
  ctx.strokeStyle = "red";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(centerX - 15, clampedY); 
  ctx.lineTo(centerX + 15, clampedY); 
  ctx.stroke();

  // Чашки
  ctx.fillStyle = "#1e293b";
  ctx.fillRect(centerX - 35, clampedY - 95, 70, 6);  // Верхняя
  ctx.fillRect(centerX - 25, clampedY + 170, 50, 6); // Нижняя

  // --- МАЛЮВАННЯ ТІЛА ---
  if (bodyState === 'air') {
    // Тело сверху на чашке рядом с важками
    ctx.fillStyle = "#4b5563";
    ctx.beginPath(); 
    ctx.arc(centerX + 16, clampedY - 106, 10, 0, Math.PI * 2); 
    ctx.fill();
  } else if (bodyState === 'water') {
    // Тело под водой на нижнем крючке
    ctx.fillStyle = "#374151";
    ctx.beginPath(); 
    ctx.arc(centerX, clampedY + 186, 10, 0, Math.PI * 2); 
    ctx.fill();
  }

  // --- МАЛЮВАННЯ ВАЖКІВ ---
  const displayedWeights = bodyState === 'none' ? p1 : (bodyState === 'air' ? p2 : p3);
  if (displayedWeights > 0) {
    ctx.fillStyle = "#f59e0b";
    const weightSize = Math.min(38, 12 + displayedWeights * 40);
    ctx.fillRect(centerX - weightSize / 2, clampedY - 95 - weightSize, weightSize, weightSize);
  }
}