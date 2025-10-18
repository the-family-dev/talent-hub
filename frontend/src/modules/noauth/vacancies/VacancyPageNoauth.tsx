import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Button } from "@heroui/react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { vacanciesNoauthStore } from "./vacanciesNoauthStore";
import { VacancyViwer } from "../../../components/VacancyViwer";

export const VacancyPageNoauth = observer(() => {
  const { id: pageId } = useParams<{ id: string }>();

  const { selectedVacancy } = vacanciesNoauthStore;

  const navigate = useNavigate();

  useEffect(() => {
    vacanciesNoauthStore.fetchVacancyById(pageId);
  }, [pageId]);

  if (selectedVacancy === undefined) return null;

  const {
    location,
    salaryFrom,
    salaryTo,
    title,
    createdAt,
    company,
    tags,
    isRemote,
    experienceLevel,
    employmentType,
    description,
  } = selectedVacancy;

  return (
    <div className="flex flex-col gap-4 pt-6">
      <div className="flex flex-row justify-end gap-4">
        <Button
          onPress={() => {
            vacanciesNoauthStore.selectVacancyForRespond(selectedVacancy);
          }}
          size="md"
          variant="solid"
          color="primary"
        >
          Откликнуться
        </Button>

        <Button
          color="default"
          onPress={() => {
            navigate("/vacancy");
          }}
          size="md"
        >
          <ArrowLeftIcon className="size-4" /> Назад
        </Button>
      </div>
      <VacancyViwer
        title={title}
        company={{
          name: company.name,
          logoUrl: company.logoUrl,
        }}
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
