import { useCallback, useEffect, useMemo, useState } from 'react';
import ChatWidget from './components/ChatWidget';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ContactSection from './components/sections/ContactSection';
import EnterpriseSection from './components/sections/EnterpriseSection';
import InvestorSection from './components/sections/InvestorSection';
import {
  navLinks,
  enterpriseHero,
  enterprisePositioning,
  enterpriseProof,
  enterpriseServices,
  enterpriseIndustries,
  enterpriseTrust,
  investorHero,
  investorVision,
  investorProblem,
  investorSolution,
  investorMoat,
  investorMarket,
  investorBusinessModel,
  investorFunding,
  investorEquity,
  investorRoadmap,
  investorCta,
  contactHighlights,
  footerColumns,
  policyLinks
} from './data/content';

function App() {
  const sectionIds = useMemo(() => navLinks.map((link) => link.href.replace('#', '')), []);
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  const handleNavigate = useCallback((sectionId) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      { threshold: [0.35, 0.6], rootMargin: '-15% 0px -30% 0px' }
    );

    const observedSections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    observedSections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [sectionIds]);

  return (
    <div className="app">
      <div className="noise-overlay"></div>
      <Header navLinks={navLinks} activeSection={activeSection} onNavigate={handleNavigate} />
      <main>
        <EnterpriseSection
          hero={enterpriseHero}
          positioning={enterprisePositioning}
          proof={enterpriseProof}
          services={enterpriseServices}
          industries={enterpriseIndustries}
          trust={enterpriseTrust}
          onNavigate={handleNavigate}
        />
        <InvestorSection
          hero={investorHero}
          vision={investorVision}
          problem={investorProblem}
          solution={investorSolution}
          moat={investorMoat}
          market={investorMarket}
          businessModel={investorBusinessModel}
          funding={investorFunding}
          equity={investorEquity}
          roadmap={investorRoadmap}
          cta={investorCta}
          onNavigate={handleNavigate}
        />
        <ContactSection highlights={contactHighlights} />
      </main>
      <Footer footerColumns={footerColumns} policyLinks={policyLinks} />
      <ChatWidget />
    </div>
  );
}

export default App;
