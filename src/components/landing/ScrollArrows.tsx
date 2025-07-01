
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface ScrollArrowsProps {
  sections: string[];
}

export const ScrollArrows = ({ sections }: ScrollArrowsProps) => {
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      sections.forEach((sectionId, index) => {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const nextSection = sections[currentSection + 1];

  if (!nextSection) return null;

  return (
    <div className="fixed right-8 bottom-8 z-50">
      <Button
        onClick={() => scrollToSection(nextSection)}
        className="bg-blue-600 hover:bg-blue-700 rounded-full p-3 shadow-lg animate-bounce"
      >
        <ChevronDown className="h-6 w-6" />
      </Button>
    </div>
  );
};
