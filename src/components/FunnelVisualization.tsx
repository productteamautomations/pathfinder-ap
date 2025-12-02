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
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 200 180" className="w-full h-full">
        <defs>
          <linearGradient id="trafficGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0a24e3" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0a24e3" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="conversionGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e3664f" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#e3664f" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="leadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffcd63" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ffcd63" stopOpacity="0.6" />
          </linearGradient>

          <clipPath id="trafficClipAnimated">
            <motion.rect
              x="20"
              width="160"
              initial={{ y: 100, height: 0 }}
              animate={{
                y: 60 + (40 * (100 - trafficScore)) / 100,
                height: (40 * trafficScore) / 100,
              }}
              transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
            />
          </clipPath>
          <clipPath id="conversionClipAnimated">
            <motion.rect
              x="40"
              width="120"
              initial={{ y: 140, height: 0 }}
              animate={{
                y: 100 + (40 * (100 - conversionScore)) / 100,
                height: (40 * conversionScore) / 100,
              }}
              transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
            />
          </clipPath>
          <clipPath id="leadClipAnimated">
            <motion.rect
              x="60"
              width="80"
              initial={{ y: 180, height: 0 }}
              animate={{
                y: 140 + (40 * (100 - leadScore)) / 100,
                height: (40 * leadScore) / 100,
              }}
              transition={{ duration: 1.5, delay: 0.9, ease: "easeOut" }}
            />
          </clipPath>
        </defs>

        <motion.line
          x1="20"
          y1="60"
          x2="180"
          y2="60"
          stroke="#0a24e3"
          strokeWidth="1.5"
          strokeOpacity="0.4"
          strokeDasharray="4 2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        />

        <g clipPath="url(#trafficClipAnimated)">
          <path d="M 20 60 L 180 60 L 160 100 L 40 100 Z" fill="url(#trafficGradient)" />
        </g>

        <g clipPath="url(#conversionClipAnimated)">
          <path d="M 40 100 L 160 100 L 140 140 L 60 140 Z" fill="url(#conversionGradient)" />
        </g>

        <g clipPath="url(#leadClipAnimated)">
          <path d="M 60 140 L 140 140 L 120 180 L 80 180 Z" fill="url(#leadGradient)" />
        </g>
      </svg>
    </div>
  );
}
