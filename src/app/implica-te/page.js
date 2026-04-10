import ScrollReveal from '@/components/ScrollReveal';

export default function ImplicaPage() {
  const cards = [
    { icon: '🏠', title: 'Adoptă', text: 'Oferă o casă permanentă unui animal care așteaptă o familie.' },
    { icon: '🏡', title: 'Foster', text: 'Găzduiește temporar un animal până găsește un cămin definitiv.' },
    { icon: '☕', title: 'Donează', text: 'Contribuie financiar pentru mentenanța platformei.' },
    { icon: '🤝', title: 'Voluntariat', text: 'Ajută la adăpost, evenimente sau transport animale.' },
    { icon: '📢', title: 'Distribuie', text: 'Împărtășește anunțurile pe rețelele sociale.' },
    { icon: '📸', title: 'Fotografiază', text: 'Ajută cu fotografii profesionale pentru animale.' },
  ];

  return (
    <section className="section" style={{ paddingTop: 120 }}>
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <span className="section-badge">Implică-te</span>
            <h2 className="section-title">Fă diferența</h2>
            <p className="section-subtitle">Există multe moduri prin care poți ajuta animalele fără stăpân</p>
          </div>
        </ScrollReveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
          {cards.map((card, i) => (
            <ScrollReveal key={i} delay={i < 5 ? i : 0}>
              <div style={{
                background: 'var(--card)', borderRadius: 'var(--radius)', padding: '32px 28px',
                border: '1px solid var(--border)', textAlign: 'center', transition: 'all 0.3s'
              }}>
                <div style={{ fontSize: 48, marginBottom: 20 }}>{card.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, marginBottom: 12 }}>
                  {card.title}
                </h3>
                <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.6 }}>{card.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <a href="https://www.buymeacoffee.com/adoptino.ro" target="_blank" rel="noopener noreferrer"
              className="btn btn-coffee" style={{ fontSize: 17, padding: '18px 36px' }}>
              ☕ Susține platforma
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}