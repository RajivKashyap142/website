import SectionHeader from '../SectionHeader';

export default function WhySection({ items }) {
  return (
    <section id="why-shrava" className="section alt-bg">
      <div className="container">
        <SectionHeader
          eyebrow="Why Shrava"
          title="Why enterprises choose Shrava for voice automation"
          description="We combine revenue-grade dialers, AI-native conversations, autonomous operations, and leadership intelligence into one platform so you can command outcomes—not infrastructure."
        />
        <div className="why-grid">
          {items.map((item) => (
            <article className="why-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <ul>
                {item.bullets.map((bullet) => (
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
