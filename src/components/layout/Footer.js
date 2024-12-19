// src/components/layout/Footer.js
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Mail, Phone, MapPin } from 'lucide-react';
import styles from '@/styles/Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* Logo ve Açıklama */}
        <div className={styles.brandSection}>
          <Image
            src="/logo.svg"
            alt="Mimarlık Ofisi Logo"
            width={120}
            height={40}
            className={styles.logo}
          />
          <p className={styles.brandDescription}>
            Modern tasarım anlayışı ile geleneksel ahşap mimarisini
            birleştirerek yaşam alanlarınıza değer katıyoruz.
          </p>
        </div>

        {/* Hızlı Linkler */}
        <div className={styles.linksSection}>
          <h3 className={styles.sectionTitle}>Hızlı Erişim</h3>
          <nav className={styles.quickLinks}>
            <Link href="/">Ana Sayfa</Link>
            <Link href="/projects">Projeler</Link>
            <Link href="/about">Hakkımızda</Link>
            <Link href="/contact">İletişim</Link>
          </nav>
        </div>

        {/* İletişim Bilgileri */}
        <div className={styles.contactSection}>
          <h3 className={styles.sectionTitle}>İletişim</h3>
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <Mail size={18} />
              <a href="mailto:info@mimarlik.com">info@mimarlik.com</a>
            </div>
            <div className={styles.contactItem}>
              <Phone size={18} />
              <a href="tel:+902121234567">+90 (212) 123 45 67</a>
            </div>
            <div className={styles.contactItem}>
              <MapPin size={18} />
              <address>
                Levent Mah. Mimarlık Sk. No:1
                <br />
                Beşiktaş, İstanbul
              </address>
            </div>
          </div>
        </div>

        {/* Sosyal Medya */}
        <div className={styles.socialSection}>
          <h3 className={styles.sectionTitle}>Sosyal Medya</h3>
          <a 
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            <Instagram size={24} />
            <span>Instagram</span>
          </a>
        </div>
      </div>

      {/* Alt Bilgi */}
      <div className={styles.bottomBar}>
        <p>© {currentYear} Mimarlık Ofisi. Tüm hakları saklıdır.</p>
      </div>
    </footer>
  );
};

export default Footer;