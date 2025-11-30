import SectionHeader from '../SectionHeader';

export default function AutomationSection({ features, nodes }) {
  return (
    <section id="automation" className="section alt-bg">
      <div className="container automation-grid">
        <div>
          <SectionHeader
            eyebrow="Autonomous Operations"
            title="The platform that runs itself"
            description="Shrava scales automatically, restarts services, optimises traffic, alerts anomalies, generates reports, and self-heals failures. Leadership only watches."
            align="left"
          />
          <ul className="feature-list">
            {features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>
        <div className="automation-visual" role="presentation">
          {nodes.map((node) => (
            <div className="automation-node" data-state={node.state} key={node.label}>
              {node.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
