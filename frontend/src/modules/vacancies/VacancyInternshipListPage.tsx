import { observer } from "mobx-react-lite";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { useEffect } from "react";
import { vacanciesStore } from "./vacanciesStore";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { VacancyInternshipListItem } from "./VacancyInternshipListItem";
import { AvatarImage } from "../../components/AvatarImage";
import { getFileSrc } from "../../api";
import { catalogStore } from "../catalog/catalogStore";

export const VacancyInternshipListPage = observer(() => {
  const { internships, internShipFilters } = vacanciesStore;

  const { allUniversities } = catalogStore;

  const { search, companyId } = internShipFilters;

  const selectedCompany = companyId ? [companyId] : [];

  useEffect(() => {
    vacanciesStore.fetchInternships();
  }, []);

  return (
    <div className="flex flex-col gap-4 flex-1 h-full">
      <div className="flex flex-row justify-between items-center">
        <div className="text-3xl font-medium">Стажировки</div>
      </div>
      <div className="flex flex-row justify-between items-end gap-4">
        <Input
          isClearable
          onClear={() => vacanciesStore.setInternshipFilter("search", "")}
          value={search}
          onChange={(e) =>
            vacanciesStore.setInternshipFilter("search", e.target.value)
          }
          placeholder="Поиск"
          startContent={
            <MagnifyingGlassIcon className="w-5 h-5 text-default-400 pointer-events-none shrink-0" />
          }
        />
        <Select
          placeholder="Компания"
          className="w-sm"
          selectedKeys={selectedCompany}
          onSelectionChange={([value]) => {
            vacanciesStore.setInternshipFilter("companyId", value as string);
          }}
        >
          {allUniversities.map((university) => (
            <SelectItem key={university.id} textValue={university.name}>
              <div className="flex gap-2 items-center">
                <AvatarImage
                  name={university.name}
                  width={16}
                  height={16}
                  avatar={getFileSrc(university.logoUrl)}
                />
                <div className="flex flex-col">
                  <span className="text-small">{university.name}</span>
                </div>
              </div>
            </SelectItem>
          ))}
        </Select>
        <Button onPress={() => vacanciesStore.resetInternshipFilters()}>
          Очистить
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full overflow-y-auto">
        {internships.map((internship) => (
          <VacancyInternshipListItem
            key={internship.id}
            internship={internship}
          />
        ))}
      </div>
    </div>
  );
});
