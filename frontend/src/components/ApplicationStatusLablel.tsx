import { Chip } from "@heroui/react";
import { observer } from "mobx-react-lite";
import { ApplicationStatus } from "../types/rootTypes";

const statusMap = {
  [ApplicationStatus.Pending]: {
    text: "Новый",
    className: "text-default",
  },
  [ApplicationStatus.Interview]: {
    text: "Собеседование",
    className: "text-primary",
  },
  [ApplicationStatus.Rejected]: {
    text: "Отклонен",
    className: "text-danger",
  },
  [ApplicationStatus.Accepted]: {
    text: "Принят",
    className: "text-success",
  },
};

export const ApplicationStatusLabel = observer<{
  status: ApplicationStatus;
}>((props) => {
  const { text, className } = statusMap[props.status];

  return (
    <Chip variant="faded" className={className}>
      {text ?? "Неизвестно"}
    </Chip>
  );
});
