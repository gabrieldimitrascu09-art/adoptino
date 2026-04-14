'use client';
import { useState } from 'react';
import { useLang } from '@/lib/LanguageContext';

export default function FAQ({ items }) {
  const [openIndex, setOpenIndex] = useState(null);
  const { lang } = useLang();

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="faq-container">
      {items.map((item, i) => (
        <div className="faq-item" key={i}>
          <button
            className={`faq-question ${openIndex === i ? 'open' : ''}`}
            onClick={() => toggle(i)}
          >
            <span>{item.q || item.question || ''}</span>
            <span className="icon">+</span>
          </button>
          <div className={`faq-answer ${openIndex === i ? 'open' : ''}`}>
            {item.a || item.answer || ''}
          </div>
        </div>
      ))}
    </div>
  );
}