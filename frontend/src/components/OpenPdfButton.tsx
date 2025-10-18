import { DocumentIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";
import { observer } from "mobx-react-lite";
import { getFileSrc } from "../api";

export const OpenPdfButton = observer<{
  pdfUrl?: string;
}>(({ pdfUrl }) => {
  const url = getFileSrc(pdfUrl);

  const handleOpenPdf = () => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Button
      isDisabled={!url}
      onPress={handleOpenPdf}
      className="flex items-center gap-2 w-min"
      color="secondary"
      variant="light"
      size="sm"
    >
      <DocumentIcon className="w-5 h-5" />
      Открыть PDF
    </Button>
  );
});
