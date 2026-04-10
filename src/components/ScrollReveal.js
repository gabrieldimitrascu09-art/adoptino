'use client';
import { useEffect } from 'react';

export default function ScrollReveal({ children, className = '', delay = 0 }) {
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal:not(.active)');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const delayClass = delay ? `reveal-delay-${delay}` : '';

  return (
    <div className={`reveal ${delayClass} ${className}`}>
      {children}
    </div>
  );
}