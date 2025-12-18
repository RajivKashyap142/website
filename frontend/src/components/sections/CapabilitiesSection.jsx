import SectionHeader from '../SectionHeader';

export default function CapabilitiesSection({ capabilities }) {
  return (
    <section id="capabilities" className="section">
      <div className="container">
        <SectionHeader
          eyebrow="What We Do"
          title="We don’t run calls. We run revenue engines."
          description="Shravo builds intelligent voice infrastructure that automates conversations, scales infinitely, integrates seamlessly, and reports outcomes in real time."
        />
        <div className="capabilities-grid">
          {capabilities.map((capability) => (
            <article key={capability.title} className="capability-card">
              <h3>{capability.title}</h3>
              <ul>
                {capability.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
