'use client';
import { useLang } from '@/lib/LanguageContext';

export default function BMCButton() {
  const { t } = useLang();

  return (
    <a href="https://www.buymeacoffee.com/adoptino.ro" target="_blank" rel="noopener noreferrer" className="bmc-floating" aria-label={t('bmc-text')}>
      ☕ <span>{t('bmc-text')}</span>
    </a>
  );
}