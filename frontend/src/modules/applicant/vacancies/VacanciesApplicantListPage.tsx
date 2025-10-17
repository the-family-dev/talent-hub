import { observer } from "mobx-react-lite";
import { Input } from "@heroui/react";
import { useEffect } from "react";
import { vacanciesApplicantStore } from "./vacanciesApplicantStore";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { VacancyListItemApplicant } from "./VacancyListItemApplicant";
import { VacancyApplicantListFilters } from "./VacancyApplicantListFilters";

export const VacanciesApplicantListPage = observer(() => {
  const { vacancies, filters } = vacanciesApplicantStore;

  const { search } = filters;

  useEffect(() => {
    vacanciesApplicantStore.fetchApplicantVacancies();
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
            onClear={() => vacanciesApplicantStore.setFilterValue("search", "")}
            value={search}
            onChange={(e) =>
              vacanciesApplicantStore.setFilterValue("search", e.target.value)
            }
            placeholder="Поиск"
            startContent={
              <MagnifyingGlassIcon className="w-5 h-5 text-default-400 pointer-events-none shrink-0" />
            }
          />
          <VacancyApplicantListFilters />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full overflow-y-auto">
          {vacancies.map((vacancy) => (
            <VacancyListItemApplicant key={vacancy.id} vacancy={vacancy} />
          ))}
        </div>
      </div>
    </>
  );
});
