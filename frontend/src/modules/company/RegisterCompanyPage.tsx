import { observer } from "mobx-react-lite";
import { companyStore } from "./companyStore";
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

export const RegisterCompanyPage = observer(() => {
  const { logInType, form } = companyStore;

  const { name, login } = form;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (logInType === LoginFormType.LogIn) {
      companyStore.logIn();
      return;
    }
    if (logInType === LoginFormType.Register) {
      companyStore.register();
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
          <div className="text-xl font-bold">Компания</div>
          <Tabs
            selectedKey={logInType}
            onSelectionChange={(key) =>
              companyStore.setLoginType(key as LoginFormType)
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
              label="Логин"
              placeholder="Введите ваш логин"
              value={login}
              onChange={(e) => companyStore.setFormLogin(e.target.value)}
              className="w-full"
              required
            />

            {logInType === LoginFormType.Register ? (
              <Input
                label="Название компании"
                placeholder="Введите название компании"
                value={name}
                onChange={(e) => companyStore.setFormName(e.target.value)}
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
