import { Button, Input, NumberInput } from "@heroui/react";
import { observer } from "mobx-react-lite";
import MDEditor from "@uiw/react-md-editor";
import { TagInput } from "../../components/TagInput";
import { ExperienceDropdown } from "../../components/ExperienceDropdown";
import { makeAutoObservable } from "mobx";
import type { TCreateResume } from "../../api/applicantResumeApi";
import { useMemo } from "react";
import type { ExperienceLevel } from "../../types/rootTypes";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

class ResumeFormStore {
  resumeForm: TCreateResume;

  constructor(resume: TCreateResume) {
    this.resumeForm = resume;
    makeAutoObservable(this);
  }

  public setResumeTitle(title: string) {
    this.resumeForm.title = title;
  }

  public setResumeDescription(description?: string) {
    this.resumeForm.description = description;
  }

  public setResumeSalaryFrom(salaryFrom?: number) {
    this.resumeForm.salaryFrom = salaryFrom;
  }

  public setResumeSalaryTo(salaryTo?: number) {
    this.resumeForm.salaryTo = salaryTo;
  }

  public setResumeLocation(location?: string) {
    this.resumeForm.location = location;
  }

  public setResumeTags(tags: string[]) {
    this.resumeForm.tags = tags;
  }

  public setResumeExperienceLevel(experienceLevel: ExperienceLevel) {
    this.resumeForm.experienceLevel = experienceLevel;
  }
}

export const ApplicantResumeForm = observer<{
  modalTitle: string;
  confirmText: string;
  resume: TCreateResume;
  onClose: () => void;
  onConfirm: (resume: TCreateResume) => void;
}>((props) => {
  const { resume, modalTitle, confirmText, onClose, onConfirm } = props;

  const store = useMemo(() => new ResumeFormStore(resume), [resume]);

  const {
    title,
    description,
    salaryFrom,
    salaryTo,
    location,
    tags,
    experienceLevel,
  } = store.resumeForm;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-2">
        <Button color="primary" onPress={onClose} className="w-min">
          <ArrowLeftIcon className="size-6" /> Назад
        </Button>
        <div className="font-bold text-3xl">{modalTitle}</div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2">
          <Input
            label="Название резюме"
            value={title}
            onChange={(e) => store.setResumeTitle(e.target.value)}
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
            onValueChange={(v) => store.setResumeSalaryFrom(v)}
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
            onValueChange={(v) => store.setResumeSalaryTo(v)}
          />
          <Input
            label="Отрасль"
            value={location}
            onChange={(e) => store.setResumeLocation(e.target.value)}
          />
        </div>

        <div className="flex flex-row gap-2">
          <TagInput
            label="Ключевые навыки"
            tags={tags}
            onChange={(t) => store.setResumeTags(t)}
          />
          <ExperienceDropdown
            value={experienceLevel}
            onChange={(v) => store.setResumeExperienceLevel(v)}
          />
        </div>

        <MDEditor
          height={600}
          value={description}
          onChange={(value) => store.setResumeDescription(value)}
        />
      </div>
      <div className="flex flex-row justify-between">
        <Button onPress={onClose}>Отмена</Button>
        <Button onPress={() => onConfirm(store.resumeForm)} color="primary">
          {confirmText}
        </Button>
      </div>
    </div>
  );
});
