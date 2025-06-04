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
  const [scrollTicks, setScrollTicks] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hasTriggeredTransition, setHasTriggeredTransition] = useState(false);
  const [isWaitingForNewScroll, setIsWaitingForNewScroll] = useState(false);
  const lastWheelTime = useRef(0);
  const transitionDuration = 800;
  const wheelEvents = useRef([]);
  const wheelTimeout = useRef(null);
  const scrollLocked = useRef(false);
  const scrollCount = useRef(0);

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

  // Prevent default scroll behavior globally for the container
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const preventScroll = (e) => {
      e.preventDefault();
    };

    container.addEventListener('wheel', preventScroll, { passive: false });
    container.addEventListener('touchmove', preventScroll, { passive: false });

    return () => {
      container.removeEventListener('wheel', preventScroll);
      container.removeEventListener('touchmove', preventScroll);
    };
  }, []);

  const handleWheel = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isTransitioning || scrollLocked.current) {
      return;
    }

    const direction = Math.sign(e.deltaY);
    scrollCount.current += 1;

    if (scrollCount.current >= 3) {
      scrollLocked.current = true;

      if (direction > 0 && currentSlide < slides.length - 1) {
        setIsTransitioning(true);
        setNextSlide(currentSlide + 1);
        
        const startTime = Date.now();
        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / transitionDuration, 1);
          const easedProgress = 1 - Math.pow(1 - progress, 3);
          
          setScrollProgress(easedProgress);
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setCurrentSlide(currentSlide + 1);
            setNextSlide(null);
            setScrollProgress(0);
            setIsTransitioning(false);
            
            // Reset after animation completes
            setTimeout(() => {
              scrollCount.current = 0;
              scrollLocked.current = false;
            }, 500);
          }
        };
        requestAnimationFrame(animate);
      } else if (direction < 0 && currentSlide > 0) {
        setIsTransitioning(true);
        setNextSlide(currentSlide - 1);
        
        const startTime = Date.now();
        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / transitionDuration, 1);
          const easedProgress = 1 - Math.pow(1 - progress, 3);
          
          setScrollProgress(easedProgress);
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setCurrentSlide(currentSlide - 1);
            setNextSlide(null);
            setScrollProgress(0);
            setIsTransitioning(false);
            
            // Reset after animation completes
            setTimeout(() => {
              scrollCount.current = 0;
              scrollLocked.current = false;
            }, 500);
          }
        };
        requestAnimationFrame(animate);
      } else {
        // If we can't move in the desired direction, reset
        scrollCount.current = 0;
        scrollLocked.current = false;
      }
    }
  }, [currentSlide, slides.length, isTransitioning]);

  // Reset scroll state when user stops scrolling
  useEffect(() => {
    let scrollTimeout;
    
    const handleScrollEnd = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (!isTransitioning) {
          scrollCount.current = 0;
          scrollLocked.current = false;
        }
      }, 150);
    };

    window.addEventListener('wheel', handleScrollEnd, { passive: true });
    
    return () => {
      window.removeEventListener('wheel', handleScrollEnd);
      clearTimeout(scrollTimeout);
    };
  }, [isTransitioning]);

  // Prevent default scroll behavior
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const preventDefault = (e) => e.preventDefault();
    
    container.addEventListener('wheel', preventDefault, { passive: false });
    container.addEventListener('touchmove', preventDefault, { passive: false });

    return () => {
      container.removeEventListener('wheel', preventDefault);
      container.removeEventListener('touchmove', preventDefault);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [handleWheel]);

  const handleTransitionComplete = useCallback(() => {
    if (nextSlide === null) return;
    setCurrentSlide(nextSlide);
    setNextSlide(null);
    setScrollProgress(0);
    progressRef.current = 0;
    setIsTransitioning(false);
    
    // Wait before allowing new transitions
    setTimeout(() => {
      setHasTriggeredTransition(false);
      setCanStartNewTransition(true);
    }, 200);
  }, [nextSlide]);

  const handlePointerDown = useCallback((e) => {
    if (e.pointerType !== 'touch' && e.pointerType !== 'pen') return;
    startYRef.current = e.clientY;
    progressRef.current = 0;
  }, []);

  const handlePointerMove = useCallback((e) => {
    if (e.pointerType !== 'touch' && e.pointerType !== 'pen') return;
    if (startYRef.current === null || !canStartNewTransition) return;

    const diff = startYRef.current - e.clientY;
    const threshold = window.innerHeight * 0.35; // Reduced threshold for smoother mobile experience
    
    if (e.cancelable) {
      e.preventDefault();
    }

    if (nextSlide !== null) {
      const progress = Math.abs(diff) / threshold;
      setScrollProgress(prev => {
        const newProgress = Math.min(Math.max(prev + progress * 0.25, 0), 1); // Reduced multiplier for smoother transitions
        progressRef.current = newProgress;
        
        if (newProgress >= 1) {
          handleTransitionComplete();
          startYRef.current = null;
          return 0;
        }
        return newProgress;
      });
    } else {
      if (Math.abs(diff) > 35) { // Increased threshold for more intentional swipes
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
                ? 1 + (0.05 * (1 - scrollProgress)) // Reduced scale effect
                : currentSlide === index 
                  ? 1 + (0.05 * scrollProgress) // Reduced scale effect
                  : 1.05
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