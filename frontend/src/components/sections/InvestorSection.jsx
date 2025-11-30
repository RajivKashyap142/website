import SectionHeader from '../SectionHeader';

export default function InvestorSection({
  hero,
  vision,
  problem,
  solution,
  moat,
  market,
  businessModel,
  funding,
  equity,
  roadmap,
  cta,
  onNavigate
}) {
  return (
    <section id="investors" className="section investor-section">
      <div className="container investor-hero">
        <div>
          <h2>{hero.headline}</h2>
          <p className="investor-subheadline">{hero.subheadline}</p>
        </div>
        <div className="cta-group">
          {hero.ctas.map((item) => (
            <button key={item.label} className="cta-button" onClick={() => onNavigate(item.target)}>
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="container" id="investor-vision">
        <SectionHeader eyebrow="Vision" title={vision.title} description={vision.description} align="left" />
      </div>

      <div className="container investor-grid">
        <article id="investor-problem" className="investor-card">
          <h3>{problem.title}</h3>
          <ul>
            {problem.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article id="investor-solution" className="investor-card">
          <h3>{solution.title}</h3>
          <ul>
            {solution.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article id="investor-moat" className="investor-card">
          <h3>{moat.title}</h3>
          <ul>
            {moat.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>

      <div className="container investor-highlight" id="investor-market">
        <SectionHeader eyebrow="Market" title={market.title} description={market.description} align="left" />
      </div>

      <div className="container investor-grid">
        <article id="investor-business-model" className="investor-card">
          <h3>{businessModel.title}</h3>
          <ul>
            {businessModel.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article id="investor-funding" className="investor-card">
          <h3>{funding.title}</h3>
          <ul>
            {funding.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article id="investor-equity" className="investor-card">
          <h3>{equity.title}</h3>
          <ul>
            {equity.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>

      <div className="container investor-roadmap" id="investor-roadmap">
        <SectionHeader
          eyebrow="Roadmap"
          title="Execution Phases"
          description="Capital accelerates our journey from IP to platform to global adoption."
          align="left"
        />
        <ol>
          {roadmap.map((phase) => (
            <li key={phase.label}>
              <span className="phase-label">{phase.label}</span>
              <p>{phase.description}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="container investor-cta" id="investor-cta">
        <SectionHeader
          eyebrow="Investor CTA"
          title={cta.title}
          description="We are ready to partner with investors who understand infrastructure, AI voice, and long-term value creation."
          align="left"
        />
        <div className="cta-card">
          <div className="contact-links">
            {cta.items.map((item) => (
              <a key={item.label} href={item.href} className="cta-link">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </a>
            ))}
          </div>
          <div className="cta-extras">
            <h4>Optional add-ons</h4>
            <ul>
              {cta.extras.map((extra) => (
                <li key={extra}>{extra}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
