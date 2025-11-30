import SectionHeader from '../SectionHeader';

export default function CredibilitySection({ logos }) {
  return (
    <section id="credibility" className="section micro-section">
      <div className="container credibility-grid">
        <div className="credibility-copy">
          <SectionHeader
            eyebrow="Trusted by leaders"
            title="Mission-critical teams rely on Shrava for accountable voice automation"
            description="Digital-first banks, fintech unicorns, and telecom majors deploy Shrava for conversational revenue, regulatory resilience, and 24/7 AI command operations."
            align="left"
          />
        </div>
        <div className="credibility-logos" role="list">
          {logos.map((logo) => (
            <span className="logo-chip" role="listitem" key={logo}>
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
