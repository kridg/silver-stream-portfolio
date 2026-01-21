import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
            Get In Touch
          </h2>
          <p className="text-soft-gray max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas, 
            or opportunities to be part of your vision.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-card"
        >
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-secondary">
                  <Mail className="w-5 h-5 text-soft-gray" />
                </div>
                <div>
                  <p className="text-sm text-soft-gray">Email</p>
                  <a 
                    href="mailto:ghalekridip67@gmail.com" 
                    className="text-charcoal font-medium hover:text-primary transition-colors"
                  >
                    ghalekridip67@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-secondary">
                  <MapPin className="w-5 h-5 text-soft-gray" />
                </div>
                <div>
                  <p className="text-sm text-soft-gray">Location</p>
                  <p className="text-charcoal font-medium">Available Worldwide</p>
                </div>
              </div>

              <div className="pt-4">
                <p className="text-sm text-soft-gray mb-4">Connect with me</p>
                <div className="flex gap-3">
                  <motion.a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 rounded-xl bg-secondary text-soft-gray hover:text-charcoal hover:bg-accent transition-all duration-200"
                  >
                    <Github className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 rounded-xl bg-secondary text-soft-gray hover:text-charcoal hover:bg-accent transition-all duration-200"
                  >
                    <Linkedin className="w-5 h-5" />
                  </motion.a>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-semibold text-charcoal mb-4">
                Let's build something amazing together
              </h3>
              <p className="text-soft-gray mb-6 leading-relaxed">
                Whether you have a project in mind or just want to chat about technology, 
                I'd love to hear from you.
              </p>
              <motion.a
                href="mailto:ghalekridip67@gmail.com"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-xl hover:opacity-90 transition-all duration-200"
              >
                <Mail className="w-4 h-4" />
                Send a Message
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
