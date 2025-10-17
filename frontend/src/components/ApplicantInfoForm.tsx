import { Input } from "@heroui/react";
import { observer } from "mobx-react-lite";
import type { TApplicant } from "../api/applicantApi";
import { applicantStore } from "../modules/applicant/applicantStore";
import { useLocation } from "react-router";

export const ApplicantInfoForm = observer<{
  applicant: TApplicant;
}>((props) => {
  const { applicant } = props;
  const { name, phone, email, telegram } = applicant;
  const location = useLocation();
  const isApplicantPath = location.pathname.includes("/applicant");
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2">
        <Input
          value={name}
          onChange={(e) =>
            applicantStore.setApplicantField("name", e.target.value)
          }
          label="ФИО"
          size="sm"
        />
        <Input
          errorMessage="Введите корректный номер телефона в формате +79991234567"
          pattern="^\+?\d{10,15}$"
          label="Номер телефона"
          value={phone ?? ""}
          onChange={(e) =>
            applicantStore.setApplicantField("phone", e.target.value)
          }
          size="sm"
        />
      </div>
      <div className="flex flex-row gap-2">
        <Input
          value={telegram ?? ""}
          onChange={(e) =>
            applicantStore.setApplicantField("telegram", e.target.value)
          }
          label="Telegram"
          size="sm"
        />
        <Input
          value={email ?? ""}
          onChange={(e) =>
            applicantStore.setApplicantField("email", e.target.value)
          }
          label="Эл. почта"
          size="sm"
        />
      </div>
    </div>
  );
});
