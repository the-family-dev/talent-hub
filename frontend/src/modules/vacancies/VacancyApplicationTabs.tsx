import { Tab, Tabs } from "@heroui/react";
import { observer } from "mobx-react-lite";
import { ApplicationStatus } from "../../types/rootTypes";
import { vacanciesStore } from "./vacanciesStore";

const tabs = [
  {
    value: "all",
    title: "Все",
  },
  {
    value: ApplicationStatus.Pending,
    title: "Новые",
  },
  {
    value: ApplicationStatus.Interview,
    title: "Собеседование",
  },

  {
    value: ApplicationStatus.Accepted,
    title: "Приглашение",
  },
  {
    value: ApplicationStatus.Rejected,
    title: "Отказ",
  },
];

export const VacancyApplicationTabs = observer(() => {
  const { status } = vacanciesStore.applicationFilters;

  const selectedKey = status ?? "all";

  return (
    <Tabs
      onSelectionChange={(key) =>
        vacanciesStore.setVacancyApplicationFilter(
          "status",
          key === "all" ? undefined : (key as ApplicationStatus)
        )
      }
      selectedKey={selectedKey}
    >
      {tabs.map((tab) => {
        return <Tab key={tab.value} title={tab.title} />;
      })}
    </Tabs>
  );
});
