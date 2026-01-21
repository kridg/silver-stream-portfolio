import { motion, useInView } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { useRef } from "react";

const experiences = [
  {
    id: 1,
    title: "Senior Full Stack Developer",
    company: "Tech Innovations Inc.",
    location: "San Francisco, CA",
    period: "2022 - Present",
    description: "Leading development of scalable web applications using React, Node.js, and cloud technologies. Mentoring junior developers and establishing best practices.",
    highlights: ["Led team of 5 developers", "Reduced load times by 40%", "Implemented CI/CD pipeline"],
    logo: "TI",
    type: "Full-time",
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "Digital Solutions Ltd.",
    location: "New York, NY",
    period: "2020 - 2022",
    description: "Built and maintained multiple client projects including e-commerce platforms and SaaS applications. Improved deployment workflows reducing release time by 40%.",
    highlights: ["Built 10+ client projects", "E-commerce & SaaS focus", "Agile methodology"],
    logo: "DS",
    type: "Full-time",
  },
  {
    id: 3,
    title: "Frontend Developer",
    company: "Creative Agency",
    location: "Remote",
    period: "2018 - 2020",
    description: "Developed responsive web interfaces and interactive components. Collaborated with designers to implement pixel-perfect designs with smooth animations.",
    highlights: ["React & Vue.js", "Animation specialist", "20+ websites launched"],
    logo: "CA",
    type: "Full-time",
  },
];

const ExperienceTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="experience" className="min-h-screen py-24 px-8 lg:px-16 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-silver-200/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-silver-300/20 to-transparent rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-4xl mx-auto relative z-10" ref={containerRef}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-silver-100 border border-silver-200 text-soft-gray text-sm font-medium mb-4">
            Career Journey
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal mb-4">
            Work Experience
          </h2>
          <p className="text-soft-gray max-w-2xl mx-auto text-lg">
            A timeline of my professional growth and achievements.
          </p>
        </motion.div>

        {/* Vertical Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-silver-300 via-silver-400 to-transparent"
            style={{ transformOrigin: "top" }}
          />
          
          {/* Experience Items */}
          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <ExperienceCard
                key={exp.id}
                experience={exp}
                index={index}
                total={experiences.length}
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
  total: number;
}

const ExperienceCard = ({ experience, index, total }: ExperienceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      className="relative pl-20 md:pl-0 md:flex md:items-center md:gap-8"
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      {/* Timeline Dot */}
      <motion.div
        className="absolute left-6 md:left-1/2 top-2 w-4 h-4 rounded-full bg-card border-4 border-silver-400 shadow-elevated z-10 -translate-x-1/2"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: index * 0.15 + 0.3, type: "spring" }}
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100"
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.15 + 0.5 }}
        />
      </motion.div>

      {/* Content Card */}
      <motion.div
        className="w-full md:w-[calc(50%-2rem)] md:ml-auto"
        style={{
          marginLeft: index % 2 === 0 ? 'auto' : '0',
          marginRight: index % 2 === 0 ? '0' : 'auto',
        }}
        whileHover={{ y: -5, scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div className="card-premium p-6 lg:p-8 hover:shadow-hover transition-all duration-500 group">
          {/* Header */}
          <div className="flex items-start gap-4 mb-4">
            {/* Company Logo */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-silver-100 to-silver-200 border border-silver-200 flex items-center justify-center shadow-card flex-shrink-0"
            >
              <span className="text-lg font-bold text-charcoal">{experience.logo}</span>
            </motion.div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-semibold text-charcoal mb-1">
                {experience.title}
              </h3>
              <div className="flex items-center gap-2 text-soft-gray text-sm flex-wrap">
                <span className="font-medium text-charcoal-light">{experience.company}</span>
                <span className="w-1 h-1 rounded-full bg-silver-300" />
                <span>{experience.type}</span>
              </div>
            </div>
          </div>

          {/* Meta info */}
          <div className="flex items-center gap-4 text-sm text-soft-gray mb-4 flex-wrap">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{experience.period}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              <span>{experience.location}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-soft-gray leading-relaxed mb-4">
            {experience.description}
          </p>

          {/* Highlights */}
          <div className="flex flex-wrap gap-2">
            {experience.highlights.map((highlight) => (
              <motion.span
                key={highlight}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.15 + 0.3 }}
                whileHover={{ scale: 1.05 }}
                className="px-3 py-1.5 text-xs font-medium rounded-full bg-silver-100 text-soft-gray border border-silver-200 hover:bg-silver-200 hover:text-charcoal-light transition-all duration-200"
              >
                {highlight}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ExperienceTimeline;
