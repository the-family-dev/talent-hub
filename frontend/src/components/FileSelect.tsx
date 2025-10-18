import { observer } from "mobx-react-lite";
import { FileInput } from "./FileInput";
import { XMarkIcon, DocumentIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";
import { formatFileSize } from "../utils/utils";

type TFileSelectProps = {
  text: string;
  allowedFileExts: string[];
  file?: File | undefined;
  onChange: (file: File | undefined) => void;
};

export const FileSelect = observer<TFileSelectProps>((props) => {
  const { text, allowedFileExts, file, onChange } = props;

  const handleFileUpload = (uploadedFile: File) => {
    onChange(uploadedFile);
  };

  const handleClear = () => {
    onChange(undefined);
  };

  if (file === undefined) {
    return (
      <FileInput
        text={text}
        allowedFileExts={allowedFileExts}
        onFileUpload={handleFileUpload}
      />
    );
  }

  return (
    <div className="flex items-center justify-between rounded-lg border border-primary border-dashed px-3 py-2">
      <div className="flex items-center gap-2 min-w-0">
        <DocumentIcon className="size-5 flex-shrink-0" />
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-medium truncate">{file.name}</span>
          <span className="text-xs text-default-500">
            {formatFileSize(file.size)}
          </span>
        </div>
      </div>
      <Button onPress={handleClear} color="danger" variant="light" isIconOnly>
        <XMarkIcon className="size-5" />
      </Button>
    </div>
  );
});
