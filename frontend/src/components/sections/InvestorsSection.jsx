import SectionHeader from '../SectionHeader';

export default function InvestorsSection({ highlights, cards }) {
  return (
    <section id="investors" className="section">
      <div className="container investors-grid">
        <div>
          <SectionHeader
            eyebrow="Investor Update"
            title="Scaling Shrava with strategic capital"
            description="Shrava transforms enterprise voice operations with AI-driven CPaaS/CCaaS delivery. We are raising Pre-Series A capital to accelerate delivery pods, compliance tooling, and go-to-market partnerships."
            align="left"
          />
          <div className="investor-highlights" role="list">
            {highlights.map((item) => (
              <div className="investor-highlight" role="listitem" key={item.label}>
                <span className="label">{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </div>
        <div className="investor-cards">
          {cards.map((card) => (
            <article className="investor-card" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <ul>
                {card.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
