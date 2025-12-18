import SectionHeader from '../SectionHeader';
import OrchestrationDiagram from '../visuals/OrchestrationDiagram';

export default function EnterpriseSection({ hero, positioning, proof, industries, trust, onNavigate }) {
  return (
    <section id="enterprise" className="section enterprise-section">
      <div className="container enterprise-grid">
        <div className="enterprise-hero">
          <SectionHeader eyebrow={positioning.eyebrow} title={positioning.title} description={hero.subheadline} />
          <div className="cta-group">
            {hero.ctas.map((cta) => (
              <button key={cta.label} className="cta-button" onClick={() => onNavigate(cta.target)}>
                {cta.label}
              </button>
            ))}
          </div>
        </div>
        <div className="enterprise-aside">
          <h2>{hero.headline}</h2>
          <p className="positioning-footer">{positioning.footer}</p>
        </div>
      </div>

      <div className="container enterprise-services" id="enterprise-services">
        <SectionHeader
          eyebrow="What We Build For Clients"
          title="Engineering pods that deliver end-to-end voice infrastructure"
          description="From dialer cores to leadership war rooms, we build the systems that run your revenue engines."
          align="left"
        />
        <OrchestrationDiagram onLaunch={() => onNavigate('contact')} />
      </div>

      <div className="container enterprise-pillars" id="enterprise-pillars">
        <h3>We are a deep-tech voice engineering team that builds:</h3>
        <ul>
          {positioning.pillars.map((pillar, index) => (
            <li key={pillar}>
              <span className="pillar-index">{String(index + 1).padStart(2, '0')}</span>
              <span className="pillar-text">{pillar}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="container enterprise-proof" id="enterprise-proof">
        <div className="proof-heading">
          <span className="section-eyebrow">{proof.eyebrow}</span>
          <h2 className="section-title" role="presentation">
            <span>{proof.title}</span>
          </h2>
        </div>
        <div className="proof-grid">
          <div className="checklist">
            {proof.checks.map((check) => (
              <span key={check} className="check-item">
                <span className="check-icon" aria-hidden="true">✓</span>
                <span className="check-text">{check}</span>
              </span>
            ))}
          </div>
          <div className="statements">
            {proof.statements.map((statement) => (
              <p key={statement}>
                <span className="statement-accent"></span>
                <span>{statement}</span>
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="container enterprise-industries" id="enterprise-industries">
        <SectionHeader
          eyebrow="Industries"
          title={industries.title}
          description="We work with leadership teams that demand telecom-grade engineering and measurable outcomes."
        />
        <div className="industry-columns">
          {industries.columns.map((column, columnIndex) => (
            <ul key={columnIndex} className="industry-list">
              {column.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <div className="container enterprise-trust" id="enterprise-trust">
        <SectionHeader
          eyebrow="Why Trust Us"
          title={trust.title}
          description="You get a partner that owns delivery, compliance, and engineering depth from day zero."
        />
        <div className="trust-grid">
          {trust.points.map((point) => (
            <span key={point}>{point}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
