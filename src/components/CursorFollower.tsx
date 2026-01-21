import { useEffect, useRef, useState } from "react";

const CursorFollower = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const cursorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  
  // Current position
  const currentX = useRef(0);
  const currentY = useRef(0);
  
  // Secondary position for trail effect
  const trailX = useRef(0);
  const trailY = useRef(0);
  
  // Target position (from mouse)
  const targetX = useRef(0);
  const targetY = useRef(0);
  
  // Velocity for fluid motion
  const velocityX = useRef(0);
  const velocityY = useRef(0);
  
  // Smooth following with spring physics
  const springStrength = 0.08;
  const damping = 0.75;
  const trailEase = 0.05;
  
  useEffect(() => {
    const updateCursor = () => {
      // Spring physics for main cursor
      const dx = targetX.current - currentX.current;
      const dy = targetY.current - currentY.current;
      
      velocityX.current += dx * springStrength;
      velocityY.current += dy * springStrength;
      
      velocityX.current *= damping;
      velocityY.current *= damping;
      
      currentX.current += velocityX.current;
      currentY.current += velocityY.current;
      
      // Slower trail follows main cursor
      trailX.current += (currentX.current - trailX.current) * trailEase;
      trailY.current += (currentY.current - trailY.current) * trailEase;
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX.current}px, ${currentY.current}px, 0) translate(-50%, -50%)`;
      }
      
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${trailX.current}px, ${trailY.current}px, 0) translate(-50%, -50%)`;
      }
      
      if (trailRef.current) {
        trailRef.current.style.transform = `translate3d(${trailX.current}px, ${trailY.current}px, 0) translate(-50%, -50%)`;
      }
      
      requestAnimationFrame(updateCursor);
    };
    
    const animationId = requestAnimationFrame(updateCursor);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      targetX.current = e.clientX;
      targetY.current = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('magnetic') ||
        target.closest('.magnetic') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.cursor-pointer')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, [isVisible]);

  // Hide on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <>
      {/* Outer fluid glow trail - largest, slowest */}
      <div
        ref={trailRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          opacity: isVisible ? 0.6 : 0,
          transition: 'opacity 0.5s ease-out',
        }}
      >
        <div
          className="rounded-full absolute"
          style={{
            width: isHovering ? '180px' : '120px',
            height: isHovering ? '180px' : '120px',
            background: `radial-gradient(circle, 
              hsla(220, 15%, 85%, 0.25) 0%, 
              hsla(220, 20%, 80%, 0.15) 35%, 
              hsla(220, 25%, 75%, 0.08) 55%, 
              transparent 75%)`,
            filter: 'blur(30px)',
            transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1), height 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </div>
      
      {/* Mid glow layer */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          opacity: isVisible ? 0.85 : 0,
          transition: 'opacity 0.4s ease-out',
        }}
      >
        <div
          className="rounded-full absolute"
          style={{
            width: isHovering ? '90px' : '60px',
            height: isHovering ? '90px' : '60px',
            background: isHovering 
              ? `radial-gradient(circle,
                  hsla(210, 25%, 95%, 0.8) 0%,
                  hsla(215, 30%, 90%, 0.5) 35%,
                  hsla(220, 20%, 85%, 0.25) 55%,
                  transparent 70%)`
              : `radial-gradient(circle,
                  hsla(220, 15%, 90%, 0.6) 0%,
                  hsla(220, 20%, 85%, 0.35) 40%,
                  hsla(220, 25%, 80%, 0.15) 60%,
                  transparent 75%)`,
            filter: 'blur(15px)',
            transition: 'width 0.35s cubic-bezier(0.16, 1, 0.3, 1), height 0.35s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease-out',
          }}
        />
      </div>
      
      {/* Core cursor dot - smallest, fastest */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[10000]"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.2s ease-out',
        }}
      >
        <div
          className="rounded-full absolute"
          style={{
            width: isHovering ? '12px' : '8px',
            height: isHovering ? '12px' : '8px',
            background: isHovering 
              ? 'linear-gradient(135deg, hsla(220, 20%, 98%, 1) 0%, hsla(220, 25%, 92%, 1) 100%)'
              : 'linear-gradient(135deg, hsla(220, 15%, 95%, 1) 0%, hsla(220, 20%, 88%, 1) 100%)',
            boxShadow: isHovering
              ? '0 0 25px hsla(220, 30%, 95%, 0.8), 0 0 50px hsla(220, 25%, 90%, 0.5), 0 0 75px hsla(220, 20%, 85%, 0.3)'
              : '0 0 15px hsla(220, 25%, 92%, 0.7), 0 0 35px hsla(220, 20%, 88%, 0.4), 0 0 55px hsla(220, 15%, 85%, 0.2)',
            transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1), height 0.25s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease-out, box-shadow 0.3s ease-out',
          }}
        />
      </div>
    </>
  );
};

export default CursorFollower;
