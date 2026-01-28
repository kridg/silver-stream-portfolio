import { motion, useTransform, MotionValue, useScroll } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import MagneticButton from "./MagneticButton";

const projects = [
  {
    id: 1,
    title: "CloudSync Dashboard",
    description: "A real-time cloud infrastructure monitoring dashboard with live metrics, alert management, and automated scaling controls built for DevOps teams.",
    tags: ["React", "TypeScript", "WebSocket", "D3.js"],
    liveUrl: "#",
    sourceUrl: "#",
    gradient: "from-silver-100 to-silver-50",
  },
  {
    id: 2,
    title: "Nexus E-Commerce",
    description: "Modern headless e-commerce platform with seamless checkout flows, inventory management, and integrated analytics for growing businesses.",
    tags: ["Next.js", "Stripe", "Prisma", "PostgreSQL"],
    liveUrl: "#",
    sourceUrl: "#",
    gradient: "from-silver-200 to-silver-100",
  },
  {
    id: 3,
    title: "TaskFlow Pro",
    description: "Collaborative project management tool featuring kanban boards, time tracking, and AI-powered task prioritization for remote teams.",
    tags: ["React", "Node.js", "MongoDB", "Socket.io"],
    liveUrl: "#",
    sourceUrl: "#",
    gradient: "from-silver-300 to-silver-200",
  },
  {
    id: 4,
    title: "DevMetrics API",
    description: "RESTful API service that aggregates developer productivity metrics from multiple sources, providing actionable insights and trend analysis.",
    tags: ["Node.js", "Express", "Redis", "Docker"],
    liveUrl: "#",
    sourceUrl: "#",
    gradient: "from-silver-400 to-silver-300",
  },
];

interface StackedProjectsProps {
  scrollProgress: MotionValue<number>;
  inExpandedView?: boolean;
  section?: 'hero' | 'projects';
}

const StackedProjects = ({ scrollProgress, inExpandedView = false, section = 'hero' }: StackedProjectsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress relative to this component
  const { scrollYProgress: componentScrollProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Random scattered positions for dynamic stack effect
  const stackOffsets = useRef([
    { x: -20, y: 10, rotate: -8, scale: 0.95 }, // Bottom-left scattered
    { x: 30, y: -15, rotate: 12, scale: 0.9 }, // Top-right scattered
    { x: -35, y: -25, rotate: -15, scale: 0.85 }, // Top-left scattered
    { x: 15, y: 25, rotate: 6, scale: 0.92 }, // Bottom-right scattered
  ]).current;

  // Smooth transition to grid based on scroll progress
  const expandProgress = Math.max(0, Math.min(1, (scrollProgress - 0.5) * 2)); // Transition from 0.5 to 0.7 scroll progress
  const shouldExpand = scrollProgress > 0.7 || inExpandedView;

  if (shouldExpand) {
    // Smooth transition from scattered positions to organized grid
    return (
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {projects.map((project, index) => {
          const offset = stackOffsets[index];

          return (
            <motion.div
              key={project.id}
              initial={{
                x: offset.x * expandProgress,
                y: offset.y * expandProgress,
                rotate: offset.rotate * expandProgress,
                scale: 1 - (1 - offset.scale) * expandProgress,
                opacity: 1
              }}
              animate={{
                x: 0,
                y: 0,
                rotate: 0,
                scale: 1,
                opacity: 1
              }}
              transition={{
                duration: 1.5,
                delay: index * 0.2,
                ease: [0.25, 0.1, 0.25, 1],
                type: "spring",
                stiffness: 80,
                damping: 20
              }}
              whileHover={{
                y: -8,
                scale: 1.03,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              <ProjectCard project={project} index={index} />
            </motion.div>
          );
        })}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={containerRef}
      className="relative w-[450px] sm:w-[500px] lg:w-[580px] h-[650px] sm:h-[700px] lg:h-[750px] flex items-center justify-center"
      animate={{
        y: scrollProgress * 600, // Smoothly move down based on scroll progress
        opacity: Math.max(0.3, 1 - scrollProgress * 0.7), // Gradually fade as we scroll
        scale: Math.max(0.85, 1 - scrollProgress * 0.15), // Gradually scale down
      }}
      transition={{
        type: "spring",
        stiffness: 50,
        damping: 20,
        mass: 0.8
      }}
    >
      {projects.map((project, index) => {
        const offset = stackOffsets[index];

        // Cards maintain their relative positions within the moving stack

        return (
          <div
            key={project.id}
            className="absolute"
            style={{
              x: offset.x,
              y: offset.y,
              scale: offset.scale,
              rotateZ: offset.rotate,
              zIndex: projects.length - index,
            }}
          >
            <StackedCard project={project} index={index} />
          </div>
        );
      })}
    </motion.div>
  );
};

// Simplified stacked card component (pure image, no interactions)
const StackedCard = ({ project, index }: { project: typeof projects[0], index: number }) => {
  return (
    <div className="w-[300px] sm:w-[340px] lg:w-[360px] h-[360px] sm:h-[400px] lg:h-[420px] overflow-hidden">
      <div className={`relative h-full bg-gradient-to-br ${project.gradient} overflow-hidden rounded-2xl shadow-lg`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-2xl bg-card/90 backdrop-blur-sm shadow-elevated flex items-center justify-center border border-white/20">
            <span className="text-5xl font-bold text-charcoal">{project.title.charAt(0)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Expanded card component (larger, for grid view)
const ProjectCard = ({ project, index }: { project: typeof projects[0], index: number }) => {
  return (
    <motion.article
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group w-full card-premium overflow-hidden cursor-pointer h-full"
    >
      <div className={`relative h-[280px] bg-gradient-to-br ${project.gradient} overflow-hidden`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            className="w-20 h-20 rounded-2xl bg-card shadow-elevated flex items-center justify-center"
            whileHover={{ scale: 1.15, rotate: 8 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="text-3xl font-bold text-charcoal">{project.title.charAt(0)}</span>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute inset-0 bg-charcoal/90 backdrop-blur-sm flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <MagneticButton href={project.liveUrl} target="_blank" strength={0.5}>
            <span className="flex items-center gap-2 px-5 py-3 rounded-xl bg-card text-charcoal font-medium shadow-elevated">
              <ExternalLink className="w-5 h-5" />
              Preview
            </span>
          </MagneticButton>
          <MagneticButton href={project.sourceUrl} target="_blank" strength={0.5}>
            <span className="flex items-center gap-2 px-5 py-3 rounded-xl bg-card text-charcoal font-medium shadow-elevated">
              <Github className="w-5 h-5" />
              Code
            </span>
          </MagneticButton>
        </motion.div>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-semibold text-charcoal group-hover:text-primary transition-colors leading-tight">
            {project.title}
          </h3>
          <motion.div
            whileHover={{ x: 4, y: -4 }}
            className="text-soft-gray group-hover:text-charcoal transition-colors flex-shrink-0"
          >
            <ArrowUpRight className="w-5 h-5" />
          </motion.div>
        </div>
        
        <p className="text-soft-gray leading-relaxed text-sm line-clamp-3">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tags.map((tag) => (
            <span 
              key={tag} 
              className="px-3 py-1 text-xs font-medium rounded-full bg-silver-100 text-soft-gray border border-silver-200 hover:bg-silver-200 hover:text-charcoal-light transition-all duration-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
};

export default StackedProjects;
