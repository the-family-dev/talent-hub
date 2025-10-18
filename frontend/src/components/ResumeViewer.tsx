import { observer } from "mobx-react-lite";
import { Chip, Divider, User } from "@heroui/react";
import ReactMarkdown from "react-markdown";
import type { ExperienceLevel } from "../types/rootTypes";
import SalaryRange from "./SalaryRange";
import { OpenPdfButton } from "./OpenPdfButton";
import { ExperienceLevelLabel } from "./ExperienceLevelLabel";
import {
  ChatBubbleOvalLeftIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { LabelWithIcon } from "./LabelWithIcon";
import { getFileSrc } from "../api";
import type { TVacancyApplicationUser } from "../api/companyVacanciesApi";

export const ResumeViewer = observer<{
  title: string;
  description?: string;
  tags: string[];
  salaryFrom?: number;
  salaryTo?: number;
  location?: string;
  pdfUrl?: string;
  experienceLevel?: ExperienceLevel;
  user?: TVacancyApplicationUser;
}>((props) => {
  const {
    title,
    description,
    tags,
    salaryFrom,
    salaryTo,
    location,
    pdfUrl,
    experienceLevel,
    user,
  } = props;

  return (
    <div className="flex flex-col gap-4">
      <div className="text-3xl font-medium flex-1">{title}</div>
      <div className="flex flex-row gap-6 items-center w-full">
        {user ? (
          <User
            avatarProps={{
              src: getFileSrc(user.avatarUrl),
            }}
            name={user.name}
          />
        ) : null}

        {user ? (
          <div className="flex flex-row gap-4 items-center">
            {user.phone && (
              <LabelWithIcon
                label={user.phone}
                icon={PhoneIcon}
                isCopied={true}
              />
            )}
            {user.phone && (user.telegram || user.email) && (
              <Divider className="h-6" orientation="vertical" />
            )}
            {user.telegram && (
              <LabelWithIcon
                label={user.telegram}
                icon={ChatBubbleOvalLeftIcon}
                isCopied={true}
              />
            )}
            {user.email && user.telegram && (
              <Divider className="h-6" orientation="vertical" />
            )}
            {user.email && (
              <LabelWithIcon
                label={user.email}
                icon={EnvelopeIcon}
                isCopied={true}
              />
            )}
          </div>
        ) : null}
        <OpenPdfButton pdfUrl={pdfUrl} />
      </div>
      <SalaryRange salaryFrom={salaryFrom} salaryTo={salaryTo} />
      <div className="flex flex-row gap-2 items-center flex-wrap">
        {location && (
          <div className="flex items-center font-semibold text-default-500">
            <MapPinIcon className="size-6 mr-1" />
            {location}
          </div>
        )}
        {experienceLevel && (
          <ExperienceLevelLabel experienceLevel={experienceLevel} />
        )}
        {tags?.map((tag) => {
          return <Chip color={"default"}>{tag}</Chip>;
        })}
      </div>

      {description && (
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <ReactMarkdown>{description}</ReactMarkdown>
        </div>
      )}
    </div>
  );
});
