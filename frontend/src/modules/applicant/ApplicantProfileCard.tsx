import { Button, Input, Snippet } from "@heroui/react";
import { observer } from "mobx-react-lite";
import { applicantStore } from "./applicantStore";
import type { TApplicant } from "../../api/applicantApi";
import { AvatarImage } from "../../components/AvatarImage";
import { FileInput } from "../../components/FileInput";

export const ApplicantProfileCard = observer<{
  applicant: TApplicant;
}>((props) => {
  const { applicant } = props;

  const { login, name, phone, email, telegram } = applicant;

  const { applicantAvatarSrc, hasChanges } = applicantStore;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-4">
        <div className="flex flex-col gap-2 items-center">
          <AvatarImage
            name={name}
            width={128}
            height={128}
            avatar={applicantAvatarSrc}
          />
          <FileInput
            text="Загрузить фото"
            onFileUpload={(file) => applicantStore.setNewPhoto(file)}
            allowedFileExts={[".png", ".jpg", ".svg"]}
          />
        </div>
        <div className="flex flex-col w-full gap-4">
          <div className="flex flex-col w-full gap-2">
            <Snippet
              tooltipProps={{
                children: "Скопировать логин",
              }}
              symbol={""}
              size="md"
              className="w-min"
            >
              {login}
            </Snippet>
            <Input
              value={name}
              onChange={(e) =>
                applicantStore.setApplicantField("name", e.target.value)
              }
              label="ФИО"
            />
            <Input
              errorMessage="Введите корректный номер телефона в формате +79991234567"
              pattern="^\+?\d{10,15}$"
              label="Номер телефона"
              value={phone ?? ""}
              onChange={(e) =>
                applicantStore.setApplicantField("phone", e.target.value)
              }
            />
            <Input
              value={telegram ?? ""}
              onChange={(e) =>
                applicantStore.setApplicantField("telegram", e.target.value)
              }
              label="Telegram"
            />
            <Input
              value={email ?? ""}
              onChange={(e) =>
                applicantStore.setApplicantField("email", e.target.value)
              }
              label="Эл. почта"
            />
          </div>
          <div className="flex flex-row gap-2">
            <Button
              isDisabled={!hasChanges}
              onPress={() => applicantStore.updateApplicantInfo()}
              color="primary"
            >
              Сохранить
            </Button>
            <Button
              isDisabled={!hasChanges}
              onPress={() => applicantStore.resetChanges()}
              color="default"
            >
              Отмена
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});
