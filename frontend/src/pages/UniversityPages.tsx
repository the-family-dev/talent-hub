import { Routes } from "react-router";
import { CompanyHeader } from "../modules/company/CompanyHeader";
import {
  NavigationMenu,
  type TNavigationButton,
} from "../components/NavigationMenu";
import { observer } from "mobx-react-lite";
import { companyStore } from "../modules/company/companyStore";
import {
  BuildingOffice2Icon,
  DocumentTextIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import { RegisterUniversityPage } from "../modules/university/RegisterUniversityPage";
import { StartPageHeader } from "../components/StartPageHeader";

const routes: TNavigationButton[] = [
  {
    path: "/university",
    title: "Профиль",
    icon: BuildingOffice2Icon,
  },
  {
    path: "/university/internship",
    title: "Мои стажировки",
    icon: HomeIcon,
  },
  {
    path: "/university/company",
    title: "Компании",
    icon: DocumentTextIcon,
  },
];

export const UniversityPages = observer(() => {
  const { company } = companyStore;

  return (
    <div className="w-full flex flex-col justify-center items-center overflow-y-auto h-screen">
      {company === undefined ? <StartPageHeader /> : <CompanyHeader />}

      <div
        className="flex flex-col gap-4 h-full self-center pt-[65px]"
        style={{
          width: 1200,
        }}
      >
        {company === undefined ? (
          <RegisterUniversityPage />
        ) : (
          <div className="flex flex-row gap-4 pb-6">
            <NavigationMenu buttons={routes} />
            <div className="w-full min-h-0">
              <Routes>
                {/* <Route path="" element={<CompanyProfilePage />} />
                <Route path="vacancy" element={<VacanciesListPage />} />
                <Route path="vacancy/:id" element={<VacancyPage />} />
                <Route path="vacancy/create" element={<VacancyCreatePage />} />
                <Route path="vacancy/:id/edit" element={<VacancyEditPage />} />
                <Route
                  path="vacancy/:id/application"
                  element={<VacancyApplicationPage />}
                /> */}
              </Routes>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
