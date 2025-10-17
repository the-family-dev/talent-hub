import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router";
import ReactMarkdown from "react-markdown";
import { Button, Chip } from "@heroui/react";
import {
  ArrowLeftIcon,
  CalendarDaysIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { vacanciesApplicantStore } from "./vacanciesApplicantStore";
import { routerStore } from "../../router/routerStore";
import SalaryRange from "../../../components/SalaryRange";
import { EmploymentTypeLabel } from "../../../types/rootTypes";
import { AvatarImage } from "../../../components/AvatarImage";
import { getFileSrc } from "../../../api";
import dayjs from "dayjs";

export const VacancyPageApplicant = observer(() => {
  const { id: pageId } = useParams<{ id: string }>();

  const { selectedVacancy } = vacanciesApplicantStore;

  useEffect(() => {
    vacanciesApplicantStore.fetchVacancyById(pageId);
  }, [pageId]);

  if (selectedVacancy === undefined) return null;

  const {
    location,
    salaryFrom,
    salaryTo,
    title,
    createdAt,
    company,
    tags,
    isRemote,
    experienceLevel,
    employmentType,
    description,
  } = selectedVacancy;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-2 items-center">
          <AvatarImage
            name={company.name}
            width={48}
            height={48}
            avatar={company?.logoUrl ? getFileSrc(company?.logoUrl) : undefined}
          />
          <div className="font-medium text-2xl">{company.name}</div>
        </div>

        <div className="flex flex-row justify-end gap-4">
          <Button size="md" variant="solid" color="primary">
            Отклинуться
          </Button>

          <Button
            color="default"
            onPress={() => routerStore.navigate?.("/applicant/vacancy")}
            size="md"
          >
            <ArrowLeftIcon className="size-4" /> Назад
          </Button>
        </div>
      </div>
      <div className="text-3xl font-bold flex-1">{title}</div>

      <SalaryRange salaryFrom={salaryFrom} salaryTo={salaryTo} />

      <div className="flex flex-row gap-2">
        <Chip color={"primary"} variant="flat" className="font-semibold">
          {experienceLevel}
        </Chip>
        {tags?.map((tag) => {
          return <Chip color={"default"}>{tag}</Chip>;
        })}
        <Chip color={"default"} variant="bordered">
          {EmploymentTypeLabel[employmentType]}
        </Chip>

        {isRemote && (
          <Chip color={"default"} variant="bordered">
            Можно удаленно
          </Chip>
        )}
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
      <div className="prose prose-lg max-w-none dark:prose-invert">
        <ReactMarkdown>{description}</ReactMarkdown>
      </div>
    </div>
  );
});
