import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
} from "@heroui/react";
import { observer } from "mobx-react-lite";
import { CalendarDaysIcon, MapPinIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import SalaryRange from "../../../components/SalaryRange";
import { AvatarImage } from "../../../components/AvatarImage";
import { getFileSrc } from "../../../api";
import { routerStore } from "../../router/routerStore";
import type { IApplicantVacancy } from "../../../types/vacancyTypes";
import { EmploymentTypeLabel } from "../../../components/EmploymentTypeLabel";
import { vacanciesNoauthStore } from "./vacanciesNoauthStore";

export const VacancyListItemNoauth = observer<{
  vacancy: IApplicantVacancy;
}>((props) => {
  const { vacancy } = props;
  const {
    location,
    salaryFrom,
    salaryTo,
    title,
    createdAt,
    id,
    company,
    tags,
    isRemote,
    experienceLevel,
    employmentType,
  } = vacancy;

  return (
    <Card className="shrink-0 m-[1px]">
      <CardHeader className="flex flex-row justify-between">
        <div className="font-medium text-xl">{title}</div>

        <Chip color={"primary"} variant="flat" className="font-semibold">
          {experienceLevel}
        </Chip>
      </CardHeader>

      <CardBody className="flex flex-column gap-4">
        <SalaryRange salaryFrom={salaryFrom} salaryTo={salaryTo} />

        <div className="flex flex-row gap-2">
          {tags?.map((tag) => {
            return <Chip color={"default"}>{tag}</Chip>;
          })}
        </div>

        <div className="flex flex-row gap-2">
          <EmploymentTypeLabel employmentType={employmentType} />

          {isRemote && (
            <Chip color={"default"} variant="bordered">
              Можно удаленно
            </Chip>
          )}
        </div>

        <div className="flex flex-row gap-2 items-center">
          <AvatarImage
            name={company.name}
            width={32}
            height={32}
            avatar={company.logoUrl ? getFileSrc(company.logoUrl) : undefined}
          />
          <div className="font-medium text-x2">{company.name}</div>
        </div>

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

      <CardFooter className="flex flex-row justify-start gap-2">
        <Button
          onPress={() => {
            vacanciesNoauthStore.selectVacancyForRespond(vacancy);
          }}
          size="md"
          variant="solid"
          color="primary"
        >
          Откликнуться
        </Button>
        <Button
          onPress={() => routerStore.navigate?.(`/vacancy/${id}`)}
          size="md"
          variant="light"
          color="secondary"
        >
          Подробнее
        </Button>
      </CardFooter>
    </Card>
  );
});
