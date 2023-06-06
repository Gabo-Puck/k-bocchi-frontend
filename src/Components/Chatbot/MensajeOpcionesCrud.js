import { Box, List, Text } from "@mantine/core";

export default function MensajeOpcionesCrud() {
  return (
    <Box>
      <Text>¿Qué deseas hacer?</Text>
      <List type="ordered">
        <List.Item key="agendar-c">Agendar una cita</List.Item>
        <List.Item key="agendar-u">Modificar una cita</List.Item>
        <List.Item key="agendar-d">Cancelar una cita</List.Item>
      </List>
    </Box>
  );
}
