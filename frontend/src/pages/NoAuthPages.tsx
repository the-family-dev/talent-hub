import { Navigate, Route, Routes } from "react-router";
import { observer } from "mobx-react-lite";
import { StartPageHeader } from "../components/StartPageHeader";
import { VacanciesNoauthListPage } from "../modules/noauth/vacancies/VacanciesNoauthListPage";
import { VacancyPageNoauth } from "../modules/noauth/vacancies/VacancyPageNoauth";
import { AuthPage } from "../modules/noauth/AuthPage";
import { CreateVacancyPublicRespondModal } from "../modules/applicant/vacancies/CreateVacancyPublicRespondModal";

export const NoAuthPages = observer(() => {
  return (
    <div className="w-full flex flex-col justify-center items-center overflow-y-auto h-screen">
      <StartPageHeader />
      <div
        className="flex flex-col gap-4 h-full self-center"
        style={{
          width: 1200,
          marginTop: 64,
        }}
      >
        <div className="flex flex-row gap-4 w-full">
          <div className="w-full h-full pb-6">
            <Routes>
              <Route path="/" element={<Navigate to="/vacancy" replace />} />
              <Route path="auth" element={<AuthPage />} />
              <Route path="vacancy" element={<VacanciesNoauthListPage />} />
              <Route path="vacancy/:id" element={<VacancyPageNoauth />} />
            </Routes>
          </div>
        </div>
      </div>
      <CreateVacancyPublicRespondModal />
    </div>
  );
});
