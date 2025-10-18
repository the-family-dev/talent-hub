import { formatFileSize } from "../utils/utils";
import { DocumentIcon } from "@heroicons/react/24/outline";
import { observer } from "mobx-react-lite";
import { getFileSrc } from "../api";

interface PdfFileProps {
  name: string;
  url?: string;
  size?: number; // размер в байтах (опционально)
}

export const PdfFile = observer<PdfFileProps>(({ name, size, url }) => {
  const fileSrc = getFileSrc(url);

  const handleOpenPdf = () => {
    window.open(fileSrc, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="flex items-center justify-between rounded-md border border-default px-3 py-2 cursor-pointer"
      onClick={handleOpenPdf}
    >
      <div className="flex items-center gap-2 min-w-0">
        <DocumentIcon className="size-8 text-red-500" />
        <div className="flex flex-col min-w-0">
          <span className=" font-medium truncate">{name}</span>
          {size && (
            <span className="text-xs text-default-500">
              {formatFileSize(size)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
});
