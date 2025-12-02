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
    { label: "Traffic", score: trafficScore, color: "#6366f1" },
    { label: "Conversion", score: conversionScore, color: "#E3664F" },
    { label: "Leads", score: leadScore, color: "#eab308" },
  ];

  const total = stages.reduce((sum, s) => sum + s.score, 0);

  return (
    <div className="w-full space-y-3">
      {/* Labels above bar */}
      <div className="flex">
        {stages.map((stage, index) => (
          <div
            key={stage.label}
            className="text-center"
            style={{ width: `${(stage.score / total) * 100}%` }}
          >
            <p className="text-xs font-medium" style={{ color: stage.color }}>
              {stage.label}
            </p>
            <p className="text-sm font-bold" style={{ color: stage.color }}>
              {stage.score}%
            </p>
          </div>
        ))}
      </div>

      {/* Stacked bar */}
      <div className="h-4 rounded-full overflow-hidden flex shadow-sm">
        {stages.map((stage, index) => (
          <motion.div
            key={stage.label}
            className="h-full"
            style={{ backgroundColor: stage.color }}
            initial={{ width: 0 }}
            animate={{ width: `${(stage.score / total) * 100}%` }}
            transition={{
              duration: 0.6,
              delay: index * 0.15,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-5 pt-1">
        {stages.map((stage) => (
          <div key={stage.label} className="flex items-center gap-1.5">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: stage.color }}
            />
            <span className="text-xs text-muted-foreground">{stage.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
