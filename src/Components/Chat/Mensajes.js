import { Text } from "@mantine/core";
import Mensaje from "./Mensaje";

export default function Mensajes({ mensajes }) {
  const mensajesComponents = mensajes.map((mensaje) => (
    <Mensaje mensaje={mensaje} />
  ));
  return (
    <>{mensajes.length === 0 ? <Text>Vacio</Text> : mensajesComponents}</>
  );
}
