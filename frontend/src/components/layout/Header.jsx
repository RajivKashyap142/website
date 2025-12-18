import { useEffect, useState } from 'react';

export default function Header({ navLinks, activeSection, onNavigate }) {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('nav-open', isMobileNavOpen);

    return () => {
      document.body.classList.remove('nav-open');
    };
  }, [isMobileNavOpen]);

  const handleLinkClick = (sectionId) => {
    onNavigate(sectionId);
    setMobileNavOpen(false);
  };

  return (
    <>
      <header className="site-header">
        <div className="container header-content">
          <div className="branding">
            <img src="/Shravo-logo.png?v=3" alt="Shravo" className="logo-mark" />
            <div className="brand-copy">
              {/* <span className="logo-word">Shravo</span> */}
              <span className="logo-tagline">
                Listening Beyond Words<br />Understanding Beyond Limits
              </span>
            </div>
          </div>

          <div className="header-controls">
            <nav
              className={`main-nav ${isMobileNavOpen ? 'is-open' : ''}`.trim()}
              aria-label="Primary navigation"
            >
              {navLinks.map((link) => {
                const sectionId = link.href.replace('#', '');
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={activeSection === sectionId ? 'active' : ''}
                    onClick={(event) => {
                      event.preventDefault();
                      handleLinkClick(sectionId);
                    }}
                  >
                    {link.label}
                  </a>
                );
              })}
              <button
                type="button"
                className="cta-button mobile-nav-cta"
                onClick={() => handleLinkClick('contact')}
              >
                Book Intelligence Demo
              </button>
            </nav>

            <button
              type="button"
              className="mobile-nav-toggle"
              aria-expanded={isMobileNavOpen}
              aria-controls="site-primary-nav"
              onClick={() => setMobileNavOpen((open) => !open)}
            >
              <span className="mobile-nav-label">{isMobileNavOpen ? 'Close' : 'Menu'}</span>
              <span className="hamburger" aria-hidden="true">
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
              </span>
            </button>

            <button className="cta-button" onClick={() => handleLinkClick('contact')}>
              Book Intelligence Demo
            </button>
          </div>
        </div>
      </header>
      {isMobileNavOpen && (
        <div
          className="mobile-nav-backdrop is-visible"
          onClick={() => setMobileNavOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
