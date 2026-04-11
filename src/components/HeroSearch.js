'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLang } from '@/lib/LanguageContext';
import { COUNTIES } from '@/data/demo';

export default function HeroSearch() {
  const [search, setSearch] = useState('');
  const [county, setCounty] = useState('');
  const router = useRouter();
  const { t } = useLang();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (search) params.set('q', search);
    if (county) params.set('county', county);
    router.push(`/adopta?${params.toString()}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <>
      <div className="hero-search-box">
        <div className="hero-search-field">
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('hero-search-placeholder')}
          />
        </div>
        <div className="hero-search-field">
          <select value={county} onChange={(e) => setCounty(e.target.value)}>
            <option value="">{t('hero-all-counties')}</option>
            {COUNTIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <button onClick={handleSearch} className="btn btn-primary hero-search-btn">
          {t('hero-search-btn')}
        </button>
      </div>

      <style jsx>{`
        .hero-search-box {
          background: var(--card);
          border-radius: var(--radius);
          padding: 8px;
          box-shadow: var(--shadow-lg);
          display: flex;
          gap: 8px;
        }
        .hero-search-field {
          flex: 1;
          display: flex;
          align-items: center;
          padding: 12px 16px;
          background: var(--surface);
          border-radius: var(--radius-sm);
          border: 2px solid transparent;
          transition: all 0.3s;
          min-width: 0;
        }
        .hero-search-field:focus-within {
          border-color: var(--accent);
          background: var(--card);
        }
        .hero-search-field input,
        .hero-search-field select {
          border: none;
          background: transparent;
          font-size: 15px;
          color: var(--text);
          outline: none;
          width: 100%;
          font-family: var(--font);
        }
        .hero-search-field input::placeholder {
          color: var(--text3);
        }
        .hero-search-btn {
          padding: 14px 28px;
          white-space: nowrap;
          flex-shrink: 0;
        }
        @media (max-width: 768px) {
          .hero-search-box {
            flex-direction: column;
          }
          .hero-search-btn {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}