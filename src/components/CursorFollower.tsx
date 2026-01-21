import { useEffect, useRef, useState } from "react";

const CursorFollower = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const cursorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  
  // Current positions
  const cursorX = useRef(0);
  const cursorY = useRef(0);
  const glowX = useRef(0);
  const glowY = useRef(0);
  const trailX = useRef(0);
  const trailY = useRef(0);
  
  // Target positions
  const targetX = useRef(0);
  const targetY = useRef(0);
  
  // Velocities for physics
  const cursorVelX = useRef(0);
  const cursorVelY = useRef(0);
  const glowVelX = useRef(0);
  const glowVelY = useRef(0);
  
  // Previous positions for direction calculation
  const prevX = useRef(0);
  const prevY = useRef(0);
  
  // Direction offset for fluidity effect
  const directionOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let animationId: number;
    
    const updateCursor = () => {
      // Calculate direction
      const dx = targetX.current - prevX.current;
      const dy = targetY.current - prevY.current;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Normalize direction
      if (distance > 0) {
        directionOffset.current = {
          x: (dx / distance) * 8, // Flow in opposite direction of movement
          y: (dy / distance) * 8,
        };
      }
      
      // Update previous position
      prevX.current = targetX.current;
      prevY.current = targetY.current;
      
      // Spring physics for main cursor (fastest, most responsive)
      const springStrength = 0.25;
      const damping = 0.7;
      
      cursorVelX.current += (targetX.current - cursorX.current) * springStrength;
      cursorVelY.current += (targetY.current - cursorY.current) * springStrength;
      cursorVelX.current *= damping;
      cursorVelY.current *= damping;
      
      cursorX.current += cursorVelX.current;
      cursorY.current += cursorVelY.current;
      
      // Glow follows cursor with slight delay
      const glowSpring = 0.12;
      const glowDamping = 0.75;
      
      glowVelX.current += (cursorX.current - glowX.current) * glowSpring;
      glowVelY.current += (cursorY.current - glowY.current) * glowSpring;
      glowVelX.current *= glowDamping;
      glowVelY.current *= glowDamping;
      
      glowX.current += glowVelX.current;
      glowY.current += glowVelY.current;
      
      // Trail follows glow (slowest)
      const trailLerp = 0.08;
      trailX.current += (glowX.current - trailX.current) * trailLerp;
      trailY.current += (glowY.current - trailY.current) * trailLerp;
      
      // Apply direction offset for fluid effect
      const finalGlowX = glowX.current - directionOffset.current.x;
      const finalGlowY = glowY.current - directionOffset.current.y;
      const finalTrailX = trailX.current - directionOffset.current.x * 1.5;
      const finalTrailY = trailY.current - directionOffset.current.y * 1.5;
      
      // Update DOM
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorX.current}px, ${cursorY.current}px, 0) translate(-50%, -50%)`;
      }
      
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${finalGlowX}px, ${finalGlowY}px, 0) translate(-50%, -50%)`;
      }
      
      if (trailRef.current) {
        trailRef.current.style.transform = `translate3d(${finalTrailX}px, ${finalTrailY}px, 0) translate(-50%, -50%)`;
      }
      
      animationId = requestAnimationFrame(updateCursor);
    };
    
    animationId = requestAnimationFrame(updateCursor);
    
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
      {/* Outer fluid trail - largest, slowest, flows behind */}
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
            width: isHovering ? '220px' : '160px',
            height: isHovering ? '220px' : '160px',
            background: `radial-gradient(circle,
              hsla(220, 25%, 90%, 0.4) 0%,
              hsla(220, 30%, 85%, 0.3) 30%,
              hsla(220, 35%, 80%, 0.2) 50%,
              hsla(220, 40%, 75%, 0.1) 60%,
              transparent 80%)`,
            filter: 'blur(40px)',
            transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1), height 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </div>
      
      {/* Mid glow layer - flows behind */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          opacity: isVisible ? 0.8 : 0,
          transition: 'opacity 0.4s ease-out',
        }}
      >
        <div
          className="rounded-full absolute"
          style={{
            width: isHovering ? '130px' : '85px',
            height: isHovering ? '130px' : '85px',
            background: isHovering
              ? `radial-gradient(circle,
                  hsla(220, 35%, 98%, 0.8) 0%,
                  hsla(220, 40%, 95%, 0.6) 25%,
                  hsla(220, 45%, 90%, 0.4) 45%,
                  hsla(220, 50%, 85%, 0.2) 60%,
                  transparent 80%)`
              : `radial-gradient(circle,
                  hsla(220, 30%, 95%, 0.7) 0%,
                  hsla(220, 35%, 90%, 0.5) 30%,
                  hsla(220, 40%, 85%, 0.3) 50%,
                  hsla(220, 45%, 80%, 0.1) 65%,
                  transparent 85%)`,
            filter: 'blur(25px)',
            transition: 'width 0.35s cubic-bezier(0.16, 1, 0.3, 1), height 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </div>
      
      {/* Core cursor dot - fastest, follows directly */}
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
            width: isHovering ? '16px' : '11px',
            height: isHovering ? '16px' : '11px',
            background: isHovering
              ? 'linear-gradient(135deg, hsla(220, 30%, 100%, 1) 0%, hsla(220, 35%, 98%, 1) 50%, hsla(220, 40%, 95%, 1) 100%)'
              : 'linear-gradient(135deg, hsla(220, 25%, 98%, 1) 0%, hsla(220, 30%, 95%, 1) 50%, hsla(220, 35%, 92%, 1) 100%)',
            boxShadow: isHovering
              ? '0 0 35px hsla(220, 40%, 98%, 1), 0 0 70px hsla(220, 35%, 95%, 0.8), 0 0 105px hsla(220, 30%, 90%, 0.6), 0 0 140px hsla(220, 25%, 85%, 0.4)'
              : '0 0 20px hsla(220, 35%, 98%, 0.9), 0 0 45px hsla(220, 30%, 95%, 0.7), 0 0 75px hsla(220, 25%, 90%, 0.5), 0 0 105px hsla(220, 20%, 85%, 0.3)',
            transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1), height 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </div>
    </>
  );
};

export default CursorFollower;
