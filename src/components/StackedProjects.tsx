import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "CloudSync Dashboard",
    description: "A real-time cloud infrastructure monitoring dashboard with live metrics, alert management, and automated scaling controls built for DevOps teams.",
    tags: ["React", "TypeScript", "WebSocket", "D3.js"],
    liveUrl: "#",
    sourceUrl: "#",
    color: "bg-gradient-to-br from-slate-50 to-zinc-100",
  },
  {
    id: 2,
    title: "Nexus E-Commerce",
    description: "Modern headless e-commerce platform with seamless checkout flows, inventory management, and integrated analytics for growing businesses.",
    tags: ["Next.js", "Stripe", "Prisma", "PostgreSQL"],
    liveUrl: "#",
    sourceUrl: "#",
    color: "bg-gradient-to-br from-zinc-50 to-stone-100",
  },
  {
    id: 3,
    title: "TaskFlow Pro",
    description: "Collaborative project management tool featuring kanban boards, time tracking, and AI-powered task prioritization for remote teams.",
    tags: ["React", "Node.js", "MongoDB", "Socket.io"],
    liveUrl: "#",
    sourceUrl: "#",
    color: "bg-gradient-to-br from-stone-50 to-neutral-100",
  },
  {
    id: 4,
    title: "DevMetrics API",
    description: "RESTful API service that aggregates developer productivity metrics from multiple sources, providing actionable insights and trend analysis.",
    tags: ["Node.js", "Express", "Redis", "Docker"],
    liveUrl: "#",
    sourceUrl: "#",
    color: "bg-gradient-to-br from-neutral-50 to-slate-100",
  },
];

const StackedProjects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Transform scroll progress to control the stacking
  const isExpanded = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section id="projects" ref={containerRef} className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
            Personal Projects
          </h2>
          <p className="text-soft-gray max-w-2xl mx-auto">
            A collection of projects that showcase my passion for building clean, 
            functional applications with modern technologies.
          </p>
        </motion.div>

        {/* Stacked Cards View */}
        <div className="relative h-[500px] mb-32">
          {projects.map((project, index) => (
            <StackedCard
              key={project.id}
              project={project}
              index={index}
              total={projects.length}
              scrollProgress={isExpanded}
            />
          ))}
        </div>

        {/* Grid View on Scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-200px" }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => (
            <ProjectGridCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

interface StackedCardProps {
  project: typeof projects[0];
  index: number;
  total: number;
  scrollProgress: any;
}

const StackedCard = ({ project, index, total, scrollProgress }: StackedCardProps) => {
  const yOffset = useTransform(scrollProgress, [0, 1], [index * 24, index * 200]);
  const scale = useTransform(scrollProgress, [0, 1], [1 - index * 0.02, 1]);
  const opacity = useTransform(scrollProgress, [0, 0.5, 1], [1, 1, 0]);
  const rotate = useTransform(scrollProgress, [0, 1], [index * -1, 0]);

  return (
    <motion.div
      style={{
        y: yOffset,
        scale,
        opacity,
        rotateZ: rotate,
        zIndex: total - index,
      }}
      className={`absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl ${project.color} rounded-2xl border border-border shadow-elevated p-8`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-charcoal mb-2">{project.title}</h3>
          <p className="text-soft-gray text-sm leading-relaxed max-w-md">
            {project.description}
          </p>
        </div>
        <div className="flex gap-2">
          <a
            href={project.liveUrl}
            className="p-2 rounded-lg bg-secondary text-soft-gray hover:text-charcoal transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
          <a
            href={project.sourceUrl}
            className="p-2 rounded-lg bg-secondary text-soft-gray hover:text-charcoal transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 text-xs font-medium rounded-full bg-secondary text-soft-gray"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

interface ProjectGridCardProps {
  project: typeof projects[0];
  index: number;
}

const ProjectGridCard = ({ project, index }: ProjectGridCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -8 }}
      className="group bg-card rounded-xl border border-border shadow-card hover:shadow-hover transition-all duration-300"
    >
      {/* Project Image */}
      <div className={`relative overflow-hidden rounded-t-xl ${project.color} aspect-video`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            className="w-20 h-20 rounded-2xl bg-card/80 backdrop-blur-sm flex items-center justify-center shadow-subtle"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <span className="text-3xl font-bold text-charcoal">{project.title.charAt(0)}</span>
          </motion.div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-semibold text-charcoal group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        
        <p className="text-soft-gray text-sm leading-relaxed">
          {project.description}
        </p>
        
        {/* Tech Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-medium rounded-full bg-secondary text-soft-gray"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border border-border text-charcoal hover:bg-secondary transition-all duration-200"
          >
            <ExternalLink className="w-4 h-4" />
            Live Preview
          </a>
          <a
            href={project.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border border-border text-charcoal hover:bg-secondary transition-all duration-200"
          >
            <Github className="w-4 h-4" />
            Source Code
          </a>
        </div>
      </div>
    </motion.article>
  );
};

export default StackedProjects;
