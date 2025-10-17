import { observer } from "mobx-react-lite";

export const LabelWithIcon = observer<{
  label?: string;
  icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref">
  >;
}>((props) => {
  const { label = "Не указан" } = props;
  return (
    <div className="flex flex-row gap-1 text-default-500 font-medium">
      <props.icon className="size-6" />
      {label}
    </div>
  );
});
