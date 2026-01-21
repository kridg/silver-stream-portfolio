import { motion, useInView, useScroll, useTransform } from "framer-motion";
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
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 90%", "end 10%"]
  });

  // Transform scroll progress to beam position (0% to 100% of timeline height for full coverage)
  const beamY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="py-32 px-8 lg:px-16 relative overflow-hidden" ref={containerRef}>
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
          {/* Center line with scroll-based fluid beam */}
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 hidden lg:block">
            {/* Static timeline line */}
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              whileInView={{ scaleY: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: "easeOut", delay: 0.3 }}
              className="w-1 bg-gradient-to-b from-silver-400 via-silver-600 to-silver-400 shadow-lg"
              style={{ transformOrigin: "top" }}
            >
              {/* Inner glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-silver-300/90 via-silver-500/70 to-silver-300/90 blur-sm" />
              {/* Outer glow */}
              <div className="absolute -inset-1 bg-gradient-to-b from-silver-400/50 via-silver-600/40 to-silver-400/50 blur-md" />
            </motion.div>

            {/* Scroll-responsive bright cyan light beam */}
            <motion.div
              className="absolute w-1.5 h-28"
              style={{
                left: '50%',
                transform: 'translateX(-50%) translateY(-50%)',
                top: beamY,
                background: 'linear-gradient(180deg, #00FFFF 0%, #00FFFF 100%)',
                borderRadius: '1px',
                boxShadow: '0 0 40px #00FFFF, 0 0 80px #00FFFF, 0 0 120px #00FFFF, 0 0 160px rgba(0, 255, 255, 0.5)'
              }}
            >
              {/* Bright cyan beam glow effects */}
              <div className="absolute inset-0 bg-cyan-400 blur-lg scale-125 opacity-80" />
              <div className="absolute inset-0 bg-cyan-300 blur-xl scale-150 opacity-60" />
              <div className="absolute inset-0 bg-white blur-md scale-110 opacity-40" />

              {/* Electric light particles */}
              <motion.div
                className="absolute w-full h-6 bg-gradient-to-b from-white to-cyan-300 rounded-full blur-sm"
                style={{ top: '25%' }}
                animate={{
                  top: ['15%', '35%', '55%', '75%', '15%'],
                  opacity: [0.6, 1, 1, 1, 0.6],
                  scale: [1, 1.4, 1.2, 1.1, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Electric highlights */}
              <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-0.5 h-10 bg-white rounded-full blur-xs opacity-90" />
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-cyan-200 rounded-full blur-xs opacity-80" />

              {/* Core electric pulse */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-3 bg-gradient-to-b from-cyan-200 to-cyan-400 rounded-full blur-sm"
                animate={{
                  opacity: [0.8, 1, 0.8],
                  scale: [0.9, 1.3, 0.9],
                  height: ['12px', '20px', '12px']
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
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
      {/* Branching connector line */}
      <motion.div
        className="hidden lg:block absolute"
        style={{
          width: '160px',
          height: '2px',
          top: '50%',
          left: isLeft ? 'calc(50% - 160px)' : '50%',
          background: isLeft
            ? 'linear-gradient(to right, rgba(148, 163, 184, 0.4), rgba(148, 163, 184, 0.8))'
            : 'linear-gradient(to left, rgba(148, 163, 184, 0.4), rgba(148, 163, 184, 0.8))',
          transform: 'translateY(-50%)'
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: index * 0.15 + 0.3, ease: "easeOut" }}
      >
        {/* Glow effect on connector */}
        <div className="absolute inset-0 bg-silver-300/60 blur-sm" />
      </motion.div>

      {/* Content Card */}
      <motion.div 
        className={`flex-1 ${isLeft ? 'lg:pr-16' : 'lg:pl-16'}`}
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="card-premium p-8 hover:shadow-hover transition-all duration-500 group relative overflow-hidden"
          animate={{
            y: [0, -2, 0],
            rotateY: [0, 1, 0],
          }}
          transition={{
            duration: 10 + index * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.4,
          }}
          whileHover={{
            scale: 1.03,
            rotateY: 2,
            boxShadow: "0 30px 60px -12px rgba(0, 0, 0, 0.3)"
          }}
        >
          {/* Animated background elements */}
          <motion.div
            className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-silver-200/20 to-transparent rounded-full blur-xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: index * 0.5
            }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-cyan-200/15 to-transparent rounded-full blur-lg"
            animate={{
              scale: [1.2, 0.8, 1.2],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: index * 0.8
            }}
          />
          {/* Header */}
          <div className={`flex items-start gap-4 mb-6 ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
            {/* Company Logo */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-silver-100 to-silver-200 border border-silver-200 flex items-center justify-center shadow-card flex-shrink-0">
              <span className="text-xl font-bold text-charcoal">{experience.logo}</span>
            </div>
            
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
                <ArrowRight className={`w-3 h-3 text-primary flex-shrink-0 ${!isLeft ? 'rotate-180' : ''}`} />
                <span>{achievement}</span>
              </motion.div>
            ))}
          </div>

          {/* Technologies */}
          <div className={`flex flex-wrap gap-2 ${isLeft ? 'lg:justify-start' : 'lg:justify-end'}`}>
            {experience.technologies.map((tech, i) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-xs font-medium rounded-full bg-silver-100 text-charcoal-light border border-silver-200 transition-all duration-200"
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
