import { observer } from "mobx-react-lite";
import { routerStore } from "../router/routerStore";
import { universityStore } from "./universityStore";
import { InternshipForm } from "../../components/InternshipForm";

export const UniversityInternshipEditPage = observer(() => {
  const { selectedIternship } = universityStore;
  if (!selectedIternship) {
    return <div>вакансия не найдена</div>;
  }
  return (
    <InternshipForm
      modalTitle="Редактирование стажировки"
      confirmText="Сохранить"
      internship={{ ...selectedIternship, files: [] }}
      onClose={() => routerStore.navigate?.("/company/vacancy")}
      onConfirm={(internship) => universityStore.updateInternship(internship)}
    />
  );
});
