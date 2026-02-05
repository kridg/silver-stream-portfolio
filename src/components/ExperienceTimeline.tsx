 import { motion } from "framer-motion";
 import { Briefcase, Calendar, MapPin, ChevronRight } from "lucide-react";
 
 const experiences = [
   {
     id: 1,
     title: "Senior Full Stack Developer",
     company: "Tech Innovations Inc.",
     location: "San Francisco, CA",
     period: "2022 - Present",
     highlight: "Leading development of scalable web applications",
     technologies: ["React", "Node.js", "AWS", "Kubernetes"],
   },
   {
     id: 2,
     title: "Full Stack Developer",
     company: "Digital Solutions Ltd.",
     location: "New York, NY",
     period: "2020 - 2022",
     highlight: "Built 10+ client projects from scratch",
     technologies: ["React", "TypeScript", "PostgreSQL", "Docker"],
   },
   {
     id: 3,
     title: "Frontend Developer",
     company: "Creative Agency",
     location: "Remote",
     period: "2018 - 2020",
     highlight: "Launched 20+ client websites with pixel-perfect designs",
     technologies: ["JavaScript", "Vue.js", "SASS", "Webpack"],
   },
 ];
 
 const ExperienceTimeline = () => {
   return (
     <section className="py-20 relative">
       {/* Background gradient for section */}
       <div className="absolute inset-0 bg-gradient-to-b from-silver-50/30 via-silver-100/20 to-silver-50/30 pointer-events-none" />
       
       {/* Section Header */}
       <motion.div
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         transition={{ duration: 0.6 }}
         className="text-center mb-16 relative z-10"
       >
         <span className="inline-block px-4 py-1.5 rounded-full bg-silver-100 border border-silver-200 text-soft-gray text-sm font-medium mb-4">
           Career Path
         </span>
         <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-4">
           Experience
         </h2>
         <p className="text-soft-gray max-w-xl mx-auto text-lg">
           A journey through my professional career.
         </p>
       </motion.div>
 
       {/* Experience Items */}
       <div className="relative z-10 max-w-4xl mx-auto space-y-6">
         {experiences.map((exp, index) => (
           <motion.div
             key={exp.id}
             initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true, margin: "-50px" }}
             transition={{ duration: 0.5, delay: index * 0.1 }}
           >
             <motion.div
               whileHover={{ scale: 1.02, y: -4 }}
               transition={{ duration: 0.2 }}
               className="group relative"
             >
               {/* Gradient background card */}
               <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-card via-silver-50/80 to-silver-100/60 border border-silver-200/80 shadow-subtle hover:shadow-card hover:border-silver-300 transition-all duration-300">
                 {/* Decorative gradient overlay */}
                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-silver-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                 
                 {/* Decorative corner accent */}
                 <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-silver-200/40 to-transparent rounded-bl-full opacity-60" />
                 
                 <div className="relative p-6 md:p-8">
                   {/* Top row - Period & Location */}
                   <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-soft-gray">
                     <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-silver-100 border border-silver-200">
                       <Calendar className="w-3.5 h-3.5" />
                       {exp.period}
                     </span>
                     <span className="flex items-center gap-1.5">
                       <MapPin className="w-3.5 h-3.5" />
                       {exp.location}
                     </span>
                   </div>
                   
                   {/* Title & Company */}
                   <div className="mb-4">
                     <h3 className="text-xl md:text-2xl font-bold text-charcoal mb-1 group-hover:text-charcoal-light transition-colors">
                       {exp.title}
                     </h3>
                     <p className="flex items-center gap-2 text-soft-gray font-medium">
                       <Briefcase className="w-4 h-4" />
                       {exp.company}
                     </p>
                   </div>
                   
                   {/* Highlight */}
                   <p className="flex items-start gap-2 text-charcoal-light mb-5">
                     <ChevronRight className="w-4 h-4 mt-0.5 text-silver-400 flex-shrink-0" />
                     {exp.highlight}
                   </p>
                   
                   {/* Technologies */}
                   <div className="flex flex-wrap gap-2">
                     {exp.technologies.map((tech) => (
                       <span
                         key={tech}
                         className="px-3 py-1.5 text-xs font-medium rounded-full bg-gradient-to-r from-silver-100 to-silver-200/80 text-charcoal border border-silver-200 hover:from-silver-200 hover:to-silver-300/80 transition-all duration-200"
                       >
                         {tech}
                       </span>
                     ))}
                   </div>
                 </div>
                 
                 {/* Bottom decorative line */}
                 <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-silver-300 to-transparent" />
               </div>
               
               {/* Connector line between cards */}
               {index < experiences.length - 1 && (
                 <div className="absolute left-1/2 -translate-x-1/2 -bottom-6 h-6 w-px">
                   <div className="h-full w-full bg-gradient-to-b from-silver-300 to-silver-200" />
                   <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-silver-300 border-2 border-silver-100" />
                 </div>
               )}
             </motion.div>
           </motion.div>
         ))}
       </div>
       
       {/* Bottom decorative elements */}
       <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
     </section>
   );
 };
 
 export default ExperienceTimeline;