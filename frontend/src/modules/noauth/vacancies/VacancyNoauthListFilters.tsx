import { FunnelIcon } from "@heroicons/react/24/outline";
import {
  Badge,
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectItem,
} from "@heroui/react";
import { observer } from "mobx-react-lite";
import { catalogStore } from "../../catalog/catalogStore";
import { vacanciesNoauthStore } from "./vacanciesNoauthStore";
import { AvatarImage } from "../../../components/AvatarImage";
import { getFileSrc } from "../../../api";

export const VacancyNoauthListFilters = observer(() => {
  const { allTags, allCompanies } = catalogStore;
  const { hasFilterChanges } = vacanciesNoauthStore;

  const { tags, location, companyId } = vacanciesNoauthStore.filters;

  const selectedCompany = companyId ? [companyId] : [];

  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <Button
          className="shrink-0"
          variant="bordered"
          startContent={
            <Badge
              size="sm"
              color="primary"
              isOneChar
              shape="circle"
              isInvisible={!hasFilterChanges}
            >
              <FunnelIcon className="size-5" />
            </Badge>
          }
        >
          Фильтры
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-2 flex flex-col gap-2 w-[300px]">
        <Select
          label="Теги"
          placeholder="Выберите тег"
          selectionMode="multiple"
          selectedKeys={tags}
          onSelectionChange={(keys) => {
            const value = Array.from(keys);

            if (value.length === 0) {
              vacanciesNoauthStore.setFilterValue("tags", undefined);

              return;
            }
            vacanciesNoauthStore.setFilterValue("tags", value as string[]);
          }}
        >
          {allTags.map((item) => (
            <SelectItem key={item.name}>{item.name}</SelectItem>
          ))}
        </Select>
        <Select
          label="Компании"
          placeholder="Выберите компанию"
          selectedKeys={selectedCompany}
          onSelectionChange={([value]) => {
            vacanciesNoauthStore.setFilterValue("companyId", value as string);
          }}
        >
          {allCompanies.map((company) => (
            <SelectItem key={company.id} textValue={company.name}>
              <div className="flex gap-2 items-center">
                <AvatarImage
                  name={company.name}
                  width={16}
                  height={16}
                  avatar={getFileSrc(company.logoUrl)}
                />
                <div className="flex flex-col">
                  <span className="text-small">{company.name}</span>
                </div>
              </div>
            </SelectItem>
          ))}
        </Select>
        <Input
          value={location}
          onChange={(e) => {
            vacanciesNoauthStore.setFilterValue("location", e.target.value);
          }}
          placeholder="Город"
        />

        <Button
          className="w-full"
          onPress={() => vacanciesNoauthStore.resetFilters()}
        >
          Сбросить фильтры
        </Button>
      </PopoverContent>
    </Popover>
  );
});
