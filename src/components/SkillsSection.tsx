import { motion } from "framer-motion";
import { 
  Code2, 
  Database, 
  Cloud, 
  Palette, 
  GitBranch, 
  Terminal,
  Layers,
  Zap
} from "lucide-react";
import MagneticButton from "./MagneticButton";

const skillCategories = [
  {
    title: "Frontend",
    icon: Palette,
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"],
    color: "from-blue-500/10 to-cyan-500/10",
    borderColor: "border-blue-200",
  },
  {
    title: "Backend",
    icon: Terminal,
    skills: ["Node.js", "Express", "Python", "REST APIs", "GraphQL"],
    color: "from-emerald-500/10 to-teal-500/10",
    borderColor: "border-emerald-200",
  },
  {
    title: "Database",
    icon: Database,
    skills: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "Supabase"],
    color: "from-orange-500/10 to-amber-500/10",
    borderColor: "border-orange-200",
  },
  {
    title: "DevOps",
    icon: Cloud,
    skills: ["Docker", "AWS", "Vercel", "CI/CD", "Linux"],
    color: "from-purple-500/10 to-pink-500/10",
    borderColor: "border-purple-200",
  },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="min-h-screen w-full py-24 px-8 lg:px-16 relative">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-silver-200/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gradient-to-tl from-silver-300/20 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
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
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`card-premium p-8 bg-gradient-to-br ${category.color} overflow-hidden group`}
            >
              {/* Icon & Title */}
              <div className="flex items-center gap-4 mb-6">
                <motion.div 
                  className={`p-3 rounded-xl bg-card border ${category.borderColor} shadow-subtle`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <category.icon className="w-6 h-6 text-charcoal" />
                </motion.div>
                <h3 className="text-xl font-semibold text-charcoal">
                  {category.title}
                </h3>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.2 + skillIndex * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 text-sm font-medium rounded-xl bg-card border border-silver-200 text-charcoal-light shadow-subtle hover:shadow-card hover:border-silver-300 transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SkillsSection;