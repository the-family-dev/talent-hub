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
import { DocumentIcon } from "@heroicons/react/24/outline";
import { ResumeViewer } from "../../components/ResumeViewer";

export const VacancyApplicationResumeViewer = observer<{
  resume: TVAcancyApplicationResume;
}>((props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { resume } = props;

  const { title, description, experienceLevel } = resume;

  return (
    <>
      <Button color="secondary" onPress={onOpen}>
        <DocumentIcon className="size-6" />
        Посмотреть резюме
      </Button>
      <Drawer size="5xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerBody>
                <ResumeViewer
                  tags={[]}
                  title={title}
                  description={description}
                  experienceLevel={experienceLevel}
                />
              </DrawerBody>
              <DrawerFooter className="flex flex-row justify-start">
                <Button onPress={onClose}>Закрыть</Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
});
