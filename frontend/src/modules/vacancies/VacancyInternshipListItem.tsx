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
import { AvatarImage } from "../../components/AvatarImage";
import { getFileSrc } from "../../api";

export const VacancyInternshipListItem = observer<{
  internship: IUniversityInternshipBase;
}>((props) => {
  const { internship } = props;
  const { location, title, createdAt, id, university, files } = internship;

  const internsCountLabel = () => {
    if (files === undefined) return null;

    if (files.length < 1) return null;

    return (
      <LabelWithIcon
        position="right"
        label={String(files.length)}
        icon={UserGroupIcon}
      />
    );
  };

  return (
    <Card className="shrink-0 m-[1px]">
      <CardHeader className="flex flex-row justify-between">
        <div className="font-medium text-xl">{title}</div>
        {internsCountLabel()}
      </CardHeader>
      <CardBody className="flex flex-row gap-8">
        <div className="flex flex-col gap-2">
          {location ? (
            <LabelWithIcon label={location} icon={MapPinIcon} />
          ) : null}

          <LabelWithIcon
            label={` от ${dayjs(createdAt).format("DD.MM.YYYY")}`}
            icon={CalendarDaysIcon}
          />
        </div>

        {university ? (
          <div className="flex flex-row gap-2 items-center">
            <AvatarImage
              name={university.name}
              width={32}
              height={32}
              avatar={
                university.logoUrl ? getFileSrc(university.logoUrl) : undefined
              }
            />
            <div className="font-medium text-x2">{university.name}</div>
          </div>
        ) : null}
      </CardBody>
      <CardFooter className="flex flex-row justify-end">
        <Button as={Link} to={id} size="md" variant="flat" color="primary">
          Подробнее
        </Button>
      </CardFooter>
    </Card>
  );
});
