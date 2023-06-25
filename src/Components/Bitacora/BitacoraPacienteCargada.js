import { Flex, Stack } from "@mantine/core";
import GrupoNotas from "./GrupoNotas";
import { formatearFecha } from "../../utils/fechas";

export default function BitacoraPacienteCargada({ notas }) {
  let grupos = crearGrupos(notas);
  return (
    <Stack w="100%" h="100%" spacing="5em">
      {grupos}
    </Stack>
  );
}

function crearGrupos(grupos) {
  return Object.keys(grupos).map((header) => (
    <GrupoNotas grupo={grupos[header]} header={formatearFecha(header)} />
  ));
}
