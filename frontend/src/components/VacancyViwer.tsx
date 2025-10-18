import { observer } from "mobx-react-lite";
import ReactMarkdown from "react-markdown";
import { Chip } from "@heroui/react";
import { CalendarDaysIcon, MapPinIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import type {
  EmploymentType,
  ExperienceLevel,
  VacancyStatus,
} from "../types/rootTypes";
import SalaryRange from "./SalaryRange";
import { EmploymentTypeLabel } from "./EmploymentTypeLabel";
import { LabelWithIcon } from "./LabelWithIcon";
import { ExperienceLevelLabel } from "./ExperienceLevelLabel";
import { AvatarImage } from "./AvatarImage";
import { getFileSrc } from "../api";
import { VacancyStatusLabel } from "./VacancyStatusLablel";
import { PdfFile } from "./PdfFile";

export const VacancyViwer = observer<{
  title: string;
  description?: string;
  tags: string[];
  salaryFrom?: number;
  salaryTo?: number;
  location?: string;
  pdfUrls?: string[];
  experienceLevel?: ExperienceLevel;
  employmentType?: EmploymentType;
  createdAt?: string;
  isRemote?: boolean;
  status?: VacancyStatus;
  company?: {
    name: string;
    logoUrl?: string;
  };
}>((props) => {
  const {
    location,
    salaryFrom,
    salaryTo,
    title,
    createdAt,
    tags,
    isRemote,
    experienceLevel,
    employmentType,
    description,
    company,
    status,
    pdfUrls,
  } = props;

  return (
    <div className="flex flex-col gap-4">
      <div className="text-3xl font-medium flex-1">{title}</div>
      <SalaryRange salaryFrom={salaryFrom} salaryTo={salaryTo} />
      <div className="flex flex-row gap-2">
        {status ? <VacancyStatusLabel status={status} /> : null}
        {experienceLevel ? (
          <ExperienceLevelLabel experienceLevel={experienceLevel} />
        ) : null}

        {employmentType ? (
          <EmploymentTypeLabel employmentType={employmentType} />
        ) : null}

        {isRemote && (
          <Chip color={"default"} variant="bordered">
            Можно удаленно
          </Chip>
        )}
        {tags?.map((tag) => {
          return <Chip color={"default"}>{tag}</Chip>;
        })}
      </div>
      <div className="flex flex-row gap-2 items-center">
        {company ? (
          <div className="flex flex-row gap-2 items-center">
            <AvatarImage
              name={company.name}
              width={36}
              height={36}
              avatar={getFileSrc(company.logoUrl)}
            />
            <div className="font-medium text-l">{company.name}</div>
          </div>
        ) : null}
        {location ? <LabelWithIcon label={location} icon={MapPinIcon} /> : null}
        {createdAt ? (
          <LabelWithIcon
            label={`от ${dayjs(createdAt).format("DD.MM.YYYY")}`}
            icon={CalendarDaysIcon}
          />
        ) : null}
      </div>
      {pdfUrls ? (
        <div className="flex flex-col gap-2">
          {pdfUrls.map((pdfUrl, index) => {
            return (
              <PdfFile
                key={index}
                name={pdfUrl.split("/").pop() ?? "Без названия"}
                url={pdfUrl}
              />
            );
          })}
        </div>
      ) : null}
      <div className="prose prose-lg max-w-none dark:prose-invert">
        <ReactMarkdown>{description}</ReactMarkdown>
      </div>
    </div>
  );
});
