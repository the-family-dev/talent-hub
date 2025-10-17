import { Button, Navbar, NavbarBrand, NavbarContent } from "@heroui/react";
import { ThemeSwitcher } from "../../components/ThemeSwitcher";
import { Link } from "react-router";
import { observer } from "mobx-react-lite";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { applicantStore } from "./applicantStore";

export const ApplicantHeader = observer(() => {
  const { applicant } = applicantStore;

  if (applicant === undefined) return null;

  const { name, login } = applicant;

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
          onPress={() => applicantStore.logOut()}
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
