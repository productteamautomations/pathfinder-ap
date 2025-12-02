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
    { label: "Traffic", score: trafficScore, color: "#22c55e" },
    { label: "Conversion", score: conversionScore, color: "#E3664F" },
    { label: "Leads", score: leadScore, color: "#eab308" },
  ];

  return (
    <div className="w-full space-y-4">
      {stages.map((stage, index) => (
        <div key={stage.label} className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              {stage.label}
            </span>
            <span 
              className="text-sm font-semibold"
              style={{ color: stage.color }}
            >
              {stage.score}%
            </span>
          </div>
          <div className="h-2.5 bg-muted/40 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: stage.color }}
              initial={{ width: 0 }}
              animate={{ width: `${stage.score}%` }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.15, 
                ease: "easeOut" 
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
