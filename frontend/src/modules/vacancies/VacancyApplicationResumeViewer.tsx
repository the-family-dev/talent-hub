import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  useDisclosure,
} from "@heroui/react";
import { observer } from "mobx-react-lite";
import type { TVAcancyApplicationResume } from "../../api/companyVacanciesApi";
import { DocumentIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ResumeViewer } from "../../components/ResumeViewer";

export const VacancyApplicationResumeViewer = observer<{
  resume: TVAcancyApplicationResume;
}>((props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { resume } = props;

  const { title, description, experienceLevel, user } = resume;

  return (
    <>
      <Button color="secondary" onPress={onOpen}>
        <DocumentIcon className="size-6" />
        Посмотреть резюме
      </Button>
      <Drawer size="5xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent className="[&>button]:hidden">
          {(onClose) => (
            <>
              <DrawerBody className="mt-6 relative">
                <Button
                  color="primary"
                  onPress={onClose}
                  className="absolute top-2 right-6"
                >
                  <XMarkIcon className="size-6" />
                  Закрыть
                </Button>
                <ResumeViewer
                  tags={[]}
                  title={title}
                  description={description}
                  experienceLevel={experienceLevel}
                  user={user}
                />
              </DrawerBody>
              <DrawerFooter className="flex flex-row justify-end"></DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
});
