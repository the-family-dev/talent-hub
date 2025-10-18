import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router";
import { Button } from "@heroui/react";
import {
  ArrowLeftIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { ConfirmationWrapper } from "../../components/ConfirmationWrapper";
import { routerStore } from "../router/routerStore";
import { VacancyViwer } from "../../components/VacancyViwer";
import { universityStore } from "./universityStore";

export const UniversityInternsipPage = observer(() => {
  const { id: pageId } = useParams<{ id: string }>();

  const { selectedIternship } = universityStore;

  useEffect(() => {
    universityStore.fetchInternshipById(pageId);
  }, [pageId]);

  if (selectedIternship === undefined) return null;

  const { title, description, tags, id, location, createdAt, files } =
    selectedIternship;

  return (
    <div className="flex flex-col gap-4 relative">
      <div className="flex flex-row gap-2 top-0 right-6 absolute">
        <Button
          color="default"
          onPress={() => routerStore.navigate?.("/university/internship")}
          size="md"
        >
          <ArrowLeftIcon className="size-4" /> Назад
        </Button>
        <Button
          isIconOnly
          variant="light"
          color="secondary"
          onPress={() =>
            routerStore.navigate?.(`/university/internship/${id}/edit`)
          }
          className="w-min"
        >
          <PencilIcon className="size-6" />
        </Button>
        <ConfirmationWrapper
          title="Удаление стажировки"
          message={`Вы уверены, что хотите удалить стажировку?\nПосле удаления вернуть её не получится.`}
          confirmText="Удалить"
          color="danger"
          onConfirm={() => universityStore.deleteInternship(id)}
        >
          <Button isIconOnly variant="light" color="danger" className="w-min">
            <TrashIcon className="size-6" />
          </Button>
        </ConfirmationWrapper>
      </div>

      <VacancyViwer
        pdfUrls={files}
        title={title}
        tags={tags}
        createdAt={createdAt}
        location={location}
        description={description}
      />
    </div>
  );
});
