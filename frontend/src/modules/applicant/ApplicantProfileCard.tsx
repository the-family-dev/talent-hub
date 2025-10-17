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

  const { login, name } = applicant;

  const { applicantAvatarSrc, hasChanges, applicantName } = applicantStore;

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

        <div className="flex flex-col w-full gap-2">
          <Input
            value={applicantName}
            onChange={(e) => applicantStore.setApplicantName(e.target.value)}
            label="ФИО"
          />
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
        </div>
        <div className="flex flex-col gap-2">
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
            color="secondary"
          >
            Отмена
          </Button>
        </div>
      </div>
    </div>
  );
});
