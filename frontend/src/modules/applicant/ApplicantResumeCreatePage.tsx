import { observer } from "mobx-react-lite";
import { ApplicantResumeForm } from "./ApplicantResumeForm";
import { applicantStore } from "./applicantStore";
import { routerStore } from "../router/routerStore";

export const ApplicantResumeCreatePage = observer(() => {
  const { defaultResumeData } = applicantStore;

  return (
    <ApplicantResumeForm
      modalTitle="Создание резюме"
      confirmText="Создать"
      resume={defaultResumeData}
      onClose={() => routerStore.navigate?.("/applicant/resume")}
      onConfirm={(resume) => applicantStore.createResume(resume)}
    />
  );
});
