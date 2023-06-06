import { Box, List, Text } from "@mantine/core";

export default function MensajeOpcionesCrud() {
  return (
    <Box>
      <Text>¿Qué deseas hacer?</Text>
      <List type="ordered">
        <List.Item>Agendar una cita</List.Item>
        <List.Item>Modificar una cita</List.Item>
        <List.Item>Cancelar una cita</List.Item>
      </List>
    </Box>
  );
}
