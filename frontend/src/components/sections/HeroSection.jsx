import NetworkCanvas from '../NetworkCanvas';
import GlobeCanvas from '../GlobeCanvas';

const formatter = {
  calls: (v) => v.toLocaleString('en-IN'),
  ai: (v) => v.toLocaleString('en-IN'),
  revenue: (v) => `₹${v.toFixed(1)} Cr`,
  conversion: (v) => `${v.toFixed(1)}%`,
  answer: (v) => `${v.toFixed(1)}%`,
  risk: (v) => v.toFixed(0)
};

export default function HeroSection({ metrics, metricsBase, highlights, onNavigate }) {
  const callsDelta = (metrics.calls / metricsBase.calls - 1) * 100;
  const callsPerMinute = Math.max(1, Math.round(metrics.calls / 60));
  const revenueLift = ((metrics.revenue / metricsBase.revenue - 1) * 100).toFixed(1);
  const successRate = formatter.answer(metrics.answer);

  const stats = [
    {
      label: 'Active Calls',
      value: formatter.calls(metrics.calls),
      meta: `${callsDelta >= 0 ? '+' : ''}${callsDelta.toFixed(1)}% vs last minute`
    },
    {
      label: 'AI Conversations',
      value: formatter.ai(metrics.ai),
      meta: 'Intent, emotion, compliance aware'
    },
    {
      label: 'Calls / Minute',
      value: callsPerMinute.toLocaleString('en-IN'),
      meta: 'Across Shravo delivery pods'
    },
    {
      label: 'Revenue Generated Today',
      value: formatter.revenue(metrics.revenue),
      meta: `${revenueLift >= 0 ? '+' : ''}${revenueLift}% vs plan`
    },
    {
      label: 'Success Rate',
      value: successRate,
      meta: 'Connects · conversions · compliance'
    }
  ];

  return (
    <section id="war-room" className="hero-section">
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="hero-badge">AI Voice Automation &amp; Dialer Platform for Enterprises</div>
          <p className="tagline">Built for CTOs, CXOs, and high-volume contact centres who demand revenue-grade infrastructure.</p>
          <h1>
            Run millions of conversations.
            <br />
            See intelligence in real time.
          </h1>
          <p className="subtitle">
            Shravo powers 2 Crore+ calls every day with ultra-scalable dialer infrastructure, AI-led orchestration, and
            autonomous command centres. Deploy, observe, and optimise voice revenue engines with live analytics and zero downtime.
          </p>
          <div className="hero-highlights" role="list">
            {highlights.map((highlight) => (
              <div key={highlight.label} className="hero-highlight" role="listitem">
                <span className="hero-label">{highlight.label}</span>
                <strong>{highlight.value}</strong>
              </div>
            ))}
          </div>
          <div className="hero-actions">
            <button className="cta-button" onClick={() => onNavigate('contact')}>
              Request Demo
            </button>
            <button className="secondary-button" onClick={() => onNavigate('modules')}>
              Explore Platform
            </button>
            <button className="ghost-button" onClick={() => onNavigate('contact')}>
              Talk to Architect
            </button>
          </div>
        </div>
        <div className="hero-dashboard" role="presentation">
          <div className="dashboard-card">
            <h3>Live Network Pulse</h3>
            <NetworkCanvas />
            <div className="chip-strip">
              <span className="status-chip">Latency &lt; 240ms</span>
              <span className="status-chip">SLA 99.99%</span>
              <span className="status-chip">Failover Active</span>
            </div>
          </div>
          <div className="stats-grid" role="list">
            {stats.map((stat) => (
              <article className="stat-card" role="listitem" key={stat.label}>
                <span className="label">{stat.label}</span>
                <span className="value">{stat.value}</span>
                <span className="trend">{stat.meta}</span>
              </article>
            ))}
          </div>
        </div>
      </div>
      <div className="globe" role="presentation">
        <GlobeCanvas />
      </div>
    </section>
  );
}
