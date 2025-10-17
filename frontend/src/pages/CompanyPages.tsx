import { Route, Routes } from "react-router";
import { CompanyHeader } from "../modules/company/CompanyHeader";
import { NavigationMenu } from "../components/NavigationMenu";
import { VacanciesPage } from "../modules/vacancies/VacanciesPage";
import { observer } from "mobx-react-lite";
import { companyStore } from "../modules/company/companyStore";
import { RegisterCompanyPage } from "../modules/company/RegisterCompanyPage";

export const CompanyPages = observer(() => {
  const { company } = companyStore;

  if (company === undefined) {
    return <RegisterCompanyPage />;
  }

  return (
    <div
      className="flex flex-col gap-4 mx-auto h-screen"
      style={{
        width: 1200,
      }}
    >
      <CompanyHeader />
      <div className="flex flex-row gap-4 w-full min-h-0">
        <NavigationMenu />
        <div className="w-full min-h-0">
          <Routes>
            <Route path="/" element={<VacanciesPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
});
