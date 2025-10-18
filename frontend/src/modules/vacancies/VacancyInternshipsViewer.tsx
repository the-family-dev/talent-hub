import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  useDisclosure,
} from "@heroui/react";
import { observer } from "mobx-react-lite";
import { BuildingOffice2Icon, ShareIcon } from "@heroicons/react/24/outline";
import type { ICompanyVacancy } from "../../api/companyVacanciesApi";
import { routerStore } from "../router/routerStore";

export const VacancyInternshipsViewer = observer<{
  vacancy: ICompanyVacancy;
}>((props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { vacancy } = props;

  const { internships } = vacancy;

  return (
    <>
      <Button color="secondary" onPress={onOpen}>
        <BuildingOffice2Icon className="size-6" />
        Стажировки
      </Button>
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent className="[&>button]:hidden">
          <DrawerBody className="mt-6 flex flex-col">
            <div className="font-bold text-xl">
              Стажировки от университетов
            </div>
            <div className="flex flex-col gap-2">
              {internships.map((internship) => {
                return (
                  <Button
                    color="primary"
                    variant="light"
                    onPress={() =>
                      routerStore.navigate?.(
                        `/company/internship/${internship.id}`
                      )
                    }
                  >
                    {internship.title}
                    <ShareIcon className="size-6" />
                  </Button>
                );
              })}
            </div>
          </DrawerBody>
          <DrawerFooter className="flex flex-row justify-end"></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
});
