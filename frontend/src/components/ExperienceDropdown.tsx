import { observer } from "mobx-react-lite";
import { Select, SelectItem } from "@heroui/react";
import { ExperienceLevel } from "../types/rootTypes";

const options = [
  {
    value: ExperienceLevel.Intern,
    label: "Без опыта",
  },
  {
    value: ExperienceLevel.Junior,
    label: "от 1 до 3 лет",
  },
  {
    value: ExperienceLevel.Middle,
    label: "от 3 до 6 лет",
  },
  {
    value: ExperienceLevel.Senior,
    label: "6 лет и более",
  },
  {
    value: ExperienceLevel.Lead,
    label: "Руководитель",
  },
];

export const ExperienceDropdown = observer<{
  value: ExperienceLevel;
  onChange: (value: ExperienceLevel) => void;
}>((props) => {
  const { value, onChange } = props;
  return (
    <Select
      onSelectionChange={([key]) => {
        if (key === undefined) {
          return; // Prevent clearing the selection
        }

        onChange(key as ExperienceLevel);
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
