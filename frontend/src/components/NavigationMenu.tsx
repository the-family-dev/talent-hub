import { Badge, Button } from "@heroui/react";
import { Link, matchPath, useLocation } from "react-router";

export type TNavigationButton = {
  path: string;
  title: string;
  badge?: number;
  icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref">
  >;
};

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
      className="justify-start select-none w-full"
      draggable={false}
    >
      {title}
    </Button>
  );
};

type TNavigationMenuProps = {
  buttons: TNavigationButton[];
};

export const NavigationMenu = (props: TNavigationMenuProps) => {
  const { buttons } = props;

  const location = useLocation();

  const hasChildRoute = (routePath: string) =>
    buttons.some(
      (r) => r.path !== routePath && r.path.startsWith(routePath + "/")
    );

  return (
    <div className="w-[300px] h-full flex flex-col gap-2">
      {buttons.map((button, index) => {
        const end = hasChildRoute(button.path);
        const isActive = Boolean(
          matchPath({ path: button.path, end }, location.pathname)
        );

        return (
          <Badge
            key={index}
            color="primary"
            isInvisible={button.badge === undefined}
            content={button.badge}
          >
            <NavigationButton
              isActive={isActive}
              title={button.title}
              icon={button.icon}
              path={button.path}
            />
          </Badge>
        );
      })}
    </div>
  );
};
