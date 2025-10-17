import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
} from "@heroui/react";
import { observer } from "mobx-react-lite";
import type { IListVacancy } from "../../api/vacanciesApi";
import { formatSalary } from "../../utils/utils";
import { CalendarDaysIcon, MapPinIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";

export const VacancyListItem = observer<{
  vacancy: IListVacancy;
}>((props) => {
  const { vacancy } = props;
  const { location, salary, title, isActive, createdAt } = vacancy;

  return (
    <Card className="shrink-0 m-[1px]">
      <CardHeader className="flex flex-row justify-between">
        <div className="font-medium text-xl">{title}</div>
        <Chip color={isActive ? "primary" : "default"}>
          {isActive ? "Активна" : "Неактивна"}
        </Chip>
      </CardHeader>
      <CardBody className="flex flex-row gap-4">
        <div className="flex items-center font-semibold text-default-500">
          {salary ? formatSalary(salary) : "Зарплата не указана"}
        </div>
        <div className="flex items-center font-semibold text-default-500">
          <MapPinIcon className="size-6 mr-1" />
          {location}
        </div>
        <div className="flex items-center font-semibold text-default-500">
          <CalendarDaysIcon className="size-6 mr-1" />
          от {dayjs(createdAt).format("DD.MM.YYYY")}
        </div>
      </CardBody>
      <CardFooter className="flex flex-row justify-end">
        <Button size="sm" variant="flat" color="primary">
          Подробнее
        </Button>
      </CardFooter>
    </Card>
  );
});
