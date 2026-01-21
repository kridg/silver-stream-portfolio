import { motion } from "framer-motion";
import { useState } from "react";
import MagneticButton from "./MagneticButton";
import useScrollSpy from "@/hooks/useScrollSpy";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navLinks = [
    { name: "Home", href: "#home", id: "home" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "Skills", href: "#skills", id: "skills" },
    { name: "Experience", href: "#experience", id: "experience" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  const sections = navLinks.map(link => ({ id: link.id }));
  const activeSection = useScrollSpy(sections, 150);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-6xl mx-auto">
        <div className="glass-nav rounded-2xl px-6 py-3 shadow-card">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <MagneticButton href="#home" strength={0.3}>
              <motion.span 
                className="text-xl font-bold text-charcoal"
                whileHover={{ scale: 1.05 }}
              >
                KG
              </motion.span>
            </MagneticButton>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                
                return (
                  <MagneticButton key={link.name} href={link.href} strength={0.2}>
                    <motion.span 
                      className={`relative px-4 py-2 text-sm rounded-lg transition-all duration-300 ${
                        isActive 
                          ? 'text-charcoal font-medium' 
                          : 'text-soft-gray hover:text-charcoal'
                      }`}
                      whileHover={{ scale: 1.02 }}
                    >
                      {link.name}
                      
                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="activeSection"
                          className="absolute inset-0 bg-silver-100 rounded-lg -z-10"
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                      
                      {/* Active dot indicator */}
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ 
                          scale: isActive ? 1 : 0, 
                          opacity: isActive ? 1 : 0 
                        }}
                        transition={{ duration: 0.2 }}
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-charcoal"
                      />
                    </motion.span>
                  </MagneticButton>
                );
              })}
            </div>

            {/* CTA Button */}
            <MagneticButton href="mailto:hello@kridipghale.dev" strength={0.3}>
              <motion.span 
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-charcoal text-white text-sm font-medium hover:bg-charcoal-light transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Hire Me
              </motion.span>
            </MagneticButton>

            {/* Mobile menu button */}
            <motion.button 
              className="md:hidden p-2 rounded-lg hover:bg-silver-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <motion.span 
                  animate={{ 
                    rotate: isMobileMenuOpen ? 45 : 0,
                    y: isMobileMenuOpen ? 7 : 0,
                  }}
                  className="w-full h-0.5 bg-charcoal rounded-full origin-left"
                />
                <motion.span 
                  animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                  className="w-3/4 h-0.5 bg-charcoal rounded-full"
                />
                <motion.span 
                  animate={{ 
                    rotate: isMobileMenuOpen ? -45 : 0,
                    y: isMobileMenuOpen ? -7 : 0,
                  }}
                  className="w-1/2 h-0.5 bg-charcoal rounded-full origin-left"
                />
              </div>
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <motion.div
            initial={false}
            animate={{ 
              height: isMobileMenuOpen ? "auto" : 0,
              opacity: isMobileMenuOpen ? 1 : 0,
            }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="md:hidden overflow-hidden"
          >
            <div className="py-4 space-y-1">
              {navLinks.map((link, index) => {
                const isActive = activeSection === link.id;
                
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ 
                      x: isMobileMenuOpen ? 0 : -20, 
                      opacity: isMobileMenuOpen ? 1 : 0 
                    }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                      isActive 
                        ? 'bg-silver-100 text-charcoal font-medium' 
                        : 'text-soft-gray hover:bg-silver-50 hover:text-charcoal'
                    }`}
                  >
                    {link.name}
                  </motion.a>
                );
              })}
              
              <motion.a
                href="mailto:hello@kridipghale.dev"
                initial={{ x: -20, opacity: 0 }}
                animate={{ 
                  x: isMobileMenuOpen ? 0 : -20, 
                  opacity: isMobileMenuOpen ? 1 : 0 
                }}
                transition={{ delay: navLinks.length * 0.05, duration: 0.3 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 mt-2 rounded-xl bg-charcoal text-white text-sm font-medium text-center"
              >
                Hire Me
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
