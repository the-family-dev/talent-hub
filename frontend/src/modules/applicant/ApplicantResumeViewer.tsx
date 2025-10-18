import { observer } from "mobx-react-lite";
import { Chip } from "@heroui/react";
import ReactMarkdown from "react-markdown";
import type { TApplicantResume } from "../../api/applicantResumeApi";
import { OpenPdfButton } from "../../components/OpenPdfButton";
import SalaryRange from "../../components/SalaryRange";
import { ExperienceLevelLabel } from "../../components/ExperienceLevelLabel";
import { MapPinIcon } from "@heroicons/react/24/outline";

// TODO replace from frontend\src\components\ResumeViewer.tsx
export const ApplicantResumeViewer = observer<{
  resume: TApplicantResume;
}>(({ resume }) => {
  const {
    title,
    description,
    tags,
    salaryFrom,
    salaryTo,
    location,
    pdfUrl,
    experienceLevel,
  } = resume;

  return (
    <div className="flex flex-col gap-4">
      <div className="text-2xl font-medium flex-1">{title}</div>
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
        <OpenPdfButton pdfUrl={pdfUrl} />
      </div>
      {description && (
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <ReactMarkdown>{description}</ReactMarkdown>
        </div>
      )}
    </div>
  );
});
