import { Chip } from "@heroui/react";
import { ExperienceLevel } from "../types/rootTypes";

const experienceTypeMap = {
  [ExperienceLevel.Intern]: {
    title: "Без опыта",
    className: "text-primary",
  },
  [ExperienceLevel.Junior]: {
    title: "от 1 до 3 лет",
    className: "text-primary",
  },
  [ExperienceLevel.Middle]: {
    title: "от 3 до 6 лет",
    className: "text-primary",
  },
  [ExperienceLevel.Senior]: {
    title: "6 лет и более",
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
