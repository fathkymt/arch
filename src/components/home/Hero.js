'use client';
import { useEffect, useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import heroStyles from '@/styles/Hero.module.css';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [nextSlide, setNextSlide] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canStartNewTransition, setCanStartNewTransition] = useState(true);
  const [visualSlide, setVisualSlide] = useState(0);
  const containerRef = useRef(null);
  const progressRef = useRef(0);
  const startYRef = useRef(null);

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

  // Viewport height ayarlama
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVh();
    window.addEventListener('resize', setVh);
    window.addEventListener('orientationchange', setVh);

    return () => {
      window.removeEventListener('resize', setVh);
      window.removeEventListener('orientationchange', setVh);
    };
  }, []);

  useEffect(() => {
    if (scrollProgress > 0.7 && nextSlide !== null) {
      setVisualSlide(nextSlide);
    } else if (scrollProgress === 0) {
      setVisualSlide(currentSlide);
    }
  }, [scrollProgress, nextSlide, currentSlide]);

  const handleTransitionComplete = useCallback(() => {
    setCurrentSlide(nextSlide);
    setNextSlide(null);
    setScrollProgress(0);
    progressRef.current = 0;
    setCanStartNewTransition(false);
    setTimeout(() => {
      setCanStartNewTransition(true);
    }, 500);
  }, [nextSlide]);

  const handleWheel = useCallback((e) => {
    if (!canStartNewTransition) return;
    e.preventDefault();

    const threshold = window.innerHeight * 0.15;
    
    if (nextSlide !== null) {
      const progress = Math.abs(e.deltaY) / threshold;
      setScrollProgress(prev => {
        const newProgress = Math.min(Math.max(prev + progress * 0.15, 0), 1);
        progressRef.current = newProgress;
        
        if (newProgress >= 1) {
          handleTransitionComplete();
          return 0;
        }
        return newProgress;
      });
    } else {
      if (Math.abs(e.deltaY) > 10) {
        if (e.deltaY > 0 && currentSlide < slides.length - 1) {
          setNextSlide(currentSlide + 1);
        } else if (e.deltaY < 0 && currentSlide > 0) {
          setNextSlide(currentSlide - 1);
        }
      }
    }
  }, [canStartNewTransition, currentSlide, nextSlide, slides.length, handleTransitionComplete]);

  const handlePointerDown = useCallback((e) => {
    if (e.pointerType !== 'touch' && e.pointerType !== 'pen') return;
    startYRef.current = e.clientY;
    progressRef.current = 0;
  }, []);

  const handlePointerMove = useCallback((e) => {
    if (e.pointerType !== 'touch' && e.pointerType !== 'pen') return;
    if (startYRef.current === null || !canStartNewTransition) return;

    const diff = startYRef.current - e.clientY;
    const threshold = window.innerHeight * 0.15;
    
    if (e.cancelable) {
      e.preventDefault();
    }

    if (nextSlide !== null) {
      const progress = Math.abs(diff) / threshold;
      setScrollProgress(prev => {
        const newProgress = Math.min(Math.max(prev + progress * 0.15, 0), 1);
        progressRef.current = newProgress;
        
        if (newProgress >= 1) {
          handleTransitionComplete();
          startYRef.current = null;
          return 0;
        }
        return newProgress;
      });
    } else {
      if (Math.abs(diff) > 10) {
        if (diff > 0 && currentSlide < slides.length - 1) {
          setNextSlide(currentSlide + 1);
        } else if (diff < 0 && currentSlide > 0) {
          setNextSlide(currentSlide - 1);
        }
      }
    }
  }, [canStartNewTransition, currentSlide, nextSlide, slides.length, handleTransitionComplete]);

  const handlePointerUp = useCallback(() => {
    if (nextSlide !== null) {
      if (progressRef.current > 0.3) {
        handleTransitionComplete();
      } else {
        setNextSlide(null);
        setScrollProgress(0);
      }
    }
    startYRef.current = null;
    progressRef.current = 0;
  }, [nextSlide, handleTransitionComplete]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Desktop için wheel event
    container.addEventListener('wheel', handleWheel, { passive: false });

    // Mobile için pointer events
    container.addEventListener('pointerdown', handlePointerDown);
    container.addEventListener('pointermove', handlePointerMove, { passive: false });
    container.addEventListener('pointerup', handlePointerUp);
    container.addEventListener('pointercancel', handlePointerUp);

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('pointerdown', handlePointerDown);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerup', handlePointerUp);
      container.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [handleWheel, handlePointerDown, handlePointerMove, handlePointerUp]);

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
              progressRef.current = 0;
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