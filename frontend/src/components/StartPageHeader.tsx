import { Button, Navbar, NavbarBrand, NavbarContent } from "@heroui/react";
import { useLocation, useNavigate } from "react-router";
import { observer } from "mobx-react-lite";
import { ThemeSwitcher } from "./ThemeSwitcher";

export const StartPageHeader = observer(() => {
  const navigate = useNavigate();

  const location = useLocation();

  const hideLoginButton =
    location.pathname.includes("/applicant") ||
    location.pathname.includes("/auth") ||
    location.pathname.includes("/company") ||
    location.pathname.includes("/university");
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
        {!hideLoginButton && (
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
