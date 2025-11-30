const baseMetrics = {
  calls: 6_270,
  ai: 2_666,
  revenue: 3.2,
  conversion: 40.1,
  answer: 73.4,
  risk: 3
};

const formatters = {
  calls: (v) => v.toLocaleString("en-IN"),
  ai: (v) => v.toLocaleString("en-IN"),
  revenue: (v) => `₹${v.toFixed(1)} Cr`,
  conversion: (v) => `${v.toFixed(1)}%`,
  answer: (v) => `${v.toFixed(1)}%`,
  risk: (v) => v.toFixed(0)
};

const sdkButtons = document.querySelectorAll(".sdk-tabs button");
const codePanels = document.querySelectorAll("[data-sdk-panel]");
const statValues = document.querySelectorAll("[data-metric]");
const trendElements = document.querySelectorAll("[data-trend]");
const yearSpan = document.getElementById("year");

const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

function randomInRange(min, max) {
  return min + Math.random() * (max - min);
}

function computeSnapshot() {
  const loadFactor = randomInRange(0.94, 1.08);
  const qualityFactor = randomInRange(0.96, 1.05);
  const stabilityFactor = randomInRange(0.97, 1.04);

  const calls = Math.round(baseMetrics.calls * loadFactor);
  const aiRatio = baseMetrics.ai / baseMetrics.calls;
  const ai = Math.round(calls * aiRatio * lerp(0.98, 1.02, Math.random()));

  const revenue = clamp(baseMetrics.revenue * loadFactor * stabilityFactor, 2.2, 3.8);
  const conversion = clamp(
    baseMetrics.conversion * (0.6 * qualityFactor + 0.4 * stabilityFactor),
    34,
    48
  );
  const answer = clamp(baseMetrics.answer * qualityFactor, 65, 86);
  const risk = clamp(
    Math.round(baseMetrics.risk * (1.08 - (qualityFactor - 1) * 1.6 - (stabilityFactor - 1) * 1.2)),
    0,
    9
  );

  return { calls, ai, revenue, conversion, answer, risk };
}

function updateMetrics(snapshot) {
  statValues.forEach((el) => {
    const key = el.dataset.metric;
    const value = snapshot[key];
    const format = formatters[key];
    if (value == null || !format) return;

    el.textContent = format(value);
  });

  trendElements.forEach((el) => {
    const key = el.dataset.trend;

    switch (key) {
      case "calls": {
        const delta = ((snapshot.calls / baseMetrics.calls) - 1) * 100;
        el.textContent = `${delta >= 0 ? "+" : ""}${delta.toFixed(1)}% vs last hour`;
        el.classList.toggle("positive", delta >= 0);
        el.classList.toggle("negative", delta < 0);
        break;
      }
      case "revenue": {
        const roi = 32 * (snapshot.revenue / baseMetrics.revenue);
        el.textContent = `ROI ${roi >= 0 ? "+" : ""}${roi.toFixed(0)}%`;
        break;
      }
      case "conversion": {
        const forecast = 9 * (snapshot.conversion / baseMetrics.conversion);
        el.textContent = `Forecast ${forecast >= 0 ? "+" : ""}${forecast.toFixed(0)}%`;
        break;
      }
      case "risk": {
        if (snapshot.risk <= 2) {
          el.textContent = "Realtime Guardrails";
        } else if (snapshot.risk <= 5) {
          el.textContent = "Monitoring light alerts";
        } else {
          el.textContent = "Escalation in progress";
        }
        break;
      }
      default:
        break;
    }
  });
}

function cycleMetrics() {
  const snapshot = computeSnapshot();
  updateMetrics(snapshot);
  setTimeout(cycleMetrics, 4500 + Math.random() * 4500);
}

function setupSdkTabs() {
  sdkButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      sdkButtons.forEach((b) => b.setAttribute("aria-selected", String(b === btn)));
      codePanels.forEach((panel) => {
        const isActive = panel.dataset.sdkPanel === btn.dataset.sdk;
        panel.classList.toggle("hidden", !isActive);
        if (isActive) panel.setAttribute("aria-hidden", "false");
        else panel.setAttribute("aria-hidden", "true");
      });
    });
  });
}

function animateNetwork() {
  const canvas = document.getElementById("networkCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  const nodes = Array.from({ length: 16 }, (_, i) => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6,
    pulse: Math.random() * Math.PI * 2,
    id: i
  }));

  function step() {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "rgba(17, 21, 44, 0.9)";
    ctx.fillRect(0, 0, w, h);

    ctx.save();
    ctx.translate(0.5, 0.5);
    nodes.forEach((node) => {
      node.x += node.vx;
      node.y += node.vy;
      node.pulse += 0.035;
      if (node.x < 0 || node.x > w) node.vx *= -1;
      if (node.y < 0 || node.y > h) node.vy *= -1;

      ctx.fillStyle = "rgba(21, 241, 255, 0.18)";
      ctx.beginPath();
      ctx.arc(node.x, node.y, 80, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.globalCompositeOperation = "lighter";

    nodes.forEach((a, index) => {
      for (let j = index + 1; j < nodes.length; j += 1) {
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 160) {
          ctx.strokeStyle = `rgba(78, 87, 255, ${lerp(0.05, 0.45, 1 - dist / 160)})`;
          ctx.lineWidth = lerp(0.3, 1.2, 1 - dist / 160);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    });

    nodes.forEach((node) => {
      const radius = lerp(3.4, 6.6, (Math.sin(node.pulse) + 1) / 2);
      ctx.fillStyle = "#8d8bff";
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();

    requestAnimationFrame(step);
  }

  step();
}

function animateGlobe() {
  const canvas = document.getElementById("globeCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  const centerX = w / 2;
  const centerY = h / 2;
  const radius = Math.min(w, h) / 2 - 20;

  const dots = Array.from({ length: 140 }, () => ({
    lat: (Math.random() * Math.PI) - Math.PI / 2,
    lon: Math.random() * Math.PI * 2,
    speed: 0.002 + Math.random() * 0.004
  }));

  function project(lat, lon) {
    const x = radius * Math.cos(lat) * Math.sin(lon);
    const y = radius * Math.sin(lat);
    const scale = (Math.cos(lon) + 1.5) / 2.5; // fake depth
    return { x: centerX + x * scale, y: centerY + y * scale, scale };
  }

  function step() {
    ctx.clearRect(0, 0, w, h);

    const gradient = ctx.createRadialGradient(centerX, centerY, radius * 0.2, centerX, centerY, radius);
    gradient.addColorStop(0, "rgba(21, 241, 255, 0.08)");
    gradient.addColorStop(1, "rgba(78, 87, 255, 0.25)");

    ctx.fillStyle = "rgba(5, 7, 16, 0.85)";
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = "rgba(21, 241, 255, 0.18)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(Date.now() * 0.00002);
    ctx.strokeStyle = "rgba(21, 241, 255, 0.12)";
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
      const size = lerp(1.8, 4.4, scale);
      ctx.fillStyle = `rgba(141, 139, 255, ${lerp(0.2, 0.7, scale)})`;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(step);
  }

  step();
}

window.addEventListener("DOMContentLoaded", () => {
  setupSdkTabs();
  cycleMetrics();
  animateNetwork();
  animateGlobe();
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});
