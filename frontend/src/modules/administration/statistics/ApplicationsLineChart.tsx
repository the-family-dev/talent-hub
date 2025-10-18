import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import weekOfYear from "dayjs/plugin/weekOfYear";

dayjs.locale("ru");
dayjs.extend(weekOfYear);

interface ApplicationData {
  date: number;
  count: number;
  label?: string;
}

interface ApplicationsLineChartProps {
  data: ApplicationData[];
  title: string;
  height?: number;
}

type PeriodType = "week" | "month" | "year";

export const ApplicationsLineChart: React.FC<ApplicationsLineChartProps> = ({
  data,
  title,
  height = 220,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [period, setPeriod] = useState<PeriodType>("week");
  const [chartWidth, setChartWidth] = useState(0);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0]) setChartWidth(entries[0].contentRect.width);
    });
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const filteredData = useMemo(() => {
    const now = dayjs();
    if (period === "week")
      return data.filter((d) => dayjs(d.date).isAfter(now.subtract(7, "day")));
    if (period === "month")
      return data.filter((d) =>
        dayjs(d.date).isAfter(now.subtract(1, "month"))
      );
    if (period === "year")
      return data.filter((d) => dayjs(d.date).isAfter(now.subtract(1, "year")));
    return data;
  }, [data, period]);

  const groupedData = useMemo(() => {
    if (!filteredData.length) return [];
    if (period === "week")
      return filteredData.map((d) => ({
        ...d,
        label: dayjs(d.date).format("dd"),
      }));
    if (period === "month") {
      const weeks: Record<number, number> = {};
      filteredData.forEach((d) => {
        const week = dayjs(d.date).week();
        weeks[week] = (weeks[week] || 0) + d.count;
      });
      return Object.entries(weeks).map(([week, count]) => ({
        date: +week,
        count,
        label: `Нед ${week}`,
      }));
    }
    if (period === "year") {
      const months: Record<number, number> = {};
      filteredData.forEach((d) => {
        const month = dayjs(d.date).month();
        months[month] = (months[month] || 0) + d.count;
      });
      return Object.entries(months).map(([m, count]) => ({
        date: +m,
        count,
        label: dayjs().month(+m).format("MMM"),
      }));
    }
    return filteredData;
  }, [filteredData, period]);

  if (!groupedData.length) return <div>Нет данных</div>;

  const max = Math.max(...groupedData.map((d) => d.count));
  const min = Math.min(...groupedData.map((d) => d.count));
  const padding = 40;
  const width = chartWidth || 400;
  const horizontalLines = 5;

  const points = groupedData.map((d, i) => ({
    x:
      padding +
      (i / Math.max(groupedData.length - 1, 1)) * (width - 2 * padding),
    y:
      height -
      padding -
      ((d.count - min) / (max - min || 1)) * (height - 2 * padding),
    count: d.count,
    label: d.label!,
  }));

  const pathD = points.reduce((path, p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = points[i - 1];
    const cx1 = prev.x + (p.x - prev.x) * 0.3;
    const cy1 = prev.y;
    const cx2 = p.x - (p.x - prev.x) * 0.3;
    const cy2 = p.y;
    return `${path} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${p.x} ${p.y}`;
  }, "");

  return (
    <div
      ref={containerRef}
      className="bg-content1 p-6 rounded-2xl shadow-xl w-full flex flex-col h-full"
    >
      {/* Заголовок и переключатель */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="flex gap-2 text-sm">
          {(["week", "month", "year"] as PeriodType[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1 rounded-lg transition-colors
                ${
                  p === period
                    ? "bg-blue-500 text-white dark:bg-blue-400 dark:text-black"
                    : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
                }`}
            >
              {p === "week" ? "Неделя" : p === "month" ? "Месяц" : "Год"}
            </button>
          ))}
        </div>
      </div>

      {/* График */}
      <div className="flex-1 w-full flex items-center justify-center">
        <svg
          width="100%"
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="overflow-visible"
        >
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#60A5FA" />
            </linearGradient>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(59,130,246,0.3)" />
              <stop offset="100%" stopColor="rgba(59,130,246,0)" />
            </linearGradient>
          </defs>

          {/* Горизонтальная и вертикальная сетка */}
          {Array.from({ length: horizontalLines + 1 }).map((_, i) => {
            const y = padding + ((height - 2 * padding) / horizontalLines) * i;
            const value = Math.round(max - ((max - min) / horizontalLines) * i);
            return (
              <g key={`h-${i}`}>
                <line
                  x1={padding}
                  x2={width - padding}
                  y1={y}
                  y2={y}
                  stroke="rgba(200,200,200,0.2)"
                  className="dark:stroke-gray-600"
                  strokeWidth={1}
                />
                <text
                  x={padding - 10}
                  y={y + 4}
                  textAnchor="end"
                  className="text-[10px] fill-gray-400 dark:fill-gray-300 font-medium"
                >
                  {value}
                </text>
              </g>
            );
          })}
          {points.map((p, i) => (
            <line
              key={`v-${i}`}
              x1={p.x}
              x2={p.x}
              y1={padding}
              y2={height - padding}
              stroke="rgba(200,200,200,0.1)"
              className="dark:stroke-gray-700"
              strokeWidth={1}
            />
          ))}

          {/* Area под графиком */}
          <path
            d={`${pathD} L ${points[points.length - 1].x} ${
              height - padding
            } L ${points[0].x} ${height - padding} Z`}
            fill="url(#areaGradient)"
          />

          {/* Линия графика */}
          <motion.path
            d={pathD}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth={3.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1 }}
          />

          {/* Точки и подсказки */}
          {points.map((p, i) => (
            <motion.circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={hoveredPoint === i ? 6 : 4}
              fill="#2563EB"
              onMouseEnter={() => setHoveredPoint(i)}
              onMouseLeave={() => setHoveredPoint(null)}
              transition={{ duration: 0.2 }}
            />
          ))}
          {hoveredPoint !== null && (
            <foreignObject
              x={points[hoveredPoint].x - 25}
              y={points[hoveredPoint].y - 40}
              width={50}
              height={30}
            >
              <div className="bg-blue-600 text-white text-[12px] rounded mx-2 py-0 text-center shadow">
                {points[hoveredPoint].count}
              </div>
            </foreignObject>
          )}

          {/* Подписи по X */}
          <g>
            {points.map((p, i) => (
              <text
                key={i}
                x={p.x}
                y={height - 5}
                textAnchor="middle"
                className="text-[12px] fill-gray-400 dark:fill-gray-300 font-medium"
              >
                {p.label}
              </text>
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
};
