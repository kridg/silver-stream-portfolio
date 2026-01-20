import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-8 px-6 border-t border-border"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-soft-gray">
          © {new Date().getFullYear()} Kridip Ghale. All rights reserved.
        </p>
        <p className="text-sm text-soft-gray">
          Built with React & Tailwind CSS
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
