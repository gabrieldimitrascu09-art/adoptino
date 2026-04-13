'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import AnimalCard from '@/components/AnimalCard';
import FAQ from '@/components/FAQ';
import ScrollReveal from '@/components/ScrollReveal';
import HeroSearch from '@/components/HeroSearch';
import { useLang } from '@/lib/LanguageContext';
import { getAnimals, getAssociations, getFAQs, getStrapiMedia } from '@/lib/api';

// Funcție care transformă un animal din formatul Strapi în formatul pe care AnimalCard îl așteaptă
function mapStrapiAnimal(item) {
  const a = item.attributes || item;
 const images = Array.isArray(a.images)
    ? a.images.map((img) => img.url).filter(Boolean)
    : [];
  const assocData = a.association?.data || a.association;
  const assoc = assocData && assocData.id ? assocData : null;

  return {
    id: item.id,
    name: a.name || '',
    species: a.species || '',
    breed: a.breed || '',
    age: a.age_category || '',
    size: a.size || '',
    county: a.county || '',
    gender: a.gender || '',
    description: a.description || '',
    image: images[0] || '/placeholder-animal.jpg',
    images: images.length > 0 ? images : ['/placeholder-animal.jpg'],
    sterilized: a.sterilized || false,
    vaccinated: a.vaccinated || false,
    association: assoc ? {
      id: assoc.id,
      name: assoc.name || '',
      county: assoc.county || '',
    } : null,
  };
}

function mapStrapiFaq(item) {
  const f = item.attributes || item;
  return {
    id: item.id,
    question: f.question,
    answer: f.answer,
  };
}

