import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProjectsGrid from "@/components/ProjectsGrid";
import SkillsSection from "@/components/SkillsSection";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import GitHubContributions from "@/components/GitHubContributions";
import CreativeContact from "@/components/CreativeContact";
import Footer from "@/components/Footer";
import CursorFollower from "@/components/CursorFollower";

const Index = () => {
  const horizontalRef = useRef<HTMLDivElement>(null);
  const [horizontalWidth, setHorizontalWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (horizontalRef.current) {
        const scrollWidth = horizontalRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        setHorizontalWidth(scrollWidth - viewportWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    
    // Small delay to ensure proper measurement
    const timer = setTimeout(updateWidth, 100);
    
    return () => {
      window.removeEventListener("resize", updateWidth);
      clearTimeout(timer);
    };
  }, []);

  const { scrollYProgress } = useScroll();
  
  // Map scroll progress for horizontal section (first 50% of scroll)
  const horizontalProgress = useTransform(scrollYProgress, [0, 0.35], [0, 1]);
  const x = useTransform(horizontalProgress, [0, 1], [0, -horizontalWidth]);
  const smoothX = useSpring(x, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <div className="bg-background min-h-screen">
      <CursorFollower />
      <Navbar />
      
      {/* Horizontal Scrolling Section */}
      <section 
        className="relative"
        style={{ height: `${200}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div 
            ref={horizontalRef}
            style={{ x: smoothX }}
            className="flex h-full"
          >
            <HeroSection />
            <ProjectsGrid />
          </motion.div>
        </div>
      </section>

      {/* Vertical Scrolling Sections */}
      <div id="skills">
        <SkillsSection />
      </div>
      
      <ExperienceTimeline />
      
      <GitHubContributions />
      
      <CreativeContact />
      
      <Footer />
    </div>
  );
};

export default Index;