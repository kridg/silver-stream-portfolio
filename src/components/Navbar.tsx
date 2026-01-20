import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";

const Navbar = () => {
  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

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
              {navLinks.map((link) => (
                <MagneticButton key={link.name} href={link.href} strength={0.2}>
                  <span className="px-4 py-2 text-sm text-soft-gray hover:text-charcoal rounded-lg hover:bg-silver-100 transition-all duration-200">
                    {link.name}
                  </span>
                </MagneticButton>
              ))}
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
            <button className="md:hidden p-2 rounded-lg hover:bg-silver-100 transition-colors">
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className="w-full h-0.5 bg-charcoal rounded-full" />
                <span className="w-3/4 h-0.5 bg-charcoal rounded-full" />
                <span className="w-1/2 h-0.5 bg-charcoal rounded-full" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;