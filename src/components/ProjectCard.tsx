import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  sourceUrl: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group bg-card rounded-xl border border-border shadow-card hover:shadow-hover transition-all duration-300"
    >
      {/* Project Image */}
      <div className="relative overflow-hidden rounded-t-xl bg-secondary aspect-video">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-lg bg-accent flex items-center justify-center">
            <span className="text-2xl font-bold text-soft-gray">{project.title.charAt(0)}</span>
          </div>
        </div>
        <motion.div 
          className="absolute inset-0 bg-charcoal/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
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

export default ProjectCard;
