'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { T } from './translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('ro');

  useEffect(() => {
    const saved = localStorage.getItem('adoptino-lang');
    if (saved) setLang(saved);
  }, []);

  const toggleLang = () => {
    const newLang = lang === 'ro' ? 'en' : 'ro';
    setLang(newLang);
    localStorage.setItem('adoptino-lang', newLang);
  };

  const t = (key) => {
    if (T[key] && T[key][lang]) return T[key][lang];
    return key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}