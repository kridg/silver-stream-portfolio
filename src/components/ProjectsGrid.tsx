import { motion, useScroll, useTransform } from "framer-motion";
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

const ProjectsGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({
    container: containerRef,
  });

  return (
    <section id="projects" className="min-h-screen w-screen flex-shrink-0 flex flex-col justify-center px-8 lg:px-16 py-16 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-silver-50 via-background to-silver-100" />
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 relative z-10"
      >
        <span className="inline-block px-4 py-1.5 rounded-full bg-silver-100 border border-silver-200 text-soft-gray text-sm font-medium mb-4">
          Featured Work
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal mb-4">
          Personal Projects
        </h2>
        <p className="text-soft-gray max-w-2xl mx-auto text-lg">
          A collection of projects showcasing my passion for building 
          clean, functional applications.
        </p>
      </motion.div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto w-full relative z-10">
        {projects.map((project, index) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.1,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            whileHover={{ y: -8 }}
            className="group card-premium overflow-hidden"
          >
            {/* Project Image/Preview */}
            <div className={`relative h-48 lg:h-56 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  className="w-20 h-20 rounded-2xl bg-card shadow-elevated flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="text-3xl font-bold text-charcoal">{project.title.charAt(0)}</span>
                </motion.div>
              </div>
              
              {/* Hover overlay */}
              <motion.div 
                className="absolute inset-0 bg-charcoal/80 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <MagneticButton href={project.liveUrl} target="_blank" strength={0.5}>
                  <span className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card text-charcoal font-medium text-sm">
                    <ExternalLink className="w-4 h-4" />
                    Preview
                  </span>
                </MagneticButton>
                <MagneticButton href={project.sourceUrl} target="_blank" strength={0.5}>
                  <span className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card text-charcoal font-medium text-sm">
                    <Github className="w-4 h-4" />
                    Code
                  </span>
                </MagneticButton>
              </motion.div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-semibold text-charcoal group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <motion.div
                  whileHover={{ x: 3, y: -3 }}
                  className="text-soft-gray group-hover:text-charcoal transition-colors"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </motion.div>
              </div>
              
              <p className="text-soft-gray text-sm leading-relaxed">
                {project.description}
              </p>
              
              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag-pill">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default ProjectsGrid;