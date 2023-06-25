import { Flex, Stack } from "@mantine/core";
import GrupoNotas from "./GrupoNotas";
import { formatearFecha } from "../../utils/fechas";

export default function BitacoraPacienteCargada({ notas, setNotas }) {
  let grupos = crearGrupos(notas, setNotas);
  return (
    <Stack w="100%" h="100%" spacing="5em">
      {grupos}
    </Stack>
  );
}

function crearGrupos(grupos, setNotas) {
  return Object.keys(grupos).map((header) => (
    <GrupoNotas
      grupo={grupos[header]}
      setNotas={setNotas}
      header={formatearFecha(header)}
    />
  ));
}
