import { ApplicantProfileCard } from "./ApplicantProfileCard";
import { applicantStore } from "./applicantStore";

export const ApplicantProfilePage = () => {
  const { applicant } = applicantStore;

  return (
    <div>
      {applicant ? <ApplicantProfileCard applicant={applicant} /> : null}
    </div>
  );
};
