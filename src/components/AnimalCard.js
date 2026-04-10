'use client';
import { useState } from 'react';

export default function AnimalCard({ animal }) {
  const [imgIndex, setImgIndex] = useState(0);
  const images = animal.images || [];
  const hasMultiple = images.length > 1;
  const assocName = animal.associationName || '';

  const traits = [];
  if (animal.sterilized) traits.push({ label: '✓ Sterilizat', type: 'green' });
  if (animal.vaccinated) traits.push({ label: '✓ Vaccinat', type: 'green' });
  if (animal.goodWithKids) traits.push({ label: '👶 Copii', type: 'blue' });
  if (animal.goodForApartment) traits.push({ label: '🏢 Bloc', type: 'blue' });

  const slideCard = (e, direction) => {
    e.stopPropagation();
    setImgIndex((prev) => {
      if (direction === 'next') return (prev + 1) % images.length;
      return (prev - 1 + images.length) % images.length;
    });
  };

  return (
    <div className="animal-card">
      <div className="animal-card-image">
        <img src={images[imgIndex] || '/placeholder.jpg'} alt={animal.name} loading="lazy" />
        <div className="animal-card-badges">
          <span className="badge badge-species">{animal.species}</span>
          <span className="badge badge-gender">
            {animal.gender === 'Mascul' ? '♂' : '♀'} {animal.gender}
          </span>
        </div>
        {hasMultiple && (
          <>
            <button
              onClick={(e) => slideCard(e, 'prev')}
              style={{
                position: 'absolute', top: '50%', left: 8, transform: 'translateY(-50%)',
                width: 32, height: 32, borderRadius: '50%', background: 'rgba(0,0,0,0.45)',
                border: 'none', color: 'white', fontSize: 18, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'opacity 0.3s', zIndex: 2
              }}
            >‹</button>
            <button
              onClick={(e) => slideCard(e, 'next')}
              style={{
                position: 'absolute', top: '50%', right: 8, transform: 'translateY(-50%)',
                width: 32, height: 32, borderRadius: '50%', background: 'rgba(0,0,0,0.45)',
                border: 'none', color: 'white', fontSize: 18, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'opacity 0.3s', zIndex: 2
              }}
            >›</button>
            <div style={{
              position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)',
              display: 'flex', gap: 6
            }}>
              {images.map((_, i) => (
                <span
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setImgIndex(i); }}
                  style={{
                    width: 8, height: 8, borderRadius: '50%', cursor: 'pointer',
                    background: i === imgIndex ? 'white' : 'rgba(255,255,255,0.5)',
                    transform: i === imgIndex ? 'scale(1.2)' : 'scale(1)',
                    transition: 'all 0.3s'
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="animal-card-body">
        <div className="animal-card-header">
          <span className="animal-card-name">{animal.name}</span>
          <span className="animal-card-age">{animal.age}</span>
        </div>
        <div className="animal-card-breed">{animal.breed}</div>
        <div className="animal-card-location">📍 {animal.county}{assocName ? ` · ${assocName}` : ''}</div>
        <div className="animal-card-tags">
          {traits.slice(0, 4).map((t, i) => (
            <span key={i} className={`tag tag-${t.type}`}>{t.label}</span>
          ))}
        </div>
      </div>
    </div>
  );
}