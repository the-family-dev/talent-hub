import {
  BuildingOffice2Icon,
  DocumentTextIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import { Button, Card, CardBody, CardHeader } from "@heroui/react";
import { Link, useLocation } from "react-router";

const routes = [
  {
    id: 1,
    path: "/company",
    title: "Вакансии",
    icon: HomeIcon,
  },
  {
    id: 2,
    path: "/company/resume",
    title: "Кандидаты",
    icon: DocumentTextIcon,
  },
  {
    id: 3,
    path: "/company/proflie",
    title: "Профиль",
    icon: BuildingOffice2Icon,
  },
];

type TNavigationButtonProps = {
  isActive: boolean;
  title: string;
  path: string;
  icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref">
  >;
};

const NavigationButton = (props: TNavigationButtonProps) => {
  const { title, path, isActive } = props;

  return (
    <Button
      startContent={<props.icon className="size-6" />}
      to={path}
      as={Link}
      variant="flat"
      color={isActive ? "primary" : undefined}
      className="justify-start select-none"
      draggable={false}
    >
      {title}
    </Button>
  );
};

export const NavigationMenu = () => {
  const location = useLocation();

  return (
    <Card className="w-[300px] h-min">
      <CardHeader>Меню</CardHeader>
      <CardBody className="flex flex-col gap-2 w-full">
        {routes.map((route) => (
          <NavigationButton
            key={route.id}
            isActive={route.path === location.pathname}
            title={route.title}
            icon={route.icon}
            path={route.path}
          />
        ))}
      </CardBody>
    </Card>
  );
};
