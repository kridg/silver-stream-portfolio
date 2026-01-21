import { motion } from "framer-motion";
import { 
  Code2, 
  Database, 
  Cloud, 
  Palette, 
  GitBranch, 
  Terminal,
  Layers,
  Zap,
  Code,
  FileCode,
  Box,
  Package,
  Server,
  Globe,
  Cpu,
  Settings,
  Webhook,
  GitMerge,
  TerminalSquare,
  Boxes,
  Sparkles,
} from "lucide-react";

// Skill icons mapping
const skillIcons: { [key: string]: any } = {
  "React": Code,
  "TypeScript": FileCode,
  "Next.js": Box,
  "Node.js": Server,
  "Python": TerminalSquare,
  "Docker": Package,
  "AWS": Cloud,
  "Git": GitMerge,
  "Figma": Palette,
  "VS Code": Code2,
  "npm": Package,
  "PostgreSQL": Database,
  "Redis": Database,
  "GraphQL": Webhook,
  "Tailwind CSS": Palette,
  "Express": Code2,
  "MongoDB": Database,
  "Prisma": Database,
  "REST API": Globe,
  "WebSocket": Zap,
  "CI/CD": GitBranch,
  "Linux": Terminal,
  "D3.js": Layers,
  "Three.js": Boxes,
  "Framer Motion": Sparkles,
  "Supabase": Cloud,
};

const allSkills = [
  "React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion",
  "Node.js", "Express", "Python", "REST API", "GraphQL",
  "PostgreSQL", "MongoDB", "Redis", "Prisma", "Supabase",
  "Docker", "AWS", "Git", "CI/CD", "Linux",
  "D3.js", "Three.js", "WebSocket", "Figma", "VS Code", "npm"
];

const HorizontalSkillsScroll = () => {
  return (
    <div className="relative w-full h-screen flex items-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-background to-silver-50/50 pointer-events-none" />
      
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="absolute top-24 left-8 lg:left-16 z-20"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-1.5 rounded-full bg-silver-100 border border-silver-200 text-soft-gray text-sm font-medium mb-4"
        >
          Technical Expertise
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-2"
        >
          Skills
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-soft-gray text-lg max-w-md"
        >
          Technologies and tools I use to bring ideas to life.
        </motion.p>
      </motion.div>

      {/* Skills Container */}
      <div className="flex h-screen w-max items-center gap-6 px-8 lg:px-16 ml-auto relative z-10">
        {allSkills.map((skill, index) => {
          const Icon = skillIcons[skill] || Code2;
          const delay = index * 0.03;
        
        return (
          <motion.div
            key={skill}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
              duration: 0.5, 
              delay,
              type: "spring",
              stiffness: 200,
              damping: 20
            }}
            whileHover={{ 
              scale: 1.15, 
              y: -10,
              rotate: [0, -5, 5, 0],
              transition: { duration: 0.3 }
            }}
            className="flex-shrink-0 group"
          >
            <motion.div
              className="relative flex flex-col items-center justify-center gap-4 p-8 rounded-3xl bg-gradient-to-br from-silver-50 via-card to-silver-50 border border-silver-200 shadow-card hover:shadow-elevated transition-all duration-500 cursor-pointer"
              style={{
                width: "200px",
                height: "280px",
              }}
            >
              {/* Glow effect on hover */}
              <motion.div
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/0 via-purple-400/0 to-pink-400/0 group-hover:from-blue-400/20 group-hover:via-purple-400/20 group-hover:to-pink-400/20 blur-xl transition-all duration-500"
                initial={false}
              />
              
              {/* Icon */}
              <motion.div
                className="relative z-10 p-6 rounded-2xl bg-gradient-to-br from-card to-silver-100 border border-silver-200 shadow-subtle group-hover:shadow-elevated transition-all duration-300"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <Icon className="w-12 h-12 text-charcoal" strokeWidth={1.5} />
              </motion.div>
              
              {/* Skill name */}
              <motion.span
                className="relative z-10 text-sm font-semibold text-charcoal text-center"
                initial={false}
              >
                {skill}
              </motion.span>
              
              {/* Decorative dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 opacity-40 group-hover:opacity-70 transition-opacity">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-charcoal"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.4, 1, 0.4],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        );
      })}
      </div>
    </div>
  );
};

export default HorizontalSkillsScroll;
