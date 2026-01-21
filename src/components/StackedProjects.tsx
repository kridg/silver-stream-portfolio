import { motion, useTransform, MotionValue } from "framer-motion";
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
    gradient: "from-slate-100 to-zinc-50",
  },
  {
    id: 2,
    title: "Nexus E-Commerce",
    description: "Modern headless e-commerce platform with seamless checkout flows, inventory management, and integrated analytics for growing businesses.",
    tags: ["Next.js", "Stripe", "Prisma", "PostgreSQL"],
    liveUrl: "#",
    sourceUrl: "#",
    gradient: "from-zinc-100 to-stone-50",
  },
  {
    id: 3,
    title: "TaskFlow Pro",
    description: "Collaborative project management tool featuring kanban boards, time tracking, and AI-powered task prioritization for remote teams.",
    tags: ["React", "Node.js", "MongoDB", "Socket.io"],
    liveUrl: "#",
    sourceUrl: "#",
    gradient: "from-stone-100 to-neutral-50",
  },
  {
    id: 4,
    title: "DevMetrics API",
    description: "RESTful API service that aggregates developer productivity metrics from multiple sources, providing actionable insights and trend analysis.",
    tags: ["Node.js", "Express", "Redis", "Docker"],
    liveUrl: "#",
    sourceUrl: "#",
    gradient: "from-neutral-100 to-slate-50",
  },
];

interface StackedProjectsProps {
  scrollProgress: MotionValue<number>;
  inHorizontalScroll?: boolean;
}

const StackedProjects = ({ scrollProgress, inHorizontalScroll = false }: StackedProjectsProps) => {
  // Fixed offsets for stacked appearance - more visible stacking
  const stackOffsets = useRef([
    { x: 0, y: 0, rotate: -4 },
    { x: 20, y: 35, rotate: -1 },
    { x: 40, y: 70, rotate: 2 },
    { x: 60, y: 105, rotate: 4 },
  ]).current;

  if (inHorizontalScroll) {
    // In horizontal scroll mode - cards spread into horizontal row
    return (
      <div className="flex items-center gap-10 px-8">
        {projects.map((project, index) => {
          const startDelay = index * 0.15;
          const endDelay = 0.4 + index * 0.15;
          
          // Transform from stacked to grid positions
          const x = useTransform(
            scrollProgress, 
            [startDelay, endDelay], 
            [stackOffsets[index].x - 200, index * 520]
          );
          const y = useTransform(
            scrollProgress, 
            [startDelay, endDelay], 
            [stackOffsets[index].y, 0]
          );
          const rotate = useTransform(
            scrollProgress, 
            [startDelay, endDelay], 
            [stackOffsets[index].rotate, 0]
          );
          const scale = useTransform(
            scrollProgress, 
            [0, startDelay, endDelay], 
            [1 - index * 0.05, 1 - index * 0.05, 1]
          );

          return (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              x={x}
              y={y}
              rotate={rotate}
              scale={scale}
              zIndex={projects.length - index}
              isExpanded={true}
            />
          );
        })}
      </div>
    );
  }

  // Initial stacked mode beside hero - visible stack
  return (
    <div className="relative w-[420px] h-[550px] flex items-center justify-center">
      {projects.map((project, index) => {
        const offset = stackOffsets[index];
        
        // Subtle breathing animation based on scroll
        const y = useTransform(scrollProgress, [0, 1], [offset.y, offset.y - 10]);
        const rotate = useTransform(scrollProgress, [0, 1], [offset.rotate, offset.rotate * 0.5]);

        return (
          <motion.div
            key={project.id}
            style={{
              x: offset.x,
              y: y,
              rotateZ: rotate,
              zIndex: projects.length - index,
            }}
            className="absolute"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1 - index * 0.08, scale: 1 - index * 0.03, y: offset.y }}
            transition={{ duration: 0.6, delay: 0.3 + index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            whileHover={{ 
              y: offset.y - 15,
              scale: 1.02,
              zIndex: 50,
              transition: { duration: 0.25 }
            }}
          >
            <StackedCard project={project} index={index} />
          </motion.div>
        );
      })}
    </div>
  );
};

interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
  x: MotionValue<number>;
  y: MotionValue<number>;
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  zIndex: number;
  isExpanded?: boolean;
}

const ProjectCard = ({ project, index, x, y, rotate, scale, zIndex, isExpanded }: ProjectCardProps) => {
  return (
    <motion.div
      style={{
        x: x,
        y: y,
        rotateZ: rotate,
        scale: scale,
        zIndex: zIndex,
      }}
      className="absolute flex-shrink-0 w-[480px] h-[480px]"
      whileHover={{ 
        scale: 1.03,
        y: -15,
        zIndex: 100,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
    >
      <motion.article
        className="group w-full h-full card-premium overflow-hidden cursor-pointer"
      >
        {/* Project Preview - Square aspect */}
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
          
          {/* Hover overlay */}
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

        {/* Content */}
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
          
          <p className="text-soft-gray leading-relaxed text-sm line-clamp-2">
            {project.description}
          </p>
          
          {/* Tech Tags */}
          <div className="flex flex-wrap gap-2 pt-1">
            {project.tags.slice(0, 3).map((tag) => (
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
    </motion.div>
  );
};

// Simpler card for stacked view
const StackedCard = ({ project, index }: { project: typeof projects[0], index: number }) => {
  return (
    <article className="group w-[340px] h-[400px] card-premium overflow-hidden cursor-pointer">
      {/* Project Preview */}
      <div className={`relative h-[200px] bg-gradient-to-br ${project.gradient} overflow-hidden`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            className="w-16 h-16 rounded-2xl bg-card shadow-elevated flex items-center justify-center"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="text-2xl font-bold text-charcoal">{project.title.charAt(0)}</span>
          </motion.div>
        </div>
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-charcoal/85 backdrop-blur-sm flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <a href={project.liveUrl} className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-card text-charcoal text-sm font-medium shadow-elevated hover:scale-105 transition-transform">
            <ExternalLink className="w-4 h-4" />
            Preview
          </a>
          <a href={project.sourceUrl} className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-card text-charcoal text-sm font-medium shadow-elevated hover:scale-105 transition-transform">
            <Github className="w-4 h-4" />
            Code
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-charcoal group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <ArrowUpRight className="w-4 h-4 text-soft-gray group-hover:text-charcoal transition-colors flex-shrink-0" />
        </div>
        
        <p className="text-soft-gray leading-relaxed text-sm line-clamp-2">
          {project.description}
        </p>
        
        {/* Tech Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tags.slice(0, 3).map((tag) => (
            <span 
              key={tag} 
              className="px-2.5 py-1 text-xs font-medium rounded-full bg-silver-100 text-soft-gray border border-silver-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

export default StackedProjects;
