import { useState } from 'react';
import SectionHeader from '../SectionHeader';

export default function ContactSection({ highlights }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setError(null);
    
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      timeline: formData.get('timeline') + ' months',
      message: formData.get('message') || 'No message provided'
    };
    
    // Check if running on localhost (development)
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    if (isLocalhost) {
      // For local testing: use mailto
      const emailBody = `
Name: ${data.name}
Email: ${data.email}
Company: ${data.company}
Deployment Timeline: ${data.timeline}
Message: ${data.message}

---
Sent from Shravo Contact Form
      `.trim();
      
      const subject = `Contact Form Submission from ${data.name}`;
      const mailtoLink = `mailto:hello@shravo.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
      
      window.location.href = mailtoLink;
      
      setIsSending(false);
      setIsSubmitted(true);
      e.target.reset();
      setTimeout(() => setIsSubmitted(false), 5000);
      return;
    }
    
    // For production: use PHP backend
    try {
      const response = await fetch('/send-email.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      const result = await response.json();
      
      setIsSending(false);
      
      if (result.success) {
        // Show success message
        setIsSubmitted(true);
        
        // Reset form
        e.target.reset();
        
        // Reset success message after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        setError(result.message || 'Failed to send message. Please email us directly at hello@shravo.com');
        setTimeout(() => setError(null), 5000);
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setIsSending(false);
      setError('Failed to send message. Please email us directly at hello@shravo.com');
      setTimeout(() => setError(null), 5000);
    }
  };

  return (
    <section className="section" id="contact">
      <div className="container contact-grid">
        <div>
          <SectionHeader
            eyebrow="Let's Build"
            title="Launch a negotiated 3-month rollout"
            description="Shravo experts architect, deploy, and optimize your voice automation stack. Flexible budget, enterprise SLAs."
            align="left"
          />
          <ul className="contact-highlights">
            {highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </div>
        <form className="contact-form" aria-label="Contact Shravo" onSubmit={handleSubmit}>
          {isSubmitted && (
            <div className="form-success-message">
              ✓ Thank you! We'll reach out to you at the email provided within 24 hours to schedule your strategy call.
            </div>
          )}
          {error && (
            <div className="form-error-message">
              ✕ {error}
            </div>
          )}
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
          <button type="submit" className="cta-button full-width" disabled={isSending}>
            {isSending ? 'Sending...' : 'Schedule Strategy Call'}
          </button>
          <p className="compliance-note">We comply with RBI / TRAI / GDPR. No spam. NDA ready.</p>
        </form>
      </div>
    </section>
  );
}
