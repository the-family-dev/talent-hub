import { Button, Navbar, NavbarBrand, NavbarContent } from "@heroui/react";
import { useLocation, useNavigate } from "react-router";
import { observer } from "mobx-react-lite";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export const StartPageHeader = observer(() => {
  const navigate = useNavigate();

  const location = useLocation();

  const isAuthPath =
    location.pathname.includes("/applicant") ||
    location.pathname.includes("/company") ||
    location.pathname.includes("/university") ||
    location.pathname.includes("/auth");

  return (
    <Navbar
      classNames={{
        wrapper: "px-0 mx-0 w-[1200px]",
      }}
      maxWidth={"full"}
      isBordered
    >
      <NavbarBrand className="flex flex-row gap-2"></NavbarBrand>
      <NavbarContent justify="end">
        <ThemeSwitcher />
        {!isAuthPath ? (
          <Button
            color="primary"
            variant="solid"
            onPress={() => navigate("/auth")}
          >
            Войти
          </Button>
        ) : (
          <Button
            color="primary"
            onPress={() => navigate(-1)}
            className="w-min"
          >
            <ArrowLeftIcon className="size-4" /> Назад
          </Button>
        )}
      </NavbarContent>
    </Navbar>
  );
});
