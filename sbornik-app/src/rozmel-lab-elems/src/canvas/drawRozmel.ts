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

  const startX = 150;
  const endX = width - 250;
  const centerY = height / 3;

  // Лінії підключення до джерела (Рис. 6 - клеми справа)
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 2;
  
  // Клеми + та -
  ctx.beginPath();
  ctx.moveTo(endX + 150, centerY + 80); ctx.lineTo(endX + 50, centerY + 80); // до V
  ctx.moveTo(endX + 150, centerY + 180); ctx.lineTo(startX - 50, centerY + 180); // до A
  ctx.stroke();

  ctx.fillText("12 В (+)", endX + 160, centerY + 85);
  ctx.fillText("(-)", endX + 160, centerY + 185);

  // 1. Ніхромовий дріт (1) між клемами 2 та 3
  const heatColor = isOn && u > 0 ? `rgb(${70 + u * 15}, 70, 70)` : "#333";
  ctx.strokeStyle = heatColor;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(startX, centerY);
  ctx.lineTo(endX + dl * 20, centerY); // Візуальне зміщення вправо
  ctx.stroke();
  ctx.fillText("1", (startX + endX) / 2, centerY - 10);

  // 2. Клеми (2 та 3)
  ctx.fillStyle = "#000";
  ctx.beginPath();
  ctx.arc(startX, centerY, 5, 0, Math.PI * 2); ctx.fill();
  ctx.arc(endX + dl * 20, centerY, 5, 0, Math.PI * 2); ctx.fill();
  ctx.fillText("2", startX - 5, centerY - 15);
  ctx.fillText("3", endX + dl * 20 - 5, centerY - 15);

  // 3. Пружина (4)
  const springX = endX + dl * 20;
  const springWidth = 100 - dl * 20;
  ctx.strokeStyle = "#666";
  ctx.beginPath();
  ctx.moveTo(springX, centerY);
  for (let k = 0; k < 10; k++) {
    ctx.lineTo(springX + (k * springWidth) / 10, centerY + (k % 2 === 0 ? -10 : 10));
  }
  ctx.lineTo(springX + springWidth + 20, centerY);
  ctx.stroke();
  ctx.fillText("4", springX + springWidth / 2, centerY - 20);

  // 4. Амперметр (A) - знизу
  ctx.beginPath();
  ctx.arc(startX + 100, centerY + 180, 25, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = "#fff"; ctx.fill();
  ctx.fillStyle = "#000";
  ctx.fillText("A", startX + 96, centerY + 185);
  if (isOn) ctx.fillText(`${i.toFixed(2)} A`, startX + 85, centerY + 220);

  // 5. Вольтметр (V) - паралельно клеммі 3
  ctx.beginPath();
  ctx.arc(endX + 50, centerY + 80, 25, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = "#fff"; ctx.fill();
  ctx.fillStyle = "#000";
  ctx.fillText("V", endX + 46, centerY + 85);
  if (isOn) ctx.fillText(`${u.toFixed(1)} В`, endX + 35, centerY + 120);

  // 6. Шкала (5) з відмітками 35, 36 (як на схемі)
  const scaleY = centerY + 40;
  ctx.strokeStyle = "#000";
  ctx.beginPath();
  ctx.moveTo(endX - 100, scaleY); ctx.lineTo(endX + 50, scaleY);
  ctx.stroke();
  
  for (let s = 0; s <= 15; s++) {
    const x = endX - 75 + s * 10;
    ctx.moveTo(x, scaleY);
    ctx.lineTo(x, scaleY + (s % 5 === 0 ? 10 : 5));
    if (s === 5) ctx.fillText("35", x - 7, scaleY + 25);
    if (s === 10) ctx.fillText("36", x - 7, scaleY + 25);
  }
  ctx.stroke();

  // Покажчик на шкалі (прикріплений до клеми 3)
  ctx.strokeStyle = "red";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(endX + dl * 20, centerY);
  ctx.lineTo(endX + dl * 20, scaleY);
  ctx.stroke();
}