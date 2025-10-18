import { observer } from "mobx-react-lite";
import { useState } from "react";
import { FileInput } from "./FileInput";
import {
  XMarkIcon,
  DocumentIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";
import { formatFileSize } from "../utils/utils";

type TMultiFileSelectProps = {
  text: string;
  allowedFileExts: string[];
  files?: File[];
  onChange: (files: File[]) => void;
};

export const MultiFileSelect = observer<TMultiFileSelectProps>((props) => {
  const { text, allowedFileExts, files = [], onChange } = props;
  const [selectedFiles, setSelectedFiles] = useState<File[]>(files);

  const handleFilesUpload = (uploadedFile: File) => {
    const newFiles = [...selectedFiles, uploadedFile];
    setSelectedFiles(newFiles);
    onChange(newFiles);
  };

  const handleFileRemove = (fileToRemove: File) => {
    const newFiles = selectedFiles.filter((f) => f !== fileToRemove);
    setSelectedFiles(newFiles);
    onChange(newFiles);
  };

  const handleClearAll = () => {
    setSelectedFiles([]);
    onChange([]);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Кнопка добавления файлов */}
      <FileInput
        text={text}
        allowedFileExts={allowedFileExts}
        onFileUpload={handleFilesUpload}
      />

      {/* Если есть выбранные файлы — показать список */}
      {selectedFiles.length > 0 && (
        <div className="flex flex-col gap-2 rounded-lg border border-primary border-dashed p-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-semibold text-primary">
              Выбранные файлы ({selectedFiles.length})
            </span>
            <Button
              size="sm"
              color="danger"
              variant="light"
              onPress={handleClearAll}
              startContent={<TrashIcon className="size-4" />}
            >
              Очистить всё
            </Button>
          </div>

          <div className="flex flex-col gap-2">
            {selectedFiles.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-md border border-default-200 px-3 py-2"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <DocumentIcon className="size-5 flex-shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-medium truncate">
                      {file.name}
                    </span>
                    <span className="text-xs text-default-500">
                      {formatFileSize(file.size)}
                    </span>
                  </div>
                </div>
                <Button
                  onPress={() => handleFileRemove(file)}
                  color="danger"
                  variant="light"
                  isIconOnly
                >
                  <XMarkIcon className="size-5" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});
