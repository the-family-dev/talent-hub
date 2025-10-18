import { Button, Input, Snippet } from "@heroui/react";
import { observer } from "mobx-react-lite";
import { AvatarImage } from "../../components/AvatarImage";
import { FileInput } from "../../components/FileInput";
import { universityStore } from "./universityStore";
import { getFileSrc } from "../../api";

export const UniversityProfilePage = observer(() => {
  const { university, hasChanges } = universityStore;

  if (university === undefined) return null;

  const { login, name, logoUrl } = university;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-4">
        <div className="flex flex-col gap-2 items-center">
          <AvatarImage
            name={name}
            width={128}
            height={128}
            avatar={getFileSrc(logoUrl)}
          />

          <FileInput
            text="Загрузить логотип"
            onFileUpload={(file) => universityStore.updateLogo(file)}
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
                universityStore.setUniversityField("name", e.target.value)
              }
              label="Название компании"
              className="w-s"
            />
          </div>
          <div className="flex flex-row justify-end gap-2">
            <Button
              isDisabled={!hasChanges}
              onPress={() => universityStore.updateUniversity()}
              color="primary"
            >
              Сохранить
            </Button>
            <Button
              isDisabled={!hasChanges}
              onPress={() => universityStore.resetChanges()}
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
