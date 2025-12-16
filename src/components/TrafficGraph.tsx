import React, { useEffect, useRef, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { motion } from "framer-motion";

const originalData = [
  { week: 0, budget10: 100.0, budget20: 200.0, budget30: 300.0 },
  { week: 1, budget10: 112.0, budget20: 228.0, budget30: 365.0 },
  { week: 2, budget10: 124.48, budget20: 257.96, budget30: 438.45 },
  { week: 3, budget10: 137.46, budget20: 290.02, budget30: 521.45 },
  { week: 4, budget10: 150.96, budget20: 324.32, budget30: 615.24 },
  { week: 5, budget10: 165.0, budget20: 361.02, budget30: 721.22 },
  { week: 6, budget10: 179.6, budget20: 400.29, budget30: 840.98 },
  { week: 7, budget10: 194.78, budget20: 442.31, budget30: 976.3 },
  { week: 8, budget10: 210.57, budget20: 487.27, budget30: 1129.22 },
  { week: 9, budget10: 226.99, budget20: 535.38, budget30: 1302.02 },
  { week: 10, budget10: 244.07, budget20: 586.86, budget30: 1497.28 },
  { week: 11, budget10: 261.84, budget20: 641.94, budget30: 1717.93 },
];

const COLORS = {
  budget10: "#5B8FF9",
  budget20: "#5AD8A6",
  budget30: "#FF9845",
};

// Move CustomDot outside the component
const CustomDot = ({ cx, cy, stroke, index, dotSize = 4, strokeWidth = 2 }: any) => {
  if (!cx || !cy) return null;
  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={dotSize}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill="white"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.34, 1.56, 0.64, 1] }}
      whileHover={{ scale: 1.5, transition: { duration: 0.2 } }}
      style={{ cursor: "pointer" }}
    />
  );
};

export function TrafficGraph() {
  const [fontSize, setFontSize] = useState(12);
  const [labelFontSize, setLabelFontSize] = useState(14);
  const [legendFontSize, setLegendFontSize] = useState(14);
  const [dotSize, setDotSize] = useState(4);
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [margins, setMargins] = useState({ top: 20, right: 30, left: 20, bottom: 40 });
  const [data, setData] = useState<any[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const containerWidth = entries[0].contentRect.width;
      // Calculate sizes as cqw equivalent
      setFontSize(containerWidth * 0.012); // 1.2cqw for ticks
      setLabelFontSize(containerWidth * 0.014); // 1.4cqw for labels
      setLegendFontSize(containerWidth * 0.013); // 1.3cqw for legend
      setDotSize(containerWidth * 0.004); // 0.4cqw for dots
      setStrokeWidth(containerWidth * 0.002); // 0.2cqw for stroke
      setMargins({
        top: containerWidth * 0.02,
        right: containerWidth * 0.03,
        left: containerWidth * 0.02,
        bottom: containerWidth * 0.04,
      });
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Load data on mount to trigger animation
  useEffect(() => {
    // Small delay to ensure animation plays
    const timer = setTimeout(() => {
      setData(
        originalData.map((item) => ({
          week: item.week,
          layer1: item.budget10,
          layer2: item.budget20 - item.budget10,
          layer3: item.budget30 - item.budget20,
          original: item,
        })),
      );
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full h-full flex flex-col"
    >
      <div className="text-center" style={{ marginBottom: "2cqh" }}>
        <h2 className="font-display font-bold text-title tracking-tight" style={{ fontSize: "4cqw" }}>
          Weekly Traffic by Daily Budget
        </h2>
      </div>

      <div className="flex-1 w-full" style={{ minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={margins}>
            <defs>
              <linearGradient id="colorBudget10" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS.budget10} stopOpacity={0.2} />
                <stop offset="95%" stopColor={COLORS.budget10} stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="colorBudget20" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS.budget20} stopOpacity={0.2} />
                <stop offset="95%" stopColor={COLORS.budget20} stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="colorBudget30" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS.budget30} stopOpacity={0.2} />
                <stop offset="95%" stopColor={COLORS.budget30} stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={true} stroke="#E5E7EB" opacity={0.5} />

            <XAxis
              dataKey="week"
              tickLine={false}
              axisLine={{ stroke: "#E5E7EB" }}
              tick={{ fill: "#6B7280", fontSize: fontSize }}
              dy={10}
              label={{
                value: "Time (Weeks)",
                position: "insideBottom",
                offset: -20,
                fill: "#374151",
                fontSize: labelFontSize,
                fontWeight: 600,
                dy: 10,
              }}
            />

            <YAxis
              tick={false}
              axisLine={{ stroke: "#E5E7EB" }}
              width={60}
              label={{
                value: "Traffic (Visitors)",
                angle: -90,
                position: "insideLeft",
                fill: "#374151",
                fontSize: labelFontSize,
                fontWeight: 600,
                style: { textAnchor: "middle" },
                dx: -15,
              }}
            />

            <Tooltip content={() => null} cursor={{ stroke: "#D1D5DB", strokeWidth: 1 }} />

            <Legend
              verticalAlign="top"
              height={36}
              iconType="circle"
              wrapperStyle={{ fontSize: legendFontSize }}
              formatter={(value) => {
                const map: Record<string, string> = {
                  layer1: "£10/day",
                  layer2: "£20/day",
                  layer3: "£30/day",
                };
                return <span className="text-muted-foreground font-medium ml-1">{map[value]}</span>;
              }}
            />

            <Area
              type="monotone"
              dataKey="layer1"
              name="layer1"
              stackId="1"
              stroke={COLORS.budget10}
              fill="url(#colorBudget10)"
              strokeWidth={strokeWidth}
              dot={(props) => (
                <CustomDot {...props} stroke={COLORS.budget10} dotSize={dotSize} strokeWidth={strokeWidth} />
              )}
              activeDot={{ r: dotSize * 1.5, strokeWidth: 0, fill: COLORS.budget10 }}
              animationBegin={0}
              animationDuration={1500}
              animationEasing="ease-out"
            />

            <Area
              type="monotone"
              dataKey="layer2"
              name="layer2"
              stackId="1"
              stroke={COLORS.budget20}
              fill="url(#colorBudget20)"
              strokeWidth={strokeWidth}
              dot={(props) => (
                <CustomDot {...props} stroke={COLORS.budget20} dotSize={dotSize} strokeWidth={strokeWidth} />
              )}
              activeDot={{ r: dotSize * 1.5, strokeWidth: 0, fill: COLORS.budget20 }}
              animationBegin={500}
              animationDuration={1500}
              animationEasing="ease-out"
            />

            <Area
              type="monotone"
              dataKey="layer3"
              name="layer3"
              stackId="1"
              stroke={COLORS.budget30}
              fill="url(#colorBudget30)"
              strokeWidth={strokeWidth}
              dot={(props) => (
                <CustomDot {...props} stroke={COLORS.budget30} dotSize={dotSize} strokeWidth={strokeWidth} />
              )}
              activeDot={{ r: dotSize * 1.5, strokeWidth: 0, fill: COLORS.budget30 }}
              animationBegin={1000}
              animationDuration={1500}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
