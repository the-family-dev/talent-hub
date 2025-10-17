import { Button, Navbar, NavbarBrand, NavbarContent } from "@heroui/react";
import { ThemeSwitcher } from "../../components/ThemeSwitcher";
import { Link } from "react-router";
import { observer } from "mobx-react-lite";
import { companyStore } from "./companyStore";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";

export const CompanyHeader = observer(() => {
  const { company } = companyStore;

  if (company === undefined) return null;

  const { name, login } = company;

  return (
    <Navbar
      classNames={{
        wrapper: "px-0 mx-0",
      }}
      maxWidth={"full"}
      isBordered
    >
      <NavbarBrand className="font-bold text-2xl">{name}</NavbarBrand>
      <NavbarContent justify="end">
        <ThemeSwitcher />
        <Button
          color="danger"
          variant="light"
          onPress={() => companyStore.logOut()}
          to={"/"}
          as={Link}
        >
          <ArrowLeftStartOnRectangleIcon className="size-6" />
          {login}
        </Button>
      </NavbarContent>
    </Navbar>
  );
});
