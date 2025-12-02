import { motion } from "framer-motion";

interface FunnelVisualizationProps {
  trafficScore: number;
  conversionScore: number;
  leadScore: number;
}

export function FunnelVisualization({
  trafficScore,
  conversionScore,
  leadScore,
}: FunnelVisualizationProps) {
  const stages = [
    { label: "Traffic", score: trafficScore, color: "#6366f1", width: 100 },
    { label: "Conversion", score: conversionScore, color: "#E3664F", width: 70 },
    { label: "Leads", score: leadScore, color: "#eab308", width: 45 },
  ];

  return (
    <div className="w-full flex flex-col items-center gap-1">
      {stages.map((stage, index) => (
        <motion.div
          key={stage.label}
          className="relative flex items-center justify-center"
          style={{ width: `${stage.width}%` }}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{
            duration: 0.5,
            delay: index * 0.15,
            ease: "easeOut",
          }}
        >
          {/* Funnel segment */}
          <div
            className="w-full h-10 flex items-center justify-center relative overflow-hidden"
            style={{
              backgroundColor: stage.color,
              clipPath: index === stages.length - 1 
                ? "polygon(5% 0%, 95% 0%, 85% 100%, 15% 100%)"
                : "polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)",
            }}
          >
            <span className="text-white text-sm font-semibold z-10 drop-shadow-sm">
              {stage.label}
            </span>
            {/* Score badge */}
            <motion.span
              className="absolute right-4 text-white/90 text-xs font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.15 }}
            >
              {stage.score}%
            </motion.span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
