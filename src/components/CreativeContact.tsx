import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Github, Linkedin, Mail, MessageCircle, ArrowUpRight, Sparkles } from "lucide-react";
import { useRef, useState } from "react";
import MagneticButton from "./MagneticButton";

const socialLinks = [
  { 
    icon: Github, 
    href: "https://github.com", 
    label: "GitHub",
    username: "@kridipghale",
    color: "from-zinc-600 to-zinc-800"
  },
  { 
    icon: Linkedin, 
    href: "https://linkedin.com", 
    label: "LinkedIn",
    username: "in/kridipghale",
    color: "from-blue-500 to-blue-700"
  },
  {
    icon: MessageCircle,
    href: "https://wa.me/1234567890",
    label: "WhatsApp",
    username: "+1 (234) 567-8900",
    color: "from-green-400 to-green-600"
  },
  { 
    icon: Mail, 
    href: "mailto:ghalekridip67@gmail.com",
    label: "Email",
    username: "ghalekridip67@gmail.com",
    color: "from-rose-400 to-rose-600"
  },
];

const CreativeContact = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section id="contact" className="py-24 px-8 lg:px-16 relative overflow-hidden">
      {/* Background with animated gradient orbs */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-emerald-500/5 to-cyan-500/5 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10" ref={containerRef}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-silver-100 border border-silver-200 text-soft-gray text-sm font-medium mb-4"
          >
            <Sparkles className="w-4 h-4" />
            Let's Connect
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-6">
            Get In Touch
          </h2>
          <p className="text-soft-gray max-w-xl mx-auto text-lg leading-relaxed">
            Have a project in mind or just want to say hello? 
            I'd love to hear from you.
          </p>
        </motion.div>

        {/* Main Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          {/* Large CTA Card */}
          <div className="card-premium p-8 md:p-12 lg:p-16 text-center mb-8 overflow-hidden relative">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-silver-200/50 to-transparent rounded-br-[100px]" />
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-silver-200/50 to-transparent rounded-tl-[100px]" />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative z-10"
            >
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-charcoal mb-4">
                Ready to build something amazing?
              </h3>
              <p className="text-soft-gray text-lg mb-8 max-w-lg mx-auto">
                Whether it's a full-scale web application or a quick consultation, 
                I'm here to help bring your ideas to life.
              </p>
              
              <MagneticButton 
                href="mailto:ghalekridip67@gmail.com"
                strength={0.3}
              >
                <motion.span 
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-charcoal text-white font-medium text-lg shadow-elevated hover:shadow-hover transition-shadow duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Mail className="w-5 h-5" />
                  Send a Message
                  <ArrowUpRight className="w-5 h-5" />
                </motion.span>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Creative Social Links */}
          <div className="flex flex-wrap justify-center items-center gap-8 mt-12">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.label !== "Email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                whileHover={{
                  scale: 1.1,
                  rotate: [0, -5, 5, 0],
                  transition: { duration: 0.3 }
                }}
                className="group relative"
              >
                {/* Floating background orb */}
                <motion.div
                  className={`absolute -inset-4 rounded-full blur-xl ${link.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 8 + index * 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />

                {/* Main icon container */}
                <motion.div
                  className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-silver-50 to-silver-100 border border-silver-200 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 overflow-hidden"
                  whileHover={{
                    background: `linear-gradient(135deg, ${link.color.includes('blue') ? '#dbeafe, #bfdbfe' : link.color.includes('green') ? '#dcfce7, #bbf7d0' : '#fef3c7, #fde68a'})`
                  }}
                >
                  {/* Animated background pattern */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10"
                    style={{
                      backgroundImage: `radial-gradient(circle at 25% 25%, currentColor 1px, transparent 1px)`,
                      backgroundSize: '8px 8px'
                    }}
                    animate={{
                      backgroundPosition: ['0px 0px', '8px 8px']
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />

                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10"
                  >
                    <link.icon className="w-7 h-7 text-charcoal group-hover:text-white transition-colors duration-300" />
                  </motion.div>

                  {/* Sparkle effect */}
                  <motion.div
                    className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100"
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: index * 0.2
                    }}
                  />
                </motion.div>

                {/* Label */}
                <motion.div
                  className="text-center mt-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <p className="text-sm font-medium text-charcoal group-hover:text-primary transition-colors">
                    {link.label}
                  </p>
                </motion.div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Footer text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-soft-gray-light text-sm">
            Based worldwide · Available for remote work
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CreativeContact;