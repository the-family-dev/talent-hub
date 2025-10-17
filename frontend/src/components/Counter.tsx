import { Button, ButtonGroup } from "@heroui/react";

type TCounterProps = {
  value: number;
  min?: number;
  max?: number;
  label?: string;
  onChange: (value: number) => void;
};

export const Counter = (props: TCounterProps) => {
  const { value, min = 0, max = 100, label, onChange } = props;

  const changeHandler = (increment: number) => {
    let newValue = value + increment;

    if (newValue < min) {
      newValue = min;
    }
    if (newValue > max) {
      newValue = max;
    }
    onChange(newValue);
  };

  return (
    <div className="flex flex-col gap-2">
      {label ? <div>{label}</div> : null}
      <div className="flex flex-row gap-2 justify-between items-center">
        <ButtonGroup>
          <Button
            className="font-bold"
            onPress={() => changeHandler(-10)}
            size="sm"
          >
            -10
          </Button>
          <Button
            className="font-bold"
            onPress={() => changeHandler(-1)}
            size="sm"
          >
            -1
          </Button>
        </ButtonGroup>
        <div className="text-lg font-bold">{value}</div>
        <ButtonGroup>
          <Button
            className="font-bold"
            onPress={() => changeHandler(1)}
            size="sm"
          >
            +1
          </Button>
          <Button
            className="font-bold"
            onPress={() => changeHandler(10)}
            size="sm"
          >
            +10
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};
