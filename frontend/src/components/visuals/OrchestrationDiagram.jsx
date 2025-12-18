import './OrchestrationDiagram.css';

// Orchestration Diagram with Header
export default function OrchestrationDiagram({ onLaunch = () => {} }) {
  const handleLaunch = () => {
    onLaunch();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="orchestration-wrapper" aria-label="Shravo AI Orchestration Architecture">
      {/* Title and Description */}
      <div className="orchestration-header">
        <h2 className="orchestration-title">The Shravo Neural Mesh</h2>
        <p className="orchestration-subtitle">Autonomous AI orchestration that connects every touchpoint in your voice automation journey</p>
      </div>

      {/* Backdrop with animated orbs */}
      <div className="orchestration-backdrop" aria-hidden="true">
        <span className="orb orb--primary"></span>
        <span className="orb orb--accent"></span>
        <span className="orb orb--tertiary"></span>
      </div>

      {/* Animated data streams */}
      <div className="orchestration-stream orchestration-stream--inbound" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="orchestration-stream orchestration-stream--outbound" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="orchestration-stream orchestration-stream--analytics" aria-hidden="true">
        <span></span>
        <span></span>
      </div>

      {/* Grid structure */}
      <div className="orchestration-grid">
        {/* Grid axis lines */}
        <div className="orchestration-axis" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Orchestration Nodes */}
        <div className="orchestration-node orchestration-node--top-left orchestration-node--theme-inbound">
          <header>
            <h3>Inbound Streams</h3>
            <p>Voice · WhatsApp · IVR hooks</p>
          </header>
        </div>

        <div className="orchestration-node orchestration-node--center orchestration-node--theme-core">
          <header>
            <h3>AI Orchestration Core</h3>
            <p>LLM · ASR · TTS · NLU fusion</p>
          </header>
        </div>

        <div className="orchestration-node orchestration-node--top-right orchestration-node--theme-outbound">
          <header>
            <h3>Outbound Streams</h3>
            <p>Dialers · Bots · CRM webhooks</p>
          </header>
        </div>

        <div className="orchestration-node orchestration-node--mid-left orchestration-node--theme-normalise">
          <header>
            <h3>Signal Normalisation</h3>
            <p>Transcription · Entity maps · Intent vectors</p>
          </header>
        </div>

        {/* Central Core Trigger */}
        <div className="orchestration-core">
          <button type="button" className="core-trigger" onClick={handleLaunch}>
            <div className="core-trigger-inner">
              <span className="core-trigger-title">Shravo</span>
              <span className="core-trigger-title core-trigger-title--secondary">Neural Mesh</span>
              <span className="core-trigger-cta">Launch Campaign in 60s</span>
            </div>
          </button>
        </div>

        <div className="orchestration-node orchestration-node--mid-right orchestration-node--theme-decision">
          <header>
            <h3>Decision Fabric</h3>
            <p>Compliance · Risk · Smart routing</p>
          </header>
        </div>

        <div className="orchestration-node orchestration-node--bottom-left orchestration-node--theme-execution">
          <header>
            <h3>Execution Pods</h3>
            <p>Campaign managers · Workforce · Billing</p>
          </header>
        </div>

        <div className="orchestration-node orchestration-node--bottom-center orchestration-node--theme-leadership">
          <header>
            <h3>Leadership Command HUD</h3>
            <p>War-room visualisations · SLA beacons</p>
          </header>
        </div>

        <div className="orchestration-node orchestration-node--bottom-right orchestration-node--theme-analytics">
          <header>
            <h3>Reporting & Analytics Engine</h3>
            <p>Real-time dashboards · Forecasts · Alerts</p>
          </header>
        </div>

        {/* Connecting beams */}
        <div className="orchestration-beams" aria-hidden="true">
          <span className="beam beam--inbound"></span>
          <span className="beam beam--decision"></span>
          <span className="beam beam--execution"></span>
        </div>
      </div>
    </section>
  );
}
