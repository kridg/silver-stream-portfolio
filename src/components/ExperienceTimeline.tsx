import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { Briefcase, Calendar, MapPin, ArrowRight, ChevronDown } from "lucide-react";
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
  const timelineRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"]
  });

  // Smooth spring animation for the marker
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.5,
  });

  // Transform scroll progress to marker position (percentage of timeline)
  const markerY = useTransform(smoothProgress, [0, 1], ["0%", "85%"]);
  
  // Line draw animation
  const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-16 relative overflow-hidden" ref={containerRef}>
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-gradient-to-br from-silver-100/50 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-silver-200/40 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
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
        <div className="relative" ref={timelineRef}>
          {/* Center line with scroll-based marker */}
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 hidden lg:flex flex-col items-center">
            {/* Static background line */}
            <div className="absolute w-0.5 h-full bg-silver-200/60 rounded-full" />
            
            {/* Animated fill line */}
            <motion.div
              className="absolute w-0.5 bg-gradient-to-b from-charcoal via-charcoal to-silver-400 rounded-full origin-top"
              style={{ height: lineHeight }}
            />

            {/* Scroll-following marker */}
            <motion.div
              className="absolute w-10 h-10 -translate-x-1/2 left-1/2"
              style={{ top: markerY }}
            >
              {/* Marker container */}
              <div className="relative w-full h-full">
                {/* Outer glow ring */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-charcoal/20"
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.3, 0.1, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                
                {/* Secondary glow */}
                <motion.div
                  className="absolute inset-1 rounded-full bg-charcoal/30"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.4, 0.2, 0.4],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.2,
                  }}
                />

                {/* Main marker body */}
                <div className="absolute inset-0 rounded-full bg-charcoal border-4 border-white shadow-elevated flex items-center justify-center">
                  <ChevronDown className="w-4 h-4 text-white" />
                </div>

                {/* Inner pulse */}
                <motion.div
                  className="absolute inset-2 rounded-full bg-white/30"
                  animate={{
                    scale: [0.8, 1, 0.8],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </motion.div>
          </div>

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
      {/* Timeline node dot */}
      <motion.div
        className="hidden lg:block absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-silver-300 border-4 border-white shadow-subtle z-10"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ delay: index * 0.15 + 0.3, type: "spring", stiffness: 200 }}
      />

      {/* Branching connector line */}
      <motion.div
        className="hidden lg:block absolute"
        style={{
          width: '120px',
          height: '2px',
          top: '50%',
          left: isLeft ? 'calc(50% - 120px + 8px)' : 'calc(50% + 8px)',
          background: isLeft
            ? 'linear-gradient(to right, rgba(148, 163, 184, 0.2), rgba(148, 163, 184, 0.6))'
            : 'linear-gradient(to left, rgba(148, 163, 184, 0.2), rgba(148, 163, 184, 0.6))',
          transform: 'translateY(-50%)'
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: index * 0.15 + 0.4, ease: "easeOut" }}
      />

      {/* Content Card */}
      <motion.div 
        className={`flex-1 ${isLeft ? 'lg:pr-20' : 'lg:pl-20'}`}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="card-premium p-8 hover:shadow-hover transition-all duration-500 group relative overflow-hidden"
          whileHover={{
            y: -4,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
          }}
        >
          {/* Subtle background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-silver-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Header */}
          <div className={`flex items-start gap-4 mb-6 relative z-10 ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
            {/* Company Logo */}
            <motion.div 
              className="w-14 h-14 rounded-xl bg-gradient-to-br from-silver-100 to-silver-200 border border-silver-200 flex items-center justify-center shadow-card flex-shrink-0"
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <span className="text-lg font-bold text-charcoal">{experience.logo}</span>
            </motion.div>
            
            <div className={`flex-1 min-w-0 ${isLeft ? 'lg:text-left' : 'lg:text-right'}`}>
              <div className={`flex items-center gap-2 text-soft-gray text-sm mb-1 ${isLeft ? 'lg:justify-start' : 'lg:justify-end'}`}>
                <Calendar className="w-3.5 h-3.5" />
                <span className="font-medium">{experience.period}</span>
              </div>
              <h3 className="text-xl font-bold text-charcoal group-hover:text-primary transition-colors mb-1">
                {experience.title}
              </h3>
              <div className={`flex items-center gap-3 text-soft-gray text-sm flex-wrap ${isLeft ? 'lg:justify-start' : 'lg:justify-end'}`}>
                <span className="flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5" />
                  {experience.company}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {experience.location}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className={`text-soft-gray leading-relaxed mb-5 relative z-10 ${isLeft ? 'lg:text-left' : 'lg:text-right'}`}>
            {experience.description}
          </p>

          {/* Achievements */}
          <div className={`space-y-2 mb-5 relative z-10 ${isLeft ? 'lg:text-left' : 'lg:text-right'}`}>
            {experience.achievements.map((achievement, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isLeft ? -10 : 10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1 }}
                className={`flex items-center gap-2 text-sm text-charcoal-light ${
                  isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                <ArrowRight className={`w-3 h-3 text-charcoal flex-shrink-0 ${!isLeft ? 'rotate-180' : ''}`} />
                <span>{achievement}</span>
              </motion.div>
            ))}
          </div>

          {/* Technologies */}
          <div className={`flex flex-wrap gap-2 relative z-10 ${isLeft ? 'lg:justify-start' : 'lg:justify-end'}`}>
            {experience.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-medium rounded-full bg-silver-100 text-charcoal-light border border-silver-200 hover:bg-silver-200 hover:border-silver-300 transition-all duration-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Empty spacer for opposite side */}
      <div className="flex-1 hidden lg:block" />
    </motion.div>
  );
};

export default ExperienceTimeline;
