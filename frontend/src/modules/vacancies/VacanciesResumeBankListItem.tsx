import { observer } from "mobx-react-lite";
import { Card, CardBody, CardFooter, CardHeader, Chip } from "@heroui/react";
import { getFileSrc } from "../../api";
import { CalendarDaysIcon, MapPinIcon } from "@heroicons/react/24/outline";
import type { TResumeBankListItem } from "../../api/companyVacanciesApi";
import dayjs from "dayjs";
import { AvatarImage } from "../../components/AvatarImage";
import { ExperienceLevelLabel } from "../../components/ExperienceLevelLabel";
import SalaryRange from "../../components/SalaryRange";
import { OpenPdfButton } from "../../components/OpenPdfButton";

export const VacanciesResumeBankListItem = observer<{
  resume: TResumeBankListItem;
}>(({ resume }) => {
  const {
    title,
    salaryFrom,
    salaryTo,
    location,
    pdfUrl,
    experienceLevel,
    createdAt,
    updatedAt,
    tags,
    user,
  } = resume;

  return (
    <Card className="shrink-0 m-[1px]">
      <CardHeader className="flex flex-row justify-between">
        <div className="font-medium text-xl">{title}</div>
        {experienceLevel && (
          <ExperienceLevelLabel experienceLevel={experienceLevel} />
        )}
      </CardHeader>

      <CardBody className="flex flex-column gap-4">
        <SalaryRange salaryFrom={salaryFrom} salaryTo={salaryTo} />
        <div className="flex flex-row gap-2 items-center">
          <div className="flex flex-row gap-2 items-center">
            <AvatarImage
              name={user?.name}
              width={32}
              height={32}
              avatar={user?.avatarUrl ? getFileSrc(user?.avatarUrl) : undefined}
            />
            <div className="font-medium text-x2">{user?.name}</div>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          {location && (
            <div className="flex items-center font-semibold text-default-500">
              <MapPinIcon className="size-6 mr-1" />
              {location}
            </div>
          )}
          <div className="flex items-center font-semibold text-default-500">
            <CalendarDaysIcon className="size-6 mr-1" />
            от {dayjs(createdAt).format("DD.MM.YYYY")}
            {updatedAt && updatedAt !== createdAt && (
              <div className="flex items-center font-semibold text-default-500">
                {", изменено "}
                {dayjs(updatedAt).format("DD.MM.YYYY")}
              </div>
            )}
          </div>
        </div>
        {tags && Boolean(tags?.length) && (
          <div className="flex flex-row gap-2 flex-wrap">
            {tags?.map((tag) => {
              return <Chip color={"default"}>{tag?.tag?.name}</Chip>;
            })}
          </div>
        )}
      </CardBody>

      <CardFooter className="flex flex-row justify-start gap-2">
        <OpenPdfButton pdfUrl={pdfUrl} />
      </CardFooter>
    </Card>
  );
});