export default function Home() {
  const { t } = useLang();
  const [animals, setAnimals] = useState([]);
  const [animalCount, setAnimalCount] = useState(0);
  const [assocCount, setAssocCount] = useState(0);
  const [faqItems, setFaqItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [animalsRes, assocsRes, faqsRes] = await Promise.all([
        getAnimals(),
        getAssociations(),
        getFAQs(),
      ]);

      if (animalsRes?.data) {
        const mapped = animalsRes.data.map(mapStrapiAnimal);
        setAnimals(mapped);
        setAnimalCount(animalsRes.meta?.pagination?.total || mapped.length);
      }
      if (assocsRes?.data) {
        setAssocCount(assocsRes.meta?.pagination?.total || assocsRes.data.length);
      }
      if (faqsRes?.data) {
        setFaqItems(faqsRes.data.map(mapStrapiFaq));
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const featuredAnimals = animals.slice(0, 6);

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={`${styles.heroShape} ${styles.heroShape1}`}></div>
          <div className={`${styles.heroShape} ${styles.heroShape2}`}></div>
        </div>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <div className={styles.heroBadge}>
              <span>🐾</span>
              <span>{t('hero-badge')}</span>
            </div>
            <h1 className={styles.heroTitle}>
              {t('hero-title-1')}<span className={styles.highlight}>{t('hero-title-2')}</span>{t('hero-title-3')}
            </h1>
            <p className={styles.heroLead}>{t('hero-lead')}</p>
            <HeroSearch />
            <div className={styles.heroStats}>
              <div className={styles.heroStat}>
                <div className={styles.heroStatValue}>{animalCount}</div>
                <div className={styles.heroStatLabel}>{t('stat-animals')}</div>
              </div>
              <div className={styles.heroStat}>
                <div className={styles.heroStatValue}>{assocCount}</div>
                <div className={styles.heroStatLabel}>{t('stat-assoc')}</div>
              </div>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.heroImageContainer}>
              <div className={styles.heroImageBlob}></div>
              <div className={styles.heroImage}>
                <img src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80" alt="Câine fericit" />
              </div>
              <div className={`${styles.floatingCard} ${styles.floatingCard1}`}>
                <div className={`${styles.floatingIcon} ${styles.floatingIconGreen}`}>✓</div>
                <div>
                  <div className={styles.floatingValue}>Verificat</div>
                  <div className={styles.floatingLabel}>Asociație parteneră</div>
                </div>
              </div>
              <div className={`${styles.floatingCard} ${styles.floatingCard2}`}>
                <div className={`${styles.floatingIcon} ${styles.floatingIconYellow}`}>🏠</div>
                <div>
                  <div className={styles.floatingValue}>Adoptat!</div>
                  <div className={styles.floatingLabel}>Familie fericită</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
            <ScrollReveal>
              <h2 className="section-title">{t('section-animals')}</h2>
            </ScrollReveal>
            <Link href="/adopta" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 15, fontWeight: 700, color: 'var(--accent)' }}>
              {t('see-all')}
            </Link>
          </div>
          {loading ? (
            <p style={{ textAlign: 'center', color: 'var(--text2)', padding: 40 }}>Se încarcă...</p>
          ) : featuredAnimals.length > 0 ? (
            <div className="animals-grid">
              {featuredAnimals.map((animal) => (
                <AnimalCard key={animal.id} animal={animal} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🐾</div>
              <p style={{ color: 'var(--text2)', fontSize: 16 }}>Încă nu sunt animale pe platformă. Fii prima asociație care adaugă!</p>
            </div>
          )}
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg2)' }}>
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <span className="section-badge">{t('badge-why')}</span>
              <h2 className="section-title">{t('benefits-title')}</h2>
              <p className="section-subtitle">{t('benefits-sub')}</p>
            </div>
          </ScrollReveal>
          <div className="benefits-grid">
            {[
              { icon: '❤️', title: t('b1-title'), text: t('b1-text'), bg: 'var(--accent-light)' },
              { icon: '🏥', title: t('b2-title'), text: t('b2-text'), bg: 'var(--green-light)' },
              { icon: '😊', title: t('b3-title'), text: t('b3-text'), bg: 'var(--blue-light)' },
              { icon: '🤝', title: t('b4-title'), text: t('b4-text'), bg: 'var(--yellow-light)' },
            ].map((b, i) => (
              <ScrollReveal key={i} delay={i}>
                <div className="benefit-card">
                  <div className="benefit-icon" style={{ background: b.bg }}>{b.icon}</div>
                  <h3 className="benefit-title">{b.title}</h3>
                  <p className="benefit-text">{b.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <span className="section-badge">{t('badge-how')}</span>
              <h2 className="section-title">{t('how-title')}</h2>
            </div>
          </ScrollReveal>
          <div className="steps-container">
            <div className="steps-timeline">
              {[
                { num: '1', emoji: '🔍', title: t('step1-title'), text: t('step1-text'), gradient: 'linear-gradient(135deg, var(--accent), var(--accent2))' },
                { num: '2', emoji: '📞', title: t('step2-title'), text: t('step2-text'), gradient: 'linear-gradient(135deg, var(--yellow), #f59e0b)' },
                { num: '3', emoji: '🏠', title: t('step3-title'), text: t('step3-text'), gradient: 'linear-gradient(135deg, var(--green), #16a34a)' },
              ].map((step, i) => (
                <ScrollReveal key={i} delay={i}>
                  <div className="step-item">
                    <div className="step-line">
                      <div className="step-number" style={{ background: step.gradient }}>{step.num}</div>
                      {i < 2 && <div className="step-connector"></div>}
                    </div>
                    <div className="step-content">
                      <h3><span className="step-emoji">{step.emoji}</span> {step.title}</h3>
                      <p>{step.text}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg2)' }}>
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <span className="section-badge">{t('badge-faq')}</span>
              <h2 className="section-title">{t('faq-title')}</h2>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            {faqItems.length > 0 ? (
              <FAQ items={faqItems} />
            ) : (
              <p style={{ textAlign: 'center', color: 'var(--text2)' }}>FAQ-urile vor apărea în curând.</p>
            )}
          </ScrollReveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="cta-section">
              <div className="cta-content">
                <h3>{t('cta-donate-title')}</h3>
                <p>{t('cta-donate-text')}</p>
              </div>
              <a href="https://www.buymeacoffee.com/adoptino.ro" target="_blank" rel="noopener noreferrer"
                className="btn btn-coffee" style={{ fontSize: 17, padding: '18px 36px' }}>
                ☕ Buy me a coffee
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section" style={{ paddingBottom: 40 }}>
        <div className="container">
          <ScrollReveal>
            <div className="newsletter-section">
              <div className="newsletter-content">
                <h3>{t('newsletter-title')}</h3>
                <p>{t('newsletter-text')}</p>
              </div>
              <form className="newsletter-form" action="#">
                <input type="email" placeholder="adresa@email.ro" required />
                <button type="submit">{t('newsletter-btn')}</button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div style={{
              background: 'var(--surface)', borderRadius: 'var(--radius)', padding: 48,
              textAlign: 'center', border: '1px solid var(--border)'
            }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, marginBottom: 12 }}>
                {t('cta-assoc-title')}
              </h3>
              <p style={{ fontSize: 16, color: 'var(--text2)', marginBottom: 24, maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>
                {t('cta-assoc-text')}
              </p>
              <Link href="/register" className="btn btn-primary">{t('cta-assoc-btn')}</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}