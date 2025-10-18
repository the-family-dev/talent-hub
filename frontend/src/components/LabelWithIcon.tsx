import { Snippet } from "@heroui/react";
import { observer } from "mobx-react-lite";

export const LabelWithIcon = observer<{
  label?: string;
  isCopied?: boolean;
  icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref">
  >;
}>((props) => {
  const { label = "Не указан", isCopied = false } = props;
  return (
    <div className="flex flex-row text-default-500 font-medium items-center gap-2">
      <props.icon className="size-6" />
      {isCopied ? (
        <Snippet symbol={""} size="sm" className="w-min">
          {label}
        </Snippet>
      ) : (
        label
      )}
    </div>
  );
});
