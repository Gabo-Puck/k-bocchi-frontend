import { useState, useRef, useEffect } from "react";
import {
  NumberInput,
  Group,
  ActionIcon,
  NumberInputHandlers,
  rem,
} from "@mantine/core";

export default function ControlCantidad({
  max,
  disabled,
  initialValue = 0,
  onChange = (value) => {},
  step = 1,
  min = 0,
  ...props
}) {
  const [value, setValue] = useState(initialValue);
  const handlers = useRef();

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  useEffect(() => {
    onChange(value);
  }, [value]);
  return (
    <Group spacing={5} {...props}>
      <ActionIcon
        size={42}
        variant="default"
        disabled={value === min || disabled}
        onClick={() => handlers.current.decrement()}
      >
        –
      </ActionIcon>

      <NumberInput
        hideControls
        value={value}
        onChange={(val) => setValue(val)}
        handlersRef={handlers}
        max={max}
        min={min}
        step={step}
        disabled={disabled}
        styles={{ input: { width: rem(54), height: 42, textAlign: "center" } }}
      />

      <ActionIcon
        size={42}
        variant="default"
        disabled={value === max || disabled}
        onClick={() => handlers.current.increment()}
      >
        +
      </ActionIcon>
    </Group>
  );
}
