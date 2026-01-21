import { useEffect, useRef, useState } from "react";

const CursorFollower = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const cursorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  
  // Current position
  const currentX = useRef(0);
  const currentY = useRef(0);
  
  // Target position (from mouse)
  const targetX = useRef(0);
  const targetY = useRef(0);
  
  // Smooth following with lerp
  const ease = 0.15; // Lower = smoother but slower
  
  useEffect(() => {
    const updateCursor = () => {
      // Lerp towards target
      currentX.current += (targetX.current - currentX.current) * ease;
      currentY.current += (targetY.current - currentY.current) * ease;
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX.current}px, ${currentY.current}px, 0) translate(-50%, -50%)`;
      }
      
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${currentX.current}px, ${currentY.current}px, 0) translate(-50%, -50%)`;
      }
      
      if (coreRef.current) {
        coreRef.current.style.transform = `translate3d(${currentX.current}px, ${currentY.current}px, 0) translate(-50%, -50%)`;
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
        target.closest('.magnetic')
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
      {/* Outer glow - fluid motion */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-300"
        style={{
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div
          className="rounded-full absolute"
          style={{
            width: isHovering ? '100px' : '75px',
            height: isHovering ? '100px' : '75px',
            background: isHovering 
              ? 'radial-gradient(circle, rgba(220, 220, 220, 0.5) 0%, rgba(200, 200, 200, 0.3) 40%, transparent 70%)'
              : 'radial-gradient(circle, rgba(220, 220, 220, 0.4) 0%, rgba(200, 200, 200, 0.2) 40%, transparent 70%)',
            filter: 'blur(20px)',
            transition: 'width 0.3s ease-out, height 0.3s ease-out',
          }}
        />
      </div>
      
      {/* Inner glow */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-300"
        style={{
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div
          className="rounded-full absolute"
          style={{
            width: isHovering ? '55px' : '40px',
            height: isHovering ? '55px' : '40px',
            background: isHovering
              ? 'radial-gradient(circle, rgba(255, 255, 255, 0.7) 0%, rgba(240, 240, 240, 0.5) 50%, transparent 70%)'
              : 'radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, rgba(240, 240, 240, 0.4) 50%, transparent 70%)',
            filter: 'blur(12px)',
            transition: 'width 0.3s ease-out, height 0.3s ease-out',
          }}
        />
      </div>
      
      {/* Core dot */}
      <div
        ref={coreRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-200"
        style={{
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div
          className="rounded-full absolute"
          style={{
            width: '7px',
            height: '7px',
            background: isHovering 
              ? 'rgba(220, 220, 220, 0.95)'
              : 'rgba(180, 180, 180, 0.85)',
            boxShadow: isHovering
              ? '0 0 20px rgba(255, 255, 255, 0.6), 0 0 35px rgba(220, 220, 220, 0.4)'
              : '0 0 12px rgba(255, 255, 255, 0.5), 0 0 25px rgba(220, 220, 220, 0.3)',
            transition: 'background 0.3s ease-out, box-shadow 0.3s ease-out',
          }}
        />
      </div>
    </>
  );
};

export default CursorFollower;
