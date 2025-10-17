import { observer } from "mobx-react-lite";
import { Chip } from "@heroui/react";
import ReactMarkdown from "react-markdown";
import type { ExperienceLevel } from "../types/rootTypes";
import SalaryRange from "./SalaryRange";
import { OpenPdfButton } from "./OpenPdfButton";

export const ResumeViewer = observer<{
  title: string;
  description?: string;
  tags: string[];
  salaryFrom?: number;
  salaryTo?: number;
  location?: string;
  pdfUrl?: string;
  experienceLevel?: ExperienceLevel;
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
  } = props;

  return (
    <div className="flex flex-col gap-4">
      <div className="text-3xl font-bold flex-1">{title}</div>

      <div className="flex flex-row gap-4">
        <SalaryRange salaryFrom={salaryFrom} salaryTo={salaryTo} />
        {location && <div>{location}</div>}
        {experienceLevel && <div>{experienceLevel}</div>}
      </div>
      <OpenPdfButton pdfUrl={pdfUrl} />

      <div className="flex flex-row gap-2">
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
