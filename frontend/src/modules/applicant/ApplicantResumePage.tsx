import { observer } from "mobx-react-lite";
import { applicantStore } from "./applicantStore";
import { Button, Skeleton } from "@heroui/react";
import { routerStore } from "../router/routerStore";
import { ApplicantResumeViewer } from "./ApplicanrResumeViewer";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ConfirmationWrapper } from "../../components/ConfirmationWrapper";
import { FileInput } from "../../components/FileInput";

export const ApplicantResumePage = observer(() => {
  const { resume, resumePdfUrl } = applicantStore;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between">
        <h1 className="font-bold text-3xl">Резюме</h1>
        <div className="flex flex-row gap-2 items-center">
          <FileInput
            text="Загрузить pdf"
            onFileUpload={(pdf) => applicantStore.uploadPdf(pdf)}
            allowedFileExts={[".pdf"]}
          />
          <Button
            isIconOnly
            variant="light"
            color="secondary"
            className="w-min"
            onPress={() => routerStore.navigate?.("/applicant/resume/edit")}
          >
            <PencilIcon className="size-6" />
          </Button>
          <ConfirmationWrapper
            title="Удаление резюме"
            message={`Вы уверенны что хотите удалить резюме?\nПосле удаления вернуть её не получится.`}
            confirmText="Удалить"
            onConfirm={() => applicantStore.deleteResume()}
            color="danger"
          >
            <Button isIconOnly variant="light" color="danger" className="w-min">
              <TrashIcon className="size-6" />
            </Button>
          </ConfirmationWrapper>
        </div>
      </div>

      {(() => {
        if (resume === null) {
          return (
            <div className="flex flex-col gap-2 w-full  py-8 justify-center items-center">
              <div className=" text-default-500">
                У вас еще не созданного резюме
              </div>
              <Button
                className="w-min"
                color="success"
                onPress={() =>
                  routerStore.navigate?.("/applicant/resume/create")
                }
              >
                Создать
              </Button>
            </div>
          );
        }

        if (resume === undefined) {
          return <Skeleton />;
        }

        return (
          <ApplicantResumeViewer resume={{ ...resume, pdfUrl: resumePdfUrl }} />
        );
      })()}
    </div>
  );
});
