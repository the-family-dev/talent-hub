import { Button, Navbar, NavbarBrand, NavbarContent } from "@heroui/react";
import { ThemeSwitcher } from "../../components/ThemeSwitcher";
import { Link } from "react-router";
import { observer } from "mobx-react-lite";
import {
  ArrowLeftStartOnRectangleIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { routerStore } from "../router/routerStore";

export const AdminHeader = observer(() => {
  return (
    <Navbar
      classNames={{
        wrapper: "px-0 mx-0 w-[1200px]",
      }}
      maxWidth={"full"}
      isBordered
    >
      <NavbarBrand className="flex flex-row gap-2">
        <WrenchScrewdriverIcon className="size-6 text-warning" />
        <div className="font-bold text-2xl">Администрирование</div>
      </NavbarBrand>
      <NavbarContent justify="end">
        <ThemeSwitcher />
        <Button
          isIconOnly
          color="danger"
          variant="light"
          onPress={() => routerStore.navigate?.("/")}
          to={"/"}
          as={Link}
        >
          <ArrowLeftStartOnRectangleIcon className="size-6" />
        </Button>
      </NavbarContent>
    </Navbar>
  );
});
