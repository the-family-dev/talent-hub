import { observer } from "mobx-react-lite";
import type { TVAcancyInternship } from "../../api/companyVacanciesApi";
import { AvatarImage } from "../../components/AvatarImage";
import { getFileSrc } from "../../api";
import { LabelWithIcon } from "../../components/LabelWithIcon";
import { BuildingOffice2Icon, ShareIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";
import { routerStore } from "../router/routerStore";

export const VacancyInternshipCard = observer<{
  internship: TVAcancyInternship;
}>(({ internship }) => {
  const { university, location, title } = internship;

  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="font-bold text-2xl">{title}</div>
      <div className="flex flex-row gap-2">
        <div className="flex flex-row gap-2 items-center">
          <AvatarImage
            name={university.name}
            width={32}
            height={32}
            avatar={getFileSrc(university.logoUrl)}
          />
          <div className="font-medium text-x2">{university.name}</div>
        </div>
        <LabelWithIcon
          label={location ?? "Не указано"}
          icon={BuildingOffice2Icon}
        />
      </div>

      <Button
        color="primary"
        className="w-min"
        variant="light"
        onPress={() =>
          routerStore.navigate?.(`/company/internship/${internship.id}`)
        }
      >
        Перейти к стажировке
        <ShareIcon className="size-6" />
      </Button>
    </div>
  );
});
