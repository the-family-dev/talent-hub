import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  NumberInput,
  Switch,
} from "@heroui/react";
import { observer } from "mobx-react-lite";
import MDEditor from "@uiw/react-md-editor";
import { vacanciesStore } from "./vacanciesStore";
import { TagInput } from "../../components/TagInput";
import { ExperienceDropdown } from "../../components/ExperienceDropdown";
import { EmploymentDropdown } from "../../components/EmploymentDropdown";

export const CreateVacancyModal = observer(() => {
  const { isCreateModalOpen, createVacancyForm } = vacanciesStore;

  const {
    description,
    title,
    isRemote,
    isActive,
    salary,
    location,
    tags,
    experienceLevel,
    employmentType,
  } = createVacancyForm;

  return (
    <Modal
      onClose={() => vacanciesStore.setCreateModalOpen(false)}
      isOpen={isCreateModalOpen}
      size="5xl"
    >
      <ModalContent>
        <ModalHeader>Создание вакансии</ModalHeader>
        <ModalBody>
          <div className="flex flex-row gap-2">
            <Input
              label={"Название вакансии"}
              value={title}
              onChange={(event) =>
                vacanciesStore.setVacancyTitle(event.target.value)
              }
            />
            <NumberInput
              value={salary}
              label="Зарплата, ₽"
              hideStepper
              minValue={0}
              formatOptions={{
                useGrouping: true,
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }}
              isClearable
              onValueChange={(value) => vacanciesStore.setVacancySlary(value)}
            />
            <Input
              label={"Город"}
              value={location}
              onChange={(event) =>
                vacanciesStore.setVacancyLocation(event.target.value)
              }
            />
            <Switch
              isSelected={isRemote}
              onValueChange={(value) =>
                vacanciesStore.setVacancyIsRemote(value)
              }
              color="primary"
              size="sm"
            >
              Удаленный формат
            </Switch>
            <Switch
              isSelected={isActive}
              onValueChange={(value) =>
                vacanciesStore.setVacancyIsActive(value)
              }
              color="primary"
              size="sm"
            >
              Активность
            </Switch>
          </div>

          <div className="flex flex-row gap-2">
            <TagInput
              label="Ключевые слова"
              tags={tags}
              onChange={(tags) => vacanciesStore.setVacancyTags(tags)}
            />
            <ExperienceDropdown
              value={experienceLevel}
              onChange={(value) =>
                vacanciesStore.setVacancyExperienceLevel(value)
              }
            />
            <EmploymentDropdown
              value={employmentType}
              onChange={(value) =>
                vacanciesStore.setVacancyEmploymentType(value)
              }
            />
          </div>

          <MDEditor
            height={500}
            visibleDragbar={false}
            value={description}
            onChange={(value) => vacanciesStore.setVacancyDescription(value)}
          />
        </ModalBody>
        <ModalFooter className="flex flex-riw justify-between">
          <Button onPress={() => vacanciesStore.setCreateModalOpen(false)}>
            Отмена
          </Button>
          <Button onPress={() => vacanciesStore.addVacancy()} color="primary">
            Создать
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});
