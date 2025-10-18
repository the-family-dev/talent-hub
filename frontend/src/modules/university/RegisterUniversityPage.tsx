import { observer } from "mobx-react-lite";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Tabs,
  Tab,
  Form,
} from "@heroui/react";
import { LoginFormType } from "../../types/rootTypes";
import { useMemo } from "react";
import { authOptions } from "../../constants/authConstants";
import { universityStore } from "./universityStore";

export const RegisterUniversityPage = observer(() => {
  const { logInType, form } = universityStore;

  const { name, login } = form;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (logInType === LoginFormType.LogIn) {
      universityStore.logIn();
      return;
    }
    if (logInType === LoginFormType.Register) {
      universityStore.register();
      return;
    }
  };

  const submitButtonText = useMemo(() => {
    if (logInType === LoginFormType.LogIn) {
      return "Войти";
    } else {
      return "Зарегистрироваться";
    }
  }, [logInType]);

  return (
    <div className="h-full flex items-center justify-center">
      <Card className="w-[500px]">
        <CardHeader className="flex flex-col gap-2 pb-4">
          <div className="text-xl font-bold">Вуз</div>
          <Tabs
            selectedKey={logInType}
            onSelectionChange={(key) =>
              universityStore.setLoginType(key as LoginFormType)
            }
            color="primary"
          >
            {authOptions.map(({ title, key }) => (
              <Tab title={title} key={key}></Tab>
            ))}
          </Tabs>
        </CardHeader>

        <CardBody>
          <Form onSubmit={onSubmit} className="flex flex-col gap-4">
            <Input
              isRequired
              label="Логин"
              placeholder="Введите ваш логин"
              value={login}
              onChange={(e) =>
                universityStore.setFormField("login", e.target.value)
              }
              className="w-full"
              required
            />

            {logInType === LoginFormType.Register ? (
              <Input
                label="Наименование вуза (полностью)"
                placeholder="Введите название вуза"
                value={name}
                onChange={(e) =>
                  universityStore.setFormField("name", e.target.value)
                }
                className="w-full"
                required
              />
            ) : null}

            <Button
              type="submit"
              color="primary"
              className="w-full font-semibold"
              size="md"
            >
              {submitButtonText}
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
});
