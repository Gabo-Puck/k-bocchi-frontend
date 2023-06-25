import { Box, Divider, Flex, Group, Stack, Title } from "@mantine/core";
import NotaPreview from "./NotaPreview";

export default function GrupoNotas({ grupo, header }) {
  let notas = crearNotas(grupo);
  return (
    <Stack w="100%">
      <Title order={2} p={0}>{header}</Title>
      <Divider />
      <Flex w="100%" wrap="wrap" gap="xl" style={{ flex: "1 1 auto" }}>
        {notas}
      </Flex>
    </Stack>
  );
}
function crearNotas(notas) {
  return notas.map((nota) => <NotaPreview nota={nota} />);
}
