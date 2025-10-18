import { Input } from "@heroui/react";
import { observer } from "mobx-react-lite";
import type { TApplicant } from "../api/applicantApi";
import { applicantStore } from "../modules/applicant/applicantStore";
import { useLocation } from "react-router";
import type { TPublicApplicationInput } from "../api/applicationApi";

export const ApplicantInfoForm = observer<{
  applicant: TApplicant | TPublicApplicationInput;
}>((props) => {
  const location = useLocation();
  const isApplicantPath = location.pathname.includes("/applicant");
  const { applicant } = props;
  const { name, phone, email, telegram } = applicant;

  const handleFieldChange = <
    T extends TApplicant & TPublicApplicationInput,
    K extends keyof T
  >(
    field: K,
    value: T[K]
  ) => {
    if (isApplicantPath) {
      applicantStore.setApplicantField(
        field as keyof TApplicant,
        value as TApplicant[keyof TApplicant]
      );
      return;
    }

    applicantStore.setPublicApplicantField(
      field as keyof TPublicApplicationInput,
      value as TPublicApplicationInput[keyof TPublicApplicationInput]
    );
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2">
        <Input
          required
          value={name}
          onChange={(e) => handleFieldChange("name", e.target.value)}
          label="ФИО"
          size="sm"
        />
        <Input
          required
          errorMessage="Введите корректный номер телефона в формате +79991234567."
          pattern="^\+?\d{10,15}$"
          label="Номер телефона"
          value={phone ?? ""}
          onChange={(e) => handleFieldChange("phone", e.target.value)}
          size="sm"
        />
      </div>
      <div className="flex flex-row gap-2">
        <Input
          value={telegram ?? ""}
          onChange={(e) => handleFieldChange("telegram", e.target.value)}
          label="Telegram"
          size="sm"
        />
        <Input
          errorMessage="Введите корректный email."
          pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
          value={email ?? ""}
          onChange={(e) => handleFieldChange("email", e.target.value)}
          label="Эл. почта"
          size="sm"
        />
      </div>
    </div>
  );
});
