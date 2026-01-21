import { motion, useTransform } from "framer-motion";
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
  {
    id: 5,
    title: "Artisan Studio",
    description: "Creative portfolio platform for artists and designers to showcase their work with immersive galleries and interactive exhibitions.",
    tags: ["Next.js", "Three.js", "Framer Motion", "Supabase"],
    liveUrl: "#",
    sourceUrl: "#",
    gradient: "from-rose-100 to-pink-50",
  },
];

interface StackedProjectsProps {
  scrollProgress: any;
  inHorizontalScroll?: boolean;
}

const StackedProjects = ({ scrollProgress, inHorizontalScroll = false }: StackedProjectsProps) => {
  // Random offsets for each card (saved per render)
  const offsets = useRef(
    projects.map((_, index) => ({
      x: (index % 3 - 1) * 40 + (Math.random() * 25 - 12),
      y: index * 55 + (Math.random() * 30 - 15),
      rotate: (index % 3 - 1) * 7 + (Math.random() * 5 - 2.5),
    }))
  );

  if (inHorizontalScroll) {
    // In horizontal scroll mode - cards spread horizontally
    const expandProgress = useTransform(scrollProgress, [0, 1], [0, 1]);
    
    return (
      <div className="flex items-center gap-8 px-8 lg:px-16 py-16">
        {projects.map((project, index) => {
          const stackedX = offsets.current[index].x;
          const stackedY = offsets.current[index].y;
          const gridX = index * 520; // Card width (480) + gap (40)

          const x = useTransform(expandProgress, [0, 1], [stackedX, gridX]);
          const y = useTransform(expandProgress, [0, 1], [stackedY, 0]);
          const rotate = useTransform(expandProgress, [0, 1], [offsets.current[index].rotate, 0]);
          const scale = useTransform(expandProgress, [0, 0.3, 1], [1 - index * 0.08, 1 - index * 0.08, 1]);
          const opacity = useTransform(expandProgress, [0, 0.5, 1], [1 - index * 0.15, 1, 1]);

          return (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              x={x}
              y={y}
              rotate={rotate}
              scale={scale}
              opacity={opacity}
              zIndex={projects.length - index}
            />
          );
        })}
      </div>
    );
  }

  // Initial stacked mode beside hero
  return (
    <div className="relative w-full h-[600px] flex items-center justify-center">
      {projects.map((project, index) => {
        const offset = offsets.current[index];
        
        // Cards stay stacked but can animate slightly based on scroll
        const y = useTransform(scrollProgress, [0, 1], [offset.y, offset.y * 0.7]);
        const x = useTransform(scrollProgress, [0, 1], [offset.x, offset.x * 1.1]);
        const rotate = useTransform(scrollProgress, [0, 1], [offset.rotate, offset.rotate * 0.6]);
        const scale = useTransform(scrollProgress, [0, 1], [1 - index * 0.08, 1 - index * 0.06]);
        const opacity = useTransform(scrollProgress, [0, 1], [1 - index * 0.12, 1 - index * 0.08]);

        return (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            x={x}
            y={y}
            rotate={rotate}
            scale={scale}
            opacity={opacity}
            zIndex={projects.length - index}
          />
        );
      })}
    </div>
  );
};

interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
  x: any;
  y: any;
  rotate: any;
  scale: any;
  opacity: any;
  zIndex: number;
}

const ProjectCard = ({ project, index, x, y, rotate, scale, opacity, zIndex }: ProjectCardProps) => {
  return (
    <motion.div
      style={{
        x: x,
        y: y,
        rotateZ: rotate,
        scale: scale,
        opacity: opacity,
        zIndex: zIndex,
      }}
      className="absolute flex-shrink-0 w-[480px] h-[480px]" // Square cards
      whileHover={{ 
        y: useTransform(y, (v) => (typeof v === 'number' ? v - 15 : -15)),
        scale: useTransform(scale, (v) => (typeof v === 'number' ? v * 1.03 : 1.03)),
        zIndex: 100,
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
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

export default StackedProjects;
