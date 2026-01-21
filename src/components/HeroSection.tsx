import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowRight, Download, MessageCircle } from "lucide-react";
import MagneticButton from "./MagneticButton";

const HeroSection = () => {
  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub", color: "hover:bg-gray-900 hover:text-white" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn", color: "hover:bg-blue-600 hover:text-white" },
    { icon: Mail, href: "mailto:ghalekridip67@gmail.com", label: "Email", color: "hover:bg-red-600 hover:text-white" },
    { icon: MessageCircle, href: "https://wa.me/1234567890", label: "WhatsApp", color: "hover:bg-green-600 hover:text-white" },
  ];

  return (
    <div className="flex flex-col items-start w-full relative overflow-hidden">
      {/* Ambient background effects with animation */}
      <motion.div
        className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-gradient-to-br from-silver-200/30 to-transparent rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 90, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute top-1/2 -right-32 w-[400px] h-[400px] bg-gradient-to-tl from-cyan-200/20 to-transparent rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1.2, 0.8, 1.2],
          opacity: [0.2, 0.4, 0.2],
          x: [0, 50, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="space-y-8 relative z-10"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-silver-100 border border-silver-200 text-soft-gray text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Available for opportunities
          </span>
        </motion.div>

        {/* Name with Profile Picture */}
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 lg:gap-12">
          {/* Name */}
          <div className="text-center sm:text-left flex-1 order-2 sm:order-1">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-charcoal leading-[1.1] tracking-tight"
            >
              Kridip
              <br />
              <span className="text-soft-gray">Ghale</span>
            </motion.h1>
          </div>

          {/* Profile Picture */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 200 }}
            className="relative flex-shrink-0 order-1 sm:order-2"
          >
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-2xl overflow-hidden border-4 border-silver-200 shadow-elevated">
              {/* Placeholder gradient - replace with actual image */}
              <div className="w-full h-full bg-gradient-to-br from-silver-200 via-silver-100 to-silver-50 flex items-center justify-center">
                <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal">KG</span>
              </div>

              {/* Decorative glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent" />
            </div>

            {/* Animated ring */}
            <motion.div
              className="absolute inset-0 rounded-2xl border-2 border-silver-300"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-lg md:text-xl text-soft-gray leading-relaxed max-w-xl"
        >
          Full Stack Developer crafting elegant digital experiences 
          with modern web technologies.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 pt-4 w-full sm:w-auto"
        >
          <MagneticButton href="#projects" strength={0.3}>
            <span className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-medium shadow-elevated hover:shadow-hover transition-shadow duration-300">
              View Projects
              <ArrowRight className="w-4 h-4" />
            </span>
          </MagneticButton>

          <MagneticButton href="/resume.pdf" download="Kridip_Ghale_Resume.pdf" strength={0.3}>
            <span className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-silver-100 text-charcoal font-medium border border-silver-200 hover:bg-silver-200 hover:border-silver-300 transition-all duration-300">
              <Download className="w-4 h-4" />
              Download Resume
            </span>
          </MagneticButton>

          <MagneticButton href="#contact" strength={0.3}>
            <span className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-silver-100 text-charcoal font-medium border border-silver-200 hover:bg-silver-200 hover:border-silver-300 transition-all duration-300">
              Get in Touch
            </span>
          </MagneticButton>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex items-center justify-center sm:justify-start gap-4 pt-6"
        >
          {socialLinks.map((link, index) => (
            <MagneticButton
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              strength={0.5}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                className={`p-3 rounded-xl bg-card border border-silver-200 text-soft-gray hover:text-white hover:border-transparent transition-all duration-300 ${link.color}`}
              >
                <link.icon className="w-5 h-5" />
              </motion.div>
            </MagneticButton>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
