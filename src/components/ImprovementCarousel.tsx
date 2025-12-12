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
      <div className="flex items-center justify-between flex-shrink-0" style={{ marginBottom: "1cqw" }}>
        <div className="flex items-center" style={{ gap: "0.6cqw" }}>
          <img src={AttentionIcon} alt="" style={{ width: "1.5cqw", height: "1.5cqw" }} />
          <h3 className="font-semibold text-accent-orange" style={{ fontSize: "1.3cqw" }}>
            Areas requiring immediate attention.
          </h3>
        </div>
        {areas.length > 1 && (
          <div className="flex items-center" style={{ gap: "0.6cqw" }}>
            <button
              onClick={goToPrevious}
              className="rounded-full bg-muted/50 hover:bg-muted transition-colors"
              style={{ padding: "0.4cqw" }}
              aria-label="Previous"
            >
              <ChevronLeft className="text-muted-foreground" style={{ width: "1.2cqw", height: "1.2cqw" }} />
            </button>
            <span
              className="text-muted-foreground font-medium text-center"
              style={{ fontSize: "1.2cqw", minWidth: "3cqw" }}
            >
              {currentIndex + 1} / {areas.length}
            </span>
            <button
              onClick={goToNext}
              className="rounded-full bg-muted/50 hover:bg-muted transition-colors"
              style={{ padding: "0.4cqw" }}
              aria-label="Next"
            >
              <ChevronRight className="text-muted-foreground" style={{ width: "1.2cqw", height: "1.2cqw" }} />
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
            className="bg-muted/30 border border-border/30 h-full flex flex-col"
            style={{ borderRadius: "1.2cqw", padding: "1.5cqw" }}
          >
            <div className="flex items-center justify-between flex-shrink-0" style={{ marginBottom: "1cqw" }}>
              <span
                className="px-3 py-1 bg-primary/10 text-primary font-medium rounded-full"
                style={{ fontSize: "1.2cqw", padding: "0.3cqw 0.9cqw" }}
              >
                {currentArea.title}
              </span>
              <span className="font-semibold text-muted-foreground" style={{ fontSize: "1.2cqw" }}>
                Score: {currentArea.score}%
              </span>
            </div>

            <div className="flex flex-col flex-1 min-h-0" style={{ gap: "1cqw" }}>
              <div className="flex-1">
                <h4 className="font-semibold text-[#173340]" style={{ fontSize: "1.2cqw", marginBottom: "0.6cqw" }}>
                  Why this needs attention
                </h4>
                <ul style={{ display: "flex", flexDirection: "column", gap: "0.3cqw" }}>
                  {currentArea.explanations.map((point, idx) => (
                    <li key={idx} className="text-muted-foreground leading-snug" style={{ fontSize: "1.2cqw" }}>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-border/30 flex-shrink-0" style={{ paddingTop: "0.6cqw" }}>
                <h4 className="font-semibold text-[#173340]" style={{ fontSize: "1.2cqw", marginBottom: "0.3cqw" }}>
                  Our Recommendation
                </h4>
                <p className="text-muted-foreground leading-snug" style={{ fontSize: "1.2cqw" }}>
                  {currentArea.recommendation}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot indicators */}
      {areas.length > 1 && (
        <div className="flex justify-center flex-shrink-0" style={{ gap: "0.6cqw", marginTop: "1cqw" }}>
          {areas.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`rounded-full transition-colors ${index === currentIndex ? "bg-primary" : "bg-muted"}`}
              style={{ width: "0.5cqw", height: "0.5cqw" }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
