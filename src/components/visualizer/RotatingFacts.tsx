import { useState, useEffect } from 'react';

const facts = [
  "Our floors are installed in one day!",
  "Each garage comes with a lifetime warranty.",
  "We use the highest rated quality products available.",
  "We have installed over 3,000 garage floors just like yours.",
  "Our floors are thick, shiny, and easy to clean."
];

export const RotatingFacts = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % facts.length);
        setIsVisible(true);
      }, 300);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-8 max-w-md mx-auto px-4">
      <p
        className={`text-center text-lg font-medium text-foreground transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {facts[currentIndex]}
      </p>
    </div>
  );
};
