// src/app/layout.js
import { Roboto } from 'next/font/google';
import Navbar from '../components/layout/Navbar';
import WhiteLogo from '../components/layout/WhiteLogo';
import Footer from '../components/layout/Footer';
import './globals.css';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Ahşap Mimarisi | Modern Tasarım',
  description: 'Modern tasarımla geleneksel ahşap dokunuşunu birleştiren mimarlık ofisi',
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className={roboto.className}>
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