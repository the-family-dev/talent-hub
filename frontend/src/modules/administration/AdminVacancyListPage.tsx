import { observer } from "mobx-react-lite";
import { Input } from "@heroui/react";
import { useEffect } from "react";
import { adminStore } from "./adminStore";
import { AdminVacancyListItem } from "./AdminVacancyListItem";

export const AdminVacancyListPage = observer(() => {
  const { vacancies, filters } = adminStore;

  const { search } = filters;

  useEffect(() => {
    adminStore.getVacancyList();
  }, []);

  return (
    <div className="flex flex-col gap-4 flex-1 h-full">
      <div className="flex flex-row justify-between items-end">
        <div className="text-3xl font-medium">Вакансии</div>
      </div>
      <div className="flex flex-row justify-between items-end gap-4">
        <Input
          isClearable
          onClear={() => adminStore.setFilterFiled("search", "")}
          value={search}
          onChange={(e) => adminStore.setFilterFiled("search", e.target.value)}
          placeholder="Поиск"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full overflow-y-auto">
        {vacancies.map((vacancy) => (
          <AdminVacancyListItem key={vacancy.id} vacancy={vacancy} />
        ))}
      </div>
    </div>
  );
});
