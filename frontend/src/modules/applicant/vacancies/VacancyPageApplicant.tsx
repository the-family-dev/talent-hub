import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router";
import { Button } from "@heroui/react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { vacanciesApplicantStore } from "./vacanciesApplicantStore";
import { routerStore } from "../../router/routerStore";
import { VacancyViwer } from "../../../components/VacancyViwer";

export const VacancyPageApplicant = observer(() => {
  const { id: pageId } = useParams<{ id: string }>();

  const { selectedVacancy } = vacanciesApplicantStore;

  useEffect(() => {
    vacanciesApplicantStore.fetchVacancyById(pageId);
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
    <div className="flex flex-col">
      <div className="flex flex-row justify-between items-center relative">
        <div className="flex flex-row top-0 right-2 gap-4 absolute">
          <Button
            color="default"
            onPress={() => routerStore.navigate?.("/applicant/vacancy")}
            size="md"
          >
            <ArrowLeftIcon className="size-4" /> Назад
          </Button>
          <Button
            onPress={() => {
              vacanciesApplicantStore.setVacancyRespond(selectedVacancy);
            }}
            size="md"
            variant="solid"
            color="primary"
          >
            Откликнуться
          </Button>
        </div>
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
