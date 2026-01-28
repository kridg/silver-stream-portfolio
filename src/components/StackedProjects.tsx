import { motion, useTransform, MotionValue, useSpring } from "framer-motion";
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
    gradient: "from-slate-200 via-silver-100 to-zinc-50",
    accentColor: "#64748b",
  },
  {
    id: 2,
    title: "Nexus E-Commerce",
    description: "Modern headless e-commerce platform with seamless checkout flows, inventory management, and integrated analytics for growing businesses.",
    tags: ["Next.js", "Stripe", "Prisma", "PostgreSQL"],
    liveUrl: "#",
    sourceUrl: "#",
    gradient: "from-zinc-200 via-stone-100 to-neutral-50",
    accentColor: "#71717a",
  },
  {
    id: 3,
    title: "TaskFlow Pro",
    description: "Collaborative project management tool featuring kanban boards, time tracking, and AI-powered task prioritization for remote teams.",
    tags: ["React", "Node.js", "MongoDB", "Socket.io"],
    liveUrl: "#",
    sourceUrl: "#",
    gradient: "from-stone-200 via-neutral-100 to-gray-50",
    accentColor: "#78716c",
  },
  {
    id: 4,
    title: "DevMetrics API",
    description: "RESTful API service that aggregates developer productivity metrics from multiple sources, providing actionable insights and trend analysis.",
    tags: ["Node.js", "Express", "Redis", "Docker"],
    liveUrl: "#",
    sourceUrl: "#",
    gradient: "from-neutral-300 via-gray-200 to-slate-100",
    accentColor: "#525252",
  },
];

// Stack offsets for the scattered effect
const stackOffsets = [
  { x: 0, y: 0, rotate: -6, scale: 1 },
  { x: 25, y: 15, rotate: 3, scale: 0.98 },
  { x: -15, y: 30, rotate: -3, scale: 0.96 },
  { x: 10, y: 45, rotate: 5, scale: 0.94 },
];

interface StackedProjectsProps {
  scrollProgress: MotionValue<number>;
  section?: 'hero' | 'projects';
}

const StackedProjects = ({ scrollProgress, section = 'hero' }: StackedProjectsProps) => {
  // Use number values from MotionValue for calculations
  const smoothProgress = useSpring(scrollProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.5,
  });

  return (
    <div className="relative w-[320px] sm:w-[360px] lg:w-[400px] h-[400px] sm:h-[450px] lg:h-[500px]">
      {projects.map((project, index) => (
        <AnimatedProjectCard
          key={project.id}
          project={project}
          index={index}
          total={projects.length}
          scrollProgress={smoothProgress}
        />
      ))}
    </div>
  );
};

interface AnimatedProjectCardProps {
  project: typeof projects[0];
  index: number;
  total: number;
  scrollProgress: MotionValue<number>;
}

const AnimatedProjectCard = ({ project, index, total, scrollProgress }: AnimatedProjectCardProps) => {
  const offset = stackOffsets[index];

  // Transform scroll progress to individual card animations
  // Each card expands at different scroll points
  const cardDelay = index * 0.1;
  
  // Stack to expand transformation
  const x = useTransform(
    scrollProgress,
    [0, 0.2 + cardDelay, 0.4 + cardDelay],
    [offset.x, offset.x * 0.5, 0]
  );
  
  const y = useTransform(
    scrollProgress,
    [0, 0.2 + cardDelay, 0.4 + cardDelay],
    [offset.y, offset.y * 0.5, 0]
  );
  
  const rotate = useTransform(
    scrollProgress,
    [0, 0.2 + cardDelay, 0.4 + cardDelay],
    [offset.rotate, offset.rotate * 0.3, 0]
  );
  
  const scale = useTransform(
    scrollProgress,
    [0, 0.2 + cardDelay, 0.4 + cardDelay],
    [offset.scale, offset.scale + 0.02, 1]
  );

  // Opacity based on stack position (top cards more visible)
  const opacity = useTransform(
    scrollProgress,
    [0, 0.3],
    [1 - index * 0.1, 1]
  );

  // Z-index changes during expansion
  const zIndex = useTransform(
    scrollProgress,
    [0, 0.3, 0.5],
    [total - index, total - index, index + 1]
  );

  return (
    <motion.div
      className="absolute top-0 left-0 w-full"
      style={{
        x,
        y,
        rotate,
        scale,
        opacity,
        zIndex,
      }}
    >
      <motion.div
        className="group relative cursor-pointer"
        whileHover={{
          y: -12,
          rotate: 0,
          scale: 1.03,
          zIndex: 50,
          transition: { duration: 0.3, ease: "easeOut" }
        }}
      >
        {/* Card */}
        <div className={`relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br ${project.gradient} border border-white/40 shadow-elevated backdrop-blur-sm`}>
          {/* Glass overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/5" />
          
          {/* Content preview */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
            {/* Project icon */}
            <motion.div 
              className="w-20 h-20 rounded-2xl bg-white/80 backdrop-blur-sm shadow-card flex items-center justify-center border border-white/50 mb-4"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-4xl font-bold text-charcoal">{project.title.charAt(0)}</span>
            </motion.div>
            
            {/* Title */}
            <h3 className="text-lg font-semibold text-charcoal text-center mb-2">
              {project.title}
            </h3>
            
            {/* Tags preview */}
            <div className="flex flex-wrap justify-center gap-1.5">
              {project.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-white/60 text-charcoal-light border border-white/40"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 bg-charcoal/90 backdrop-blur-sm flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6"
          >
            <p className="text-white/80 text-sm text-center leading-relaxed line-clamp-3 mb-2">
              {project.description}
            </p>
            
            <div className="flex gap-3">
              <MagneticButton href={project.liveUrl} target="_blank" strength={0.5}>
                <span className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-charcoal font-medium text-sm shadow-elevated">
                  <ExternalLink className="w-4 h-4" />
                  Preview
                </span>
              </MagneticButton>
              <MagneticButton href={project.sourceUrl} target="_blank" strength={0.5}>
                <span className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-charcoal font-medium text-sm shadow-elevated">
                  <Github className="w-4 h-4" />
                  Code
                </span>
              </MagneticButton>
            </div>

            {/* All tags */}
            <div className="flex flex-wrap justify-center gap-1.5 mt-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-[10px] font-medium rounded-full bg-white/20 text-white border border-white/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Card shadow */}
        <div 
          className="absolute inset-0 rounded-2xl -z-10 blur-xl opacity-20 group-hover:opacity-30 transition-opacity"
          style={{ 
            background: `linear-gradient(135deg, ${project.accentColor}, transparent)`,
            transform: 'translateY(8px) scale(0.95)'
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default StackedProjects;
