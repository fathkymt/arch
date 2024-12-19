'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import heroStyles from '@/styles/Hero.module.css';

const Hero = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Hero Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/hero-image.jpg"
          alt="Modern ahşap mimari"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className={heroStyles.content}>
        {isClient && (
          <>
            <h1 className={heroStyles.title}>
              <span className={heroStyles.animate}>Doğal Mimariye</span>
              <span className={heroStyles.animate}>Hoş Geldiniz</span>
            </h1>
            
            <p className={heroStyles.subtitle}>
              <span className={heroStyles.animate}>Modern Tasarımla</span>
              <span className={heroStyles.animate}>Geleneksel Ahşap Dokunuşu</span>
            </p>
            
            <div className={heroStyles.scrollIcon}>
              <ChevronDown />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Hero;