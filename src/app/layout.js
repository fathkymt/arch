// src/app/layout.js
import localFont from 'next/font/local';
import Navbar from '../components/layout/Navbar';
import WhiteLogo from '../components/layout/WhiteLogo';
import Footer from '../components/layout/Footer';
import './globals.css';

const capricho = localFont({
  src: '../../public/fonts/Capricho-Light.otf',
  variable: '--font-capricho',
});

export const metadata = {
  title: 'Ahşap Mimarisi | Modern Tasarım',
  description: 'Modern tasarımla geleneksel ahşap dokunuşunu birleştiren mimarlık ofisi',
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className={`${capricho.variable}`}>
      <body suppressHydrationWarning>
        <Navbar />
        <WhiteLogo />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}