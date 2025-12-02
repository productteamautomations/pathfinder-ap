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
    { id: "traffic", score: trafficScore, label: "Traffic", color: "#22c55e" },
    { id: "conversion", score: conversionScore, label: "Conversion", color: "#E3664F" },
    { id: "leads", score: leadScore, label: "Leads", color: "#eab308" },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 280 160" className="w-full h-full">
        <defs>
          {/* Gradients */}
          <linearGradient id="trafficGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#16a34a" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="conversionGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E3664F" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#dc2626" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="leadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#eab308" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#ca8a04" stopOpacity="0.8" />
          </linearGradient>
          
          {/* Shadow filter */}
          <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" />
          </filter>
          
          {/* Glow filters */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background funnel outline */}
        <motion.path
          d="M 40 20 L 240 20 L 200 65 L 80 65 Z"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 1, delay: 0.1 }}
        />
        <motion.path
          d="M 80 70 L 200 70 L 170 115 L 110 115 Z"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
        <motion.path
          d="M 110 120 L 170 120 L 155 155 L 125 155 Z"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 1, delay: 0.5 }}
        />

        {/* Traffic layer */}
        <motion.g filter="url(#dropShadow)">
          <motion.path
            d="M 40 20 L 240 20 L 200 65 L 80 65 Z"
            fill="url(#trafficGradient)"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: trafficScore / 100, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </motion.g>

        {/* Conversion layer */}
        <motion.g filter="url(#dropShadow)">
          <motion.path
            d="M 80 70 L 200 70 L 170 115 L 110 115 Z"
            fill="url(#conversionGradient)"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: conversionScore / 100, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
        </motion.g>

        {/* Leads layer */}
        <motion.g filter="url(#dropShadow)">
          <motion.path
            d="M 110 120 L 170 120 L 155 155 L 125 155 Z"
            fill="url(#leadGradient)"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: leadScore / 100, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          />
        </motion.g>

        {/* Labels on the right */}
        <motion.g
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          {/* Traffic label */}
          <line x1="242" y1="42" x2="255" y2="42" stroke="#22c55e" strokeWidth="2" />
          <text x="260" y="38" fontSize="9" fill="#6b7280" fontWeight="500">Traffic</text>
          <text x="260" y="48" fontSize="11" fill="#22c55e" fontWeight="700">{trafficScore}%</text>
          
          {/* Conversion label */}
          <line x1="202" y1="92" x2="255" y2="92" stroke="#E3664F" strokeWidth="2" />
          <text x="260" y="88" fontSize="9" fill="#6b7280" fontWeight="500">Conversion</text>
          <text x="260" y="98" fontSize="11" fill="#E3664F" fontWeight="700">{conversionScore}%</text>
          
          {/* Leads label */}
          <line x1="172" y1="137" x2="255" y2="137" stroke="#eab308" strokeWidth="2" />
          <text x="260" y="133" fontSize="9" fill="#6b7280" fontWeight="500">Leads</text>
          <text x="260" y="143" fontSize="11" fill="#eab308" fontWeight="700">{leadScore}%</text>
        </motion.g>

        {/* Flow arrows between stages */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <path
            d="M 140 65 L 140 70"
            stroke="#9ca3af"
            strokeWidth="1.5"
            markerEnd="url(#arrowhead)"
          />
          <path
            d="M 140 115 L 140 120"
            stroke="#9ca3af"
            strokeWidth="1.5"
            markerEnd="url(#arrowhead)"
          />
        </motion.g>

        {/* Arrow marker definition */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="6"
            markerHeight="6"
            refX="3"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 6 3, 0 6" fill="#9ca3af" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
