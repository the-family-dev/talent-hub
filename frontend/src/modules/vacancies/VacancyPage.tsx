import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { vacanciesStore } from "./vacanciesStore";
import ReactMarkdown from "react-markdown";
import { Button, Chip } from "@heroui/react";
import {
  ArrowLeftIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { ConfirmationWrapper } from "../../components/ConfirmationWrapper";
import { VacancyFormModal } from "./VacancyFormModal";

export const VacancyPage = observer(() => {
  const { id: pageId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { selectedVacancy, isEditModalOpen } = vacanciesStore;

  useEffect(() => {
    vacanciesStore.fetchFacancyById(pageId);
  }, [pageId]);

  if (selectedVacancy === undefined) return null;

  const { title, description, tags, id } = selectedVacancy;

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between">
          <Button
            color="primary"
            onPress={() => navigate(-1)}
            className="w-min"
          >
            <ArrowLeftIcon className="size-6" /> Назад
          </Button>

          <div className="flex flex-row gap-2">
            <Button
              isIconOnly
              variant="light"
              color="secondary"
              onPress={() => vacanciesStore.setEditModalOpen(true)}
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
              <Button
                isIconOnly
                variant="light"
                color="danger"
                className="w-min"
              >
                <TrashIcon className="size-6" />
              </Button>
            </ConfirmationWrapper>
          </div>
        </div>

        <div className="flex flex-row gap-4">
          <div className="text-3xl font-bold flex-1">{title}</div>
        </div>
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

      {isEditModalOpen ? (
        <VacancyFormModal
          confirmText="Сохранить"
          modalTitle="Редактирование вакансии"
          vacancy={selectedVacancy}
          onClose={() => vacanciesStore.setEditModalOpen(false)}
          onConfirm={(vacancy) => vacanciesStore.updateVacancy(vacancy)}
        />
      ) : null}
    </>
  );
});
