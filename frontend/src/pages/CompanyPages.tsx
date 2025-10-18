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
  BuildingLibraryIcon,
  BuildingOffice2Icon,
  DocumentMagnifyingGlassIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { VacancyCreatePage } from "../modules/vacancies/VacancyCreatePage";
import { VacancyEditPage } from "../modules/vacancies/VacancyEditPage";
import { VacancyApplicationPage } from "../modules/vacancies/VacancyApplicationPage";
import { StartPageHeader } from "../components/StartPageHeader";
import { VacancyInternshipListPage } from "../modules/vacancies/VacancyInternshipListPage";
import { VacancyInternshipPage } from "../modules/vacancies/VacancyInternshipPage";

const routes: TNavigationButton[] = [
  {
    path: "/company",
    title: "Профиль",
    icon: BuildingOffice2Icon,
  },
  {
    path: "/company/vacancy",
    title: "Вакансии",
    icon: DocumentMagnifyingGlassIcon,
  },
  {
    path: "/company/internship",
    title: "Стажировки",
    icon: BuildingLibraryIcon,
  },
  {
    path: "/company/resume",
    title: "Банк резюме",
    icon: UserIcon,
  },
];

export const CompanyPages = observer(() => {
  const { company } = companyStore;

  return (
    <>
      <div className="w-full flex flex-col items-center overflow-y-auto h-screen">
        {company === undefined ? <StartPageHeader /> : <CompanyHeader />}

        <div
          className="flex flex-col gap-4 h-full self-center pt-6"
          style={{
            width: 1200,
          }}
        >
          {company === undefined ? (
            <RegisterCompanyPage />
          ) : (
            <div className="flex flex-row gap-4 pb-6">
              <NavigationMenu buttons={routes} />
              <div className="w-full min-h-0">
                <Routes>
                  <Route path="" element={<CompanyProfilePage />} />
                  <Route path="vacancy" element={<VacanciesListPage />} />
                  <Route path="vacancy/:id" element={<VacancyPage />} />
                  <Route
                    path="vacancy/create"
                    element={<VacancyCreatePage />}
                  />
                  <Route
                    path="vacancy/:id/edit"
                    element={<VacancyEditPage />}
                  />
                  <Route
                    path="vacancy/:id/application"
                    element={<VacancyApplicationPage />}
                  />
                  <Route
                    path="internship"
                    element={<VacancyInternshipListPage />}
                  />
                  <Route
                    path="internship/:id"
                    element={<VacancyInternshipPage />}
                  />
                </Routes>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
});
