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

  return (
    <div className="w-full max-w-xs mx-auto">
      <svg viewBox="0 0 200 140" className="w-full h-auto">
        {stages.map((stage, index) => {
          const topWidth = 180 - index * 40;
          const bottomWidth = 140 - index * 40;
          const yOffset = index * 42;
          const topX = (200 - topWidth) / 2;
          const bottomX = (200 - bottomWidth) / 2;
          
          return (
            <g key={stage.label}>
              <motion.path
                d={`M ${topX} ${yOffset} 
                    L ${topX + topWidth} ${yOffset} 
                    L ${bottomX + bottomWidth} ${yOffset + 38} 
                    L ${bottomX} ${yOffset + 38} Z`}
                fill={stage.color}
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ duration: 0.4, delay: index * 0.12 }}
                style={{ transformOrigin: "center top" }}
              />
              <motion.text
                x="100"
                y={yOffset + 22}
                textAnchor="middle"
                fill="white"
                fontSize="11"
                fontWeight="600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.12 }}
              >
                {stage.label}
              </motion.text>
              <motion.text
                x="100"
                y={yOffset + 34}
                textAnchor="middle"
                fill="white"
                fontSize="10"
                opacity={0.9}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={{ delay: 0.4 + index * 0.12 }}
              >
                {stage.score}%
              </motion.text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
