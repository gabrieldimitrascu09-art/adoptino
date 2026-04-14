'use client';
import ScrollReveal from '@/components/ScrollReveal';
import { useLang } from '@/lib/LanguageContext';

export default function DesprePage() {
  const { t } = useLang();
  const values = [
    { icon: '🔍', title: t('despre-v1-title'), text: t('despre-v1-text') },
    { icon: '💰', title: t('despre-v2-title'), text: t('despre-v2-text') },
    { icon: '🤝', title: t('despre-v3-title'), text: t('despre-v3-text') },
    { icon: '🇷🇴', title: t('despre-v4-title'), text: t('despre-v4-text') },
  ];
  return (
    <>
      <div style={{
        padding: '120px 24px 60px', textAlign: 'center',
        background: 'linear-gradient(135deg, var(--accent-light), var(--yellow-light), var(--surface))'
      }}>
        <span className="section-badge">{t('despre-badge')}</span>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 44, fontWeight: 800, marginBottom: 16 }}>
          {t('despre-title')}
        </h1>
        <p style={{ fontSize: 18, color: 'var(--text2)', maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
          {t('despre-lead')}
        </p>
      </div>
      <section className="section">
        <div className="container" style={{ maxWidth: 800 }}>
          <ScrollReveal>
            <p style={{ fontSize: 17, color: 'var(--text2)', lineHeight: 1.8, marginBottom: 20 }}>
              {t('despre-p1')}
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <p style={{ fontSize: 17, color: 'var(--text2)', lineHeight: 1.8, marginBottom: 40 }}>
              {t('despre-p2')}
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, marginBottom: 24 }}>
              {t('despre-values')}
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