import { observer } from "mobx-react-lite";
import { VacancyExperienceLevel } from "../api/vacanciesApi";
import { Select, SelectItem } from "@heroui/react";

const options = [
  {
    value: VacancyExperienceLevel.Intern,
    label: "Стажер",
  },
  {
    value: VacancyExperienceLevel.Junior,
    label: "Junior",
  },
  {
    value: VacancyExperienceLevel.Middle,
    label: "Middle",
  },
  {
    value: VacancyExperienceLevel.Senior,
    label: "Senior",
  },
  {
    value: VacancyExperienceLevel.Lead,
    label: "Руководитель",
  },
];

export const ExperienceDropdown = observer<{
  value: VacancyExperienceLevel;
  onChange: (value: VacancyExperienceLevel) => void;
}>((props) => {
  const { value, onChange } = props;
  return (
    <Select
      onSelectionChange={([key]) => {
        if (key === undefined) {
          return; // Prevent clearing the selection
        }

        onChange(key as VacancyExperienceLevel);
      }}
      selectedKeys={[value]}
      label="Уровень опыта"
      selectionMode="single"
    >
      {options.map((option) => (
        <SelectItem key={option.value}>{option.label}</SelectItem>
      ))}
    </Select>
  );
});
