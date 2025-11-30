import { useEffect, useRef } from 'react';

export default function NetworkCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const { width: w, height: h } = canvas;
    const nodes = Array.from({ length: 16 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      pulse: Math.random() * Math.PI * 2
    }));

    let animationFrame;

    const step = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = 'rgba(17, 21, 44, 0.9)';
      ctx.fillRect(0, 0, w, h);

      ctx.save();
      ctx.translate(0.5, 0.5);

      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += 0.035;
        if (node.x < 0 || node.x > w) node.vx *= -1;
        if (node.y < 0 || node.y > h) node.vy *= -1;

        ctx.fillStyle = 'rgba(21, 241, 255, 0.18)';
        ctx.beginPath();
        ctx.arc(node.x, node.y, 80, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalCompositeOperation = 'lighter';

      nodes.forEach((a, index) => {
        for (let j = index + 1; j < nodes.length; j += 1) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 160) {
            const ratio = 1 - dist / 160;
            ctx.strokeStyle = `rgba(78, 87, 255, ${0.05 + ratio * 0.4})`;
            ctx.lineWidth = 0.3 + ratio * 0.9;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      });

      nodes.forEach((node) => {
        const radius = 3.4 + (Math.sin(node.pulse) + 1) * 1.6;
        ctx.fillStyle = '#8d8bff';
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();
      animationFrame = requestAnimationFrame(step);
    };

    step();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return <canvas id="networkCanvas" width="360" height="200" aria-hidden="true" ref={canvasRef} />;
}
