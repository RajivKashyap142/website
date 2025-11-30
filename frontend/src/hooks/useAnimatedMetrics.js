import { useEffect, useState } from 'react';

export default function useAnimatedMetrics(base) {
  const [metrics, setMetrics] = useState(base);

  useEffect(() => {
    let timeoutId;

    const lerp = (a, b, t) => a + (b - a) * t;
    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
    const randomInRange = (min, max) => min + Math.random() * (max - min);

    const update = () => {
      const loadFactor = randomInRange(0.94, 1.08);
      const qualityFactor = randomInRange(0.96, 1.05);
      const stabilityFactor = randomInRange(0.97, 1.04);

      const calls = Math.round(base.calls * loadFactor);
      const aiRatio = base.ai / base.calls;
      const ai = Math.round(calls * aiRatio * lerp(0.98, 1.02, Math.random()));
      const revenue = clamp(base.revenue * loadFactor * stabilityFactor, 2.2, 3.8);
      const conversion = clamp(base.conversion * (0.6 * qualityFactor + 0.4 * stabilityFactor), 34, 48);
      const answer = clamp(base.answer * qualityFactor, 65, 86);
      const risk = clamp(
        Math.round(base.risk * (1.08 - (qualityFactor - 1) * 1.6 - (stabilityFactor - 1) * 1.2)),
        0,
        9
      );

      setMetrics({ calls, ai, revenue, conversion, answer, risk });
      timeoutId = window.setTimeout(update, 4500 + Math.random() * 4500);
    };

    update();
    return () => window.clearTimeout(timeoutId);
  }, [base]);

  return metrics;
}
