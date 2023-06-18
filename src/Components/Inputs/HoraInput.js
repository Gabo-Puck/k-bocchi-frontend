import { Input } from "@mantine/core";
import { useId } from "@mantine/hooks";
import { IMaskInput, useIMask, IMask } from "react-imask";
const maskOptions = {
  overwrite: true,
  autofix: true,
  mask: "HH:MM",
  blocks: {
    HH: {
      mask: IMask.MaskedRange,
      placeholderChar: "HH",
      from: 0,
      to: 23,
      maxLength: 2,
    },
    MM: {
      mask: IMask.MaskedRange,
      placeholderChar: "MM",
      from: 0,
      to: 59,
      maxLength: 2,
    },
  },
};
export default function HoraInput({ label, form, inputName, ...props }) {
  const id = useId();
  const { ref, } = useIMask(maskOptions, {
    onAccept: (s) => {
      console.log({ accept: s });
    },
    onComplete: (s) => {
      console.log({ complete: s });
    },
  });
  return (
    <Input.Wrapper id={id} label={label} required maw={320} mx="auto">
      <Input
        ref={ref}
        id={id}
        placeholder="00:00"
        {...form.getInputProps(inputName)}
      />
    </Input.Wrapper>
  );
}
