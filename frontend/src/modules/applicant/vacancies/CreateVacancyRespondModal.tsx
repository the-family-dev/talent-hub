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
import type { ExperienceLevel } from "../../../types/rootTypes";

export const CreateVacancyRespondModal = observer(() => {
  const location = useLocation();
  const isApplicantPath = location.pathname.includes("/applicant");
  const { vacancy, note } = isApplicantPath
    ? vacanciesApplicantStore.vacancyRespond
    : vacanciesNoauthStore.vacancyRespond;

  const { resume, publicApplicant } = applicantStore;
  const { name, phone, email, telegram } = publicApplicant;
  const resumeRender = () => {
    if (resume) {
      return (
        <Card>
          <CardBody>{resume.title}</CardBody>
        </Card>
      );
    }
  };

  const isDisabledButton = !isApplicantPath && (!name || !phone || !email);

  const handleSendResume = () => {
    if (isApplicantPath) {
      vacanciesApplicantStore.sendVacancyRespond({
        vacancyId: vacancy?.id as string,
        resumeId: resume?.id as string,
        note: note,
      });
      return;
    }
    vacanciesNoauthStore.sendVacancyRespond({
      title: vacancy?.experienceLevel ?? "",
      vacancyId: vacancy?.id as string,
      note: note,
      name,
      phone,
      email,
      telegram,
      experienceLevel: vacancy?.experienceLevel as ExperienceLevel,
    });
    handleCloseModal();
  };

  const handleCloseModal = () => {
    applicantStore.resetPublicApplicant();
    vacanciesApplicantStore.resetVacancyRespond();
    vacanciesNoauthStore.resetVacancyRespond();
  };

  return (
    <Modal isOpen={Boolean(vacancy?.id)} onClose={handleCloseModal}>
      <ModalContent>
        <ModalHeader>Отклик</ModalHeader>

        <ModalBody className="flex flex-col gap-2">
          {resumeRender()}
          {!isApplicantPath && (
            <ApplicantInfoForm applicant={publicApplicant} />
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
          <Button onPress={handleCloseModal} variant="flat">
            Отмена
          </Button>
          <Button
            onPress={handleSendResume}
            color="primary"
            disabled={isDisabledButton}
            className={isDisabledButton ? "opacity-50 cursor-not-allowed" : ""}
          >
            Отправить
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});
