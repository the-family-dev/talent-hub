import { DocumentIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";
import { observer } from "mobx-react-lite";

export const OpenPdfButton = observer<{
  pdfUrl?: string;
}>(({ pdfUrl }) => {
  const handleOpenPdf = () => {
    window.open(pdfUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <Button
      isDisabled={!pdfUrl}
      onPress={handleOpenPdf}
      className="flex items-center gap-2 w-min"
      color="primary"
    >
      <DocumentIcon className="w-5 h-5" />
      Открыть PDF
    </Button>
  );
});
