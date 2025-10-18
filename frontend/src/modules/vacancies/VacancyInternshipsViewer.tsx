import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  useDisclosure,
} from "@heroui/react";
import { observer } from "mobx-react-lite";
import { DocumentIcon, XMarkIcon } from "@heroicons/react/24/outline";
import type { ICompanyVacancy } from "../../api/companyVacanciesApi";

export const VacancyInternshipsViewer = observer<{
  vacancy: ICompanyVacancy;
}>((props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { vacancy } = props;

  const { internships } = vacancy;

  return (
    <>
      <Button color="secondary" onPress={onOpen}>
        <DocumentIcon className="size-6" />
        Посмотреть стажировки
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
                {internships.map((internship) => {
                  return (
                    <div key={internship.id} className="">
                      {internship.title}
                    </div>
                  );
                })}
              </DrawerBody>
              <DrawerFooter className="flex flex-row justify-end"></DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
});
