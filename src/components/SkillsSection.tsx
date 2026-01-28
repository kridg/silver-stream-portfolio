import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaDatabase,
  FaDocker,
  FaAws,
  FaGitAlt,
  FaLinux,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaGithub,
  FaFigma,
  FaNpm,
  FaYarn,
  FaSass,
  FaBootstrap,
  FaVuejs,
  FaAngular,
  FaJava,
  FaPhp,
  FaFirebase,
  FaGlobe,
} from "react-icons/fa";
import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiFramer,
  SiThreedotjs,
  SiExpress,
  SiPrisma,
  SiSupabase,
  SiVercel,
  SiNetlify,
  SiWebpack,
  SiVite,
  SiJest,
  SiCypress,
  SiKubernetes,
  SiTerraform,
  SiJenkins,
  SiCircleci,
  SiGithubactions,
  SiGraphql,
} from "react-icons/si";

const skillCategories = [
  {
    title: "Frontend",
    icon: FaReact,
    color: "from-silver-50/80 to-silver-100/60",
    borderColor: "border-silver-200",
    skills: [
      { name: "React", icon: FaReact, color: "text-blue-500" },
      { name: "JavaScript", icon: FaJsSquare, color: "text-yellow-500" },
      { name: "TypeScript", icon: SiTypescript, color: "text-blue-600" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-cyan-500" },
    ],
  },
  {
    title: "Backend",
    icon: FaNodeJs,
    color: "from-silver-100/70 to-silver-200/50",
    borderColor: "border-silver-300",
    skills: [
      { name: "Node.js", icon: FaNodeJs, color: "text-green-600" },
      { name: "Python", icon: FaPython, color: "text-blue-500" },
      { name: "Django", icon: FaPython, color: "text-green-700" },
      { name: "REST API", icon: FaGlobe, color: "text-gray-600" },
    ],
  },
  {
    title: "Database",
    icon: FaDatabase,
    color: "from-silver-200/60 to-silver-300/40",
    borderColor: "border-silver-400",
    skills: [
      { name: "PostgreSQL", icon: FaDatabase, color: "text-blue-600" },
      { name: "MongoDB", icon: FaDatabase, color: "text-green-600" },
      { name: "Supabase", icon: SiSupabase, color: "text-green-500" },
    ],
  },
  {
    title: "DevOps & Tools",
    icon: FaDocker,
    color: "from-silver-300/50 to-silver-400/30",
    borderColor: "border-silver-500",
    skills: [
      { name: "Docker", icon: FaDocker, color: "text-blue-500" },
      { name: "Git", icon: FaGitAlt, color: "text-orange-600" },
      { name: "GitHub", icon: FaGithub, color: "text-gray-800" },
    ],
  },
];

const SkillsSection = () => {
  return (
    <section className="w-full py-12">
      {/* Header with subtle parallax */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
        style={{
          y: typeof window !== 'undefined' ? 0 : 0, // Could add scroll-based movement here
        }}
      >
        <span className="inline-block px-4 py-1.5 rounded-full bg-silver-100 border border-silver-200 text-soft-gray text-sm font-medium mb-4">
          Technical Expertise
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal mb-4">
          Skills & Technologies
        </h2>
        <p className="text-soft-gray max-w-2xl mx-auto text-lg">
          Tools and technologies I use to bring ideas to life.
        </p>
      </motion.div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {skillCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 40, rotateX: 15 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: categoryIndex * 0.15, type: "spring", stiffness: 100 }}
            whileHover={{
              y: -8,
              rotateY: 5,
              scale: 1.02,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
            }}
            className={`card-premium p-8 bg-gradient-to-br ${category.color} overflow-hidden group animate-float-${categoryIndex} relative hover:shadow-2xl hover:shadow-silver-300/20 transition-all duration-500`}
          >
            {/* Animated background particles */}
            <motion.div
              className="absolute top-4 right-4 w-2 h-2 bg-white/30 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: categoryIndex * 0.3
              }}
            />
            <motion.div
              className="absolute bottom-6 left-6 w-1 h-1 bg-white/40 rounded-full"
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.4, 1, 0.4]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: categoryIndex * 0.7
              }}
            />
            {/* Category Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className={`p-3 rounded-xl bg-card border ${category.borderColor} shadow-subtle`}>
                <category.icon className="w-6 h-6 text-charcoal" />
              </div>
              <h3 className="text-xl font-semibold text-charcoal">
                {category.title}
              </h3>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-3 gap-4">
              {category.skills.map((skill, skillIndex) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={skill.name}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card border border-silver-200 shadow-subtle hover:shadow-card hover:border-silver-300 transition-all duration-200 cursor-default group/skill"
                  >
                    <div className="p-2 rounded-lg bg-silver-50 border border-silver-200 group-hover/skill:scale-110 transition-transform duration-200">
                      <Icon className={`w-6 h-6 ${skill.color || 'text-charcoal'}`} strokeWidth={1.5} />
                    </div>
                    <span className="text-xs font-medium text-charcoal text-center leading-tight">
                      {skill.name}
                    </span>
                    </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
