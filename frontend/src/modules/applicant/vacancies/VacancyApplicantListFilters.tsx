import { FunnelIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectItem,
} from "@heroui/react";
import { observer } from "mobx-react-lite";

export const VacancyApplicantListFilters = observer(() => {
  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <Button
          className="shrink-0"
          variant="bordered"
          startContent={<FunnelIcon className="size-5" />}
        >
          Фильтры
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-2 flex flex-col gap-2 w-[300px]">
        <Select
          placeholder="test some"
          className="shrink-0"
          size="sm"
          label="Компания"
        >
          <SelectItem>sfsadfsad</SelectItem>
        </Select>
        <Select size="sm" label="Теги">
          <SelectItem>asdfsdf</SelectItem>
        </Select>
      </PopoverContent>
    </Popover>
  );
});
