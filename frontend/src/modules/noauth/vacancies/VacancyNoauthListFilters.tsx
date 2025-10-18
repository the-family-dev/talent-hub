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

export const VacancyNoauthListFilters = observer(() => {
  const { allTags } = catalogStore;
  const { hasFilterChanges } = vacanciesNoauthStore;

  const { tags, location } = vacanciesNoauthStore.filters;

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

            console.log(value);

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
