import ScrollReveal from '@/components/ScrollReveal';

export default function DesprePage() {
  const values = [
    { icon: '🔍', title: 'Transparență', text: 'Fiecare asociație este verificată înainte de a fi listată.' },
    { icon: '💰', title: 'Zero costuri', text: 'Gratuit pentru asociații și pentru cei care adoptă.' },
    { icon: '🤝', title: 'Adopție responsabilă', text: 'Promovăm potrivirea corectă între animal și familie.' },
    { icon: '🇷🇴', title: 'Făcut în România', text: 'Construit în Iași, cu drag pentru animale.' },
  ];

  return (
    <>
      <div style={{
        padding: '120px 24px 60px', textAlign: 'center',
        background: 'linear-gradient(135deg, var(--accent-light), var(--yellow-light), var(--surface))'
      }}>
        <span className="section-badge">Despre noi</span>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 44, fontWeight: 800, marginBottom: 16 }}>
          Construim punți între animale și oameni
        </h1>
        <p style={{ fontSize: 18, color: 'var(--text2)', maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
          Adoptino a luat naștere din dragoste pentru animale și dorința de a le oferi o a doua șansă la viață.
        </p>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: 800 }}>
          <ScrollReveal>
            <p style={{ fontSize: 17, color: 'var(--text2)', lineHeight: 1.8, marginBottom: 20 }}>
              Am construit Adoptino ca un <strong style={{ color: 'var(--text)' }}>hub gratuit</strong> care conectează asociațiile cu adoptatorii. Nu vindem nimic, nu luăm comision. Totul a pornit dintr-o pasiune: de ce nu există un loc central pentru adopții în România?
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <p style={{ fontSize: 17, color: 'var(--text2)', lineHeight: 1.8, marginBottom: 40 }}>
              La început, doar asociațiile verificate pot posta. Pe viitor, vom deschide și pentru persoane fizice responsabile.
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, marginBottom: 24 }}>
              Valorile noastre
            </h2>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20 }}>
            {values.map((val, i) => (
              <ScrollReveal key={i} delay={i}>
                <div style={{
                  background: 'var(--card)', borderRadius: 'var(--radius)', padding: 28,
                  border: '1px solid var(--border)', transition: 'all 0.3s', height: '100%'
                }}>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                    {val.icon} {val.title}
                  </h4>
                  <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.6 }}>{val.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginTop: 48 }}>
              <p style={{ fontSize: 16, color: 'var(--text2)' }}>
                Contact: <strong><a href="mailto:contact@adoptino.ro" style={{ color: 'var(--accent)' }}>contact@adoptino.ro</a></strong>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}