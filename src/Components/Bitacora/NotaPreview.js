import {
  Container,
  Paper,
  Text,
  Title,
  Divider,
  Stack,
  createStyles,
  Flex,
} from "@mantine/core";
import { FormatUTCTime } from "../../utils/fechas";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectUsuario } from "../../utils/usuarioHooks";
import ImagenAvatar from "../ImagenAvatar";
import { useSm } from "../../utils/mediaQueryHooks";
import { MenuOpciones } from "./MenuOpciones";
import { mostrarNotaCompleta } from "./MostrarNotasModals";
import LabelNota from "./LabelNota";
import NotaPreviewPaciente from "./NotaPreviewPaciente";

export default function NotaPreview({
  nota,
  setNotas,
  pacienteId,
  encabezado,
  onClick = (nota, setNotas) => {},
}) {
  const { cita } = nota;
  const { terapeuta_datos } = cita;
  const { usuario } = terapeuta_datos;
  const ref = useRef();
  useEffect(() => {
    ref.current.loadFotoPerfil();
  }, [nota]);
  return (
    <Container
      p={0}
      m={0}
      w={{
        xl: "14%",
        xml: "19%",
        lg: "24%",
        md: "30%",
        sm: "46%",
        xs: "100%",
      }}
      miw={{
        xl: "14%",
        xml: "19%",
        lg: "24%",
        md: "30%",
        sm: "46%",
        xs: "100%",
      }}
    >
      <Paper
        pos="relative"
        w="100%"
        shadow="md"
        withBorder
        px="sm"
        py="xs"
        onClick={({ stopPropagation }) => {
          // alert(JSON.stringify(nota));
          onClick(nota, setNotas);
          // mostrarNotaCompleta(nota, setNotas);
        }}
      >
        <Stack spacing="sm">
          {encabezado}
          <Container w="100%">
            <Text component={Stack} spacing="xs">
              <ContenidoPreview
                label="Diagnostico"
                contenido={nota.diagnostico}
              />
              <ContenidoPreview
                label="Observaciones"
                contenido={nota.observaciones}
              />
              <ContenidoPreview
                label="Tratamiento"
                contenido={nota.tratamiento}
              />
              <ContenidoPreview label="Evolución" contenido={nota.evolucion} />
            </Text>
          </Container>
          <Divider mb={0} />

          <Flex justify="space-between" align="center">
            <ImagenAvatar image={usuario.foto_perfil} ref={ref} />
            <Title m={0} order={4} ta="end" style={{ flex: "1 1 auto" }}>
              {FormatUTCTime(nota.fecha_edicion)}
            </Title>
          </Flex>
        </Stack>
      </Paper>
    </Container>
  );
}

function ContenidoPreview({ label, contenido }) {
  return (
    <Text style={{ wordWrap: "break-word", width: "90%" }}>
      <LabelNota label={label} />
      <Text lineClamp={2}>{contenido}</Text>
    </Text>
  );
}

// function Preview({nota}){
//     return ()
// }
