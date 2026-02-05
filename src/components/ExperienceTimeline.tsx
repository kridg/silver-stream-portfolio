 import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
 
 const experiences = [
   {
     id: 1,
     title: "Senior Full Stack Developer",
     company: "Tech Innovations Inc.",
     location: "San Francisco, CA",
     period: "2022 - Present",
    technologies: ["React", "Node.js", "AWS"],
   },
   {
     id: 2,
     title: "Full Stack Developer",
     company: "Digital Solutions Ltd.",
     location: "New York, NY",
     period: "2020 - 2022",
    technologies: ["React", "TypeScript", "PostgreSQL"],
   },
   {
     id: 3,
     title: "Frontend Developer",
     company: "Creative Agency",
     location: "Remote",
     period: "2018 - 2020",
    technologies: ["JavaScript", "Vue.js", "SASS"],
   },
 ];
 
 const ExperienceTimeline = () => {
   return (
    <section className="py-16 relative">
       {/* Background gradient for section */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-silver-50/40 to-transparent pointer-events-none" />
       
       {/* Section Header */}
       <motion.div
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         transition={{ duration: 0.6 }}
        className="text-center mb-12 relative z-10"
       >
         <span className="inline-block px-4 py-1.5 rounded-full bg-silver-100 border border-silver-200 text-soft-gray text-sm font-medium mb-4">
           Career Path
         </span>
        <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-3">
           Experience
         </h2>
       </motion.div>
 
      {/* Simple Timeline */}
      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Vertical line */}
        <div className="absolute left-4 md:left-6 top-2 bottom-2 w-px bg-gradient-to-b from-silver-200 via-silver-300 to-silver-200" />
        
         {experiences.map((exp, index) => (
           <motion.div
             key={exp.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
             transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative pl-10 md:pl-14 pb-8 last:pb-0"
           >
            {/* Timeline node */}
            <div className="absolute left-4 md:left-6 top-1.5 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-silver-300 border-2 border-card shadow-sm" />
            
            {/* Content */}
            <div className="group">
              {/* Period & Location */}
              <div className="flex items-center gap-2 text-xs text-soft-gray mb-1.5">
                <Calendar className="w-3 h-3" />
                <span className="font-medium">{exp.period}</span>
                <span className="text-silver-300">•</span>
                <MapPin className="w-3 h-3" />
                <span>{exp.location}</span>
               </div>
               
              {/* Title & Company */}
              <h3 className="text-base font-semibold text-charcoal mb-0.5">
                {exp.title}
              </h3>
              <p className="text-soft-gray text-sm mb-2">
                {exp.company}
              </p>
              
              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-xs font-medium rounded-full bg-silver-100 text-charcoal-light border border-silver-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
           </motion.div>
         ))}
       </div>
     </section>
   );
 };
 
 export default ExperienceTimeline;