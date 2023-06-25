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

const useStyles = createStyles((theme) => ({
  marcadorAutor: {
    backgroundColor: theme.colors["cyan-opaque"],
  },
  marcadorNueva: {
    backgroundColor: theme.colors["green-nature"],
  },
  marcadorRegular: {
    backgroundColor: theme.colors["blue-empire"][4],
  },
  marcador: {
    borderRadius: "50%",
    height: "0.8em",
    width: "0.8em",
  },
}));

export default function NotaPreview({ nota, setNotas, pacienteId }) {
  const {
    terapeuta: { id },
  } = useSelector(selectUsuario);
  const { classes, cx } = useStyles();
  const { cita } = nota;
  const { terapeuta_datos } = cita;
  const { usuario } = terapeuta_datos;
  const isAutor = id === cita.id_terapeuta;
  const sm = useSm();
  const ref = useRef();
  useEffect(() => {
    ref.current.loadFotoPerfil();
  }, [nota]);
  return (
    <>
      <Paper
        pos="relative"
        
        miw="35%"
        maw={!sm ? "100%" : "44%"}
        shadow="md"
        withBorder
        px="sm"
        py="xs"
        onClick={({ stopPropagation }) => {
          // alert(JSON.stringify(nota));
          mostrarNotaCompleta(nota);
        }}
      >
        <Stack spacing="sm">
          <Flex align="center" justify="space-between">
            <Flex align="center" gap="0.3em" w="100%">
              <Marcador
                className={
                  isAutor ? classes.marcadorAutor : classes.marcadorRegular
                }
              />
              <Title order={3}>{nota.titulo}</Title>
            </Flex>

            {<MenuOpciones nota={nota} setNotas={setNotas} />}
          </Flex>

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
    </>
  );
}

function ContenidoPreview({ label, contenido }) {
  return (
    <Text lineClamp={2}>
      <LabelNota label={label} />
      <Text>{contenido}</Text>
    </Text>
  );
}

function Marcador({ className }) {
  const { classes, cx } = useStyles();
  return <div className={cx(classes.marcador, className)}></div>;
}
// function Preview({nota}){
//     return ()
// }
