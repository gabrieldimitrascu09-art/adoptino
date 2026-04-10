import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BMCButton from '@/components/BMCButton';

export const metadata = {
  title: 'Adoptino — Platforma de adopții animale din România',
  description: 'Conectăm asociațiile de protecție cu oamenii care vor să adopte. Gratuit, mereu.',
  keywords: 'adopții animale, adopta câine, adopta pisică, adopții România, animale fără stăpân',
  authors: [{ name: 'Adoptino' }],
  openGraph: {
    title: 'Adoptino — Platforma de adopții animale din România',
    description: 'Conectăm asociațiile de protecție cu oamenii care vor să adopte. Gratuit, mereu.',
    url: 'https://adoptino.ro',
    siteName: 'Adoptino',
    locale: 'ro_RO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adoptino — Platforma de adopții animale din România',
    description: 'Conectăm asociațiile de protecție cu oamenii care vor să adopte.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ro">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&family=Baloo+2:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar />
        <main className="main-content">
          {children}
        </main>
        <Footer />
        <BMCButton />
      </body>
    </html>
  );
}