import { Chip } from "@heroui/react";
import { observer } from "mobx-react-lite";
import { VacancyStatus } from "../types/rootTypes";

const statusMap = {
  [VacancyStatus.Moderation]: {
    text: "Модерация",
    className: "text-warning",
  },
  [VacancyStatus.Active]: {
    text: "Активная",
    className: "text-primary",
  },
  [VacancyStatus.Closed]: {
    text: "Закрыта",
    className: "text-danger",
  },
};

export const VacancyStatusLabel = observer<{
  status: VacancyStatus;
}>((props) => {
  const { text, className } = statusMap[props.status];

  return (
    <Chip variant="faded" className={className}>
      {text ?? "Неизвестно"}
    </Chip>
  );
});
