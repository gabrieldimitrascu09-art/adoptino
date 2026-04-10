import Link from 'next/link';
import styles from './page.module.css';
import AnimalCard from '@/components/AnimalCard';
import FAQ from '@/components/FAQ';
import ScrollReveal from '@/components/ScrollReveal';
import { getAnimals, getAssociations, getStrapiMedia } from '@/lib/api';
import { DEMO_ANIMALS, DEMO_ASSOCIATIONS, DEMO_FAQ, COUNTIES } from '@/data/demo';

function transformStrapiAnimal(strapiAnimal) {
  const attrs = strapiAnimal;
  const assoc = attrs.association;
  const images = attrs.images?.map((img) => getStrapiMedia(img)) || [];

  return {
    id: attrs.id,
    name: attrs.name,
    species: attrs.species === 'caine' ? 'Câine' : attrs.species === 'pisica' ? 'Pisică' : 'Altele',
    breed: attrs.breed || '',
    age: attrs.age_category || '',
    size: attrs.size === 'mic' ? 'Mică' : attrs.size === 'mediu' ? 'Medie' : attrs.size === 'mare' ? 'Mare' : '',
    gender: attrs.gender === 'mascul' ? 'Mascul' : attrs.gender === 'femela' ? 'Femelă' : '',
    county: attrs.county || '',
    images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80'],
    desc: attrs.description || '',
    sterilized: attrs.sterilized,
    vaccinated: attrs.vaccinated,
    goodWithKids: attrs.good_with_kids,
    goodWithPets: attrs.good_with_pets,
    goodForApartment: attrs.house_trained,
    associationName: assoc?.name || '',
  };
}

export default async function Home() {
  const animalsData = await getAnimals();
  const associationsData = await getAssociations();

  let animals = DEMO_ANIMALS;
  let animalCount = DEMO_ANIMALS.length;
  let assocCount = DEMO_ASSOCIATIONS.length;

  if (animalsData?.data?.length > 0) {
    animals = animalsData.data.map((a) => transformStrapiAnimal(a));
    animalCount = animalsData.meta?.pagination?.total || animals.length;
  }
  if (associationsData?.data?.length > 0) {
    assocCount = associationsData.meta?.pagination?.total || associationsData.data.length;
  }

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
              <span>Platforma de adopții din România</span>
            </div>
            <h1 className={styles.heroTitle}>
              Găsește-ți <span className={styles.highlight}>prietenul</span> pe viață
            </h1>
            <p className={styles.heroLead}>
              Conectăm asociațiile de protecție a animalelor cu oamenii care vor să adopte. Fără profit, doar cu suflet.
            </p>
            <div className={styles.heroSearch}>
              <div className={styles.heroSearchField} style={{ flex: 2 }}>
                <input type="text" placeholder="Caută câine, pisică, Rex..." />
              </div>
              <div className={styles.heroSearchField} style={{ minWidth: 220 }}>
                <select defaultValue="">
                  <option value="">Toate județele</option>
                  {COUNTIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <Link href="/adopta" className="btn btn-primary" style={{ padding: '14px 28px', whiteSpace: 'nowrap' }}>
                Caută
              </Link>
            </div>
            <div className={styles.heroStats}>
              <div className={styles.heroStat}>
                <div className={styles.heroStatValue}>{animalCount}</div>
                <div className={styles.heroStatLabel}>Animale disponibile</div>
              </div>
              <div className={styles.heroStat}>
                <div className={styles.heroStatValue}>{assocCount}</div>
                <div className={styles.heroStatLabel}>Asociații partenere</div>
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
              <h2 className="section-title">Animale care așteaptă o familie</h2>
            </ScrollReveal>
            <Link href="/adopta" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 15, fontWeight: 700, color: 'var(--accent)' }}>
              Vezi toate →
            </Link>
          </div>
          <div className="animals-grid">
            {featuredAnimals.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg2)' }}>
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <span className="section-badge">De ce să adopți</span>
              <h2 className="section-title">Adopția schimbă două vieți</h2>
              <p className="section-subtitle">A ta și a animalului care așteaptă o a doua șansă</p>
            </div>
          </ScrollReveal>
          <div className="benefits-grid">
            {[
              { icon: '❤️', title: 'Salvezi o viață', text: 'Fiecare adopție eliberează un loc în adăpost pentru un alt animal.', bg: 'var(--accent-light)' },
              { icon: '🏥', title: 'Animale sănătoase', text: 'Animalele vin vaccinate, sterilizate și cu control veterinar.', bg: 'var(--green-light)' },
              { icon: '😊', title: 'Îți îmbunătățești viața', text: 'Studiile arată că animalele reduc stresul și anxietatea.', bg: 'var(--blue-light)' },
              { icon: '🤝', title: 'Combati abandonul', text: 'Adopția responsabilă reduce numărul animalelor de pe stradă.', bg: 'var(--yellow-light)' },
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
              <span className="section-badge">Cum funcționează</span>
              <h2 className="section-title">Trei pași simpli</h2>
            </div>
          </ScrollReveal>
          <div className="steps-container">
            <div className="steps-timeline">
              {[
                { num: '1', emoji: '🔍', title: 'Caută', text: 'Folosește filtrele pentru a găsi animalul perfect: după județ, specie, vârstă sau talie.', gradient: 'linear-gradient(135deg, var(--accent), var(--accent2))' },
                { num: '2', emoji: '📞', title: 'Contactează', text: 'Sună direct asociația sau completează formularul de adopție online.', gradient: 'linear-gradient(135deg, var(--yellow), #f59e0b)' },
                { num: '3', emoji: '🏠', title: 'Adoptă', text: 'Stabilești o întâlnire, cunoști animalul și, dacă e potrivire, îl iei acasă.', gradient: 'linear-gradient(135deg, var(--green), #16a34a)' },
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
              <span className="section-badge">Întrebări frecvente</span>
              <h2 className="section-title">Ai întrebări? Avem răspunsuri</h2>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <FAQ items={DEMO_FAQ} />
          </ScrollReveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="cta-section">
              <div className="cta-content">
                <h3>Susține platforma cu o cafea ☕</h3>
                <p>Adoptino e gratuit pentru toată lumea. Contribuția ta ne ajută să ținem platforma activă.</p>
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
                <h3>Abonează-te la newsletter</h3>
                <p>Primește notificări cu noi animale disponibile pentru adopție.</p>
              </div>
            <form className="newsletter-form" action="#">
                <input type="email" placeholder="adresa@email.ro" required />
                <button type="submit">Abonare</button>
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
                Ești asociație de protecție?
              </h3>
              <p style={{ fontSize: 16, color: 'var(--text2)', marginBottom: 24, maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>
                Alătură-te Adoptino. Listează animale gratuit și găsește-le familii iubitoare.
              </p>
              <Link href="/register" className="btn btn-primary">Înscrie asociația</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}