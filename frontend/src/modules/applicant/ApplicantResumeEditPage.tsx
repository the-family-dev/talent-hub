import { observer } from "mobx-react-lite";
import { ApplicantResumeForm } from "./ApplicantResumeForm";
import { applicantStore } from "./applicantStore";
import { routerStore } from "../router/routerStore";

export const ApplicantResumeEditPage = observer(() => {
  const { resume } = applicantStore;

  if (!resume) {
    return <div>Резюме не найдено</div>;
  }

  return (
    <ApplicantResumeForm
      modalTitle="Редактирование резюме"
      confirmText="Сохранить"
      resume={resume}
      onClose={() => routerStore.navigate?.("/applicant/resume")}
      onConfirm={(updated) =>
        applicantStore.updateResume({ ...updated, id: resume.id })
      }
    />
  );
});
