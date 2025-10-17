import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router";
import { vacanciesStore } from "./vacanciesStore";
import ReactMarkdown from "react-markdown";
import { Button, Chip } from "@heroui/react";
import {
  ArrowLeftIcon,
  BuildingOfficeIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { ConfirmationWrapper } from "../../components/ConfirmationWrapper";
import { routerStore } from "../router/routerStore";
import SalaryRange from "../../components/SalaryRange";

export const VacancyPage = observer(() => {
  const { id: pageId } = useParams<{ id: string }>();

  const { selectedVacancy } = vacanciesStore;

  useEffect(() => {
    vacanciesStore.fetchVacancyById(pageId);
  }, [pageId]);

  if (selectedVacancy === undefined) return null;

  const { title, description, tags, id, salaryFrom, salaryTo, location } =
    selectedVacancy;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between">
        <Button
          color="primary"
          onPress={() => routerStore.navigate?.("/company/vacancy")}
          className="w-min"
        >
          <ArrowLeftIcon className="size-6" /> Назад
        </Button>

        <div className="flex flex-row gap-2">
          <Button
            isIconOnly
            variant="light"
            color="secondary"
            onPress={() =>
              routerStore.navigate?.(`/company/vacancy/${id}/edit`)
            }
            className="w-min"
          >
            <PencilIcon className="size-6" />
          </Button>
          <ConfirmationWrapper
            title="Удаление вакансии"
            message={`Вы уверенны что хотите удалить вакансию?\nПосле удаления вернуть её не получится.`}
            confirmText="Удалить"
            color="danger"
            onConfirm={() => vacanciesStore.deleteVacancy(id)}
          >
            <Button isIconOnly variant="light" color="danger" className="w-min">
              <TrashIcon className="size-6" />
            </Button>
          </ConfirmationWrapper>
        </div>
      </div>

      <div className="flex flex-row gap-4">
        <div className="text-3xl font-bold flex-1">{title}</div>
      </div>
      <div className="flex flex-row gap-2 text-default-500">
        <BuildingOfficeIcon className="size-6" />
        {location}
      </div>
      <SalaryRange salaryFrom={salaryFrom} salaryTo={salaryTo} />
      <div className="flex flex-row gap-2">
        {tags.map((tag, index) => (
          <Chip color="secondary" key={index}>
            {tag}
          </Chip>
        ))}
      </div>
      <div className="prose prose-lg max-w-none dark:prose-invert">
        <ReactMarkdown>{description}</ReactMarkdown>
      </div>
    </div>
  );
});
