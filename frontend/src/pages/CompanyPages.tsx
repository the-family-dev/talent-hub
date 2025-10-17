import { Route, Routes } from "react-router";
import { CompanyHeader } from "../modules/company/CompanyHeader";
import {
  NavigationMenu,
  type TNavigationButton,
} from "../components/NavigationMenu";
import { VacanciesListPage } from "../modules/vacancies/VacanciesListPage";
import { observer } from "mobx-react-lite";
import { companyStore } from "../modules/company/companyStore";
import { RegisterCompanyPage } from "../modules/company/RegisterCompanyPage";
import { CompanyProfilePage } from "../modules/company/CompanyProfilePage";
import { VacancyPage } from "../modules/vacancies/VacancyPage";
import {
  BuildingOffice2Icon,
  DocumentTextIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import { VacancyCreatePage } from "../modules/vacancies/VacancyCreatePage";
import { VacancyEditPage } from "../modules/vacancies/VacancyEditPage";

const routes: TNavigationButton[] = [
  {
    path: "/company",
    title: "Профиль",
    icon: BuildingOffice2Icon,
  },
  {
    path: "/company/vacancy",
    title: "Вакансии",
    icon: HomeIcon,
  },
  {
    path: "/company/resume",
    title: "Отклики",
    icon: DocumentTextIcon,
  },
];

export const CompanyPages = observer(() => {
  const { company } = companyStore;

  if (company === undefined) {
    return <RegisterCompanyPage />;
  }

  return (
    <div className="w-full flex flex-col justify-center items-center overflow-y-auto">
      <div
        className="flex flex-col gap-4 h-screen self-center"
        style={{
          width: 1200,
        }}
      >
        <CompanyHeader />
        <div className="flex flex-row gap-4 pb-6">
          <NavigationMenu buttons={routes} />
          <div className="w-full min-h-0">
            <Routes>
              <Route path="" element={<CompanyProfilePage />} />
              <Route path="vacancy" element={<VacanciesListPage />} />
              <Route path="vacancy/:id" element={<VacancyPage />} />
              <Route path="vacancy/create" element={<VacancyCreatePage />} />
              <Route path="vacancy/:id/edit" element={<VacancyEditPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
});
