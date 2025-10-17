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

export const CreateVacancyApplicationModal = observer(() => {
  const { vacancy, note } = vacanciesApplicantStore.vacancyRespond;
  const { resume } = applicantStore;

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
      isOpen={Boolean(vacancy)}
      onClose={() => vacanciesApplicantStore.resetVacacnyRespond()}
    >
      <ModalContent>
        <ModalHeader>Отклик</ModalHeader>

        <ModalBody className="flex flex-col gap-2">
          {resumeRender()}
          <Textarea
            value={note}
            onChange={(e) => vacanciesApplicantStore.setNote(e.target.value)}
            placeholder="Сопроводительное письмо"
          />
        </ModalBody>
        <ModalFooter>
          <Button
            onPress={() => vacanciesApplicantStore.resetVacacnyRespond()}
            variant="flat"
          >
            Отмена
          </Button>
          <Button
            onPress={() => vacanciesApplicantStore.sendVacancyRespond()}
            color="primary"
          >
            Отправить
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});
