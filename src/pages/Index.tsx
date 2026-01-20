import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StackedProjects from "@/components/StackedProjects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <StackedProjects />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
