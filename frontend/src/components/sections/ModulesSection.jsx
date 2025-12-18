import SectionHeader from '../SectionHeader';

export default function ModulesSection({ modules }) {
  return (
    <section id="modules" className="section alt-bg">
      <div className="container">
        <SectionHeader
          eyebrow="Platform Highlight Sections"
          title="From dialer infrastructure to AI orchestration and leadership war rooms"
          description="Explore the Shravo platform components that automate conversations, scale infinitely, integrate seamlessly, and report revenue outcomes in real time."
        />
        <div className="module-grid">
          {modules.map((module) => (
            <article key={module.title} className="module-card">
              <div className="module-card__icon" aria-hidden="true">
                {module.icon ?? '⚙️'}
              </div>
              <div className="module-card__body">
                <h3>{module.title}</h3>
                <p>{module.description}</p>
                <ul>
                  {module.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
