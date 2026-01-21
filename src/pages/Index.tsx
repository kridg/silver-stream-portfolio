import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StackedProjects from "@/components/StackedProjects";
import SkillsSection from "@/components/SkillsSection";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import CreativeContact from "@/components/CreativeContact";
import Footer from "@/components/Footer";
import CursorFollower from "@/components/CursorFollower";

const Index = () => {
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const projectsSectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll();
  
  // Unified progress tracking for stacked projects flow
  // Projects move from hero (0-0.4) to projects section (0.4-0.8)
  const projectsFlowProgress = useTransform(
    scrollYProgress,
    [0, 0.4, 0.8], // Hero section (0-0.4), transition (0.4-0.6), projects section (0.6-0.8)
    [0, 0.5, 1]
  );

  return (
    <div className="bg-background min-h-screen overflow-x-hidden">
      <CursorFollower />
      <Navbar />
      
      {/* Hero Section with Intro and Stacked Projects */}
      <section
        id="home"
        ref={heroSectionRef}
        className="relative min-h-screen flex items-center px-8 lg:px-16 py-16"
      >
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Introduction */}
            <div className="flex-shrink-0">
              <HeroSection />
            </div>

            {/* Right: Stacked Projects */}
            <div className="flex-shrink-0 flex items-center justify-center lg:justify-end">
              <StackedProjects scrollProgress={scrollYProgress} section="hero" />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section - Same Stack Expands to Grid */}
      <section
        id="projects"
        ref={projectsSectionRef}
        className="relative min-h-screen flex items-center px-8 lg:px-16 py-16"
      >
        <div className="w-full max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-silver-100 border border-silver-200 text-soft-gray text-sm font-medium mb-4">
              Featured Work
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-4">
              Projects
            </h2>
            <p className="text-soft-gray text-lg max-w-2xl mx-auto">
              A collection of projects showcasing clean, functional applications.
            </p>
          </motion.div>

          {/* The stacked projects will flow down from hero and expand here */}
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="relative min-h-screen flex items-center px-8 lg:px-16 py-16"
      >
        <div className="w-full max-w-7xl mx-auto">
          <SkillsSection />
        </div>
      </section>

      {/* Experience Timeline */}
      <section
        id="experience"
        className="relative min-h-screen flex items-center px-8 lg:px-16 py-16"
      >
        <div className="w-full max-w-6xl mx-auto">
          <ExperienceTimeline />
        </div>
      </section>
      
      {/* Contact */}
      <section id="contact">
        <CreativeContact />
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
