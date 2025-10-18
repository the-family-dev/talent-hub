import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { FileInput } from "./FileInput";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Card, CardBody } from "@heroui/react";

type TFileSelectProps = {
  text: string;
  allowedFileExts: string[];
  file?: File | undefined; // ← добавлен внешний файл
  onChange: (file: File | undefined) => void; // теперь принимает и null при очистке
};

export const FileSelect = observer<TFileSelectProps>((props) => {
  const { text, allowedFileExts, file, onChange } = props;

  const [selectedFile, setSelectedFile] = useState<File | undefined>(
    file ?? undefined
  );

  // Синхронизация, если родитель передаст новый файл
  useEffect(() => {
    setSelectedFile(file ?? undefined);
  }, [file]);

  const handleFileUpload = (uploadedFile: File) => {
    setSelectedFile(uploadedFile);
    onChange(uploadedFile);
  };

  const handleClear = () => {
    setSelectedFile(undefined);
    onChange(undefined);
  };

  const formatFileSize = (size: number) => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <FileInput
        text={text}
        allowedFileExts={allowedFileExts}
        onFileUpload={handleFileUpload}
      />

      {selectedFile && (
        <Card className="mt-2 bg-gray-50 dark:bg-gray-800 shadow-sm">
          <CardBody className="flex items-center justify-between p-3">
            <div className="flex flex-col">
              <span className="text-sm font-medium">{selectedFile.name}</span>
              <span className="text-xs text-gray-500">
                {formatFileSize(selectedFile.size)}
              </span>
            </div>
            <button
              onClick={handleClear}
              className="text-gray-500 hover:text-red-500 transition-colors"
              title="Удалить файл"
            >
              <XMarkIcon className="size-5" />
            </button>
          </CardBody>
        </Card>
      )}
    </div>
  );
});
