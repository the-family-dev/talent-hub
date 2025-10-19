import { observer } from "mobx-react-lite";
import { routerStore } from "../router/routerStore";
import { universityStore } from "./universityStore";
import { InternshipForm } from "../../components/InternshipForm";

export const UniversityInternshipEditPage = observer(() => {
  const { selectedInternshipWithFiles, selectedIternship } = universityStore;

  if (
    selectedInternshipWithFiles === undefined ||
    selectedIternship === undefined
  )
    return null;

  return (
    <InternshipForm
      modalTitle="Редактирование стажировки"
      confirmText="Сохранить"
      internship={selectedInternshipWithFiles}
      onClose={() =>
        routerStore.navigate?.(`/university/internship/${selectedIternship.id}`)
      }
      onConfirm={(internship) => universityStore.updateInternship(internship)}
    />
  );
});
