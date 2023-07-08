import { Badge, Text } from "@mantine/core";
import { numberFormatter } from "../../utils/formatters";

export default function DisponibilidadProducto({ hasStock, stock, textProps }) {
  return hasStock === 1 ? (
    <Text {...textProps}>{numberFormatter.format(stock)} piezas</Text>
  ) : (
    <Badge>Agotado</Badge>
  );
}
