import { useEffect, useRef, useState } from "react";

const CursorFollower = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  
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
          x: (dx / distance) * 10,
          y: (dy / distance) * 10,
        };
      }
      
      // Update previous position
      prevX.current = targetX.current;
      prevY.current = targetY.current;
      
      // Spring physics for main cursor (fastest, most responsive)
      const springStrength = 0.28;
      const damping = 0.72;
      
      cursorVelX.current += (targetX.current - cursorX.current) * springStrength;
      cursorVelY.current += (targetY.current - cursorY.current) * springStrength;
      cursorVelX.current *= damping;
      cursorVelY.current *= damping;
      
      cursorX.current += cursorVelX.current;
      cursorY.current += cursorVelY.current;
      
      // Glow follows cursor with slight delay
      const glowSpring = 0.1;
      const glowDamping = 0.78;
      
      glowVelX.current += (cursorX.current - glowX.current) * glowSpring;
      glowVelY.current += (cursorY.current - glowY.current) * glowSpring;
      glowVelX.current *= glowDamping;
      glowVelY.current *= glowDamping;
      
      glowX.current += glowVelX.current;
      glowY.current += glowVelY.current;
      
      // Trail follows glow (slowest)
      const trailLerp = 0.06;
      trailX.current += (glowX.current - trailX.current) * trailLerp;
      trailY.current += (glowY.current - trailY.current) * trailLerp;
      
      // Apply direction offset for fluid effect
      const finalGlowX = glowX.current - directionOffset.current.x;
      const finalGlowY = glowY.current - directionOffset.current.y;
      const finalTrailX = trailX.current - directionOffset.current.x * 1.8;
      const finalTrailY = trailY.current - directionOffset.current.y * 1.8;
      
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
        target.closest('.cursor-pointer') ||
        target.closest('[role="button"]')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };
    
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
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
          opacity: isVisible ? 0.5 : 0,
          transition: 'opacity 0.5s ease-out',
        }}
      >
        <div
          className="rounded-full absolute"
          style={{
            width: isHovering ? '200px' : '140px',
            height: isHovering ? '200px' : '140px',
            background: `radial-gradient(circle,
              hsla(215, 20%, 70%, 0.25) 0%,
              hsla(215, 25%, 65%, 0.18) 30%,
              hsla(215, 30%, 60%, 0.1) 50%,
              hsla(215, 35%, 55%, 0.05) 65%,
              transparent 80%)`,
            filter: 'blur(35px)',
            transition: 'width 0.5s cubic-bezier(0.16, 1, 0.3, 1), height 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </div>
      
      {/* Mid glow layer - elegant silver glow */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          opacity: isVisible ? 0.7 : 0,
          transition: 'opacity 0.4s ease-out',
        }}
      >
        <div
          className="rounded-full absolute"
          style={{
            width: isHovering ? '100px' : isClicking ? '60px' : '70px',
            height: isHovering ? '100px' : isClicking ? '60px' : '70px',
            background: isHovering
              ? `radial-gradient(circle,
                  hsla(215, 15%, 55%, 0.5) 0%,
                  hsla(215, 20%, 50%, 0.35) 30%,
                  hsla(215, 25%, 45%, 0.2) 50%,
                  hsla(215, 30%, 40%, 0.1) 65%,
                  transparent 80%)`
              : `radial-gradient(circle,
                  hsla(215, 15%, 50%, 0.4) 0%,
                  hsla(215, 20%, 45%, 0.28) 30%,
                  hsla(215, 25%, 40%, 0.15) 50%,
                  hsla(215, 30%, 35%, 0.08) 65%,
                  transparent 80%)`,
            filter: 'blur(20px)',
            transition: 'width 0.35s cubic-bezier(0.16, 1, 0.3, 1), height 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </div>
      
      {/* Core cursor dot - solid charcoal for premium feel */}
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
            width: isHovering ? '10px' : isClicking ? '8px' : '12px',
            height: isHovering ? '10px' : isClicking ? '8px' : '12px',
            background: 'linear-gradient(135deg, hsl(215, 25%, 25%) 0%, hsl(215, 30%, 20%) 50%, hsl(215, 35%, 15%) 100%)',
            boxShadow: isHovering
              ? '0 0 20px hsla(215, 25%, 30%, 0.5), 0 0 40px hsla(215, 20%, 35%, 0.3)'
              : '0 0 12px hsla(215, 25%, 30%, 0.4), 0 0 25px hsla(215, 20%, 35%, 0.2)',
            transition: 'width 0.2s cubic-bezier(0.16, 1, 0.3, 1), height 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </div>
      
      {/* Interaction ring - appears on hover */}
      {isHovering && (
        <div
          className="fixed pointer-events-none z-[9997]"
          style={{
            left: cursorX.current,
            top: cursorY.current,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div
            className="rounded-full border-2 animate-pulse"
            style={{
              width: '40px',
              height: '40px',
              borderColor: 'hsla(215, 25%, 35%, 0.4)',
              animation: 'pulse 1.5s ease-in-out infinite',
            }}
          />
        </div>
      )}
    </>
  );
};

export default CursorFollower;
