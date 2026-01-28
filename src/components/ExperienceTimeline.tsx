import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Briefcase, Calendar, MapPin, ArrowUpRight } from "lucide-react";
import { useRef } from "react";

const experiences = [
  {
    id: 1,
    title: "Senior Full Stack Developer",
    company: "Tech Innovations Inc.",
    location: "San Francisco, CA",
    period: "2022 - Present",
    description: "Leading development of scalable web applications using React, Node.js, and cloud technologies.",
    achievements: [
      "Led team of 5 developers on enterprise platform",
      "Reduced load times by 40% through optimization",
      "Implemented CI/CD pipeline saving 15hrs/week"
    ],
    technologies: ["React", "Node.js", "AWS", "Kubernetes"],
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "Digital Solutions Ltd.",
    location: "New York, NY",
    period: "2020 - 2022",
    description: "Built and maintained multiple client projects including e-commerce platforms and SaaS applications.",
    achievements: [
      "Built 10+ client projects from scratch",
      "Processed $2M+ in e-commerce transactions",
      "Led adoption of agile methodology"
    ],
    technologies: ["React", "TypeScript", "PostgreSQL", "Docker"],
  },
  {
    id: 3,
    title: "Frontend Developer",
    company: "Creative Agency",
    location: "Remote",
    period: "2018 - 2020",
    description: "Developed responsive web interfaces and interactive components with pixel-perfect designs.",
    achievements: [
      "Launched 20+ client websites",
      "Improved accessibility scores by 35%",
      "Built reusable component library"
    ],
    technologies: ["JavaScript", "Vue.js", "SASS", "Webpack"],
  },
];

const ExperienceTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smooth spring for the progress indicator
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.8,
  });

  // Progress indicator position (0% to 100% of timeline height)
  const indicatorY = useTransform(smoothProgress, [0.1, 0.9], ["0%", "100%"]);
  
  // Line fill progress
  const lineFill = useTransform(smoothProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section className="py-20 relative" ref={containerRef}>
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20"
      >
        <span className="inline-block px-4 py-1.5 rounded-full bg-silver-100 border border-silver-200 text-soft-gray text-sm font-medium mb-4">
          Career Path
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-4">
          Experience
        </h2>
        <p className="text-soft-gray max-w-xl mx-auto text-lg">
          A journey through my professional career and the impact I've made.
        </p>
      </motion.div>

      {/* Timeline Container */}
      <div className="relative max-w-4xl mx-auto">
        {/* Center Timeline Track */}
        <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px">
          {/* Background track */}
          <div className="absolute inset-0 bg-gradient-to-b from-silver-200 via-silver-300 to-silver-200 rounded-full" />
          
          {/* Animated fill */}
          <motion.div
            className="absolute top-0 left-0 right-0 bg-gradient-to-b from-charcoal via-charcoal to-silver-400 rounded-full origin-top"
            style={{ height: lineFill }}
          />
        </div>

        {/* Scroll Progress Indicator */}
        <motion.div
          className="absolute left-8 md:left-1/2 -translate-x-1/2 z-20 pointer-events-none"
          style={{ top: indicatorY }}
        >
          {/* Outer glow */}
          <motion.div
            className="absolute -inset-4 rounded-full bg-charcoal/10 blur-md"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Main indicator */}
          <div className="relative w-4 h-4 -translate-x-[7px] -translate-y-2">
            {/* Core */}
            <div className="absolute inset-0 rounded-full bg-charcoal shadow-lg" />
            
            {/* Inner ring */}
            <div className="absolute inset-1 rounded-full bg-white/40" />
            
            {/* Center dot */}
            <motion.div
              className="absolute inset-[5px] rounded-full bg-white"
              animate={{
                scale: [1, 0.8, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>

        {/* Experience Cards */}
        <div className="relative space-y-12 md:space-y-16">
          {experiences.map((exp, index) => (
            <ExperienceCard
              key={exp.id}
              experience={exp}
              index={index}
              isEven={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ExperienceCardProps {
  experience: typeof experiences[0];
  index: number;
  isEven: boolean;
}

const ExperienceCard = ({ experience, index, isEven }: ExperienceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative flex items-start gap-8 pl-16 md:pl-0 ${
        isEven ? 'md:pr-[52%]' : 'md:pl-[52%]'
      }`}
    >
      {/* Timeline Node */}
      <motion.div
        className="absolute left-6 md:left-1/2 md:-translate-x-1/2 w-5 h-5 rounded-full bg-white border-2 border-silver-300 shadow-sm z-10"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 300 }}
      >
        <div className="absolute inset-1 rounded-full bg-silver-200" />
      </motion.div>

      {/* Card */}
      <motion.div
        className="flex-1 group"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
      >
        <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-silver-200/60 shadow-sm hover:shadow-lg hover:border-silver-300 transition-all duration-300">
          {/* Subtle gradient overlay on hover */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-silver-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Header */}
          <div className="relative z-10 mb-4">
            <div className="flex items-center gap-2 text-soft-gray text-sm mb-2">
              <Calendar className="w-3.5 h-3.5" />
              <span className="font-medium">{experience.period}</span>
            </div>
            
            <h3 className="text-xl font-bold text-charcoal mb-2 group-hover:text-charcoal-light transition-colors">
              {experience.title}
            </h3>
            
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-soft-gray text-sm">
              <span className="flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5" />
                {experience.company}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                {experience.location}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="relative z-10 text-soft-gray leading-relaxed mb-5">
            {experience.description}
          </p>

          {/* Achievements */}
          <div className="relative z-10 space-y-2 mb-5">
            {experience.achievements.map((achievement, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-sm text-charcoal-light"
              >
                <ArrowUpRight className="w-3.5 h-3.5 mt-0.5 text-silver-400 flex-shrink-0" />
                <span>{achievement}</span>
              </div>
            ))}
          </div>

          {/* Technologies */}
          <div className="relative z-10 flex flex-wrap gap-2">
            {experience.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-medium rounded-full bg-silver-100 text-charcoal-light border border-silver-200 hover:bg-silver-200 transition-colors duration-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ExperienceTimeline;
