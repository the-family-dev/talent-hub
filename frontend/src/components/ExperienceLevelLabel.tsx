import { Chip } from "@heroui/react";
import { ExperienceLevel } from "../types/rootTypes";

const experienceTypeMap = {
  [ExperienceLevel.Intern]: {
    title: "Стажер",
    className: "text-primary",
  },
  [ExperienceLevel.Junior]: {
    title: "Junior",
    className: "text-primary",
  },
  [ExperienceLevel.Middle]: {
    title: "Middle",
    className: "text-primary",
  },
  [ExperienceLevel.Senior]: {
    title: "Senior",
    className: "text-primary",
  },
  [ExperienceLevel.Lead]: {
    title: "Руководитель",
    className: "text-primary",
  },
};

export const ExperienceLevelLabel = ({
  experienceLevel,
}: {
  experienceLevel: ExperienceLevel;
}) => {
  const typeInfo = experienceTypeMap[experienceLevel];

  if (!typeInfo) {
    return <Chip variant="bordered">Неизвестно</Chip>;
  }

  return (
    <Chip className={typeInfo.className} variant="bordered">
      {typeInfo.title}
    </Chip>
  );
};
