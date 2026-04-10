'use client';
import { useState, useMemo } from 'react';
import AnimalCard from '@/components/AnimalCard';
import { DEMO_ANIMALS, COUNTIES } from '@/data/demo';

export default function AdoptaPage() {
  const [search, setSearch] = useState('');
  const [county, setCounty] = useState('');
  const [species, setSpecies] = useState('');
  const [age, setAge] = useState('');
  const [size, setSize] = useState('');

  const filtered = useMemo(() => {
    return DEMO_ANIMALS.filter((a) => {
      const searchLower = search.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const nameLower = a.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const breedLower = a.breed.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const speciesLower = a.species.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

      if (search && !nameLower.includes(searchLower) && !breedLower.includes(searchLower) && !speciesLower.includes(searchLower)) return false;
      if (county && a.county !== county) return false;
      if (species && a.species !== species) return false;
      if (size && a.size !== size) return false;
      if (age) {
        const ageNum = parseFloat(a.age);
        if (age === '0-1' && ageNum >= 1) return false;
        if (age === '1-3' && (ageNum < 1 || ageNum > 3)) return false;
        if (age === '3-6' && (ageNum < 3 || ageNum > 6)) return false;
        if (age === '6+' && ageNum < 6) return false;
      }
      return true;
    });
  }, [search, county, species, age, size]);

  const clearFilters = () => {
    setSearch(''); setCounty(''); setSpecies(''); setAge(''); setSize('');
  };

  return (
    <section className="section" style={{ paddingTop: 120 }}>
      <div className="container">
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, marginBottom: 8 }}>
          Adoptă un prieten
        </h1>
        <p style={{ color: 'var(--text2)', marginBottom: 24 }}>
          {filtered.length} {filtered.length === 1 ? 'animal disponibil' : 'animale disponibile'}
        </p>

        <div style={{
          display: 'flex', gap: 12, marginBottom: 32, flexWrap: 'wrap',
          background: 'var(--card)', padding: 16, borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border)'
        }}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 Caută: câine, pisică, Rex..."
            style={{
              flex: '2 1 200px', padding: '12px 16px', border: '2px solid var(--border)',
              borderRadius: 'var(--radius-xs)', fontSize: 15, outline: 'none',
              background: 'var(--surface)', transition: 'border-color 0.3s'
            }}
          />
          <select value={county} onChange={(e) => setCounty(e.target.value)}
            style={{ flex: '1 1 150px', padding: '12px 16px', border: '2px solid var(--border)', borderRadius: 'var(--radius-xs)', fontSize: 15, background: 'var(--surface)', cursor: 'pointer' }}>
            <option value="">Toate județele</option>
            {COUNTIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={species} onChange={(e) => setSpecies(e.target.value)}
            style={{ flex: '1 1 130px', padding: '12px 16px', border: '2px solid var(--border)', borderRadius: 'var(--radius-xs)', fontSize: 15, background: 'var(--surface)', cursor: 'pointer' }}>
            <option value="">Tip animal</option>
            <option value="Câine">🐕 Câine</option>
            <option value="Pisică">🐱 Pisică</option>
            <option value="Altele">🐰 Altele</option>
          </select>
          <select value={age} onChange={(e) => setAge(e.target.value)}
            style={{ flex: '1 1 120px', padding: '12px 16px', border: '2px solid var(--border)', borderRadius: 'var(--radius-xs)', fontSize: 15, background: 'var(--surface)', cursor: 'pointer' }}>
            <option value="">Vârstă</option>
            <option value="0-1">Sub 1 an</option>
            <option value="1-3">1-3 ani</option>
            <option value="3-6">3-6 ani</option>
            <option value="6+">Peste 6 ani</option>
          </select>
          <select value={size} onChange={(e) => setSize(e.target.value)}
            style={{ flex: '1 1 120px', padding: '12px 16px', border: '2px solid var(--border)', borderRadius: 'var(--radius-xs)', fontSize: 15, background: 'var(--surface)', cursor: 'pointer' }}>
            <option value="">Talie</option>
            <option value="Mică">Mică</option>
            <option value="Medie">Medie</option>
            <option value="Mare">Mare</option>
          </select>
          <button onClick={clearFilters}
            style={{
              padding: '12px 20px', border: '2px solid var(--border)', borderRadius: 'var(--radius-xs)',
              background: 'transparent', fontSize: 14, fontWeight: 700, color: 'var(--text2)',
              cursor: 'pointer', transition: 'all 0.3s', whiteSpace: 'nowrap'
            }}>
            ✕ Șterge filtre
          </button>
        </div>

        {filtered.length > 0 ? (
          <div className="animals-grid">
            {filtered.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🔍</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, marginBottom: 8 }}>Niciun rezultat</h3>
            <p style={{ color: 'var(--text2)' }}>Încearcă să modifici filtrele de căutare.</p>
          </div>
        )}
      </div>
    </section>
  );
}