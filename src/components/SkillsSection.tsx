import { motion } from "framer-motion";
import { Monitor, Server, Database, Container } from "lucide-react";
import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPython,
  SiDjango,
  SiPostgresql,
  SiMongodb,
  SiSupabase,
  SiDocker,
  SiGit,
  SiGithubactions,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";

const skillCategories = [
  {
    title: "Frontend",
    icon: Monitor,
    color: "from-silver-50/80 to-silver-100/60",
    borderColor: "border-silver-200",
    skills: [
      { name: "React", icon: SiReact, color: "text-[#61DAFB]" },
      { name: "JavaScript", icon: SiJavascript, color: "text-[#F7DF1E]" },
      { name: "TypeScript", icon: SiTypescript, color: "text-[#3178C6]" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-[#06B6D4]" },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    color: "from-silver-100/70 to-silver-200/50",
    borderColor: "border-silver-300",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "text-[#339933]" },
      { name: "Python", icon: SiPython, color: "text-[#3776AB]" },
      { name: "Django", icon: SiDjango, color: "text-[#092E20]" },
      { name: "REST API", icon: TbApi, color: "text-charcoal" },
    ],
  },
  {
    title: "Database",
    icon: Database,
    color: "from-silver-200/60 to-silver-300/40",
    borderColor: "border-silver-400",
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql, color: "text-[#4169E1]" },
      { name: "MongoDB", icon: SiMongodb, color: "text-[#47A248]" },
      { name: "Supabase", icon: SiSupabase, color: "text-[#3FCF8E]" },
    ],
  },
  {
    title: "DevOps & Tools",
    icon: Container,
    color: "from-silver-300/50 to-silver-400/30",
    borderColor: "border-silver-500",
    skills: [
      { name: "Docker", icon: SiDocker, color: "text-[#2496ED]" },
      { name: "Git", icon: SiGit, color: "text-[#F05032]" },
      { name: "CI/CD", icon: SiGithubactions, color: "text-[#2088FF]" },
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
            className={`card-premium p-8 bg-gradient-to-br ${category.color} overflow-hidden group relative hover:shadow-2xl hover:shadow-silver-300/20 transition-all duration-500`}
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
              {category.skills.map((skill) => {
                const Icon = skill.icon;
                return (
                  <motion.div
                    key={skill.name}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card border border-silver-200 shadow-subtle hover:shadow-card hover:border-silver-300 transition-all duration-200 cursor-default group/skill"
                  >
                    <div className="p-2 rounded-lg bg-silver-50 border border-silver-200 group-hover/skill:scale-110 transition-transform duration-200">
                          <Icon className={`w-6 h-6 ${skill.color || 'text-charcoal'}`} />
                    </div>
                    <span className="text-xs font-medium text-charcoal text-center leading-tight">
                      {skill.name}
                    </span>
                  </motion.div>
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
