import React from "react";
import { motion } from "framer-motion";
import { Card, CardBody, CardHeader } from "@heroui/react";

interface WordFrequencyDashboardProps {
  /** Объект вида { слово: количество_встреч } */
  data: Record<string, number>;
  /** Максимальный размер шрифта */
  maxFontSize?: number;
  /** Минимальный размер шрифта */
  minFontSize?: number;
}

const WordFrequencyDashboard: React.FC<WordFrequencyDashboardProps> = ({
  data,
  maxFontSize = 48,
  minFontSize = 14,
}) => {
  if (!data || Object.keys(data).length === 0) {
    return (
      <Card className="w-full max-w-xl mx-auto mt-10 shadow-lg">
        <CardHeader>Частота слов</CardHeader>
        <CardBody>
          <p className="text-center text-defult-500">
            Нет данных для отображения.
          </p>
        </CardBody>
      </Card>
    );
  }

  const maxCount = Math.max(...Object.values(data));
  const minCount = Math.min(...Object.values(data));

  // Функция для вычисления размера шрифта
  const getFontSize = (count: number) => {
    if (maxCount === minCount) return (maxFontSize + minFontSize) / 2;
    return (
      minFontSize +
      ((count - minCount) / (maxCount - minCount)) * (maxFontSize - minFontSize)
    );
  };

  return (
    <Card className="w-full mt-0 p-4 shadow-lg">
      <CardHeader className="text-lg font-medium">Популярные теги</CardHeader>
      <CardBody>
        <div className="flex flex-wrap justify-center gap-3">
          {Object.entries(data).map(([word, count]) => (
            <motion.span
              key={word}
              whileHover={{ scale: 1.2 }}
              className="text-gray-600 font-semibold cursor-pointer select-none"
              style={{
                fontSize: `${getFontSize(count)}px`,
              }}
            >
              {word}
            </motion.span>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default WordFrequencyDashboard;
