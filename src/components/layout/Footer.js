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
        <div className={styles.brandSection}>
          <Link href="/">
            <Image
              src="/images/logo/whitelogo.svg"
              alt="Mimarlık Ofisi Logo"
              width={220}
              height={80}
              className={`${styles.logo} w-[140px] h-[50px] md:w-[220px] md:h-[80px]`}
              priority
            />
          </Link>
        </div>

        <div className={styles.linksSection}>
          <h3 className={styles.sectionTitle}>Hızlı Erişim</h3>
          <nav className={styles.quickLinks}>
            <Link href="/">Ana Sayfa</Link>
            <Link href="/projects">Projeler</Link>
            <Link href="/about">Hakkımızda</Link>
            <Link href="/contact">İletişim</Link>
          </nav>
        </div>

        <div className={styles.contactSection}>
          <h3 className={styles.sectionTitle}>İletişim</h3>
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <Mail size={18} />
              <a href="mailto:info@espluspartners.com">info@espluspartners.com</a>
            </div>
            <div className={styles.contactItem}>
              <Phone size={18} className="mt-[16px]" />
              <div className="flex flex-col gap-[10px]">
                <a href="tel:+905072676379">+90 507 267 63 79</a>
                <a href="tel:+905067704272">+90 506 770 42 72</a>
              </div>
            </div>
            <div className={styles.contactItem}>
              <MapPin size={18} />
              <address>
                Melikşah Mah. Hocafakıh Cad.<br />
                Füsun Sk. Arca Plaza Kat:1 No:2<br />
                Meram/Konya
              </address>
            </div>
          </div>
        </div>

        <div className={styles.socialSection}>
          <h3 className={styles.sectionTitle}>Sosyal Medya</h3>
          <a 
            href="https://www.instagram.com/espartnersmimarlik"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            <Instagram size={24} />
            <span>Instagram</span>
          </a>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <p>© {currentYear} Mimarlık Ofisi. Tüm hakları saklıdır.</p>
      </div>
    </footer>
  );
};

export default Footer;