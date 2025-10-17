import { observer } from "mobx-react-lite";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";
import { useEffect } from "react";
import { vacanciesApplicantStore } from "./vacanciesApplicantStore";
import { VacancyListItem } from "../../vacancies/VacancyListItem";
import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export const VacanciesApplicantListPage = observer(() => {
  const { vacancies, filters } = vacanciesApplicantStore;

  const { search, companyId, tags } = filters;

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
            onClear={() => vacanciesApplicantStore.setFilterSearch("")}
            value={search}
            onChange={(e) =>
              vacanciesApplicantStore.setFilterSearch(e.target.value)
            }
            placeholder="Поиск"
            startContent={
              <MagnifyingGlassIcon className="w-5 h-5 text-default-400 pointer-events-none shrink-0" />
            }
          />
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button
                variant="bordered"
                startContent={<FunnelIcon className="w-7 h-7" />}
              >
                Фильтры
              </Button>
            </DropdownTrigger>

            <DropdownMenu
              aria-label="Фильтры вакансий"
              className="w-64 p-2"
              closeOnSelect={false}
            >
              <DropdownItem isReadOnly key={""}>
                <div className="flex flex-col gap-3 p-1">
                  <Select
                    label="Компания"
                    selectedKeys={companyId ? [companyId] : []}
                    onSelectionChange={(keys) =>
                      vacanciesApplicantStore.setFilterCompanyId(
                        (Array.from(keys)[0] as string) || ""
                      )
                    }
                    size="sm"
                  >
                    <SelectItem key="1">Компания 1</SelectItem>
                    <SelectItem key="2">Компания 2</SelectItem>
                  </Select>

                  <Select
                    label="Теги"
                    selectedKeys={tags}
                    onSelectionChange={(keys) =>
                      vacanciesApplicantStore.setFilterTags(
                        Array.from(keys) as string[]
                      )
                    }
                    size="sm"
                  >
                    <SelectItem key="redux">Redux</SelectItem>
                    <SelectItem key="react">React</SelectItem>
                  </Select>

                  <Button
                    color="primary"
                    size="sm"
                    onPress={() => vacanciesApplicantStore.clearFilters()}
                  >
                    Сбросить фильтры
                  </Button>
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full overflow-y-auto">
          {vacancies.map((vacancy) => (
            <VacancyListItem key={vacancy.id} vacancy={vacancy} />
          ))}
        </div>
      </div>
    </>
  );
});
