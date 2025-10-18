import { observer } from "mobx-react-lite";
import { Chip } from "@heroui/react";
import ReactMarkdown from "react-markdown";
import type { TApplicantResume } from "../../api/applicantResumeApi";
import { OpenPdfButton } from "../../components/OpenPdfButton";
import SalaryRange from "../../components/SalaryRange";

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
      <div className="text-3xl font-bold flex-1">{title}</div>

      <div className="flex flex-row gap-4 flex-wrap">
        <SalaryRange salaryFrom={salaryFrom} salaryTo={salaryTo} />
        {location && <div>{location}</div>}
        {experienceLevel && <div>{experienceLevel}</div>}
      </div>
      <OpenPdfButton pdfUrl={pdfUrl} />

      <div className="flex flex-row gap-2 flex-wrap">
        {tags.map((tag, index) => (
          <Chip color="secondary" key={index}>
            {tag}
          </Chip>
        ))}
      </div>

      {description && (
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <ReactMarkdown>{description}</ReactMarkdown>
        </div>
      )}
    </div>
  );
});
