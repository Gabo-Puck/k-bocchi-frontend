import { Button, Tooltip } from "@mantine/core";

export function EnabledButton({ ...props }) {
    return (
      <Button {...props} type="sumbit">
        {props.children}
      </Button>
    );
  }
  
export function DisabledButton({ ...props }) {
    return (
      <Tooltip label="Llena todos los campos correctamente">
        <Button
          data-disabled
          sx={{ "&[data-disabled]": { pointerEvents: "all" } }}
          onClick={(event) => event.preventDefault()}
          {...props}
        >
          {props.children}
        </Button>
      </Tooltip>
    );
  }