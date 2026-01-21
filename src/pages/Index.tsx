import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StackedProjects from "@/components/StackedProjects";
import HorizontalSkillsScroll from "@/components/HorizontalSkillsScroll";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import GitHubContributions from "@/components/GitHubContributions";
import CreativeContact from "@/components/CreativeContact";
import Footer from "@/components/Footer";
import CursorFollower from "@/components/CursorFollower";

const Index = () => {
  const horizontalContainerRef = useRef<HTMLDivElement>(null);
  const projectsContainerRef = useRef<HTMLDivElement>(null);
  const skillsContainerRef = useRef<HTMLDivElement>(null);
  const [projectsWidth, setProjectsWidth] = useState(0);
  const [skillsWidth, setSkillsWidth] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    const updateDimensions = () => {
      const vw = window.innerWidth;
      setViewportWidth(vw);
      
      if (projectsContainerRef.current) {
        const width = projectsContainerRef.current.scrollWidth;
        setProjectsWidth(Math.max(0, width - vw));
      }
      
      if (skillsContainerRef.current) {
        const width = skillsContainerRef.current.scrollWidth;
        setSkillsWidth(Math.max(0, width - vw));
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    
    // Multiple checks to ensure proper measurement
    const timers = [100, 300, 500, 1000, 1500].map(delay => 
      setTimeout(updateDimensions, delay)
    );
    
    return () => {
      window.removeEventListener("resize", updateDimensions);
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  const { scrollYProgress } = useScroll();
  
  // Scroll mapping:
  // 0-20%: Hero section with intro
  // 20-50%: Projects stacked beside hero (transition to horizontal)
  // 50-75%: Projects horizontal scroll
  // 75-95%: Skills horizontal scroll
  // 95%+: Vertical sections start
  
  const heroProgress = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const projectsTransitionProgress = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
  const projectsScrollProgress = useTransform(scrollYProgress, [0.5, 0.75], [0, 1]);
  const skillsProgress = useTransform(scrollYProgress, [0.75, 0.95], [0, 1]);
  
  // Horizontal scroll for projects section
  const projectsScrollX = useTransform(
    scrollYProgress,
    [0.5, 0.75],
    [0, -projectsWidth]
  );
  
  // Horizontal scroll for skills section
  const skillsScrollX = useTransform(
    scrollYProgress,
    [0.75, 0.95],
    [0, -skillsWidth]
  );
  
  // Combined horizontal offset
  const totalProjectsX = useTransform(projectsScrollX, (v) => v);
  const totalSkillsX = useTransform(skillsScrollX, (v) => v);
  
  const smoothProjectsX = useSpring(totalProjectsX, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const smoothSkillsX = useSpring(totalSkillsX, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="bg-background min-h-screen overflow-x-hidden">
      <CursorFollower />
      <Navbar />
      
      {/* Hero Section - Intro Only */}
      <section className="relative min-h-screen flex items-center px-8 lg:px-16">
        <div className="w-full max-w-7xl mx-auto">
          <HeroSection />
        </div>
      </section>

      {/* Projects Section - Stacked beside, then horizontal scroll */}
      <section 
        className="relative"
        style={{ height: `${250}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Stacked Projects View */}
          <motion.div
            className="absolute inset-0 flex items-center"
            style={{
              opacity: useTransform(projectsTransitionProgress, [0, 0.5], [1, 0]),
              pointerEvents: useTransform(projectsTransitionProgress, (v) => v > 0.5 ? 'none' : 'auto'),
            }}
          >
            <div className="w-full max-w-7xl mx-auto px-8 lg:px-16 flex items-center gap-12">
              <div className="flex-1">
                {/* Spacer for intro alignment */}
              </div>
              <div className="flex-1 flex items-center justify-center">
                <StackedProjects scrollProgress={projectsTransitionProgress} />
              </div>
            </div>
          </motion.div>

          {/* Horizontal Scroll Projects View */}
          <motion.div
            ref={horizontalContainerRef}
            className="absolute inset-0 flex items-center"
            style={{
              opacity: useTransform(projectsTransitionProgress, [0.5, 1], [0, 1]),
              pointerEvents: useTransform(projectsTransitionProgress, (v) => v < 0.5 ? 'none' : 'auto'),
            }}
          >
            <motion.div
              ref={projectsContainerRef}
              style={{ x: smoothProjectsX }}
              className="flex h-full items-center"
            >
              <div className="min-w-screen flex-shrink-0 h-full flex items-center justify-center px-8">
                <div className="text-center">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-silver-100 border border-silver-200 text-soft-gray text-sm font-medium mb-4">
                    Featured Work
                  </span>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-2">
                    Projects
                  </h2>
                </div>
              </div>
              
              <div className="flex-shrink-0">
                <StackedProjects scrollProgress={projectsScrollProgress} inHorizontalScroll={true} />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills Horizontal Scroll */}
      <section 
        className="relative"
        style={{ height: `${100}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div 
            ref={skillsContainerRef}
            style={{ x: smoothSkillsX }}
            className="flex h-full items-center"
          >
            <HorizontalSkillsScroll />
          </motion.div>
        </div>
      </section>

      {/* Transition to Vertical Scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        {/* Smooth transition gradient */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background via-background/50 to-transparent -mt-32 pointer-events-none" />
        
        {/* Vertical Scrolling Sections */}
        <ExperienceTimeline />
        
        <GitHubContributions />
        
        <CreativeContact />
        
        <Footer />
      </motion.div>
    </div>
  );
};

export default Index;
