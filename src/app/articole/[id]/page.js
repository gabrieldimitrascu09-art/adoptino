'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { DEMO_ARTICLES } from '@/data/demo';
import { useLang } from '@/lib/LanguageContext';

export default function ArticlePage() {
  const { id } = useParams();
  const { t, lang } = useLang();
  const article = DEMO_ARTICLES.find((a) => a.id === Number(id));

  if (!article) {
    return (
      <section className="section" style={{ paddingTop: 120, textAlign: 'center' }}>
        <div className="container">
          <div style={{ fontSize: 64, marginBottom: 16 }}>🔍</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, marginBottom: 12 }}>Articol negăsit</h1>
          <Link href="/articole" className="btn btn-primary">← {t('articles-badge')}</Link>
        </div>
      </section>
    );
  }

  const title = typeof article.title === 'object' ? (article.title[lang] || article.title.ro) : article.title;
  const tag = typeof article.tag === 'object' ? (article.tag[lang] || article.tag.ro) : article.tag;
  const readTime = typeof article.readTime === 'object' ? (article.readTime[lang] || article.readTime.ro) : article.readTime;
  const content = typeof article.content === 'object' ? (article.content[lang] || article.content.ro) : article.content;

  return (
    <section style={{ paddingTop: 100, paddingBottom: 60 }}>
      <div className="container" style={{ maxWidth: 760 }}>
        <Link href="/articole" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 15, fontWeight: 600, color: 'var(--text2)', marginBottom: 24 }}>
          ← {t('articles-badge')}
        </Link>
        <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700, background: 'var(--accent-light)', color: 'var(--accent)', marginBottom: 16 }}>
          {tag}
        </span>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, lineHeight: 1.2, marginBottom: 16 }}>
          {title}
        </h1>
        <div style={{ fontSize: 14, color: 'var(--text3)', marginBottom: 32 }}>
          {article.date} · {readTime}
        </div>
        <div style={{ borderRadius: 'var(--radius)', overflow: 'hidden', marginBottom: 40, height: 360 }}>
          <img src={article.image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ fontSize: 17, lineHeight: 1.85, color: 'var(--text2)' }} dangerouslySetInnerHTML={{ __html: content }} />
        <div style={{
          marginTop: 48, padding: 32,
          background: 'linear-gradient(135deg, var(--accent-light), var(--yellow-light))',
          borderRadius: 'var(--radius)', textAlign: 'center'
        }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>{t('cta-donate-title')}</h3>
          <p style={{ fontSize: 15, color: 'var(--text2)', marginBottom: 16 }}>{t('cta-donate-text')}</p>
          <a href="https://www.buymeacoffee.com/adoptino.ro" target="_blank" rel="noopener noreferrer" className="btn btn-coffee" style={{ fontSize: 16, padding: '14px 32px' }}>
            ☕ {t('nav-donate')}
          </a>
        </div>
        <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
          <Link href="/articole" className="btn btn-secondary">← {t('articles-badge')}</Link>
        </div>
      </div>
    </section>
  );
}