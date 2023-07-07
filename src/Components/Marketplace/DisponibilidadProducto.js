import { Badge, Text } from "@mantine/core";

export default function DisponibilidadProducto({ hasStock, stock }) {
  return hasStock === 1 ? <Text>{stock} piezas</Text> : <Badge>Agotado</Badge>;
}
