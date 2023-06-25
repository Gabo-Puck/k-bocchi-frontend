import { Box, Divider, Flex, Group, Stack, Title } from "@mantine/core";
import NotaPreview from "./NotaPreview";
import CrearNotaButton from "./CrearNotaButton";

export default function GrupoNotas({ grupo, header, setNotas, pacienteId }) {
  if (grupo.length === 0 && header != "Hoy") return <></>;
  let notas;
  if (header === "Hoy") {
    notas = crearNotasHoy(grupo, setNotas, pacienteId);
  } else {
    notas = crearNotas(grupo, setNotas, pacienteId);
  }
  return (
    <Stack w="100%">
      <Title order={2} p={0}>
        {header}
      </Title>
      <Divider />
      <Flex w="100%" wrap="wrap" gap="xl" style={{ flex: "1 1 auto" }}>
        {notas}
      </Flex>
    </Stack>
  );
}
function crearNotas(notas, setNotas, pacienteId) {
  return notas.map((nota) => (
    <NotaPreview nota={nota} setNotas={setNotas} pacienteId={pacienteId} />
  ));
}
function crearNotasHoy(notas, setNotas, pacienteId) {
  let notasCreadas = notas.map((nota) => (
    <NotaPreview nota={nota} setNotas={setNotas} pacienteId={pacienteId} />
  ));
  notasCreadas.push(<CrearNotaButton setNotas={setNotas} pacienteId={pacienteId} />);
  return notasCreadas;
}
