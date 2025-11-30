import SectionHeader from '../SectionHeader';

export default function ContactSection({ highlights }) {
  return (
    <section className="section" id="contact">
      <div className="container contact-grid">
        <div>
          <SectionHeader
            eyebrow="Let's Build"
            title="Launch a negotiated 3-month rollout"
            description="Shrava experts architect, deploy, and optimize your voice automation stack. Flexible budget, enterprise SLAs."
            align="left"
          />
          <ul className="contact-highlights">
            {highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </div>
        <form className="contact-form" aria-label="Contact Shrava">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" placeholder="Your name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Work Email</label>
            <input type="email" id="email" name="email" placeholder="name@company.com" required />
          </div>
          <div className="form-group">
            <label htmlFor="company">Company</label>
            <input type="text" id="company" name="company" placeholder="Organization" required />
          </div>
          <div className="form-group">
            <label htmlFor="timeline">Deployment Timeline</label>
            <select id="timeline" name="timeline">
              <option value="3">3 Months</option>
              <option value="2">2 Months (Fast Track)</option>
              <option value="1">1 Month (Mission Critical)</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="message">Project Brief</label>
            <textarea
              id="message"
              name="message"
              placeholder="Tell us about your goals, scale, and integrations."
              rows="4"
            ></textarea>
          </div>
          <button type="submit" className="cta-button full-width">
            Schedule Strategy Call
          </button>
          <p className="compliance-note">We comply with RBI / TRAI / GDPR. No spam. NDA ready.</p>
        </form>
      </div>
    </section>
  );
}
