import { useState } from 'react';
import SectionHeader from '../SectionHeader';

const sdkTabs = [
  { id: 'node', label: 'Node.js SDK' },
  { id: 'python', label: 'Python SDK' },
  { id: 'java', label: 'Java SDK' }
];

export default function DeveloperSection({ sdkCode, apis, sandboxDescription }) {
  const [activeTab, setActiveTab] = useState('node');

  return (
    <section id="developer" className="section">
      <div className="container developer-grid">
        <div>
          <SectionHeader
            eyebrow="Developer Platform"
            title="Integrate in minutes. Scale to billions of calls."
            description="SDKs, REST APIs, and webhooks power custom experiences, while sandbox and load testing tools keep experiments safe."
            align="left"
          />
          <div className="sdk-tabs" role="tablist">
            {sdkTabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <pre className="code-block" role="tabpanel">
            <code>{sdkCode[activeTab]}</code>
          </pre>
        </div>
        <div className="developer-side">
          <div className="api-surface">
            <h4>Featured APIs</h4>
            <ul>
              {apis.map((api) => (
                <li key={api.path}>
                  <code>{`${api.method} ${api.path}`}</code> – {api.description}
                </li>
              ))}
            </ul>
          </div>
          <div className="sandbox-card">
            <h4>Sandbox Environment</h4>
            <p>{sandboxDescription}</p>
            <button className="secondary-button">Access Sandbox</button>
          </div>
        </div>
      </div>
    </section>
  );
}
