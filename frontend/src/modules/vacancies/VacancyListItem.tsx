import { Button, Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import { observer } from "mobx-react-lite";
import type { ICompanyVacancyBase } from "../../api/companyVacanciesApi";
import { CalendarDaysIcon, MapPinIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import { Link } from "react-router";
import SalaryRange from "../../components/SalaryRange";
import { VacancyStatusLabel } from "../../components/VacancyStatusLablel";

export const VacancyListItem = observer<{
  vacancy: ICompanyVacancyBase;
}>((props) => {
  const { vacancy } = props;
  const { location, salaryFrom, salaryTo, title, createdAt, id, status } =
    vacancy;

  return (
    <Card className="shrink-0 m-[1px]">
      <CardHeader className="flex flex-row justify-between">
        <div className="font-medium text-xl">{title}</div>
        <VacancyStatusLabel status={status} />
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <SalaryRange salaryFrom={salaryFrom} salaryTo={salaryTo} />
        <div className="flex flex-row gap-2">
          <div className="flex items-center font-semibold text-default-500">
            <MapPinIcon className="size-6 mr-1" />
            {location}
          </div>
          <div className="flex items-center font-semibold text-default-500">
            <CalendarDaysIcon className="size-6 mr-1" />
            от {dayjs(createdAt).format("DD.MM.YYYY")}
          </div>
        </div>
      </CardBody>
      <CardFooter className="flex flex-row justify-end">
        <Button as={Link} to={id} size="md" variant="flat" color="primary">
          Подробнее
        </Button>
      </CardFooter>
    </Card>
  );
});
