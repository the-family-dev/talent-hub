import { Route, Routes } from "react-router";

import {
  BuildingOffice2Icon,
  DocumentTextIcon,
  WindowIcon,
} from "@heroicons/react/24/outline";
import { observer } from "mobx-react-lite";
import {
  NavigationMenu,
  type TNavigationButton,
} from "../components/NavigationMenu";
import { AdminHeader } from "../modules/administration/AdminHeader";
import { AdminVacancyListPage } from "../modules/administration/AdminVacancyListPage";
import { AdminVacancyPage } from "../modules/administration/AdminVacancyPage";
import { AdminAnalyticsPage } from "../modules/administration/AdminAnalyticsPage";

const routes: TNavigationButton[] = [
  {
    path: "/admin",
    title: "Вакансии",
    icon: DocumentTextIcon,
  },
  {
    path: "/admin/company",
    title: "Создание компании",
    icon: BuildingOffice2Icon,
  },
  {
    path: "/admin/analytics",
    title: "Аналитика",
    icon: WindowIcon,
  },
];

export const AdminPages = observer(() => {
  return (
    <div className="w-full flex flex-col justify-center items-center overflow-y-auto h-screen">
      <AdminHeader />

      <div
        className="flex flex-col gap-4 h-full self-center pt-[65px]"
        style={{
          width: 1200,
        }}
      >
        <div className="flex flex-row gap-4 pb-6">
          <NavigationMenu buttons={routes} />
          <div className="w-full min-h-0">
            <Routes>
              <Route path="" element={<AdminVacancyListPage />} />
              <Route path="/:id" element={<AdminVacancyPage />} />
              <Route path="/analytics" element={<AdminAnalyticsPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
});
