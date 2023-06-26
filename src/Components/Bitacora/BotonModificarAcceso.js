import { Button, Stack, Text, Title } from "@mantine/core";
import { modals } from "@mantine/modals";
export default function BotonModificarAcceso() {
  return <Button variant="configuracion" onClick={mostrarTerapeutas}>Acceso</Button>;
}

function mostrarTerapeutas() {
  modals.open({
    title: <Title order={3}>Selecciona un terapeuta</Title>,
  });
}
function CuerpoModalAcceso() {
  return (
    <>
      <Stack>
        <Text></Text>
      </Stack>
    </>
  );
}
