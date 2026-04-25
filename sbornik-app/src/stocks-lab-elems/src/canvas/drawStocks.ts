export function drawStocks(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  t: number,
  l: number,
  d: number
) {
  ctx.clearRect(0, 0, width, height);
  const centerX = width / 2;
  
  // Константи візуалізації
  const cylinderWidth = 80;
  const mPos = 100; // Фіксована верхня мітка
  const scaleL = 400; // Масштаб для l
  const nPos = mPos + (l * scaleL); // Нижня мітка залежить від l
  
  // Малюємо рідину (циліндр трохи довший за n)
  ctx.fillStyle = "rgba(186, 230, 253, 0.6)";
  ctx.fillRect(centerX - cylinderWidth / 2, 40, cylinderWidth, nPos + 40);
  
  // Контур циліндра
  ctx.strokeStyle = "#475569";
  ctx.lineWidth = 2;
  ctx.strokeRect(centerX - cylinderWidth / 2, 40, cylinderWidth, nPos + 40);

  // Мітки m та n
  ctx.strokeStyle = "red";
  ctx.lineWidth = 2;
  
  // m
  ctx.beginPath();
  ctx.moveTo(centerX - cylinderWidth / 2 - 10, mPos);
  ctx.lineTo(centerX + cylinderWidth / 2 + 10, mPos);
  ctx.stroke();
  
  // n
  ctx.beginPath();
  ctx.moveTo(centerX - cylinderWidth / 2 - 10, nPos);
  ctx.lineTo(centerX + cylinderWidth / 2 + 10, nPos);
  ctx.stroke();

  // Малюємо кульку
  // Якщо t > 0, шар рухається від m до n
  const visualD = Math.max(5, d * 1500); 
  let ballY = mPos; 

  if (t > 0) {
    const physicalTime = (18 * 1.48 * l) / (Math.pow(d, 2) * (7800 - 1260) * 9.81);
    const progress = Math.min(1, t / physicalTime);
    ballY = mPos + (nPos - mPos) * progress;
  }

  const grad = ctx.createRadialGradient(centerX - 2, ballY - 2, 1, centerX, ballY, visualD / 2);
  grad.addColorStop(0, "#94a3b8");
  grad.addColorStop(1, "#1e293b");

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(centerX, ballY, visualD / 2, 0, Math.PI * 2);
  ctx.fill();
}