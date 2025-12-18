import SectionHeader from '../SectionHeader';

export default function RoadmapSection({ phases, kpis, usps }) {
  return (
    <section className="section alt-bg" id="roadmap">
      <div className="container roadmap-grid">
        <div>
          <SectionHeader
            eyebrow="Industries We Power"
            title="Voice automation engineered for high-impact sectors"
            description="Shravo runs conversations for banking, fintech, telecom, healthcare, ecommerce, logistics, government, and more—with regulatory readiness built-in."
            align="left"
          />
          <ol className="roadmap-list">
            {phases.map((phase) => (
              <li key={phase.title}>
                <h3>{phase.title}</h3>
                <p>{phase.description}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="kpi-panel">
          <h3>Customer Voices</h3>
          <ul className="kpi-list">
            {kpis.map((kpi) => (
              <li key={kpi}>{kpi}</li>
            ))}
          </ul>
          <div className="usp-grid">
            {usps.map((usp) => (
              <span key={usp}>{usp}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
