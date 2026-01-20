import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "CloudSync",
    description: "Real-time cloud infrastructure monitoring",
    tags: ["React", "TypeScript", "D3.js"],
    gradient: "from-slate-100 to-zinc-50",
  },
  {
    id: 2,
    title: "Nexus",
    description: "Modern headless e-commerce platform",
    tags: ["Next.js", "Stripe", "Prisma"],
    gradient: "from-zinc-100 to-stone-50",
  },
  {
    id: 3,
    title: "TaskFlow",
    description: "AI-powered project management",
    tags: ["React", "Node.js", "MongoDB"],
    gradient: "from-stone-100 to-neutral-50",
  },
  {
    id: 4,
    title: "DevMetrics",
    description: "Developer productivity analytics",
    tags: ["Node.js", "Redis", "Docker"],
    gradient: "from-neutral-100 to-slate-50",
  },
];

const StackedProjectCards = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="relative w-[340px] h-[420px] hidden md:block"
    >
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ 
            opacity: 0, 
            y: 50, 
            rotateZ: (index - 1.5) * 3,
            scale: 0.9 
          }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            rotateZ: (index - 1.5) * 3,
            scale: 1 - index * 0.02 
          }}
          transition={{ 
            duration: 0.7, 
            delay: 0.5 + index * 0.1,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          whileHover={{ 
            y: -15,
            rotateZ: 0,
            scale: 1.02,
            zIndex: 50,
            transition: { duration: 0.3 }
          }}
          style={{
            position: 'absolute',
            top: index * 25,
            left: index * 8,
            zIndex: projects.length - index,
          }}
          className={`w-[300px] h-[360px] bg-gradient-to-br ${project.gradient} rounded-2xl border border-silver-200 shadow-elevated p-6 cursor-pointer group transition-shadow duration-300 hover:shadow-hover`}
        >
          {/* Project preview area */}
          <div className="h-[160px] rounded-xl bg-silver-100/50 border border-silver-200/50 flex items-center justify-center mb-5 overflow-hidden">
            <motion.div 
              className="w-16 h-16 rounded-xl bg-card shadow-card flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <span className="text-2xl font-bold text-charcoal">{project.title.charAt(0)}</span>
            </motion.div>
          </div>

          {/* Content */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-charcoal group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-soft-gray leading-relaxed">
              {project.description}
            </p>
            
            {/* Tags */}
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

            {/* Actions - visible on hover */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: 0 }}
              className="flex gap-2 pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <a href="#" className="p-2 rounded-lg bg-silver-100 text-soft-gray hover:text-charcoal hover:bg-silver-200 transition-colors">
                <ExternalLink className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-silver-100 text-soft-gray hover:text-charcoal hover:bg-silver-200 transition-colors">
                <Github className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StackedProjectCards;