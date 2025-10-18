import { Input } from "@heroui/react";
import { useEffect } from "react";
import { vacanciesStore } from "./vacanciesStore";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { VacanciesResumeBankListItem } from "./VacanciesResumeBankListItem";

export const VacanciesResumeBankPage = () => {
  const { resumes, resumeFilters } = vacanciesStore;

  const { search } = resumeFilters;

  useEffect(() => {
    vacanciesStore.getAllResumes(search);
  }, []);

  console.log(resumes);

  return (
    <div className="flex flex-col gap-4 flex-1 h-full">
      <div className="flex flex-row justify-between items-center">
        <div className="text-3xl font-medium">Банк резюме</div>
      </div>
      <div className="flex flex-row justify-between items-end gap-4">
        <Input
          isClearable
          onClear={() => vacanciesStore.setResumeFilterSearch("")}
          value={search}
          onChange={(e) => vacanciesStore.setResumeFilterSearch(e.target.value)}
          placeholder="Поиск"
          startContent={
            <MagnifyingGlassIcon className="w-5 h-5 text-default-400 pointer-events-none shrink-0" />
          }
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full overflow-y-auto">
        {resumes.map((resume) => (
          <VacanciesResumeBankListItem key={resume.id} resume={resume} />
        ))}
      </div>
    </div>
  );
};
