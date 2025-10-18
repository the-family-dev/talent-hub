import { Button, Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import { observer } from "mobx-react-lite";
import {
  CalendarDaysIcon,
  MapPinIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import { Link } from "react-router";
import type { IUniversityInternshipBase } from "../../api/internshipApi";
import { LabelWithIcon } from "../../components/LabelWithIcon";

export const UniversityInternshipListItem = observer<{
  vacancy: IUniversityInternshipBase;
}>((props) => {
  const { vacancy } = props;
  const { location, title, createdAt, id } = vacancy;

  return (
    <Card className="shrink-0 m-[1px]">
      <CardHeader className="flex flex-row justify-between">
        <div className="font-medium text-xl">{title}</div>
        <LabelWithIcon position="right" label="6" icon={UserGroupIcon} />
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <div className="flex flex-row gap-2">
          <div className="flex items-center font-semibold text-default-500">
            <MapPinIcon className="size-6 mr-1" />
            {location}
          </div>
          <div className="flex items-center font-semibold text-default-500">
            <CalendarDaysIcon className="size-6 mr-1" />
            от {dayjs(createdAt).format("DD.MM.YYYY")}
          </div>
        </div>
      </CardBody>
      <CardFooter className="flex flex-row justify-end">
        <Button as={Link} to={id} size="md" variant="flat" color="primary">
          Подробнее
        </Button>
      </CardFooter>
    </Card>
  );
});
