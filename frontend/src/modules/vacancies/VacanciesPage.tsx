import { observer } from "mobx-react-lite";
import { Button, Input } from "@heroui/react";
import { useEffect } from "react";
import { vacanciesStore } from "./vacanciesStore";
import { CreateVacancyModal } from "./CreateVacancyModal";
import { VacancyListItem } from "./VacancyListItem";

export const VacanciesPage = observer(() => {
  const { vacancies, filters } = vacanciesStore;

  const { search } = filters;

  useEffect(() => {
    vacanciesStore.fetchVacancies();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4 flex-1 h-full">
        <div className="flex flex-row justify-between items-end">
          <div className="text-3xl font-medium">Вакансии</div>
        </div>
        <div className="flex flex-row justify-between items-end gap-4">
          <Input
            isClearable
            onClear={() => vacanciesStore.setFilterSearch("")}
            value={search}
            onChange={(e) => vacanciesStore.setFilterSearch(e.target.value)}
            placeholder="Поиск"
          />
          <Button
            color="secondary"
            onPress={() => vacanciesStore.setCreateModalOpen(true)}
          >
            Создать
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full overflow-y-auto">
          {vacancies.map((vacancy) => (
            <VacancyListItem key={vacancy.id} vacancy={vacancy} />
          ))}
        </div>
      </div>
      <CreateVacancyModal />
    </>
  );
});
