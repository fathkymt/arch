'use client';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import heroStyles from '@/styles/Hero.module.css';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [nextSlide, setNextSlide] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canStartNewTransition, setCanStartNewTransition] = useState(true);
  const [visualSlide, setVisualSlide] = useState(0);
  const containerRef = useRef(null);

  const slides = [
    {
      image: '/images/hero/hero-image-1.jpg',
    },
    {
      image: '/images/hero/hero-image-2.jpg',
    },
    {
      image: '/images/hero/hero-image-3.jpg',
    },
    {
      image: '/images/hero/hero-image-4.png',
    } 
  ];

  // Geçiş tamamlandığında çağrılacak fonksiyon
  const handleTransitionComplete = () => {
    setCurrentSlide(nextSlide);
    setNextSlide(null);
    setScrollProgress(0);
    setCanStartNewTransition(false);
    
    // 500ms sonra yeni geçişlere izin ver
    setTimeout(() => {
      setCanStartNewTransition(true);
    }, 500);
  };

  useEffect(() => {
    let startY = 0;
    let startTime = 0;
    const threshold = window.innerHeight * 0.15; // Ekran yüksekliğinin %15'i
    
    const handleWheel = (e) => {
      e.preventDefault();
      
      if (nextSlide !== null) {
        // Eğer geçiş zaten başladıysa, progress'i güncelle
        const progress = Math.abs(e.deltaY) / threshold;
        setScrollProgress(prev => {
          const newProgress = Math.min(Math.max(prev + progress * 0.15, 0), 1);
          
          if (newProgress >= 1) {
            handleTransitionComplete();
            return 0;
          }
          
          return newProgress;
        });
      } else if (canStartNewTransition) {
        // Yeni bir geçiş başlat
        if (Math.abs(e.deltaY) > 10) { // Daha hassas scroll tetikleme
          if (e.deltaY > 0 && currentSlide < slides.length - 1) {
            setNextSlide(currentSlide + 1);
          } else if (e.deltaY < 0 && currentSlide > 0) {
            setNextSlide(currentSlide - 1);
          }
        }
      }
    };

    const handleTouchStart = (e) => {
      startY = e.touches[0].clientY;
      startTime = Date.now();
    };

    const handleTouchMove = (e) => {
      if (!startY) return;
      
      e.preventDefault(); // Native scroll'u engelle
      
      const currentY = e.touches[0].clientY;
      const diff = startY - currentY;
      
      if (nextSlide !== null) {
        // Eğer geçiş zaten başladıysa, progress'i güncelle
        const progress = Math.abs(diff) / threshold;
        setScrollProgress(prev => {
          const newProgress = Math.min(Math.max(prev + progress * 0.15, 0), 1);
          
          if (newProgress >= 1) {
            handleTransitionComplete();
            startY = 0;
            return 0;
          }
          
          return newProgress;
        });
      } else if (canStartNewTransition) {
        // Yeni bir geçiş başlat
        if (Math.abs(diff) > 10) {
          if (diff > 0 && currentSlide < slides.length - 1) {
            setNextSlide(currentSlide + 1);
          } else if (diff < 0 && currentSlide > 0) {
            setNextSlide(currentSlide - 1);
          }
        }
      }
    };

    const handleTouchEnd = () => {
      if (nextSlide !== null) {
        // Eğer geçiş yarıda kaldıysa ve progress yeterince ilerlediyse, geçişi tamamla
        if (scrollProgress > 0.3) {
          handleTransitionComplete();
        } else {
          // Progress yetersizse geçişi iptal et
          setNextSlide(null);
          setScrollProgress(0);
        }
      }
      startY = 0;
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentSlide, nextSlide, scrollProgress, slides.length, canStartNewTransition]);

  useEffect(() => {
    // Progress %70'i geçtiğinde görsel slide'ı güncelle
    if (scrollProgress > 0.7 && nextSlide !== null) {
      setVisualSlide(nextSlide);
    } else if (scrollProgress === 0) {
      setVisualSlide(currentSlide);
    }
  }, [scrollProgress, nextSlide, currentSlide]);

  return (
    <div ref={containerRef} className={heroStyles.container}>
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`${heroStyles.slide} ${
            currentSlide === index ? heroStyles.active : ''
          }`}
          style={{
            opacity: nextSlide === index 
              ? scrollProgress 
              : currentSlide === index 
                ? 1 - scrollProgress
                : 0,
            transform: `scale(${
              nextSlide === index 
                ? 1 + (0.1 * (1 - scrollProgress))
                : currentSlide === index 
                  ? 1 + (0.1 * scrollProgress)
                  : 1.1
            })`
          }}
        >
          <Image
            src={slide.image}
            alt="Hero Image"
            fill
            className={`object-cover ${
              index === 3 ? 'md:object-center object-[85%_center]' : 'object-center'
            }`}
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent" />
        </div>
      ))}

      <div className={heroStyles.indicators}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${heroStyles.indicator} ${
              visualSlide === index ? heroStyles.indicatorActive : ''
            }`}
            onClick={() => {
              if (!canStartNewTransition) return;
              setCurrentSlide(index);
              setVisualSlide(index);
              setNextSlide(null);
              setScrollProgress(0);
              setCanStartNewTransition(false);
              setTimeout(() => {
                setCanStartNewTransition(true);
              }, 500);
            }}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;