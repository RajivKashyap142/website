export default function WarRoomDetailSection() {
  return (
    <section className="section" id="warroom-detail">
      <div className="container dashboard-grid">
        <div className="dashboard-preview">
          <h2>AI Command Center: Leadership WAR ROOM Dashboard</h2>
          <p>
            Monitor live calls, track ROI per campaign, and interrogate performance with a conversational AI co-pilot.
            The dashboard visualizes workloads across clients, predicts conversion windows, and surfaces risk alerts before they impact revenue.
          </p>
          <div className="chat-demo" role="log" aria-live="polite">
            <div className="chat-entry user">“Why did Campaign X conversion drop today?”</div>
            <div className="chat-entry bot">
              <p>Drop driven by spike in silence duration on Hindi calls.</p>
              <ul>
                <li>Action: Increase ASR confidence threshold</li>
                <li>Recommendation: Boost CPS for English cluster</li>
              </ul>
            </div>
            <div className="chat-entry user">“Which client is leaking revenue?”</div>
            <div className="chat-entry bot">
              <p>Client NovaBank experiencing 12% drop. Suggest retarget with empathy script v4.</p>
            </div>
          </div>
        </div>
        <div className="dashboard-widgets">
          <div className="widget-row">
            <div className="widget-card">
              <h4>Conversion Forecast</h4>
              <div className="sparkline" data-chart="forecast"></div>
              <p className="widget-stat">+9.4% projected vs yesterday</p>
            </div>
            <div className="widget-card">
              <h4>Optimal Calling Windows</h4>
              <ul className="dot-list">
                <li>08:00 - 10:30 → 1.3x connects</li>
                <li>14:00 - 16:00 → 1.7x conversions</li>
                <li>19:00 - 21:30 → 0.8x risk alerts</li>
              </ul>
            </div>
          </div>
          <div className="widget-row">
            <div className="widget-card">
              <h4>Client Load Distribution</h4>
              <div className="radial-chart" data-chart="clients"></div>
              <p className="widget-stat">NovaBank · 32% | QuantaPay · 27% | Finova · 19%</p>
            </div>
            <div className="widget-card">
              <h4>Risk Pulse</h4>
              <p className="risk-score">0.02</p>
              <p className="widget-stat">AI guardrails neutralizing 97% incidents</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
