'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import AnimalCard from '@/components/AnimalCard';
import { getAnimals, getStrapiMedia } from '@/lib/api';

function mapStrapiAnimal(item) {
  const a = item.attributes || item;
  const images = Array.isArray(a.images)
    ? a.images.map((img) => img.url).filter(Boolean)
    : [];
  const assocData = a.association?.data || a.association;
  const assoc = assocData && assocData.id ? assocData : null;

  return {
    id: item.id,
    documentId: item.documentId || null,
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
    goodWithKids: a.good_with_kids || false,
    goodWithPets: a.good_with_pets || false,
    houseTrained: a.house_trained || false,
    adoption_status: a.adoption_status || 'disponibil',
    association: assoc ? {
      id: assoc.id,
      name: assoc.name || '',
      county: assoc.county || '',
      phone: assoc.phone || '',
      email: assoc.email || '',
      website: assoc.website || '',
      verified: assoc.verified || false,
      image: assoc.logo?.url || null,
    } : null,
  };
}

export default function AnimalPage() {
  const { id } = useParams();
  const [animal, setAnimal] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);

  const [imgIndex, setImgIndex] = useState(0);
  const [showAdoptForm, setShowAdoptForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    async function load() {
      // Fetch all animals (we need them for similar too)
      const res = await getAnimals({
        populate: {
          images: true,
          association: {
            populate: { logo: true }
          }
        },
        pagination: { pageSize: 100 }
      });

      if (res?.data) {
        const allMapped = res.data.map(mapStrapiAnimal);
        // Find by documentId first (Strapi v5 uses documentId in URLs), fallback to id
        const found = allMapped.find((a) => a.documentId === id) || allMapped.find((a) => String(a.id) === String(id));

        if (found) {
          setAnimal(found);
          // Similar: same county or same species, excluding current
          const sim = allMapped
            .filter((a) => a.id !== found.id && (a.county === found.county || a.species === found.species))
            .slice(0, 3);
          setSimilar(sim);
        }
      }
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <section className="section" style={{ paddingTop: 120, textAlign: 'center' }}>
        <div className="container">
          <p style={{ color: 'var(--text2)', fontSize: 16 }}>Se încarcă...</p>
        </div>
      </section>
    );
  }

  if (!animal) {
    return (
      <section className="section" style={{ paddingTop: 120, textAlign: 'center' }}>
        <div className="container">
          <div style={{ fontSize: 64, marginBottom: 16 }}>🔍</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, marginBottom: 12 }}>Animal negăsit</h1>
          <p style={{ color: 'var(--text2)', marginBottom: 24 }}>Acest animal nu există sau a fost adoptat.</p>
          <Link href="/adopta" className="btn btn-primary">← Înapoi la adopții</Link>
        </div>
      </section>
    );
  }

  const images = animal.images || [];
  const assoc = animal.association;

  const traits = [
    { label: 'Sterilizat', value: animal.sterilized, icon: '✂️' },
    { label: 'Vaccinat', value: animal.vaccinated, icon: '💉' },
    { label: 'Bun cu copiii', value: animal.goodWithKids, icon: '👶' },
    { label: 'Bun cu alte animale', value: animal.goodWithPets, icon: '🐾' },
    { label: 'Obișnuit în casă', value: animal.houseTrained, icon: '🏠' },
  ];

  const speciesLabel = { caine: 'Câine', pisica: 'Pisică', alt: 'Altele' };
  const genderLabel = { mascul: 'Mascul', femela: 'Femelă' };
  const ageLabel = { pui: 'Pui', tanar: 'Tânăr', adult: 'Adult', senior: 'Senior' };
  const sizeLabel = { mic: 'Mic', mediu: 'Mediu', mare: 'Mare' };

  const validateAndSubmit = () => {
    const name = document.getElementById('adopt-name').value.trim();
    const phone = document.getElementById('adopt-phone').value.trim();
    const email = document.getElementById('adopt-email').value.trim();
    const city = document.getElementById('adopt-city').value.trim();
    const errors = {};

    if (!name) errors.name = true;
    if (!city) errors.city = true;

    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length !== 10) errors.phone = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const knownDomains = ['gmail.com','yahoo.com','yahoo.ro','outlook.com','hotmail.com','icloud.com','protonmail.com','mail.com','aol.com','live.com','proton.me','pm.me'];
    const domain = email.split('@')[1]?.toLowerCase();
    if (!emailRegex.test(email) || (!knownDomains.includes(domain) && !/\.(ro|org|net|eu|com)$/i.test(domain || ''))) {
      errors.email = true;
    }

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setShowAdoptForm(false);
    setShowSuccess(true);
  };

  return (
    <>
      <section style={{ paddingTop: 100, paddingBottom: 60 }}>
        <div className="container" style={{ maxWidth: 960 }}>
          <Link href="/adopta" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 15, fontWeight: 600, color: 'var(--text2)', marginBottom: 24 }}>
            ← Înapoi la adopții
          </Link>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'start' }}>
            {/* Image Gallery */}
            <div>
              <div onClick={() => setLightbox(true)} style={{
                borderRadius: 'var(--radius)', overflow: 'hidden', cursor: 'pointer',
                height: 400, position: 'relative', boxShadow: 'var(--shadow-lg)'
              }}>
                <img src={images[imgIndex]} alt={animal.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                {images.length > 1 && (
                  <>
                    <button onClick={(e) => { e.stopPropagation(); setImgIndex((imgIndex - 1 + images.length) % images.length); }}
                      style={arrowStyle('left')}>‹</button>
                    <button onClick={(e) => { e.stopPropagation(); setImgIndex((imgIndex + 1) % images.length); }}
                      style={arrowStyle('right')}>›</button>
                  </>
                )}
              </div>
              {images.length > 1 && (
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                  {images.map((img, i) => (
                    <div key={i} onClick={() => setImgIndex(i)} style={{
                      width: 72, height: 56, borderRadius: 8, overflow: 'hidden', cursor: 'pointer',
                      border: i === imgIndex ? '3px solid var(--accent)' : '3px solid transparent',
                      opacity: i === imgIndex ? 1 : 0.6, transition: 'all 0.3s'
                    }}>
                      <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                <span className="badge badge-species">{speciesLabel[animal.species] || animal.species}</span>
                <span className="badge badge-gender">{animal.gender === 'mascul' ? '♂' : '♀'} {genderLabel[animal.gender] || animal.gender}</span>
              </div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, marginBottom: 4 }}>{animal.name}</h1>
              <p style={{ fontSize: 15, color: 'var(--text3)', marginBottom: 16 }}>
                {animal.breed || ''}{animal.breed ? ' · ' : ''}{ageLabel[animal.age] || animal.age}{animal.size ? ` · ${sizeLabel[animal.size] || animal.size}` : ''}
              </p>
              <p style={{ fontSize: 13, color: 'var(--text3)', marginBottom: 20 }}>📍 {animal.county}{assoc ? ` · ${assoc.name}` : ''}</p>
              <p style={{ fontSize: 16, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 24 }}>{animal.description}</p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 8, marginBottom: 24 }}>
                {traits.map((t, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px',
                    borderRadius: 'var(--radius-xs)', fontSize: 13, fontWeight: 600,
                    background: t.value ? 'var(--green-light)' : '#fef2f2',
                    color: t.value ? 'var(--green)' : '#dc2626'
                  }}>{t.icon} {t.value ? '✓' : '✕'} {t.label}</div>
                ))}
              </div>

              <button onClick={() => setShowAdoptForm(true)}
                className="btn btn-primary" style={{ width: '100%', fontSize: 17, padding: '16px 32px', marginBottom: 12 }}>
                🐾 Vreau să adopt
              </button>

              {assoc && (
                <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
                  {assoc.phone && <a href={`tel:${assoc.phone}`} style={contactBtnStyle('var(--green-light)', 'var(--green)', '#a7f3d0')}>📞 {assoc.phone}</a>}
                  {assoc.email && <a href={`mailto:${assoc.email}`} style={contactBtnStyle('var(--blue-light)', 'var(--blue)', '#93c5fd')}>✉️ Email</a>}
                </div>
              )}

              {assoc && (
                <Link href={`/asociatii/${assoc.id}`} style={{ textDecoration: 'none', display: 'block' }}>
                  <div style={{
                    padding: 20, background: 'var(--surface)', borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border)', cursor: 'pointer', transition: 'all 0.3s'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 44, height: 44, borderRadius: 12, overflow: 'hidden', background: 'var(--bg2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {assoc.image ? (
                          <img src={assoc.image} alt={assoc.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <span style={{ fontSize: 20 }}>🏠</span>
                        )}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>
                          {assoc.name} {assoc.verified && <span style={{ color: 'var(--green)' }}>✓</span>}
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--text3)' }}>📍 {assoc.county}</div>
                      </div>
                      <span style={{ color: 'var(--accent)', fontSize: 18 }}>→</span>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          </div>

          {similar.length > 0 && (
            <div style={{ marginTop: 80 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, marginBottom: 24 }}>
                Alte animale care te-ar putea interesa
              </h2>
              <div className="animals-grid">
                {similar.map((a) => (
                  <AnimalCard key={a.id} animal={a} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Adoption Form Modal */}
      {showAdoptForm && (
        <div onClick={() => setShowAdoptForm(false)} style={overlayStyle}>
          <div onClick={(e) => e.stopPropagation()} style={modalStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700 }}>Cerere de adopție</h2>
              <button onClick={() => setShowAdoptForm(false)} style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: 'var(--text3)' }}>✕</button>
            </div>
            <p style={{ fontSize: 14, color: 'var(--text2)', marginBottom: 20 }}>
              Completează formularul pentru <strong>{animal.name}</strong>. Asociația te va contacta.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <input id="adopt-name" placeholder="Nume complet *" style={inputStyle(formErrors.name)} />
                {formErrors.name && <span style={errorText}>Numele este obligatoriu</span>}
              </div>
              <div>
                <input id="adopt-phone" placeholder="Telefon (10 cifre) *" style={inputStyle(formErrors.phone)} />
                {formErrors.phone && <span style={errorText}>Introdu exact 10 cifre</span>}
              </div>
              <div>
                <input id="adopt-email" type="email" placeholder="Email valid *" style={inputStyle(formErrors.email)} />
                {formErrors.email && <span style={errorText}>Introdu un email valid</span>}
              </div>
              <div>
                <input id="adopt-city" placeholder="Orașul tău *" style={inputStyle(formErrors.city)} />
                {formErrors.city && <span style={errorText}>Orașul este obligatoriu</span>}
              </div>
              <select style={{ padding: '12px 16px', border: '2px solid var(--border)', borderRadius: 'var(--radius-xs)', fontSize: 15, background: 'white' }}>
                <option value="">Tip locuință</option>
                <option value="apartament">Apartament</option>
                <option value="casa">Casă</option>
              </select>
              <textarea placeholder="De ce vrei să adopți? Experiență cu animale?" rows={3}
                style={{ padding: '12px 16px', border: '2px solid var(--border)', borderRadius: 'var(--radius-xs)', fontSize: 15, outline: 'none', resize: 'vertical' }} />
              <button className="btn btn-primary" style={{ width: '100%', fontSize: 16, padding: '14px 28px' }}
                onClick={validateAndSubmit}>
                Trimite cererea
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {showSuccess && (
        <div onClick={() => setShowSuccess(false)} style={overlayStyle}>
          <div onClick={(e) => e.stopPropagation()} style={{
            ...modalStyle, textAlign: 'center', maxWidth: 440, padding: '48px 32px'
          }}>
            <div style={{ fontSize: 80, marginBottom: 8, animation: 'pulse 1s ease-in-out' }}>💛</div>
            <div style={{
              width: 80, height: 80, margin: '0 auto 20px', borderRadius: '50%',
              background: 'var(--green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 40, animation: 'fadeUp 0.5s ease'
            }}>✓</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, marginBottom: 12, color: 'var(--text)' }}>
              Felicitări pentru acest pas frumos!
            </h2>
            <p style={{ fontSize: 16, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 8 }}>
              Cererea ta de adopție pentru <strong>{animal.name}</strong> a fost trimisă cu succes.
            </p>
            <p style={{ fontSize: 15, color: 'var(--text3)', lineHeight: 1.6, marginBottom: 24 }}>
              {assoc ? <>Asociația <strong>{assoc.name}</strong> te va contacta în curând. </> : ''}Mulțumim că alegi să adopți! 🐾
            </p>
            <button onClick={() => setShowSuccess(false)}
              className="btn btn-primary" style={{ fontSize: 16, padding: '14px 32px' }}>
              Înapoi la profil
            </button>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div onClick={() => setLightbox(false)} style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 300,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <button onClick={() => setLightbox(false)} style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', color: 'white', fontSize: 32, cursor: 'pointer' }}>✕</button>
          {images.length > 1 && (
            <>
              <button onClick={(e) => { e.stopPropagation(); setImgIndex((imgIndex - 1 + images.length) % images.length); }}
                style={{ ...arrowStyle('left'), position: 'absolute', left: 20, background: 'rgba(255,255,255,0.2)', width: 50, height: 50, fontSize: 28 }}>‹</button>
              <button onClick={(e) => { e.stopPropagation(); setImgIndex((imgIndex + 1) % images.length); }}
                style={{ ...arrowStyle('right'), position: 'absolute', right: 20, background: 'rgba(255,255,255,0.2)', width: 50, height: 50, fontSize: 28 }}>›</button>
            </>
          )}
          <img src={images[imgIndex]} alt={animal.name} onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain', borderRadius: 8 }} />
          <div style={{ position: 'absolute', bottom: 20, color: 'white', fontSize: 14 }}>{imgIndex + 1} / {images.length}</div>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          section > div > div { grid-template-columns: 1fr !important; }
        }
        @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.15); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </>
  );
}

const arrowStyle = (side) => ({
  position: 'absolute', [side]: 12, top: '50%', transform: 'translateY(-50%)',
  width: 40, height: 40, borderRadius: '50%', background: 'rgba(0,0,0,0.5)',
  border: 'none', color: 'white', fontSize: 20, cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center'
});

const overlayStyle = {
  position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200,
  display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24
};

const modalStyle = {
  background: 'var(--card)', borderRadius: 'var(--radius)', padding: 32,
  maxWidth: 500, width: '100%', maxHeight: '90vh', overflowY: 'auto'
};

const inputStyle = (hasError) => ({
  width: '100%', padding: '12px 16px',
  border: `2px solid ${hasError ? '#dc2626' : 'var(--border)'}`,
  borderRadius: 'var(--radius-xs)', fontSize: 15, outline: 'none'
});

const errorText = { fontSize: 12, color: '#dc2626', marginTop: 4, display: 'block' };

const contactBtnStyle = (bg, color, border) => ({
  flex: 1, padding: '12px', borderRadius: 'var(--radius-xs)',
  background: bg, color: color, fontSize: 15, fontWeight: 600,
  textAlign: 'center', textDecoration: 'none', border: `2px solid ${border}`
});
