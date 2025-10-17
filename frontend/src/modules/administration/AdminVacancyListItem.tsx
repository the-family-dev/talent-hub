import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
} from "@heroui/react";
import { observer } from "mobx-react-lite";
import type { ICompanyVacancyBase } from "../../api/companyVacanciesApi";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import { Link } from "react-router";
import { VacancyStatusLabel } from "../../components/VacancyStatusLablel";

export const AdminVacancyListItem = observer<{
  vacancy: ICompanyVacancyBase;
}>((props) => {
  const { vacancy } = props;
  const { title, isActive, createdAt, id, status } = vacancy;

  return (
    <Card className="shrink-0">
      <CardHeader className="flex flex-row justify-between">
        <div className="font-medium text-xl">{title}</div>
        <VacancyStatusLabel status={status} />
        <Chip color={isActive ? "primary" : "default"}>
          {isActive ? "Активна" : "Неактивна"}
        </Chip>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        {/* <User
          avatarProps={{
            src: getFileSrc(user.avatarUrl),
          }}
          name={user.name}
        /> */}

        <div className="flex items-center font-semibold text-default-500">
          <CalendarDaysIcon className="size-6 mr-1" />
          от {dayjs(createdAt).format("DD.MM.YYYY")}
        </div>
      </CardBody>
      <CardFooter className="flex flex-row justify-end">
        <Button as={Link} to={id} variant="flat" color="primary">
          Подробнее
        </Button>
      </CardFooter>
    </Card>
  );
});
