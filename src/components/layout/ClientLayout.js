'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import WhiteLogo from './WhiteLogo';
import Footer from './Footer';

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <>
      <Navbar />
      <WhiteLogo />
      <main className="min-h-screen">
        {children}
      </main>
      {!isHomePage && <Footer />}
    </>
  );
} 