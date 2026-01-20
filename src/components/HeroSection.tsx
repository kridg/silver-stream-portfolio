import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import MagneticButton from "./MagneticButton";
import StackedProjectCards from "./StackedProjectCards";

const HeroSection = () => {
  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Mail, href: "mailto:hello@kridipghale.dev", label: "Email" },
  ];

  return (
    <section className="min-h-screen w-screen flex-shrink-0 flex items-center px-8 lg:px-16 relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-silver-200/40 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-gradient-to-tl from-silver-300/30 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="flex items-center justify-between w-full max-w-[1800px] mx-auto gap-12 lg:gap-24 relative z-10">
        {/* Left: Introduction */}
        <div className="flex-1 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-8"
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

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-charcoal leading-[1.1] tracking-tight"
            >
              Kridip
              <br />
              <span className="text-soft-gray">Ghale</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-lg md:text-xl text-soft-gray leading-relaxed max-w-md"
            >
              Full Stack Developer crafting elegant digital experiences 
              with modern web technologies.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex items-center gap-4 pt-2"
            >
              <MagneticButton href="#projects" strength={0.3}>
                <span className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-medium shadow-elevated hover:shadow-hover transition-shadow duration-300">
                  View Projects
                  <ArrowRight className="w-4 h-4" />
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
              className="flex items-center gap-3 pt-4"
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
                    className="p-3 rounded-xl bg-card border border-silver-200 text-soft-gray hover:text-charcoal hover:bg-silver-100 hover:border-silver-300 hover:shadow-card transition-all duration-300"
                  >
                    <link.icon className="w-5 h-5" />
                  </motion.div>
                </MagneticButton>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Right: Stacked Project Cards */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <StackedProjectCards />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-soft-gray-light uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ x: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-8 h-5 rounded-full border border-silver-300 flex items-center justify-start px-1.5"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-silver-400" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;