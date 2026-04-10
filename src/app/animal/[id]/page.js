'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { DEMO_ANIMALS, DEMO_ASSOCIATIONS } from '@/data/demo';

export default function AnimalPage() {
  const { id } = useParams();
  const animal = DEMO_ANIMALS.find((a) => a.id === Number(id));
  const assoc = animal ? DEMO_ASSOCIATIONS.find((a) => a.id === animal.assocId) : null;

  const [imgIndex, setImgIndex] = useState(0);
  const [showAdoptForm, setShowAdoptForm] = useState(false);
  const [lightbox, setLightbox] = useState(false);

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

  const traits = [
    { label: 'Sterilizat', value: animal.sterilized, icon: '✂️' },
    { label: 'Vaccinat', value: animal.vaccinated, icon: '💉' },
    { label: 'Bun cu copiii', value: animal.goodWithKids, icon: '👶' },
    { label: 'Bun cu alte animale', value: animal.goodWithPets, icon: '🐾' },
    { label: 'Potrivit pentru bloc', value: animal.goodForApartment, icon: '🏢' },
  ];

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
              <div
                onClick={() => setLightbox(true)}
                style={{
                  borderRadius: 'var(--radius)', overflow: 'hidden', cursor: 'pointer',
                  height: 400, position: 'relative', boxShadow: 'var(--shadow-lg)'
                }}>
                <img src={images[imgIndex]} alt={animal.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                {images.length > 1 && (
                  <>
                    <button onClick={(e) => { e.stopPropagation(); setImgIndex((imgIndex - 1 + images.length) % images.length); }}
                      style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 40, height: 40, borderRadius: '50%', background: 'rgba(0,0,0,0.5)', border: 'none', color: 'white', fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      ‹
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); setImgIndex((imgIndex + 1) % images.length); }}
                      style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', width: 40, height: 40, borderRadius: '50%', background: 'rgba(0,0,0,0.5)', border: 'none', color: 'white', fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      ›
                    </button>
                  </>
                )}
              </div>
              {images.length > 1 && (
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                  {images.map((img, i) => (
                    <div key={i} onClick={() => setImgIndex(i)}
                      style={{
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
                <span className="badge badge-species">{animal.species}</span>
                <span className="badge badge-gender">{animal.gender === 'Mascul' ? '♂' : '♀'} {animal.gender}</span>
              </div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, marginBottom: 4 }}>
                {animal.name}
              </h1>
              <p style={{ fontSize: 15, color: 'var(--text3)', marginBottom: 16 }}>
                {animal.breed} · {animal.age} · {animal.size}
              </p>
              <p style={{ fontSize: 13, color: 'var(--text3)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 4 }}>
                📍 {animal.county}{assoc ? ` · ${assoc.name}` : ''}
              </p>
              <p style={{ fontSize: 16, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 24 }}>
                {animal.desc}
              </p>

              {/* Traits */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 8, marginBottom: 24 }}>
                {traits.map((t, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px',
                    borderRadius: 'var(--radius-xs)', fontSize: 13, fontWeight: 600,
                    background: t.value ? 'var(--green-light)' : '#fef2f2',
                    color: t.value ? 'var(--green)' : '#dc2626'
                  }}>
                    {t.icon} {t.value ? '✓' : '✕'} {t.label}
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <button onClick={() => setShowAdoptForm(true)}
                className="btn btn-primary" style={{ width: '100%', fontSize: 17, padding: '16px 32px', marginBottom: 12 }}>
                🐾 Vreau să adopt
              </button>

              {assoc && (
                <div style={{ display: 'flex', gap: 12 }}>
                  <a href={`tel:${assoc.phone}`} style={{
                    flex: 1, padding: '12px', borderRadius: 'var(--radius-xs)',
                    background: 'var(--green-light)', color: 'var(--green)', fontSize: 15,
                    fontWeight: 600, textAlign: 'center', textDecoration: 'none', border: '2px solid #a7f3d0'
                  }}>📞 {assoc.phone}</a>
                  <a href={`mailto:${assoc.email}`} style={{
                    flex: 1, padding: '12px', borderRadius: 'var(--radius-xs)',
                    background: 'var(--blue-light)', color: 'var(--blue)', fontSize: 15,
                    fontWeight: 600, textAlign: 'center', textDecoration: 'none', border: '2px solid #93c5fd'
                  }}>✉️ Email</a>
                </div>
              )}

              {/* Association Card */}
              {assoc && (
                <div style={{
                  marginTop: 24, padding: 20, background: 'var(--surface)',
                  borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, overflow: 'hidden' }}>
                      <img src={assoc.image} alt={assoc.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700 }}>
                        {assoc.name} {assoc.verified && <span style={{ color: 'var(--green)' }}>✓</span>}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--text3)' }}>📍 {assoc.county} · Din {assoc.year}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Adoption Form Modal */}
      {showAdoptForm && (
        <div onClick={() => setShowAdoptForm(false)} style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            background: 'var(--card)', borderRadius: 'var(--radius)', padding: 32,
            maxWidth: 500, width: '100%', maxHeight: '90vh', overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700 }}>Cerere de adopție</h2>
              <button onClick={() => setShowAdoptForm(false)}
                style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: 'var(--text3)' }}>✕</button>
            </div>
            <p style={{ fontSize: 14, color: 'var(--text2)', marginBottom: 20 }}>
              Completează formularul pentru <strong>{animal.name}</strong>. Asociația te va contacta.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <input placeholder="Nume complet *" required style={{ padding: '12px 16px', border: '2px solid var(--border)', borderRadius: 'var(--radius-xs)', fontSize: 15, outline: 'none' }} />
              <input placeholder="Telefon *" required style={{ padding: '12px 16px', border: '2px solid var(--border)', borderRadius: 'var(--radius-xs)', fontSize: 15, outline: 'none' }} />
              <input type="email" placeholder="Email *" required style={{ padding: '12px 16px', border: '2px solid var(--border)', borderRadius: 'var(--radius-xs)', fontSize: 15, outline: 'none' }} />
              <input placeholder="Orașul tău *" required style={{ padding: '12px 16px', border: '2px solid var(--border)', borderRadius: 'var(--radius-xs)', fontSize: 15, outline: 'none' }} />
              <select style={{ padding: '12px 16px', border: '2px solid var(--border)', borderRadius: 'var(--radius-xs)', fontSize: 15, background: 'white' }}>
                <option value="">Tip locuință</option>
                <option value="apartament">Apartament</option>
                <option value="casa">Casă</option>
                <option value="curte">Casă cu curte</option>
              </select>
              <textarea placeholder="De ce vrei să adopți? Experiență cu animale?" rows={3}
                style={{ padding: '12px 16px', border: '2px solid var(--border)', borderRadius: 'var(--radius-xs)', fontSize: 15, outline: 'none', resize: 'vertical' }} />
              <button className="btn btn-primary" style={{ width: '100%', fontSize: 16, padding: '14px 28px' }}
                onClick={() => { setShowAdoptForm(false); alert('Mulțumim! Asociația te va contacta în curând.'); }}>
                Trimite cererea
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div onClick={() => setLightbox(false)} style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 300,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <button onClick={() => setLightbox(false)}
            style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', color: 'white', fontSize: 32, cursor: 'pointer' }}>✕</button>
          <button onClick={(e) => { e.stopPropagation(); setImgIndex((imgIndex - 1 + images.length) % images.length); }}
            style={{ position: 'absolute', left: 20, background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', fontSize: 28, width: 50, height: 50, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>‹</button>
          <img src={images[imgIndex]} alt={animal.name} onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain', borderRadius: 8 }} />
          <button onClick={(e) => { e.stopPropagation(); setImgIndex((imgIndex + 1) % images.length); }}
            style={{ position: 'absolute', right: 20, background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', fontSize: 28, width: 50, height: 50, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>›</button>
          <div style={{ position: 'absolute', bottom: 20, color: 'white', fontSize: 14 }}>
            {imgIndex + 1} / {images.length}
          </div>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          section > div > div:last-of-type {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}