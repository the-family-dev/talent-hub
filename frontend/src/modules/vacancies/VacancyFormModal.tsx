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
import { TagInput } from "../../components/TagInput";
import { ExperienceDropdown } from "../../components/ExperienceDropdown";
import { EmploymentDropdown } from "../../components/EmploymentDropdown";
import { makeAutoObservable } from "mobx";
import type { TCreateEditVacancy } from "../../api/companyVacanciesApi";
import { useMemo } from "react";
import type { EmploymentType, ExperienceLevel } from "../../types/rootTypes";

class VacancyFormStore {
  vacancyForm: TCreateEditVacancy;

  constructor(vacancy: TCreateEditVacancy) {
    this.vacancyForm = vacancy;
    makeAutoObservable(this);
  }

  public setVacancyTitle(title: string) {
    this.vacancyForm.title = title;
  }

  public setVacancyDescription(description?: string) {
    this.vacancyForm.description = description;
  }

  public setVacancySlaryTo(salary?: number) {
    this.vacancyForm.salaryTo = salary;
  }

  public setVacancySlaryFrom(salary?: number) {
    this.vacancyForm.salaryFrom = salary;
  }

  public setVacancyIsRemote(isRemote: boolean) {
    this.vacancyForm.isRemote = isRemote;
  }

  public setVacancyEmploymentType(employmentType: EmploymentType) {
    this.vacancyForm.employmentType = employmentType;
  }

  public setVacancyExperienceLevel(experienceLevel: ExperienceLevel) {
    this.vacancyForm.experienceLevel = experienceLevel;
  }

  public setVacancyTags(tags: string[]) {
    this.vacancyForm.tags = tags;
  }

  public setVacancyLocation(location: string) {
    this.vacancyForm.location = location;
  }
}

export const VacancyFormModal = observer<{
  modalTitle: string;
  confirmText: string;
  vacancy: TCreateEditVacancy;
  onClose: () => void;
  onConfirm: (vacancy: TCreateEditVacancy) => void;
}>((props) => {
  const { vacancy, modalTitle, confirmText, onClose, onConfirm } = props;

  const store = useMemo(() => new VacancyFormStore(vacancy), [vacancy]);

  const {
    description,
    title,
    isRemote,
    salaryFrom,
    salaryTo,
    location,
    tags,
    experienceLevel,
    employmentType,
  } = store.vacancyForm;

  return (
    <Modal onClose={onClose} isOpen size="5xl">
      <ModalContent>
        <ModalHeader>{modalTitle}</ModalHeader>
        <ModalBody>
          <div className="flex flex-row gap-2">
            <Input
              label={"Название вакансии"}
              value={title}
              onChange={(event) => store.setVacancyTitle(event.target.value)}
            />
            <NumberInput
              label="Зарплата от, ₽"
              value={salaryFrom}
              hideStepper
              minValue={0}
              isClearable
              formatOptions={{
                useGrouping: true,
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }}
              onValueChange={(v) => store.setVacancySlaryFrom(v)}
            />
            <NumberInput
              label="Зарплата до, ₽"
              value={salaryTo}
              hideStepper
              minValue={0}
              isClearable
              formatOptions={{
                useGrouping: true,
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }}
              onValueChange={(v) => store.setVacancySlaryTo(v)}
            />
            <Input
              label={"Город"}
              value={location}
              onChange={(event) => store.setVacancyLocation(event.target.value)}
            />
            <Switch
              isSelected={isRemote}
              onValueChange={(value) => store.setVacancyIsRemote(value)}
              color="primary"
              size="sm"
            >
              Удаленный формат
            </Switch>
          </div>

          <div className="flex flex-row gap-2">
            <TagInput
              label="Ключевые слова"
              tags={tags}
              onChange={(tags) => store.setVacancyTags(tags)}
            />
            <ExperienceDropdown
              value={experienceLevel}
              onChange={(value) => store.setVacancyExperienceLevel(value)}
            />
            <EmploymentDropdown
              value={employmentType}
              onChange={(value) => store.setVacancyEmploymentType(value)}
            />
          </div>

          <MDEditor
            height={500}
            visibleDragbar={false}
            value={description}
            onChange={(value) => store.setVacancyDescription(value)}
          />
        </ModalBody>
        <ModalFooter className="flex flex-riw justify-between">
          <Button onPress={onClose}>Отмена</Button>
          <Button onPress={() => onConfirm(store.vacancyForm)} color="primary">
            {confirmText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});
