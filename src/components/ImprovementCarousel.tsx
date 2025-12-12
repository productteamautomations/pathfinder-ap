import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AttentionIcon from "@/assets/attention-icon.svg";

interface ImprovementArea {
  title: string;
  score: number;
  explanations: string[];
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
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 flex-shrink-0">
        <div className="flex items-center gap-2">
          <img src={AttentionIcon} alt="" className="w-5 h-5" />
          <h3 className="text-lg font-semibold text-accent-orange">Areas requiring immediate attention.</h3>
        </div>
        {areas.length > 1 && (
          <div className="flex items-center gap-2">
            <button
              onClick={goToPrevious}
              className="p-1.5 rounded-full bg-muted/50 hover:bg-muted transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4 text-muted-foreground" />
            </button>
            <span className="text-base text-muted-foreground font-medium min-w-[40px] text-center">
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

      {/* Content fills remaining space */}
      <div className="relative flex-1 min-h-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="bg-muted/30 rounded-2xl p-5 border border-border/30 h-full flex flex-col"
          >
            <div className="flex items-center justify-between mb-3 flex-shrink-0">
              <span className="px-3 py-1 bg-primary/10 text-primary text-base font-medium rounded-full">
                {currentArea.title}
              </span>
              <span className="text-base font-semibold text-muted-foreground">Score: {currentArea.score}%</span>
            </div>

            <div className="flex flex-col flex-1 min-h-0 gap-3">
              <div className="flex-1">
                <h4 className="text-base font-semibold text-[#173340] mb-2">Why this needs attention</h4>
                <ul className="space-y-1">
                  {currentArea.explanations.map((point, idx) => (
                    <li key={idx} className="text-base text-muted-foreground leading-snug">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-border/30 flex-shrink-0">
                <h4 className="text-base font-semibold text-[#173340] mb-1">Our Recommendation</h4>
                <p className="text-base text-muted-foreground leading-snug">{currentArea.recommendation}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot indicators */}
      {areas.length > 1 && (
        <div className="flex justify-center gap-2 mt-3 flex-shrink-0">
          {areas.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? "bg-primary" : "bg-muted"}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
