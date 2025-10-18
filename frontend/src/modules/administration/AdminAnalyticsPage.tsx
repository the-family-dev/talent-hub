import WordFrequencyDashboard from "../../components/WordFrequencyDashboard";

export const AdminAnalyticsPage = () => {
  const wordData = {
    React: 15,
    TypeScript: 10,
    Tailwind: 25,
    Dashboard: 8,
    Компонент: 12,
    UI: 5,
  };

  return <WordFrequencyDashboard data={wordData} />;
};
