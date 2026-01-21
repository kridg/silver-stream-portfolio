import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { useRef, useEffect, useState } from "react";
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

interface HorizontalProjectsScrollProps {
  scrollProgress: any;
}

const HorizontalProjectsScroll = ({ scrollProgress }: HorizontalProjectsScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Transform from stacked (0) to horizontal grid (1)
  const expandProgress = useTransform(scrollProgress, [0, 0.4], [0, 1]);

  // Header opacity based on scroll
  const headerOpacity = useTransform(scrollProgress, [0.1, 0.3], [0, 1]);

  return (
    <div className="relative w-full h-screen flex items-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-silver-50/50 via-background to-transparent pointer-events-none" />
      
      <div className="relative z-10 w-full">
        {/* Section Header */}
        <motion.div
          style={{ opacity: headerOpacity }}
          className="absolute top-24 left-8 lg:left-16 z-20"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-silver-100 border border-silver-200 text-soft-gray text-sm font-medium mb-4"
          >
            Featured Work
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-2"
          >
            Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-soft-gray text-lg max-w-md"
          >
            A collection of projects showcasing clean, functional applications.
          </motion.p>
        </motion.div>

        {/* Projects Container */}
        <div 
          ref={containerRef}
          className="flex h-screen w-max items-center gap-8 px-8 lg:px-16 ml-auto"
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              total={projects.length}
              expandProgress={expandProgress}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
  total: number;
  expandProgress: any;
}

const ProjectCard = ({ project, index, total, expandProgress }: ProjectCardProps) => {
  // Random offsets for stacked effect (saved per card)
  const randomX = useRef((index % 3 - 1) * 40 + Math.random() * 20 - 10);
  const randomY = useRef((index % 3 - 1) * 30 + Math.random() * 15 - 7);
  const randomRotate = useRef((index % 3 - 1) * 8 + (Math.random() * 6 - 3));

  // Transform from stacked to grid
  // For stacked: cards are offset randomly with slight rotation
  // For grid: cards are in horizontal line
  const stackedX = randomX.current;
  const stackedY = index * 60 + randomY.current;
  const gridX = index * 520; // Card width (480) + gap (40)

  const x = useTransform(
    expandProgress,
    [0, 1],
    [stackedX, gridX]
  );
  const y = useTransform(
    expandProgress,
    [0, 1],
    [stackedY, 0]
  );
  const rotate = useTransform(
    expandProgress,
    [0, 1],
    [randomRotate.current, 0]
  );
  const scale = useTransform(
    expandProgress,
    [0, 0.3, 1],
    [1 - index * 0.08, 1 - index * 0.08, 1]
  );
  const opacity = useTransform(
    expandProgress,
    [0, 0.5, 1],
    [1 - index * 0.15, 1, 1]
  );

  return (
    <motion.div
      style={{
        x: x,
        y: y,
        rotateZ: rotate,
        scale: scale,
        opacity: opacity,
        zIndex: useTransform(expandProgress, [0, 0.5, 1], [total - index, total - index, index]),
      }}
      className="flex-shrink-0 w-[480px] h-[600px] relative"
    >
      <motion.article
        whileHover={{ y: -12, scale: 1.02 }}
        className="group w-full h-full card-premium overflow-hidden cursor-pointer"
      >
        {/* Project Preview */}
        <div className={`relative h-[320px] bg-gradient-to-br ${project.gradient} overflow-hidden`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              className="w-24 h-24 rounded-3xl bg-card shadow-elevated flex items-center justify-center"
              whileHover={{ scale: 1.15, rotate: 8 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-4xl font-bold text-charcoal">{project.title.charAt(0)}</span>
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
        <div className="p-8 space-y-5">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-2xl font-semibold text-charcoal group-hover:text-primary transition-colors leading-tight">
              {project.title}
            </h3>
            <motion.div
              whileHover={{ x: 4, y: -4 }}
              className="text-soft-gray group-hover:text-charcoal transition-colors flex-shrink-0"
            >
              <ArrowUpRight className="w-6 h-6" />
            </motion.div>
          </div>
          
          <p className="text-soft-gray leading-relaxed text-[15px] line-clamp-3">
            {project.description}
          </p>
          
          {/* Tech Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag) => (
              <span 
                key={tag} 
                className="px-3.5 py-1.5 text-xs font-medium rounded-full bg-silver-100 text-soft-gray border border-silver-200 hover:bg-silver-200 hover:text-charcoal-light transition-all duration-200"
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

export default HorizontalProjectsScroll;
