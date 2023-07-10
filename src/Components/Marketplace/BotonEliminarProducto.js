import { UnstyledButton } from "@mantine/core";

export default function ButtonEliminarCarrito({
  setProductos,
  producto,
  ...props
}) {
  return (
    <UnstyledButton
      onClick={() => {
        console.log(`Eliminando del carrito ${producto.nombre}`);
      }}
    >
      {props.children}
    </UnstyledButton>
  );
}
