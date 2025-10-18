import { motion } from "framer-motion";

interface KpiCardProps {
  title: string;
  value: number;
  change?: number;
}

export const KpiCard = ({ title, value, change }: KpiCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-content1 rounded-2xl shadow-xl p-6 flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold"
      >
        {value}
      </motion.div>
      <div className="text-sm text-gray-400">{title}</div>
      {change !== undefined && (
        <div
          className={`mt-1 text-sm font-medium ${
            change >= 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {change >= 0 ? `+${change}` : change}
        </div>
      )}
    </motion.div>
  );
};
