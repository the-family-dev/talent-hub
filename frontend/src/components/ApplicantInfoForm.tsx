import { Input } from "@heroui/react";
import { observer } from "mobx-react-lite";
import { applicantStore } from "../modules/applicant/applicantStore";

export const ApplicantInfoForm = observer(() => {
  const { applicant } = applicantStore;

  if (applicant === undefined) return null;

  const { name, phone, email, telegram } = applicant;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2">
        <Input
          required
          value={name}
          onChange={(e) =>
            applicantStore.setApplicantField("name", e.target.value)
          }
          label="ФИО"
          size="sm"
        />
        <Input
          required
          errorMessage="Введите корректный номер телефона в формате +79991234567."
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
          errorMessage="Введите корректный email."
          pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
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
