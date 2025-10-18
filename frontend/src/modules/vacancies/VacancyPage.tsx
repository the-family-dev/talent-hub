import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router";
import { vacanciesStore } from "./vacanciesStore";
import { Badge, Button } from "@heroui/react";
import {
  ArrowLeftIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { ConfirmationWrapper } from "../../components/ConfirmationWrapper";
import { routerStore } from "../router/routerStore";
import { ApplicationStatus } from "../../types/rootTypes";
import { VacancyViwer } from "../../components/VacancyViwer";
import { VacancyInternshipsViewer } from "./VacancyInternshipsViewer";

export const VacancyPage = observer(() => {
  const { id: pageId } = useParams<{ id: string }>();

  const { selectedVacancy } = vacanciesStore;

  useEffect(() => {
    vacanciesStore.fetchVacancyById(pageId);
  }, [pageId]);

  if (selectedVacancy === undefined) return null;

  const {
    title,
    description,
    tags,
    id,
    salaryFrom,
    salaryTo,
    location,
    applications,
    createdAt,
    employmentType,
    experienceLevel,
    isRemote,
  } = selectedVacancy;

  const newApplicationsCount = applications.filter(
    (application) => application.status === ApplicationStatus.Pending
  ).length;

  return (
    <div className="flex flex-col gap-4 relative">
      <div className="flex flex-row gap-2 top-0 right-6 absolute">
        <Button
          color="default"
          onPress={() => routerStore.navigate?.("/company/vacancy")}
          size="md"
        >
          <ArrowLeftIcon className="size-4" /> Назад
        </Button>
        <VacancyInternshipsViewer vacancy={selectedVacancy} />
        <Badge
          color="primary"
          isInvisible={newApplicationsCount === 0}
          content={newApplicationsCount}
        >
          <Button
            variant="faded"
            color="primary"
            onPress={() =>
              routerStore.navigate?.(`/company/vacancy/${id}/application`)
            }
          >
            Отклики
          </Button>
        </Badge>
        <Button
          isIconOnly
          variant="light"
          color="secondary"
          onPress={() => routerStore.navigate?.(`/company/vacancy/${id}/edit`)}
          className="w-min"
        >
          <PencilIcon className="size-6" />
        </Button>
        <ConfirmationWrapper
          title="Удаление вакансии"
          message={`Вы уверены, что хотите удалить вакансию?\nПосле удаления вернуть её не получится.`}
          confirmText="Удалить"
          color="danger"
          onConfirm={() => vacanciesStore.deleteVacancy(id)}
        >
          <Button isIconOnly variant="light" color="danger" className="w-min">
            <TrashIcon className="size-6" />
          </Button>
        </ConfirmationWrapper>
      </div>

      <VacancyViwer
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
  );
});
