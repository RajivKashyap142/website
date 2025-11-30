import { useEffect, useRef } from 'react';

export default function GlobeCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const { width: w, height: h } = canvas;
    const centerX = w / 2;
    const centerY = h / 2;
    const radius = Math.min(w, h) / 2 - 20;

    const dots = Array.from({ length: 140 }, () => ({
      lat: Math.random() * Math.PI - Math.PI / 2,
      lon: Math.random() * Math.PI * 2,
      speed: 0.002 + Math.random() * 0.004
    }));

    let animationFrame;

    const project = (lat, lon) => {
      const x = radius * Math.cos(lat) * Math.sin(lon);
      const y = radius * Math.sin(lat);
      const scale = (Math.cos(lon) + 1.5) / 2.5;
      return { x: centerX + x * scale, y: centerY + y * scale, scale };
    };

    const step = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = 'rgba(5, 7, 16, 0.85)';
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = 'rgba(21, 241, 255, 0.18)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(Date.now() * 0.00002);
      ctx.strokeStyle = 'rgba(21, 241, 255, 0.12)';
      for (let i = -Math.PI / 2; i <= Math.PI / 2; i += Math.PI / 6) {
        ctx.beginPath();
        for (let j = -Math.PI; j <= Math.PI; j += Math.PI / 32) {
          const x = radius * Math.cos(i) * Math.cos(j);
          const y = radius * Math.sin(i);
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.restore();

      dots.forEach((dot) => {
        dot.lon += dot.speed;
        const { x, y, scale } = project(dot.lat, dot.lon);
        if (scale <= 0) return;
        const size = 1.8 + scale * 2.6;
        ctx.fillStyle = `rgba(141, 139, 255, ${0.2 + scale * 0.5})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(step);
    };

    step();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return <canvas id="globeCanvas" width="420" height="420" aria-hidden="true" ref={canvasRef} />;
}
