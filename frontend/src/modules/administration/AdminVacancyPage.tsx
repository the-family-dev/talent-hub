import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalBody,
  ModalContent,
} from "@heroui/react";
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  EllipsisHorizontalCircleIcon,
  LockClosedIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/outline";
import { routerStore } from "../router/routerStore";
import { VacancyViwer } from "../../components/VacancyViwer";
import { adminStore } from "./adminStore";
import { VacancyStatus } from "../../types/rootTypes";

export const AdminVacancyPage = observer(() => {
  const { id: pageId } = useParams<{ id: string }>();

  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");

  const { selectedVacancy } = adminStore;

  useEffect(() => {
    adminStore.fetchVacancyById(pageId);
  }, [pageId]);

  if (selectedVacancy === undefined) return null;

  const {
    title,
    description,
    tags,
    salaryFrom,
    salaryTo,
    location,
    createdAt,
    employmentType,
    experienceLevel,
    isRemote,
    status,
  } = selectedVacancy;

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-2 w-full justify-end">
          <Dropdown>
            <DropdownTrigger>
              <Button color="primary">
                Изменить статус
                <EllipsisHorizontalCircleIcon className="size-6" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu variant="faded">
              <DropdownItem
                key="aprove"
                color="success"
                className="text-success"
                startContent={<CheckCircleIcon className={"size-6"} />}
                onPress={() =>
                  adminStore.updateVacancyStatus(VacancyStatus.Active)
                }
              >
                Активировать вакансию
              </DropdownItem>
              <DropdownItem
                key="reject"
                color="danger"
                className="text-danger"
                startContent={<NoSymbolIcon className={"size-6"} />}
                onPress={() =>
                  adminStore.updateVacancyStatus(VacancyStatus.Rejected)
                }
              >
                Отклонить вакансию
              </DropdownItem>
              <DropdownItem
                key="close"
                color="danger"
                className="text-danger"
                startContent={<LockClosedIcon className={"size-6"} />}
                onPress={() =>
                  adminStore.updateVacancyStatus(VacancyStatus.Closed)
                }
              >
                Закрыть вакансию
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Button
            color="default"
            onPress={() => routerStore.navigate?.("/admin")}
            size="md"
          >
            <ArrowLeftIcon className="size-4" /> Назад
          </Button>
        </div>

        <VacancyViwer
          status={status}
          title={title}
          tags={tags}
          createdAt={createdAt}
          location={location}
          description={description}
          employmentType={employmentType}
          isRemote={isRemote}
          salaryFrom={salaryFrom}
          salaryTo={salaryTo}
          experienceLevel={experienceLevel}
        />
      </div>
      <Modal>
        <ModalContent>
          <ModalBody></ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
});
