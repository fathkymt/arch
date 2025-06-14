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
  const [isPaused, setIsPaused] = useState(false);
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
  const autoSlideTimer = useRef(null);

  const slides = [
    {
      image: '/images/hero/hero-image-1.jpg',
      project: {
        title: 'Modern Dağ Evi',
        location: 'Bolu',
        year: '2023'
      }
    },
    {
      image: '/images/hero/hero-image-2.jpg',
      project: {
        title: 'Palmares',
        location: 'İstanbul',
        year: '2023'
      }
    },
    {
      image: '/images/hero/hero-image-3.jpg',
      project: {
        title: 'Kiev Project',
        location: 'Muğla',
        year: '2024'
      }
    },
    {
      image: '/images/hero/hero-image-4.png',
      project: {
        title: 'Teachera',
        location: 'İstanbul',
        year: '2024'
      }
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

  const handleTransition = useCallback((direction) => {
    if (isTransitioning || scrollLocked.current) return;
    
    scrollLocked.current = true;

    if (direction > 0) {
      setIsTransitioning(true);
      // If we're at the last slide, set nextSlide to 0 for loop
      const next = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
      setNextSlide(next);
      
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / transitionDuration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        
        setScrollProgress(easedProgress);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCurrentSlide(next);
          setNextSlide(null);
          setScrollProgress(0);
          setIsTransitioning(false);
          
          setTimeout(() => {
            scrollCount.current = 0;
            scrollLocked.current = false;
          }, 500);
        }
      };
      requestAnimationFrame(animate);
    } else if (direction < 0) {
      setIsTransitioning(true);
      // If we're at the first slide, set nextSlide to last slide for loop
      const next = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
      setNextSlide(next);
      
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / transitionDuration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        
        setScrollProgress(easedProgress);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCurrentSlide(next);
          setNextSlide(null);
          setScrollProgress(0);
          setIsTransitioning(false);
          
          setTimeout(() => {
            scrollCount.current = 0;
            scrollLocked.current = false;
          }, 500);
        }
      };
      requestAnimationFrame(animate);
    } else {
      scrollCount.current = 0;
      scrollLocked.current = false;
    }
  }, [currentSlide, slides.length, isTransitioning]);

  // Add auto-slide functionality
  useEffect(() => {
    const startAutoSlide = () => {
      if (autoSlideTimer.current) {
        clearInterval(autoSlideTimer.current);
      }

      autoSlideTimer.current = setInterval(() => {
        if (!isPaused && !isTransitioning && !scrollLocked.current) {
          handleTransition(1); // Positive direction for forward movement
        }
      }, 3000); // 3 seconds interval
    };

    startAutoSlide();

    // Cleanup
    return () => {
      if (autoSlideTimer.current) {
        clearInterval(autoSlideTimer.current);
      }
    };
  }, [isPaused, isTransitioning, handleTransition]);

  // Pause auto-slide on user interaction
  const pauseAutoSlide = useCallback(() => {
    setIsPaused(true);
    setTimeout(() => {
      setIsPaused(false);
    }, 5000); // Resume after 5 seconds of no interaction
  }, []);

  // Update event handlers to pause auto-slide
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isTransitioning || scrollLocked.current) return;

    pauseAutoSlide();
    const direction = Math.sign(e.deltaY);
    scrollCount.current += 1;

    if (scrollCount.current >= 2) {
      handleTransition(direction);
    }
  }, [isTransitioning, handleTransition, pauseAutoSlide]);

  const handlePointerDown = useCallback((e) => {
    if (e.pointerType !== 'touch' && e.pointerType !== 'pen') return;
    pauseAutoSlide();
    startYRef.current = e.clientY;
    scrollCount.current = 0;
  }, [pauseAutoSlide]);

  const handlePointerMove = useCallback((e) => {
    if (e.pointerType !== 'touch' && e.pointerType !== 'pen') return;
    if (startYRef.current === null || isTransitioning || scrollLocked.current) return;

    const diff = startYRef.current - e.clientY;
    const threshold = window.innerHeight * 0.15;
    
    if (e.cancelable) {
      e.preventDefault();
    }

    if (Math.abs(diff) > threshold) {
      const direction = Math.sign(diff);
      handleTransition(direction);
      startYRef.current = null;
    }
  }, [isTransitioning, handleTransition]);

  const handlePointerUp = useCallback(() => {
    startYRef.current = null;
  }, []);

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

  // Prevent default scroll behavior and setup event listeners
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const preventDefault = (e) => e.preventDefault();
    
    container.addEventListener('wheel', preventDefault, { passive: false });
    container.addEventListener('touchmove', preventDefault, { passive: false });
    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('pointerdown', handlePointerDown);
    container.addEventListener('pointermove', handlePointerMove, { passive: false });
    container.addEventListener('pointerup', handlePointerUp);
    container.addEventListener('pointercancel', handlePointerUp);

    return () => {
      container.removeEventListener('wheel', preventDefault);
      container.removeEventListener('touchmove', preventDefault);
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('pointerdown', handlePointerDown);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerup', handlePointerUp);
      container.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [handleWheel, handlePointerDown, handlePointerMove, handlePointerUp]);

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
          
          {/* Project Info Overlay */}
          <div className="absolute bottom-12 left-12 z-30 text-white md:block hidden">
            <div className="space-y-3">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide">
                {slide.project.title}
              </h3>
              <div className="text-lg md:text-xl text-white/90">
                <p className="font-light">{slide.project.year}, {slide.project.location}</p>
              </div>
            </div>
          </div>
          
          {/* Mobile Project Info - Inside image, at bottom 20% area */}
          <div className="absolute bottom-[20%] left-0 right-0 z-30 text-white md:hidden block">
            <div className="text-center space-y-1 px-4">
              <h3 className="text-lg font-light tracking-wide">
                {slide.project.title}
              </h3>
              <p className="text-sm text-white/90 font-light">
                {slide.project.year}, {slide.project.location}
              </p>
            </div>
          </div>
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