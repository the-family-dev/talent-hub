import { motion } from "framer-motion";
import { useState } from "react";
import type { StatusData } from "./statisticsStore";

interface Props {
  data: StatusData[];
  title: string;
}

export const ApplicationsPieChart = ({ data, title }: Props) => {
  const total = data.reduce((sum, d) => sum + d.count, 0);
  let cumulativePercent = 0;

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const radius = 60;
  const center = 70;

  const colors = [
    "#3B82F6", // blue
    "#F59E0B", // amber
    "#10B981", // green
    "#EF4444", // red
  ];

  return (
    <div className="bg-content1 p-6 rounded-2xl shadow-xl w-full flex flex-col h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-content1 rounded-2xl shadow-xl p-4 w-full flex flex-col items-center overflow-hidden"
      >
        <h2 className="text-lg font-semibold mb-4">{title}</h2>

        <div className="flex items-center justify-center gap-8 flex-wrap md:flex-nowrap">
          {/* SVG Pie */}
          <motion.svg
            width={center * 2}
            height={center * 2}
            viewBox={`0 0 ${center * 2} ${center * 2}`}
            className="flex-shrink-0 relative"
          >
            {data.map((d, i) => {
              const startAngle = cumulativePercent * 2 * Math.PI;
              const percent = d.count / total;
              const endAngle = (cumulativePercent + percent) * 2 * Math.PI;
              cumulativePercent += percent;

              const x1 = center + radius * Math.cos(startAngle);
              const y1 = center + radius * Math.sin(startAngle);
              const x2 = center + radius * Math.cos(endAngle);
              const y2 = center + radius * Math.sin(endAngle);
              const largeArc = percent > 0.5 ? 1 : 0;
              const path = `M${center},${center} L${x1},${y1} A${radius},${radius} 0 ${largeArc} 1 ${x2},${y2} Z`;

              // Координаты центра дуги
              const midAngle = (startAngle + endAngle) / 2;
              const textX = center + (radius / 2) * Math.cos(midAngle);
              const textY = center + (radius / 2) * Math.sin(midAngle);

              return (
                <g
                  key={i}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <motion.path
                    d={path}
                    fill={colors[i % colors.length]}
                    initial={{ scale: 0, opacity: 0, rotate: -90 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: i * 0.2,
                      type: "spring",
                      stiffness: 100,
                    }}
                    whileHover={{
                      scale: 1.08,
                      filter: "brightness(1.25)",
                      transition: { duration: 0.2 },
                    }}
                  />

                  {/* Появляющийся текст внутри сектора */}
                  {hoveredIndex === i && (
                    <motion.text
                      x={textX}
                      y={textY + 5}
                      textAnchor="middle"
                      className="fill-white text-sm font-semibold pointer-events-none"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {d.count}
                    </motion.text>
                  )}
                </g>
              );
            })}
          </motion.svg>

          {/* Легенда */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col justify-center space-y-3"
          >
            {data.map((d, i) => {
              return (
                <motion.div
                  key={i}
                  className="flex items-center space-x-2 cursor-default"
                  whileHover={{ x: 4, transition: { duration: 0.2 } }}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full shadow-sm"
                    style={{ backgroundColor: colors[i % colors.length] }}
                  ></span>
                  <span className="text-sm font-medium">{d.status}</span>
                  <span className="text-xs">
                    ({d.count}, {Math.round((d.count / total) * 100)}%)
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
