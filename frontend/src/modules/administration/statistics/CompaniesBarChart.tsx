import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { CompanyData } from "./statisticsStore";

interface Props {
  data: CompanyData[];
  title: string;
}

export const CompaniesBarChart = ({ data, title }: Props) => {
  const max = Math.max(...data.map((d) => d.applications));
  const chartHeight = 200;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const gradients = [
    "linear-gradient(to top, #3B82F6, #60A5FA)",
    "linear-gradient(to top, #10B981, #34D399)",
    "linear-gradient(to top, #F59E0B, #FBBF24)",
    "linear-gradient(to top, #EF4444, #F87171)",
    "linear-gradient(to top, #8B5CF6, #A78BFA)",
  ];

  return (
    <div className="bg-content1 rounded-2xl shadow-xl p-6 w-full">
      <h2 className="text-lg font-medium mb-4 flex flex-col items-center">
        {title}
      </h2>
      <div className="flex items-end justify-between h-[200px] w-full relative">
        {data.map((d, i) => (
          <div key={i} className="flex flex-col items-center w-12 relative">
            <motion.div
              className="w-full rounded-t-lg cursor-pointer"
              initial={{ height: 0 }}
              animate={{ height: (d.applications / max) * chartHeight * 0.9 }}
              style={{
                background: gradients[i % gradients.length],
              }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: i * 0.1,
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            />

            {/* Анимация появления числа при наведении */}
            <AnimatePresence>
              {hoveredIndex === i && (
                <motion.div
                  className="absolute -top-8 text-xs font-semibold text-white bg-blue-600 rounded px-4 shadow-lg pointer-events-none"
                  initial={{ opacity: 0, y: 5, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  {d.applications}
                </motion.div>
              )}
            </AnimatePresence>

            <span className="text-xs mt-1 text-center">{d.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
