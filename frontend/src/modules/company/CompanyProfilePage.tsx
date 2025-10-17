import { companyStore } from "./companyStore";
import { CompanyProfileCard } from "./CompanyProfileCard";

export const CompanyProfilePage = () => {
  const { company } = companyStore;

  return <div>{company ? <CompanyProfileCard company={company} /> : null}</div>;
};
