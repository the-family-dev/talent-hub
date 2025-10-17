import {
  Button,
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@heroui/react";
import { observer } from "mobx-react-lite";
import { vacanciesApplicantStore } from "./vacanciesApplicantStore";
import { applicantStore } from "../applicantStore";
import { useLocation } from "react-router";
import { ApplicantInfoForm } from "../../../components/ApplicantInfoForm";
import { vacanciesNoauthStore } from "../../noauth/vacancies/vacanciesNoauthStore";

export const CreateVacancyRespondModal = observer(() => {
  const location = useLocation();
  const isApplicantPath = location.pathname.includes("/applicant");
  const { vacancy, note } = isApplicantPath
    ? vacanciesApplicantStore.vacancyRespond
    : vacanciesNoauthStore.vacancyRespond;
  const { resume, applicant } = applicantStore;

  const resumeRender = () => {
    if (resume) {
      return (
        <Card>
          <CardBody>{resume.title}</CardBody>
        </Card>
      );
    }
  };

  return (
    <Modal
      isOpen={Boolean(vacancy?.id)}
      onClose={() => {
        vacanciesApplicantStore.resetVacancyRespond();
        vacanciesNoauthStore.resetVacancyRespond();
      }}
    >
      <ModalContent>
        <ModalHeader>Отклик</ModalHeader>

        <ModalBody className="flex flex-col gap-2">
          {resumeRender()}
          {!isApplicantPath && applicant && (
            <ApplicantInfoForm
              applicant={{
                id: "",
                name: "",
                login: "",
                avatarUrl: undefined,
                phone: undefined,
                email: undefined,
                telegram: undefined,
              }}
            />
          )}
          <Textarea
            value={note}
            onChange={(e) =>
              isApplicantPath
                ? vacanciesApplicantStore.setNote(e.target.value)
                : vacanciesNoauthStore.setNote(e.target.value)
            }
            placeholder="Сопроводительное письмо"
          />
        </ModalBody>
        <ModalFooter>
          <Button
            onPress={() => vacanciesApplicantStore.resetVacancyRespond()}
            variant="flat"
          >
            Отмена
          </Button>
          <Button
            onPress={() =>
              isApplicantPath
                ? vacanciesApplicantStore.sendVacancyRespond({
                    vacancyId: vacancy?.id as string,
                    resumeId: resume?.id as string,
                    note: note,
                  })
                : vacanciesNoauthStore.sendVacancyRespond({
                    vacancyId: vacancy?.id as string,
                    note: note,
                  })
            }
            color="primary"
          >
            Отправить
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});
