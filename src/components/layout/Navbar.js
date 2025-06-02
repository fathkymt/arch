'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import '@/styles/navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  return (
    <div className="navbar-container">
      <input
        type="checkbox"
        id="toggle"
        className="toggle-checkbox"
        checked={isOpen}
        onChange={() => setIsOpen(!isOpen)}
      />
      <label className="hamburger" htmlFor="toggle" aria-label="Menu">
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </label>

      <div
        className={`drawer-overlay ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(false)}
        role="presentation"
      />

      <nav className={`drawer-menu ${isOpen ? 'open' : ''}`} role="navigation">
        {/* Logo temporarily hidden
        <div className="logo-container">
          <Link href="/" onClick={() => setIsOpen(false)}>
            <Image
              src="/images/logo/yenilogo.svg"
              alt="Logo"
              width={150}
              height={40}
              priority
            />
          </Link>
        </div>
        */}

        <div className="nav-links">
          <Link href="/" className="nav-link" onClick={() => setIsOpen(false)}>
            ANA SAYFA
          </Link>
          <Link href="/projects" className="nav-link" onClick={() => setIsOpen(false)}>
            PROJELER
          </Link>
          <Link href="/about" className="nav-link" onClick={() => setIsOpen(false)}>
            HAKKIMIZDA
          </Link>
          <Link href="/contact" className="nav-link" onClick={() => setIsOpen(false)}>
            İLETİŞİM
          </Link>
          <Link href="/career" className="nav-link" onClick={() => setIsOpen(false)}>
            KARİYER
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;