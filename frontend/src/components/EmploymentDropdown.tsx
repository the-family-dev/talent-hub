import { observer } from "mobx-react-lite";
import { Select, SelectItem } from "@heroui/react";
import { EmploymentType } from "../types/rootTypes";

const options = [
  {
    value: EmploymentType.Contract,
    label: "Договор",
  },
  {
    value: EmploymentType.FullTime,
    label: "Полный день",
  },
  {
    value: EmploymentType.PartTime,
    label: "Частичное время",
  },
  {
    value: EmploymentType.Internship,
    label: "Стажировка",
  },
];

export const EmploymentDropdown = observer<{
  value: EmploymentType;
  onChange: (value: EmploymentType) => void;
}>((props) => {
  const { value, onChange } = props;
  return (
    <Select
      onSelectionChange={([key]) => {
        if (key === undefined) {
          return; // Prevent clearing the selection
        }

        onChange(key as EmploymentType);
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
