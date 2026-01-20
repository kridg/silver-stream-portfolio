import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import HeroSection from "./HeroSection";
import ProjectsGrid from "./ProjectsGrid";

const HorizontalScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const scrollWidth = containerRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        setContainerWidth(scrollWidth - viewportWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -containerWidth]);
  const smoothX = useSpring(x, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section 
      ref={containerRef} 
      className="relative"
      style={{ height: `${200}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div 
          style={{ x: smoothX }}
          className="flex h-full"
        >
          <HeroSection />
          <ProjectsGrid />
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalScroll;