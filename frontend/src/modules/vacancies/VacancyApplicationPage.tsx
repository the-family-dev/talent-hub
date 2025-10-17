import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Button, Input } from "@heroui/react";
import { observer } from "mobx-react-lite";
import { routerStore } from "../router/routerStore";
import { vacanciesStore } from "./vacanciesStore";
import { VacancyApplicationItem } from "./VacancyApplicationItem";
import { VacancyApplicationTabs } from "./VacancyApplicationTabs";
export const VacancyApplicationPage = observer(() => {
  const { selectedVacancy, applicationFilters, filteredAplications } =
    vacanciesStore;

  if (selectedVacancy === undefined) return null;

  const { search } = applicationFilters;

  return (
    <div>
      <div className="flex flex-col gap-4">
        <Button
          color="primary"
          onPress={() => routerStore.navigate?.(-1)}
          className="w-min"
        >
          <ArrowLeftIcon className="size-6" /> Назад
        </Button>
        <div className="font-bold text-3xl">Просмотр откликов</div>
        <VacancyApplicationTabs />
        <Input
          value={search}
          onChange={(e) =>
            vacanciesStore.setVacancyApplicationFilter("search", e.target.value)
          }
          placeholder="Поиск по ФИО"
        />
        <div className="flex flex-col gap-4">
          {filteredAplications.map((application) => (
            <VacancyApplicationItem
              key={application.id}
              application={application}
            />
          ))}
        </div>
      </div>
    </div>
  );
});
