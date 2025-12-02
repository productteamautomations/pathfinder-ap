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
  const total = trafficScore + conversionScore + leadScore;
  
  const stages = [
    { label: "Traffic", score: trafficScore, color: "#3b82f6", percent: (trafficScore / total) * 100 },
    { label: "Conversion", score: conversionScore, color: "#E3664F", percent: (conversionScore / total) * 100 },
    { label: "Leads", score: leadScore, color: "#eab308", percent: (leadScore / total) * 100 },
  ];

  return (
    <div className="w-full space-y-4">
      {/* Labels row */}
      <div className="flex justify-between text-sm">
        {stages.map((stage) => (
          <div key={stage.label} className="text-center">
            <p className="text-muted-foreground text-xs">{stage.label}</p>
            <p className="font-semibold" style={{ color: stage.color }}>{stage.score}%</p>
          </div>
        ))}
      </div>
      
      {/* Stacked bar */}
      <div className="h-3 bg-muted/30 rounded-full overflow-hidden flex">
        {stages.map((stage, index) => (
          <motion.div
            key={stage.label}
            className="h-full first:rounded-l-full last:rounded-r-full"
            style={{ backgroundColor: stage.color }}
            initial={{ width: 0 }}
            animate={{ width: `${stage.percent}%` }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.1, 
              ease: "easeOut" 
            }}
          />
        ))}
      </div>
      
      {/* Legend dots */}
      <div className="flex justify-center gap-6 pt-2">
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
