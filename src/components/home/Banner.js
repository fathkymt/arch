'use client';

import styles from '@/styles/Banner.module.css';

const Banner = () => {
  return (
    <div className={styles.banner}>
      <div className={styles.content}>
        <div className={styles.track}>
          <span className={styles.text}>
            Sürdürülebilir Mimari Çözümler • İnovatif Tasarım Yaklaşımı • Modern Yaşam Alanları • LEED Sertifikalı Projeler • Çevre Dostu Tasarımlar • Özgün Mimari Konseptler •
          </span>
          <span className={styles.text}>
            Sürdürülebilir Mimari Çözümler • İnovatif Tasarım Yaklaşımı • Modern Yaşam Alanları • LEED Sertifikalı Projeler • Çevre Dostu Tasarımlar • Özgün Mimari Konseptler •
          </span>
        </div>
      </div>
    </div>
  );
};

export default Banner;