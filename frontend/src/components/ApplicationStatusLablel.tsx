import { Chip } from "@heroui/react";
import { observer } from "mobx-react-lite";
import { ApplicationStatus } from "../types/rootTypes";

const statusMap = {
  [ApplicationStatus.Pending]: {
    text: "Новый",
    // color: 'text'
  },
  [ApplicationStatus.Interview]: {
    text: "Собеседование",
  },
  [ApplicationStatus.Rejected]: {
    text: "Отклонен",
  },
  [ApplicationStatus.Accepted]: {
    text: "Принят",
  },
};

export const ApplicationStatusLabel = observer<{
  status: ApplicationStatus;
}>((props) => {
  const { text } = statusMap[props.status];

  return (
    <Chip variant="faded" className="text-green-500">
      {text ?? "Неизвестно"}
    </Chip>
  );
});
