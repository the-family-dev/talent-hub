import { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Select,
  SelectItem,
} from "@heroui/react";
import { observer } from "mobx-react-lite";
import { vacanciesStore } from "./vacanciesStore";

export const VacancyInternshipAccespButton = observer(() => {
  const [isOpen, setIsOpen] = useState(false);

  const { vacanciesInternship, internshipVacancyId } = vacanciesStore;

  const selcted = internshipVacancyId ? [internshipVacancyId] : [];

  useEffect(() => {
    vacanciesStore.fetchVacanciesForInternshipt();
  }, []);

  const handleConfirm = () => {
    // Здесь твоя логика при подтверждении
    console.log("Подтверждено:", selcted);

    vacanciesStore.linkInternshipToVacancy();

    // Закрыть окно
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
    vacanciesStore.setInternshipVacancyId(undefined);
  };

  return (
    <>
      <Button
        variant="light"
        color="primary"
        className="w-min"
        onPress={() => setIsOpen(true)}
      >
        Принять на стажировку
      </Button>

      <Modal isOpen={isOpen} onClose={handleCancel}>
        <ModalContent>
          <ModalHeader className="text-lg font-semibold">
            Принять на стажировку
          </ModalHeader>
          <ModalBody>
            <p>Выберите вариант вкансию для стажировки</p>
            <Select
              label="Варианты"
              placeholder="Выберите вакансию"
              selectedKeys={selcted}
              onSelectionChange={(keys) => {
                const value = Array.from(keys)[0] as string;
                vacanciesStore.setInternshipVacancyId(value);
              }}
            >
              {vacanciesInternship.map((vacancy) => (
                <SelectItem key={vacancy.id}>{vacancy.title}</SelectItem>
              ))}
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={handleCancel}>
              Отмена
            </Button>
            <Button color="primary" onPress={handleConfirm}>
              Подтвердить
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
});
