export default function SectionHeader({ eyebrow, title, description, align = 'center' }) {
  return (
    <header className={`section-header ${align}`}>
      {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
      <h2 className="section-title">{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </header>
  );
}
