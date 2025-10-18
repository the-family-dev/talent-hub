import { motion } from "framer-motion";
import { ApplicationsLineChart } from "./statistics/ApplicationsLineChart";
import { ApplicationsPieChart } from "./statistics/ApplicationsPieChart";
import { CompaniesBarChart } from "./statistics/CompaniesBarChart";
import { KpiCard } from "./statistics/KpiCard";
import { statisticsStore } from "./statistics/statisticsStore";
import WordFrequencyDashboard from "./statistics/WordFrequencyDashboard";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

export const AdminAnalyticsPage = observer(() => {
  const stats = statisticsStore;

  // Функция для анимации появления элементов с задержкой
  const fadeInUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transition: { delay, duration: 0.6, ease: "easeOut" as any },
  });

  useEffect(() => {
    statisticsStore.getDashboardData();
  }, []);

  return (
    <div>
      <div className="text-2xl font-semibold">Статистика</div>
      <div className="mx-auto pt-6 space-y-6">
        {/* KPI карточки */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div {...fadeInUp(0.3)}>
            <KpiCard title="Всего вакансий" value={stats.totalVacancies} />
          </motion.div>
          <motion.div {...fadeInUp(0.1)}>
            <KpiCard title="Всего резюме" value={stats.totalResumes} />
          </motion.div>
          <motion.div {...fadeInUp(0.2)}>
            <KpiCard title="Всего откликов" value={stats.totalApplications} />
          </motion.div>
          <motion.div {...fadeInUp(0.3)}>
            <KpiCard title="Устроены на работу" value={stats.hiredCount} />
          </motion.div>
        </div>

        {/* Основные графики */}
        <motion.div {...fadeInUp(0.4)}>
          <ApplicationsLineChart
            data={stats.applicationsOverTime}
            title="Динамика откликов"
          />
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div {...fadeInUp(0.5)}>
            <CompaniesBarChart
              data={stats.topCompanies}
              title="Топ компаний по откликам"
            />
          </motion.div>
          <motion.div {...fadeInUp(0.6)}>
            <ApplicationsPieChart
              data={stats.applicationStatuses}
              title="Статусы откликов"
            />
          </motion.div>
        </div>
        <motion.div {...fadeInUp(0.7)}>
          <WordFrequencyDashboard
            data={stats.tagFrequencies}
            maxFontSize={48}
            minFontSize={14}
          />
        </motion.div>
      </div>
    </div>
  );
});
