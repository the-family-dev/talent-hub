import {
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  useDisclosure,
} from "@heroui/react";
import { observer } from "mobx-react-lite";
import { BuildingOffice2Icon } from "@heroicons/react/24/outline";
import type { ICompanyVacancy } from "../../api/companyVacanciesApi";
import { VacancyInternshipCard } from "./VacancyInternshipCard";

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
          <DrawerBody className="flex flex-col">
            <div className="font-bold text-xl">Стажировки от университетов</div>
            <div className="flex flex-col gap-2">
              {internships.map((internship, index) => {
                return (
                  <>
                    <VacancyInternshipCard
                      key={internship.id}
                      internship={internship}
                    />
                    {index !== internships.length - 1 ? (
                      <Divider
                        className="w-full h-0.5"
                        orientation="horizontal"
                      />
                    ) : null}
                  </>
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
