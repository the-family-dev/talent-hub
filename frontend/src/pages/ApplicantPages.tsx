import { Route, Routes } from "react-router";
import {
  NavigationMenu,
  type TNavigationButton,
} from "../components/NavigationMenu";
import { observer } from "mobx-react-lite";
import {
  UserCircleIcon,
  DocumentTextIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";
import { RegisterApplicantPage } from "../modules/applicant/RegisterApplicantPage";
import { applicantStore } from "../modules/applicant/applicantStore";
import { ApplicantProfilePage } from "../modules/applicant/ApplicantProfilePage";
import { ApplicantHeader } from "../modules/applicant/ApplicantHeader";
import { ApplicantResumePage } from "../modules/applicant/ApplicantResumePage";
import { ApplicantResumeCreatePage } from "../modules/applicant/ApplicantResumeCreatePage";
import { ApplicantResumeEditPage } from "../modules/applicant/ApplicantResumeEditPage";
import { VacanciesApplicantListPage } from "../modules/applicant/vacancies/VacanciesApplicantListPage";
import { VacancyPageApplicant } from "../modules/applicant/vacancies/VacancyPageApplicant";
import { CreateVacancyRespondModal } from "../modules/applicant/vacancies/CreateVacancyRespondModal";
import { useEffect } from "react";
import { StartPageHeader } from "../components/StartPageHeader";

const routes: TNavigationButton[] = [
  {
    path: "/applicant",
    title: "Профиль",
    icon: UserCircleIcon,
  },
  {
    path: "/applicant/vacancy",
    title: "Вакансии",
    icon: BriefcaseIcon,
  },
  {
    path: "/applicant/resume",
    title: "Резюме",
    icon: DocumentTextIcon,
  },
];

export const ApplicantPages = observer(() => {
  const { applicant } = applicantStore;

  useEffect(() => {
    applicantStore.getResume();
  }, []);

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center overflow-y-auto h-screen">
        {!applicant?.id ? <StartPageHeader /> : <ApplicantHeader />}
        <div
          className="flex flex-col gap-4 self-center h-full pt-6"
          style={{
            width: 1200,
          }}
        >
          {!applicant?.id ? (
            <RegisterApplicantPage />
          ) : (
            <div className="flex flex-row gap-4 w-full">
              <NavigationMenu buttons={routes} />
              <div className="w-full pb-6">
                <Routes>
                  <Route path="/" element={<ApplicantProfilePage />} />
                  <Route path="/resume" element={<ApplicantResumePage />} />
                  <Route
                    path="/resume/create"
                    element={<ApplicantResumeCreatePage />}
                  />
                  <Route
                    path="/resume/edit"
                    element={<ApplicantResumeEditPage />}
                  />
                  <Route
                    path="/vacancy"
                    element={<VacanciesApplicantListPage />}
                  />
                  <Route
                    path="/vacancy/:id"
                    element={<VacancyPageApplicant />}
                  />
                  {/* 
            
            <Route path="/resume" element={<ResumesListPage />} />
            <Route path="/resume/:id" element={<ResumePage />} /> */}
                </Routes>
              </div>
            </div>
          )}
        </div>
      </div>
      <CreateVacancyRespondModal />
    </>
  );
});
