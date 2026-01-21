import { useState, useEffect } from "react";

interface Section {
  id: string;
  offset?: number;
}

export const useScrollSpy = (sections: Section[], offset: number = 100) => {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;
      
      // Check each section
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section.id);
        
        if (element) {
          const { offsetTop } = element;
          if (scrollPosition >= offsetTop) {
            setActiveSection(section.id);
            return;
          }
        }
      }
      
      // Default to first section if at top
      if (scrollPosition < 200) {
        setActiveSection(sections[0]?.id || "");
      }
    };

    // Initial check
    handleScroll();
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections, offset]);

  return activeSection;
};

export default useScrollSpy;
