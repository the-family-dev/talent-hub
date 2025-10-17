import { observer } from "mobx-react-lite";
import { Input } from "@heroui/react";
import { useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { vacanciesNoauthStore } from "./vacanciesNoauthStore";
import { VacancyListItemNoauth } from "./VacancyListItemNoauth";
import { VacancyNoauthListFilters } from "./VacancyNoauthListFilters";

export const VacanciesNoauthListPage = observer(() => {
  const { vacancies, filters } = vacanciesNoauthStore;

  const { search } = filters;

  useEffect(() => {
    vacanciesNoauthStore.fetchNoauthVacancies();
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
            onClear={() => vacanciesNoauthStore.setFilterValue("search", "")}
            value={search}
            onChange={(e) =>
              vacanciesNoauthStore.setFilterValue("search", e.target.value)
            }
            placeholder="Поиск"
            startContent={
              <MagnifyingGlassIcon className="w-5 h-5 text-default-400 pointer-events-none shrink-0" />
            }
          />
          <VacancyNoauthListFilters />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full overflow-y-auto">
          {vacancies.map((vacancy) => (
            <VacancyListItemNoauth key={vacancy.id} vacancy={vacancy} />
          ))}
        </div>
      </div>
    </>
  );
});
