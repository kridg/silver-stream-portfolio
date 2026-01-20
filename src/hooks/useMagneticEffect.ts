import { useRef, useCallback } from 'react';

interface MagneticOptions {
  strength?: number;
  ease?: number;
}

export const useMagneticEffect = (options: MagneticOptions = {}) => {
  const { strength = 0.3, ease = 0.15 } = options;
  const elementRef = useRef<HTMLElement | null>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number>();

  const animate = useCallback(() => {
    if (!elementRef.current) return;

    positionRef.current.x += (targetRef.current.x - positionRef.current.x) * ease;
    positionRef.current.y += (targetRef.current.y - positionRef.current.y) * ease;

    elementRef.current.style.transform = `translate(${positionRef.current.x}px, ${positionRef.current.y}px)`;

    if (
      Math.abs(targetRef.current.x - positionRef.current.x) > 0.1 ||
      Math.abs(targetRef.current.y - positionRef.current.y) > 0.1
    ) {
      frameRef.current = requestAnimationFrame(animate);
    }
  }, [ease]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!elementRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      targetRef.current = {
        x: deltaX * strength,
        y: deltaY * strength,
      };

      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      frameRef.current = requestAnimationFrame(animate);
    },
    [strength, animate]
  );

  const handleMouseLeave = useCallback(() => {
    targetRef.current = { x: 0, y: 0 };
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }
    frameRef.current = requestAnimationFrame(animate);
  }, [animate]);

  const magneticProps = {
    ref: elementRef as any,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };

  return { magneticProps, elementRef };
};

export default useMagneticEffect;