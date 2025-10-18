import { Button, Navbar, NavbarBrand, NavbarContent } from "@heroui/react";
import { ThemeSwitcher } from "../../components/ThemeSwitcher";
import { Link } from "react-router";
import { observer } from "mobx-react-lite";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { AvatarImage } from "../../components/AvatarImage";
import { universityStore } from "./universityStore";
import { getFileSrc } from "../../api";

export const UniversityHeader = observer(() => {
  const { university } = universityStore;

  if (university === undefined) return null;

  const { name, login, logoUrl } = university;

  return (
    <Navbar
      classNames={{
        wrapper: "px-0 mx-0 w-[1200px]",
      }}
      maxWidth={"full"}
      isBordered
    >
      <NavbarBrand className="flex flex-row gap-2">
        <AvatarImage
          name={name}
          width={48}
          height={48}
          avatar={getFileSrc(logoUrl)}
        />
        <div className="font-bold text-2xl">{name}</div>
      </NavbarBrand>
      <NavbarContent justify="end">
        <ThemeSwitcher />
        <Button
          color="danger"
          variant="light"
          onPress={() => universityStore.logOut()}
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
