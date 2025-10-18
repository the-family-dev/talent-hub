import { Button, Navbar, NavbarBrand, NavbarContent } from "@heroui/react";
import { useLocation, useNavigate } from "react-router";
import { observer } from "mobx-react-lite";
import { ThemeSwitcher } from "./ThemeSwitcher";
import {
  ArrowLeftIcon,
  UserIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { routerStore } from "../modules/router/routerStore";
import { AppLogo } from "./AppLogo";

export const StartPageHeader = observer(() => {
  const navigate = useNavigate();

  const location = useLocation();

  const isAuthPath = location.pathname.includes("/auth");

  const isLoginPath =
    location.pathname.includes("/applicant") ||
    location.pathname.includes("/company") ||
    location.pathname.includes("/university") ||
    isAuthPath;

  return (
    <Navbar
      classNames={{
        wrapper: "px-0 mx-0 w-[1200px]",
      }}
      maxWidth={"full"}
      isBordered
    >
      <NavbarBrand className="flex flex-row gap-2 font-bold text-2xl">
        <AppLogo />
      </NavbarBrand>
      <NavbarContent justify="end">
        <Button
          onPress={() => routerStore.navigate?.("/applicant")}
          isIconOnly
          className="text-default-500"
          variant="light"
        >
          <UserIcon className="size-6" />
        </Button>
        <Button
          onPress={() => routerStore.navigate?.("/admin")}
          isIconOnly
          className="text-default-500"
          variant="light"
        >
          <WrenchScrewdriverIcon className="size-6" />
        </Button>
        <ThemeSwitcher />
        {isLoginPath ? (
          <Button
            color="primary"
            onPress={() =>
              isAuthPath ? navigate("/vacancy") : navigate("/auth")
            }
            className="w-min"
          >
            <ArrowLeftIcon className="size-4" /> Назад
          </Button>
        ) : (
          <Button
            color="primary"
            variant="solid"
            onPress={() => navigate("/auth")}
          >
            Войти
          </Button>
        )}
      </NavbarContent>
    </Navbar>
  );
});
