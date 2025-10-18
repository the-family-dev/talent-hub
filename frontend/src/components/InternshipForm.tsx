import { Button, Input } from "@heroui/react";
import { observer } from "mobx-react-lite";
import MDEditor from "@uiw/react-md-editor";
import { makeAutoObservable } from "mobx";
import { useMemo } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import type { TCreateEditInternship } from "../api/internshipApi";
import { TagInput } from "./TagInput";
import { MultiFileSelect } from "./MultiFileSelect";

class InternshipFormStore {
  internshipForm: TCreateEditInternship;

  constructor(internship: TCreateEditInternship) {
    this.internshipForm = internship;
    makeAutoObservable(this);
  }

  public setTitle(title: string) {
    this.internshipForm.title = title;
  }

  public setDescription(description?: string) {
    this.internshipForm.description = description;
  }

  public setTags(tags: string[]) {
    this.internshipForm.tags = tags;
  }

  public setLocation(location: string) {
    this.internshipForm.location = location;
  }

  public setFiles(files: File[]) {
    this.internshipForm.files = files;
  }
}

export const InternshipForm = observer<{
  modalTitle: string;
  confirmText: string;
  internship: TCreateEditInternship;
  onClose: () => void;
  onConfirm: (internship: TCreateEditInternship) => void;
}>((props) => {
  const { internship, modalTitle, confirmText, onClose, onConfirm } = props;

  const store = useMemo(
    () => new InternshipFormStore(internship),
    [internship]
  );

  const { description, title, files, location, tags } = store.internshipForm;

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex flex-row gap-2 items-center">
        <div className="font-medium text-3xl w-full">{modalTitle}</div>
        <Button color="primary" onPress={onClose} className="w-min">
          <ArrowLeftIcon className="size-6" /> Назад
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-row w-full gap-2">
          <Input
            label="Название стажировки"
            value={title}
            onChange={(event) => store.setTitle(event.target.value)}
          />

          <Input
            label="Отрасль"
            value={location}
            onChange={(event) => store.setLocation(event.target.value)}
          />
        </div>

        <TagInput
          label="Ключевые слова"
          tags={tags}
          onChange={(tags) => store.setTags(tags)}
        />

        <MDEditor
          height={400}
          visibleDragbar={false}
          value={description}
          onChange={(value) => store.setDescription(value)}
        />

        <MultiFileSelect
          allowedFileExts={[".pdf"]}
          text="Загрузитье резюме стажеров"
          files={files}
          onChange={(value) => store.setFiles(value)}
        />
      </div>

      <div className="flex flex-row justify-between">
        <Button onPress={onClose}>Отмена</Button>
        <Button onPress={() => onConfirm(store.internshipForm)} color="primary">
          {confirmText}
        </Button>
      </div>
    </div>
  );
});
