import { observer } from "mobx-react-lite";
import { VacancyEmploymentType } from "../api/vacanciesApi";
import { Select, SelectItem } from "@heroui/react";

const options = [
  {
    value: VacancyEmploymentType.Contract,
    label: "Договор",
  },
  {
    value: VacancyEmploymentType.FullTime,
    label: "Полный день",
  },
  {
    value: VacancyEmploymentType.PartTime,
    label: "Частичное время",
  },
  {
    value: VacancyEmploymentType.Internship,
    label: "Стажировка",
  },
];

export const EmploymentDropdown = observer<{
  value: VacancyEmploymentType;
  onChange: (value: VacancyEmploymentType) => void;
}>((props) => {
  const { value, onChange } = props;
  return (
    <Select
      onSelectionChange={([key]) => {
        if (key === undefined) {
          return; // Prevent clearing the selection
        }

        onChange(key as VacancyEmploymentType);
      }}
      selectedKeys={[value]}
      label="Тип занятости"
      selectionMode="single"
    >
      {options.map((option) => (
        <SelectItem key={option.value}>{option.label}</SelectItem>
      ))}
    </Select>
  );
});
