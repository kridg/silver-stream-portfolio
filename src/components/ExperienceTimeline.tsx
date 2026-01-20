import { motion, useInView } from "framer-motion";
import { Briefcase, Calendar, MapPin, ExternalLink } from "lucide-react";
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
    <section id="experience" className="py-24 px-8 lg:px-16 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-silver-50/50 via-background to-silver-50/30" />
      
      <div className="max-w-6xl mx-auto relative z-10" ref={containerRef}>
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

        {/* Timeline */}
        <div className="relative">
          {/* Center Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-silver-300 to-transparent hidden md:block" />
          
          {/* Experience Items */}
          <div className="space-y-12 md:space-y-0">
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
      className={`relative flex flex-col md:flex-row items-center md:gap-8 ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      } mb-12`}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      {/* Content Card */}
      <motion.div
        className={`w-full md:w-[calc(50%-2rem)] ${isLeft ? 'md:text-right' : 'md:text-left'}`}
        whileHover={{ y: -5 }}
      >
        <div className="card-premium p-6 lg:p-8 hover:shadow-hover transition-all duration-500">
          {/* Header */}
          <div className={`flex items-start gap-4 mb-4 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
            {/* Company Logo */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-silver-100 to-silver-200 border border-silver-200 flex items-center justify-center shadow-card flex-shrink-0"
            >
              <span className="text-lg font-bold text-charcoal">{experience.logo}</span>
            </motion.div>
            
            <div className={`flex-1 ${isLeft ? 'md:text-right' : ''}`}>
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
          <div className={`flex items-center gap-4 text-sm text-soft-gray mb-4 flex-wrap ${isLeft ? 'md:justify-end' : ''}`}>
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
          <p className={`text-soft-gray leading-relaxed mb-4 ${isLeft ? 'md:text-right' : ''}`}>
            {experience.description}
          </p>

          {/* Highlights */}
          <div className={`flex flex-wrap gap-2 ${isLeft ? 'md:justify-end' : ''}`}>
            {experience.highlights.map((highlight) => (
              <span
                key={highlight}
                className="px-3 py-1.5 text-xs font-medium rounded-full bg-silver-100 text-soft-gray border border-silver-200"
              >
                {highlight}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Center Dot */}
      <motion.div
        className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-card border-4 border-silver-300 z-10"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
      />

      {/* Empty space for other side */}
      <div className="hidden md:block w-[calc(50%-2rem)]" />
    </motion.div>
  );
};

export default ExperienceTimeline;