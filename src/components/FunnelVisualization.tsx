import React from 'react'
import { motion } from 'framer-motion'

interface FunnelVisualizationProps {
  trafficScore: number
  conversionScore: number
  leadScore: number
}

export function FunnelVisualization({
  trafficScore,
  conversionScore,
  leadScore,
}: FunnelVisualizationProps) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg viewBox="-100 40 340 160" className="w-full h-full max-w-md">
        <defs>
          {/* Gradients for each segment */}
          <linearGradient
            id="trafficGradient"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#0a24e3" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0a24e3" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient
            id="conversionGradient"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#e3664f" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#e3664f" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="leadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffcd63" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ffcd63" stopOpacity="0.6" />
          </linearGradient>

          {/* Animated clip paths for rising effect */}
          <clipPath id="trafficClipAnimated">
            <motion.rect
              x="20"
              width="160"
              initial={{ 
                y: 100,
                height: 0
              }}
              animate={{ 
                y: 60 + (40 * (100 - trafficScore)) / 100,
                height: (40 * trafficScore) / 100
              }}
              transition={{
                duration: 1.5,
                delay: 0.3,
                ease: "easeOut"
              }}
            />
          </clipPath>
          <clipPath id="conversionClipAnimated">
            <motion.rect
              x="40"
              width="120"
              initial={{ 
                y: 140,
                height: 0
              }}
              animate={{ 
                y: 100 + (40 * (100 - conversionScore)) / 100,
                height: (40 * conversionScore) / 100
              }}
              transition={{
                duration: 1.5,
                delay: 0.6,
                ease: "easeOut"
              }}
            />
          </clipPath>
          <clipPath id="leadClipAnimated">
            <motion.rect
              x="60"
              width="80"
              initial={{ 
                y: 180,
                height: 0
              }}
              animate={{ 
                y: 140 + (40 * (100 - leadScore)) / 100,
                height: (40 * leadScore) / 100
              }}
              transition={{
                duration: 1.5,
                delay: 0.9,
                ease: "easeOut"
              }}
            />
          </clipPath>
        </defs>

        {/* Max height indicator line at the top of the blue section */}
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

        {/* Traffic (Top) - Blue gradient */}
        <g clipPath="url(#trafficClipAnimated)">
          <path
            d="M 20 60 L 180 60 L 160 100 L 40 100 Z"
            fill="url(#trafficGradient)"
          />
        </g>

        {/* Conversions (Middle) - Orange gradient */}
        <g clipPath="url(#conversionClipAnimated)">
          <path
            d="M 40 100 L 160 100 L 140 140 L 60 140 Z"
            fill="url(#conversionGradient)"
          />
        </g>

        {/* Lead Management (Bottom) - Yellow gradient */}
        <g clipPath="url(#leadClipAnimated)">
          <path
            d="M 60 140 L 140 140 L 120 180 L 80 180 Z"
            fill="url(#leadGradient)"
          />
        </g>

        {/* Percentage indicators with dashes */}
        {/* Traffic indicator */}
        <motion.g
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
        >
          <line
            x1="185"
            y1="80"
            x2="200"
            y2="80"
            stroke="#0a24e3"
            strokeWidth="2"
          />
          <text
            x="208"
            y="84"
            fill="#0a24e3"
            fontSize="14"
            fontWeight="600"
          >
            {trafficScore}%
          </text>
        </motion.g>

        {/* Conversion indicator */}
        <motion.g
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.3, duration: 0.5 }}
        >
          <line
            x1="165"
            y1="120"
            x2="200"
            y2="120"
            stroke="#e3664f"
            strokeWidth="2"
          />
          <text
            x="208"
            y="124"
            fill="#e3664f"
            fontSize="14"
            fontWeight="600"
          >
            {conversionScore}%
          </text>
        </motion.g>

        {/* Lead indicator */}
        <motion.g
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.6, duration: 0.5 }}
        >
          <line
            x1="145"
            y1="160"
            x2="200"
            y2="160"
            stroke="#ffcd63"
            strokeWidth="2"
          />
          <text
            x="208"
            y="164"
            fill="#ffcd63"
            fontSize="14"
            fontWeight="600"
          >
            {leadScore}%
          </text>
        </motion.g>

        {/* Legend/Key */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.5 }}
        >
          {/* Traffic */}
          <rect x="-90" y="70" width="12" height="12" fill="#0a24e3" rx="2" />
          <line x1="-73" y1="76" x2="-65" y2="76" stroke="#173340" strokeWidth="1.5" />
          <text x="-60" y="80" fill="#173340" fontSize="10" fontWeight="500">Traffic</text>

          {/* Conversions */}
          <rect x="-90" y="90" width="12" height="12" fill="#e3664f" rx="2" />
          <line x1="-73" y1="96" x2="-65" y2="96" stroke="#173340" strokeWidth="1.5" />
          <text x="-60" y="100" fill="#173340" fontSize="10" fontWeight="500">Conversions</text>

          {/* Lead Management */}
          <rect x="-90" y="110" width="12" height="12" fill="#ffcd63" rx="2" />
          <line x1="-73" y1="116" x2="-65" y2="116" stroke="#173340" strokeWidth="1.5" />
          <text x="-60" y="120" fill="#173340" fontSize="10" fontWeight="500">Lead Management</text>
        </motion.g>
      </svg>
    </div>
  )
}
