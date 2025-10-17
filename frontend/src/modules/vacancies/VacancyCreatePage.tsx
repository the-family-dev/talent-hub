import { observer } from "mobx-react-lite";
import { VacancyForm } from "./VacancyForm";
import { routerStore } from "../router/routerStore";
import { vacanciesStore } from "./vacanciesStore";

export const VacancyCreatePage = observer(() => {
  const { defaultVacancyData } = vacanciesStore;

  return (
    <VacancyForm
      modalTitle="Создание вакансии"
      confirmText="Создать"
      vacancy={defaultVacancyData}
      onClose={() => routerStore.navigate?.("/company/vacancy")}
      onConfirm={(resume) => vacanciesStore.addVacancy(resume)}
    />
  );
});
