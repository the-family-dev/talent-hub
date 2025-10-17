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
import { applicantStore } from "./applicantStore";

const options = [
  {
    title: "Войти",
    key: LoginFormType.LogIn,
  },
  {
    title: "Зарегистрироваться",
    key: LoginFormType.Register,
  },
];

export const RegisterApplicantPage = observer(() => {
  const { logInType, form } = applicantStore;

  const { name, login } = form;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (logInType === LoginFormType.LogIn) {
      applicantStore.logIn();
      return;
    }
    if (logInType === LoginFormType.Register) {
      applicantStore.register();
      return;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-[500px]">
        <CardHeader className="flex flex-col gap-2 pb-4">
          <div className="text-xl font-bold">Пользователь</div>
          <Tabs
            selectedKey={logInType}
            onSelectionChange={(key) =>
              applicantStore.setLoginType(key as LoginFormType)
            }
            color="primary"
          >
            {options.map(({ title, key }) => (
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
              onChange={(e) => applicantStore.setFormLogin(e.target.value)}
              className="w-full"
              required
            />

            {logInType === LoginFormType.Register ? (
              <Input
                label="ФИО"
                placeholder="Введите ваше ФИО полностью"
                value={name}
                onChange={(e) => applicantStore.setFormName(e.target.value)}
                className="w-full"
                required
              />
            ) : null}

            <Button
              type="submit"
              color="primary"
              className="w-full font-semibold"
              size="lg"
            >
              Войти
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
});
