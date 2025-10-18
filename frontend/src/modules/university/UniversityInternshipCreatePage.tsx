import { observer } from "mobx-react-lite";
import { routerStore } from "../router/routerStore";
import { InternshipForm } from "../../components/InternshipForm";
import { universityStore } from "./universityStore";

export const UniversityInternshipCreatePage = observer(() => {
  const { defaultInternshipData } = universityStore;

  return (
    <InternshipForm
      modalTitle="Создание стажировки"
      confirmText="Создать"
      internship={defaultInternshipData}
      onClose={() => routerStore.navigate?.("/university/internship")}
      onConfirm={(internship) => universityStore.addInternship(internship)}
    />
  );
});
