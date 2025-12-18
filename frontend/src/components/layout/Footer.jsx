export default function Footer({ footerColumns, policyLinks }) {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="branding">
            <img src="/Shravo-logo.png" alt="Shravo" className="logo-mark" />
            <div className="brand-copy">
              <span className="logo-word">Shravo</span>
              <span className="logo-tagline">Listening Beyond Words,Understanding Beyond Limits Services</span>
            </div>
          </div>
          <p className="footer-tagline">Shravo · Listening Beyond Words,Understanding Beyond Limits Platform</p>
          <p className="footer-copy">CPaaS + CCaaS + AI Voice Automation engineered for autonomous operations.</p>
        </div>
        {footerColumns.map((column) => (
          <div className="footer-links" key={column.title}>
            <h4>{column.title}</h4>
            <ul>
              {column.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container footer-bottom">
        <span>
          © <span>{new Date().getFullYear()}</span> Shravo. All rights reserved.
        </span>
        <div className="policy-links">
          {policyLinks.map((link) => (
            <a href={link.href} key={link.label}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
