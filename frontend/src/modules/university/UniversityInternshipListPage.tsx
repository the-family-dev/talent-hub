import { observer } from "mobx-react-lite";
import { Button, Input } from "@heroui/react";
import { useEffect } from "react";
import { routerStore } from "../router/routerStore";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import { universityStore } from "./universityStore";
import { UniversityInternshipListItem } from "./UniversityInternshipListItem";

export const UniversityInternshipListPage = observer(() => {
  const { internships, filters } = universityStore;

  const { search } = filters;

  useEffect(() => {
    universityStore.fetchInternships();
  }, []);

  return (
    <div className="flex flex-col gap-4 flex-1 h-full">
      <div className="flex flex-row justify-between items-center">
        <div className="text-3xl font-medium">Стажировки</div>
        <Button
          color="primary"
          onPress={() =>
            routerStore.navigate?.("/university/internship/create")
          }
          className="flex flex-row items-center"
        >
          <PlusIcon className="w-5 h-5 pointer-events-none shrink-0" />
          Добавить
        </Button>
      </div>
      <div className="flex flex-row justify-between items-end gap-4">
        <Input
          isClearable
          onClear={() => universityStore.setInternshipFilterField("search", "")}
          value={search}
          onChange={(e) =>
            universityStore.setInternshipFilterField("search", e.target.value)
          }
          placeholder="Поиск"
          startContent={
            <MagnifyingGlassIcon className="w-5 h-5 text-default-400 pointer-events-none shrink-0" />
          }
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full overflow-y-auto">
        {internships.map((internship) => (
          <UniversityInternshipListItem
            key={internship.id}
            vacancy={internship}
          />
        ))}
      </div>
    </div>
  );
});
