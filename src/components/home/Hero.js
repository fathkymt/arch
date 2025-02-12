'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import heroStyles from '@/styles/Hero.module.css';

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [leavingSlide, setLeavingSlide] = useState(null);

  const slides = [
    {
      image: '/images/hero/hero-image-1.jpg',
      title: 'Modern Tasarım',
      subtitle: 'Yenilikçi Projeler'
    },
    {
      image: '/images/hero/hero-image-2.jpg',
      title: 'Doğal Mimari',
      subtitle: 'Sürdürülebilir Çözümler'
    },
    {
      image: '/images/hero/hero-image-3.jpg',
      title: 'Özgün Detaylar',
      subtitle: 'Kusursuz İşçilik'
    }
  ];

  const changeSlide = (newIndex) => {
    setLeavingSlide(currentSlide);
    setCurrentSlide(newIndex);
    setTimeout(() => setLeavingSlide(null), 1000);
  };

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      const nextSlide = (currentSlide + 1) % slides.length;
      changeSlide(nextSlide);
    }, 5000);

    return () => clearInterval(timer);
  }, [currentSlide]);

  if (!mounted) return null;

  return (
    <div className="relative h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`${heroStyles.slide} ${
            currentSlide === index ? heroStyles.active : ''
          } ${leavingSlide === index ? heroStyles.leaving : ''}`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent" />
        </div>
      ))}

      <div className={heroStyles.content}>
        <h1 className={heroStyles.title}>
          <span>{slides[currentSlide].title}</span>
        </h1>
        
        <p className={heroStyles.subtitle}>
          <span>{slides[currentSlide].subtitle}</span>
        </p>

        <div className={heroStyles.indicators}>
          {slides.map((_, index) => (
            <button
              key={index}
              className={`${heroStyles.indicator} ${
                currentSlide === index ? heroStyles.indicatorActive : ''
              }`}
              onClick={() => changeSlide(index)}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;