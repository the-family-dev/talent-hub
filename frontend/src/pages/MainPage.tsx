import { observer } from "mobx-react-lite";
import { Button, Card, CardBody, CardHeader } from "@heroui/react";
import { useEffect } from "react";
import { store } from "../store/store";

export const MainPage = observer(() => {
  const { vacancies } = store;

  useEffect(() => {
    store.fetchVacancies();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between">
        <div className="text-xl">Вакансии</div>
        <Button color="secondary" onPress={() => store.addVacancy()}>
          Создать
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        {vacancies.map((vacancy) => (
          <Card key={vacancy.id}>
            <CardHeader>{vacancy.title}</CardHeader>
            <CardBody>
              <div>{vacancy.description}</div>
              <div>{vacancy.slary}</div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
});
