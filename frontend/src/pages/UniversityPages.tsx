import { Route, Routes } from "react-router";
import {
  NavigationMenu,
  type TNavigationButton,
} from "../components/NavigationMenu";
import { observer } from "mobx-react-lite";
import {
  AcademicCapIcon,
  BuildingOffice2Icon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import { RegisterUniversityPage } from "../modules/university/RegisterUniversityPage";
import { StartPageHeader } from "../components/StartPageHeader";
import { UniversityProfilePage } from "../modules/university/UniversityProfilePage";
import { UniversityHeader } from "../modules/university/UniversityHeader";
import { universityStore } from "../modules/university/universityStore";

const routes: TNavigationButton[] = [
  {
    path: "/university",
    title: "Профиль",
    icon: AcademicCapIcon,
  },
  {
    path: "/university/internship",
    title: "Мои стажировки",
    icon: HomeIcon,
  },
  {
    path: "/university/company",
    title: "Компании",
    icon: BuildingOffice2Icon,
  },
];

export const UniversityPages = observer(() => {
  const { university } = universityStore;

  return (
    <div className="w-full flex flex-col justify-center items-center overflow-y-auto h-screen">
      {university === undefined ? <StartPageHeader /> : <UniversityHeader />}

      <div
        className="flex flex-col gap-4 h-full self-center pt-[65px]"
        style={{
          width: 1200,
        }}
      >
        {university === undefined ? (
          <RegisterUniversityPage />
        ) : (
          <div className="flex flex-row gap-4 pb-6">
            <NavigationMenu buttons={routes} />
            <div className="w-full min-h-0">
              <Routes>
                <Route path="" element={<UniversityProfilePage />} />
                {/* 
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
