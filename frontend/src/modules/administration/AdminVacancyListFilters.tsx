import { FunnelIcon } from "@heroicons/react/24/outline";
import {
  Badge,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectItem,
} from "@heroui/react";
import { observer } from "mobx-react-lite";
import { VacancyStatus } from "../../types/rootTypes";
import { adminStore } from "./adminStore";

const statuses = [
  {
    value: VacancyStatus.Active,
    label: "Активные",
  },
  {
    value: VacancyStatus.Moderation,
    label: "На модерации",
  },
  {
    value: VacancyStatus.Rejected,
    label: "Отклонены",
  },
  {
    value: VacancyStatus.Closed,
    label: "Закртые",
  },
];

export const AdminVacancyListFilters = observer(() => {
  const { hasFilterChanges } = adminStore;
  const { status } = adminStore.filters;

  const selectedStatus = status ? [status] : [];

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
          className="shrink-0"
          label="Статус"
          selectedKeys={selectedStatus}
          selectionMode="single"
          onSelectionChange={(keys) => {
            const next = Array.from(keys)[0];

            console.log(next);

            adminStore.setFilterFiled("status", next as VacancyStatus);
          }}
        >
          {statuses.map((status) => (
            <SelectItem key={status.value}>{status.label}</SelectItem>
          ))}
        </Select>

        <Button className="w-full" onPress={() => adminStore.resetFilters()}>
          Сбросить фильтры
        </Button>
      </PopoverContent>
    </Popover>
  );
});
