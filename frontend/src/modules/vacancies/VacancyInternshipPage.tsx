import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router";
import { vacanciesStore } from "./vacanciesStore";
import { Button } from "@heroui/react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { routerStore } from "../router/routerStore";
import { VacancyViwer } from "../../components/VacancyViwer";
import { VacancyInternshipAccespButton } from "./VacancyInternshipAccespButton";

export const VacancyInternshipPage = observer(() => {
  const { id: pageId } = useParams<{ id: string }>();

  const { selectedIternship } = vacanciesStore;

  useEffect(() => {
    vacanciesStore.fetchInternshipById(pageId);
  }, [pageId]);

  if (selectedIternship === undefined) return null;

  const { title, description, tags, files, location, createdAt } =
    selectedIternship;

  return (
    <div className="flex flex-col gap-4 relative">
      <div className="flex flex-row gap-2 top-0 right-6 absolute">
        <Button
          color="default"
          onPress={() => routerStore.navigate?.("/company/internship")}
          size="md"
        >
          <ArrowLeftIcon className="size-4" /> Назад
        </Button>
        <VacancyInternshipAccespButton />
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
