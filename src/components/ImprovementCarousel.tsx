import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImprovementArea {
  title: string;
  score: number;
  explanation: string;
  recommendation: string;
}

interface ImprovementCarouselProps {
  areas: ImprovementArea[];
}

export function ImprovementCarousel({ areas }: ImprovementCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? areas.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === areas.length - 1 ? 0 : prev + 1));
  };

  if (areas.length === 0) return null;

  const currentArea = areas[currentIndex];

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#173340]">Areas of Improvement</h3>
        {areas.length > 1 && (
          <div className="flex items-center gap-2">
            <button
              onClick={goToPrevious}
              className="p-1.5 rounded-full bg-muted/50 hover:bg-muted transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4 text-muted-foreground" />
            </button>
            <span className="text-sm text-muted-foreground font-medium min-w-[40px] text-center">
              {currentIndex + 1} / {areas.length}
            </span>
            <button
              onClick={goToNext}
              className="p-1.5 rounded-full bg-muted/50 hover:bg-muted transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        )}
      </div>

      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="bg-muted/30 rounded-2xl p-6 border border-border/30"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full">
                {currentArea.title}
              </span>
              <span className="text-sm font-semibold text-muted-foreground">
                Score: {currentArea.score}%
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-[#173340] mb-2">Why this needs attention</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {currentArea.explanation}
                </p>
              </div>

              <div className="pt-3 border-t border-border/30">
                <h4 className="text-sm font-semibold text-[#173340] mb-2">Our Recommendation</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {currentArea.recommendation}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot indicators */}
      {areas.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {areas.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-primary" : "bg-muted"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
