export default function Header({ navLinks, activeSection, onNavigate }) {
  return (
    <header className="site-header">
      <div className="container header-content">
        <div className="branding">
          <img src="/shrava-logo.svg" alt="Shrava" className="logo-mark" />
          <div className="brand-copy">
            <span className="logo-word">Shrava</span>
          </div>
        </div>
        <nav className="main-nav" aria-label="Primary navigation">
          {navLinks.map((link) => {
            const sectionId = link.href.replace('#', '');
            return (
              <a
                key={link.href}
                href={link.href}
                className={activeSection === sectionId ? 'active' : ''}
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate(sectionId);
                }}
              >
                {link.label}
              </a>
            );
          })}
        </nav>
        <button className="cta-button" onClick={() => onNavigate('contact')}>
          Book Intelligence Demo
        </button>
      </div>
    </header>
  );
}
