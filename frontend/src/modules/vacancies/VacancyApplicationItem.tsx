import { observer } from "mobx-react-lite";
import type { TVacancyApplication } from "../../api/companyVacanciesApi";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@heroui/react";
import { ApplicationStatusLabel } from "../../components/ApplicationStatusLablel";
import { getFileSrc } from "../../api";
import { OpenPdfButton } from "../../components/OpenPdfButton";
import {
  ChatBubbleOvalLeftIcon,
  CheckBadgeIcon,
  EllipsisHorizontalCircleIcon,
  EnvelopeIcon,
  NoSymbolIcon,
  PhoneIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import { LabelWithIcon } from "../../components/LabelWithIcon";
import { VacancyApplicationResumeViewer } from "./VacancyApplicationResumeViewer";
import { vacanciesStore } from "./vacanciesStore";
import { ApplicationStatus } from "../../types/rootTypes";

export const VacancyApplicationItem = observer<{
  application: TVacancyApplication;
}>(({ application }) => {
  const { note, status, resume, id } = application;
  const { user, pdfUrl, title } = resume;

  return (
    <Card className="flex flex-col gap-2">
      <CardHeader className="flex flex-row justify-between items-center">
        <div className="text-2xl font-semibold">{title}</div>
        <div className="flex flex-row gap-2">
          <OpenPdfButton pdfUrl={pdfUrl} />
          <ApplicationStatusLabel status={status} />
        </div>
      </CardHeader>
      <CardBody className="flex flex-col gap-4 items-start py-0">
        <div className="flex flex-row gap-2 items-center justify-between w-full">
          <User
            avatarProps={{
              src: getFileSrc(user.avatarUrl),
            }}
            name={user.name}
          />
          <div className="flex flex-row gap-4">
            <LabelWithIcon label={user.phone} icon={PhoneIcon} />
            <Divider className="h-6" orientation="vertical" />
            <LabelWithIcon
              label={user.telegram}
              icon={ChatBubbleOvalLeftIcon}
            />
            <Divider className="h-6" orientation="vertical" />
            <LabelWithIcon label={user.email} icon={EnvelopeIcon} />
          </div>
        </div>
        <div>{note ? note : "Сопроводительное письмо не указано"}</div>
      </CardBody>
      <CardFooter className="flex flex-row gap-2 justify-end ">
        <Dropdown>
          <DropdownTrigger>
            <Button color="primary">
              Действия <EllipsisHorizontalCircleIcon className="size-6" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu variant="faded">
            <DropdownItem
              key="apply"
              color="secondary"
              className="text-secondary"
              startContent={<UserPlusIcon className={"size-6"} />}
              onPress={() =>
                vacanciesStore.updateApplicationStatus(
                  id,
                  ApplicationStatus.Interview
                )
              }
            >
              Пригласить на собеседование
            </DropdownItem>
            <DropdownItem
              key="accept"
              color="success"
              className="text-success"
              startContent={<CheckBadgeIcon className={"size-6"} />}
              onPress={() =>
                vacanciesStore.updateApplicationStatus(
                  id,
                  ApplicationStatus.Accepted
                )
              }
            >
              Пригласить на работу
            </DropdownItem>
            <DropdownItem
              color="danger"
              key="reject"
              className="text-danger"
              startContent={<NoSymbolIcon className={"size-6"} />}
              onPress={() =>
                vacanciesStore.updateApplicationStatus(
                  id,
                  ApplicationStatus.Rejected
                )
              }
            >
              Отказать
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <VacancyApplicationResumeViewer resume={resume} />
      </CardFooter>
    </Card>
  );
});
