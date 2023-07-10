import {
  ActionIcon,
  Button,
  Flex,
  Grid,
  Group,
  ScrollArea,
  Stack,
  Table,
  Text,
  Title,
  UnstyledButton,
  rem,
} from "@mantine/core";
import CarritoItem from "./CarritoItem";
import { useState } from "react";
import Imagen from "../Imagen";
import ControlCantidad from "./ControlCantidad";
import { useMd, useSm, useXs } from "../../utils/mediaQueryHooks";
import CenterHorizontal from "../CenterHorizontal";
import { currencyFormatter } from "../../utils/formatters";
import { FaTrash } from "react-icons/fa";
import ButtonEliminarCarrito from "./BotonEliminarProducto";

export default function CarritoProductos({ productos, setProductos }) {
  const md = useMd();
  const xs = useXs();
  return xs ? (
    <VistaGrande productos={productos} setProductos={setProductos} />
  ) : (
    <VistaMovil productos={productos} setProductos={setProductos} />
  );
}

function VistaGrande({ productos, setProductos }) {
  const md = useMd();
  const xs = useXs();
  return (
    <Table>
      <thead>
        <tr>
          <th>
            {md ? (
              <Text>Producto</Text>
            ) : (
              <CenterHorizontal>
                <Text>Producto</Text>
              </CenterHorizontal>
            )}
          </th>
          <th>
            <CenterHorizontal>
              <Text>Cantidad</Text>
            </CenterHorizontal>
          </th>
          <th>
            <CenterHorizontal>
              <Text>Precio</Text>
            </CenterHorizontal>
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {productos.map(({ producto, ...carritoItem }) => (
          <tr>
            <td width={"30%"}>
              <Grid w={md ? "100%" : "auto"}>
                <Grid.Col span={12} md={12}>
                  <Text fw="bold" fz="lg">
                    {producto.nombre}
                  </Text>
                  <Imagen image={producto.imagen} heightSkeleton="20vh" />
                </Grid.Col>
              </Grid>
            </td>
            <td>
              <CenterHorizontal>
                <ControlCantidad
                  initialValue={carritoItem.cantidad}
                  size={xs ? 42 : 20}
                  heightInput={xs ? 42 : 20}
                  widthInput={rem(xs ? 54 : 45)}
                  min={1}
                />
              </CenterHorizontal>
            </td>
            <td>
              <Text ta="center">
                <Text>{currencyFormatter.format(producto.precio)}</Text>
                <Text fz="xs" color="dimmed">
                  Precio unitario: {currencyFormatter.format(producto.precio)}
                </Text>
              </Text>
            </td>
            <td>
              <CenterHorizontal>
                <ButtonEliminarCarrito
                  setProductos={setProductos}
                  producto={producto}
                >
                  <EliminarProductoCarrito />
                </ButtonEliminarCarrito>
              </CenterHorizontal>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
function VistaMovil({ productos, setProductos }) {
  const md = useMd();
  const xs = useXs();
  return (
    <div>
      {productos.map(({ producto, ...carritoItem }) => (
        <Flex
          style={{ borderTop: "1px solid gray" }}
          align="center"
          wrap="wrap"
          my="md"
          pos="relative"
        >
          <Stack style={{ flex: "1" }} align="center" h="100%" mb="md">
            <Text fw="bold" fz="lg" ta="start">
              {producto.nombre}
            </Text>
            <Imagen
              image={producto.imagen}
              width="50vw"
              heightSkeleton="20vh"
            />
          </Stack>

          <Flex
            align="center"
            direction="column"
            justify="center"
            style={{ flex: "1" }}
          >
            <Text>
              <ControlCantidad
                initialValue={carritoItem.cantidad}
                size={42}
                heightInput={42}
                widthInput={rem(54)}
                min={1}
              />
              <Text ta="center">
                {currencyFormatter.format(
                  producto.precio * carritoItem.cantidad
                )}
              </Text>
              <Text ta="center" fz="xs" color="dimmed">
                Precio unitario: {currencyFormatter.format(producto.precio)}
              </Text>
            </Text>
            <ButtonEliminarCarrito
              producto={producto}
              setProductos={setProductos}
            >
              <Button color="red">Sacar del carrito</Button>
            </ButtonEliminarCarrito>
          </Flex>

          {/* <EliminarProductoCarrito pos="absolute" /> */}
        </Flex>
      ))}
    </div>
  );
}

function EliminarProductoCarrito({ ...props }) {
  return (
    <ActionIcon variant="light" color="red" {...props}>
      <FaTrash />
    </ActionIcon>
  );
}
