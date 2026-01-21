import { motion, useInView } from "framer-motion";
import { Briefcase, Calendar, MapPin, ArrowRight } from "lucide-react";
import { useRef } from "react";

const experiences = [
  {
    id: 1,
    title: "Senior Full Stack Developer",
    company: "Tech Innovations Inc.",
    location: "San Francisco, CA",
    period: "2022 - Present",
    description: "Leading development of scalable web applications using React, Node.js, and cloud technologies. Mentoring junior developers and establishing best practices.",
    achievements: [
      "Led team of 5 developers on enterprise platform",
      "Reduced load times by 40% through optimization",
      "Implemented CI/CD pipeline saving 15hrs/week"
    ],
    technologies: ["React", "Node.js", "AWS", "Kubernetes"],
    logo: "TI",
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "Digital Solutions Ltd.",
    location: "New York, NY",
    period: "2020 - 2022",
    description: "Built and maintained multiple client projects including e-commerce platforms and SaaS applications. Improved deployment workflows reducing release time by 40%.",
    achievements: [
      "Built 10+ client projects from scratch",
      "Processed $2M+ in e-commerce transactions",
      "Led adoption of agile methodology"
    ],
    technologies: ["React", "TypeScript", "PostgreSQL", "Docker"],
    logo: "DS",
  },
  {
    id: 3,
    title: "Frontend Developer",
    company: "Creative Agency",
    location: "Remote",
    period: "2018 - 2020",
    description: "Developed responsive web interfaces and interactive components. Collaborated with designers to implement pixel-perfect designs with smooth animations.",
    achievements: [
      "Launched 20+ client websites",
      "Improved accessibility scores by 35%",
      "Built reusable component library"
    ],
    technologies: ["JavaScript", "Vue.js", "SASS", "Webpack"],
    logo: "CA",
  },
];

const ExperienceTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="experience" className="py-32 px-8 lg:px-16 relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-gradient-to-br from-silver-100/50 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-silver-200/40 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10" ref={containerRef}>
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

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-silver-200 via-silver-300 to-silver-200 -translate-x-1/2 hidden lg:block"
            style={{ transformOrigin: "top" }}
          />

          <div className="space-y-16 lg:space-y-24">
            {experiences.map((exp, index) => (
              <ExperienceCard
                key={exp.id}
                experience={exp}
                index={index}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface ExperienceCardProps {
  experience: typeof experiences[0];
  index: number;
  isLeft: boolean;
}

const ExperienceCard = ({ experience, index, isLeft }: ExperienceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      className={`relative flex items-center gap-8 ${
        isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
      } flex-col lg:gap-16`}
    >
      {/* Timeline Node */}
      <motion.div 
        className="hidden lg:flex absolute left-1/2 -translate-x-1/2 z-10"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.15 + 0.3, type: "spring", stiffness: 200 }}
      >
        <div className="w-5 h-5 rounded-full bg-card border-2 border-silver-300 shadow-elevated relative">
          <motion.div
            className="absolute inset-0.5 rounded-full bg-gradient-to-br from-silver-200 to-silver-300"
            animate={isInView ? { opacity: [0, 1] } : {}}
            transition={{ delay: index * 0.15 + 0.5 }}
          />
        </div>
      </motion.div>

      {/* Content Card */}
      <motion.div 
        className={`flex-1 ${isLeft ? 'lg:pr-16' : 'lg:pl-16'}`}
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <div className="card-premium p-8 hover:shadow-hover transition-all duration-500 group">
          {/* Header */}
          <div className={`flex items-start gap-4 mb-6 ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
            {/* Company Logo */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-silver-100 to-silver-200 border border-silver-200 flex items-center justify-center shadow-card flex-shrink-0"
            >
              <span className="text-xl font-bold text-charcoal">{experience.logo}</span>
            </motion.div>
            
            <div className={`flex-1 min-w-0 ${isLeft ? 'lg:text-left' : 'lg:text-right'}`}>
              <div className={`flex items-center gap-2 text-soft-gray text-sm mb-2 ${isLeft ? 'lg:justify-start' : 'lg:justify-end'}`}>
                <Calendar className="w-4 h-4" />
                <span className="font-medium">{experience.period}</span>
              </div>
              <h3 className="text-2xl font-bold text-charcoal group-hover:text-primary transition-colors mb-1">
                {experience.title}
              </h3>
              <div className={`flex items-center gap-3 text-soft-gray text-sm ${isLeft ? 'lg:justify-start' : 'lg:justify-end'}`}>
                <span className="flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4" />
                  {experience.company}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {experience.location}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className={`text-soft-gray leading-relaxed mb-6 ${isLeft ? 'lg:text-left' : 'lg:text-right'}`}>
            {experience.description}
          </p>

          {/* Achievements */}
          <div className={`space-y-2 mb-6 ${isLeft ? 'lg:text-left' : 'lg:text-right'}`}>
            {experience.achievements.map((achievement, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1 }}
                className={`flex items-center gap-2 text-sm text-charcoal-light ${
                  isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                <ArrowRight className={`w-3 h-3 text-primary flex-shrink-0 ${!isLeft ? 'lg:rotate-180' : ''}`} />
                <span>{achievement}</span>
              </motion.div>
            ))}
          </div>

          {/* Technologies */}
          <div className={`flex flex-wrap gap-2 ${isLeft ? 'lg:justify-start' : 'lg:justify-end'}`}>
            {experience.technologies.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-3 py-1.5 text-xs font-medium rounded-full bg-silver-100 text-charcoal-light border border-silver-200 hover:bg-silver-200 transition-all duration-200 cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Empty spacer for opposite side */}
      <div className="flex-1 hidden lg:block" />
    </motion.div>
  );
};

export default ExperienceTimeline;
