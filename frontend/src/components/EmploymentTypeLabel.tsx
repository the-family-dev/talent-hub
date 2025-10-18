import { Chip } from "@heroui/react";
import { EmploymentType } from "../types/rootTypes";

const employmentTypeMap = {
  [EmploymentType.Contract]: {
    title: "По договору",
    className: "text-primary",
  },
  [EmploymentType.FullTime]: {
    title: "Полный день",
    className: "text-primary",
  },
  [EmploymentType.PartTime]: {
    title: "Гибкий график",
    className: "text-primary",
  },
  [EmploymentType.Internship]: {
    title: "Стажировка",
    className: "text-primary",
  },
};

export const EmploymentTypeLabel = ({
  employmentType,
}: {
  employmentType: EmploymentType;
}) => {
  const typeInfo = employmentTypeMap[employmentType];

  if (!typeInfo) {
    return (
      <Chip variant="bordered" color="default">
        Неизвестно
      </Chip>
    );
  }

  return (
    <Chip color="default" variant="bordered">
      {typeInfo.title}
    </Chip>
  );
};
