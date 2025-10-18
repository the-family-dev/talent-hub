import { Snippet } from "@heroui/react";
import { observer } from "mobx-react-lite";

export const LabelWithIcon = observer<{
  label?: string;
  position?: "left" | "right";
  isCopied?: boolean;
  icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref">
  >;
}>((props) => {
  const { label = "Не указан", isCopied = false, position = "left" } = props;
  return (
    <div className="flex flex-row text-default-500 font-medium items-center gap-2">
      {position === "left" ? <props.icon className="size-6" /> : null}
      {isCopied ? (
        <Snippet symbol={""} size="sm" className="w-min">
          {label}
        </Snippet>
      ) : (
        label
      )}
      {position === "right" ? <props.icon className="size-6" /> : null}
    </div>
  );
});
