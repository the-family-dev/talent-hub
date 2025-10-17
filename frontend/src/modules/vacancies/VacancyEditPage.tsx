import { observer } from "mobx-react-lite";
import { VacancyForm } from "./VacancyForm";
import { routerStore } from "../router/routerStore";
import { vacanciesStore } from "./vacanciesStore";

export const VacancyEditPage = observer(() => {
  const { selectedVacancy } = vacanciesStore;

  if (!selectedVacancy) {
    return <div>вакансия не найдена</div>;
  }

  return (
    <VacancyForm
      modalTitle="Редактирование вакансии"
      confirmText="Сохранить"
      vacancy={selectedVacancy}
      onClose={() => routerStore.navigate?.("/company/vacancy")}
      onConfirm={(resume) => vacanciesStore.updateVacancy(resume)}
    />
  );
});
