import { Button, Input, Snippet } from "@heroui/react";
import { observer } from "mobx-react-lite";
import type { TCompany } from "../../api/companyApi";
import { companyStore } from "./companyStore";
import { AvatarImage } from "../../components/AvatarImage";
import { FileInput } from "../../components/FileInput";

export const CompanyProfileCard = observer<{
  company: TCompany;
}>((props) => {
  const { company } = props;

  const { login, name } = company;

  const { companyLogoSrc, companyName, hasChanges } = companyStore;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-4">
        <div className="flex flex-col gap-2 items-center">
          <AvatarImage
            name={name}
            width={128}
            height={128}
            avatar={companyLogoSrc}
          />

          <FileInput
            text="Загрузить логотип"
            onFileUpload={(file) => companyStore.updateCompanyLogo(file)}
            allowedFileExts={[".png", ".jpg", ".svg"]}
          />
        </div>

        <div className="flex flex-col w-full gap-2">
          <Input
            value={companyName}
            onChange={(e) => companyStore.setCompanyName(e.target.value)}
            label="Название компании"
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
            onPress={() => companyStore.updateCompany()}
            color="primary"
          >
            Сохранить
          </Button>
          <Button
            isDisabled={!hasChanges}
            onPress={() => companyStore.resetChanges()}
            color="secondary"
          >
            Отмена
          </Button>
        </div>
      </div>
    </div>
  );
});
