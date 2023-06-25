import {
  Container,
  Paper,
  Text,
  Title,
  Divider,
  Box,
  Stack,
  createStyles,
  Flex,
  Group,
  Badge,
  Skeleton,
  Button,
  UnstyledButton,
  Menu,
  Affix,
  Textarea,
  TextInput,
} from "@mantine/core";
import {
  FormatDate,
  FormatUTCDateTime,
  FormatUTCTime,
  formatearFecha,
} from "../../utils/fechas";
import { HiEllipsisVertical } from "react-icons/hi2";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectUsuario } from "../../utils/usuarioHooks";
import ImagenAvatar from "../ImagenAvatar";
import { useSm } from "../../utils/mediaQueryHooks";
import { modals } from "@mantine/modals";
import { MdEdit, MdOutlineDelete } from "react-icons/md";
import { useForm } from "@mantine/form";
import { executeValidation } from "../../utils/isFormInvalid";
import {
  isLongitudMinima,
  isRequiredValidation,
} from "../../utils/inputValidation";
import axios from "axios";
import { showNotification } from "@mantine/notifications";
import {
  showErrorConexionNotification,
  showNegativeFeedbackNotification,
  showPositiveFeedbackNotification,
} from "../../utils/notificationTemplate";

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

export default function NotaPreview({ nota, setNotas }) {
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
        h="100%"
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

const Icono = forwardRef(({ ...others }, ref) => {
  return (
    <UnstyledButton ref={ref} {...others}>
      <Group>{<HiEllipsisVertical size="1rem" />}</Group>
    </UnstyledButton>
  );
});
function MenuOpciones({ nota, setNotas }) {
  const {
    terapeuta: { id },
  } = useSelector(selectUsuario);
  const { cita } = nota;
  const isAutor = id === cita.id_terapeuta;
  const handleClick = (event) => {
    event.stopPropagation();
  };
  const handleEditar = (event) => {
    event.stopPropagation();
    // alert("Editar");
    mostrarNotaEditar(nota, setNotas);
  };
  const handleEliminar = (event) => {
    event.stopPropagation();
    // alert("Eliminar");
    mostrarNotaEliminar(nota, setNotas);
  };
  return (
    isAutor && (
      <Group position="center" onClick={handleClick}>
        <Menu withArrow>
          <Menu.Target>
            <Icono />
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item color="blue" icon={<MdEdit />} onClick={handleEditar}>
              Editar
            </Menu.Item>
            <Menu.Item
              color="red"
              icon={<MdOutlineDelete />}
              onClick={handleEliminar}
            >
              Eliminar
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    )
  );
}

function mostrarNotaCompleta(nota) {
  modals.open({
    children: <NotaCompleta nota={nota} />,
    withCloseButton: false,
  });
}

function mostrarNotaEditar(nota, setNotas) {
  modals.open({
    children: <NotaEditar nota={nota} setNotas={setNotas} />,
  });
}
function mostrarNotaEliminar(nota, setNotas) {
  modals.open({
    children: <NotaEditar nota={nota} setNotas={setNotas} />,
  });
}

function NotaCompleta({ nota }) {
  const {
    terapeuta: { id },
  } = useSelector(selectUsuario);
  const { cita } = nota;
  const { terapeuta_datos } = cita;
  const { usuario } = terapeuta_datos;

  return (
    <>
      <Stack pos="relative">
        <NotaTitulo nota={nota} />
        <Flex align="center" gap="sm">
          <Box>
            <ImagenAvatar image={usuario.foto_perfil} />
          </Box>
          <Text>
            <Text span fw="bold">
              Autor:{" "}
            </Text>
            {usuario.nombre}
          </Text>
        </Flex>
        <Divider />
        <Container>
          <Text component={Stack} spacing="xs">
            <ContenidoCompleto
              label="Diagnostico"
              contenido={nota.diagnostico}
            />
            <ContenidoCompleto
              label="Observaciones"
              contenido={nota.observaciones}
            />
            <ContenidoCompleto
              label="Tratamiento"
              contenido={nota.tratamiento}
            />
            <ContenidoCompleto label="Evolución" contenido={nota.evolucion} />
          </Text>
        </Container>
        <Divider />
        <Stack spacing={0}>
          <NotaFechas nota={nota} />
        </Stack>
        <Divider />
        <Flex w="100%" justify="end">
          <Button
            onClick={() => {
              modals.closeAll();
            }}
            variant="cerrar"
          >
            Cerrar
          </Button>
        </Flex>
      </Stack>
    </>
  );
}

function addTop(nota, setNotas, grupoPrevio) {
  setNotas((notas) => {
    let notasNew = { ...notas };
    let fecha = FormatDate(nota.fecha_edicion);
    notasNew[grupoPrevio] = notasNew[grupoPrevio].filter(
      (n) => n.id !== nota.id
    );
    notasNew[fecha].unshift(nota);
    return notasNew;
  });
}
function erase(nota, setNotas) {
  setNotas((notas) => {
    let notasNew = { ...notas };
    let fecha = FormatDate(nota.fecha_edicion);
    notasNew[fecha] = notasNew[fecha].filter((n) => n.id !== nota.id);
    return notasNew;
  });
}

function NotaEditar({ nota, setNotas }) {
  const {
    terapeuta: { id },
  } = useSelector(selectUsuario);
  const { cita } = nota;
  const { terapeuta_datos } = cita;
  const { usuario } = terapeuta_datos;
  const [guardando, setIsGuardando] = useState(false);
  const handleSubmit = async () => {
    setIsGuardando(true);
    let { id: idNota } = nota;
    try {
      let notaContent = form.values;
      let { data: notaModificada } = await axios.patch("/notas", {
        id: idNota,
        id_terapeuta: id,
        nota: notaContent,
      });
      // console.log({ notaModificada });
      let grupoPrevio = FormatDate(nota.fecha_edicion);
      addTop(notaModificada, setNotas, grupoPrevio);
      showPositiveFeedbackNotification(
        "Perfecto, se ha modificado la nota correctamente 😀"
      );

      modals.closeAll();
    } catch (err) {
      if (err) {
        let {
          response: { data },
        } = err;
        showNegativeFeedbackNotification(data);
      }
      console.log(err);
    }
    setIsGuardando(false);
  };
  const form = useForm({
    initialValues: {
      titulo: nota.titulo,
      diagnostico: nota.diagnostico,
      observaciones: nota.observaciones,
      tratamiento: nota.tratamiento,
      evolucion: nota.evolucion,
      id_cita: cita.id,
    },
    validate: {
      titulo: (value) =>
        executeValidation(value, [
          isRequiredValidation,
          (value) => isLongitudMinima(value, 3, "caracteres"),
        ]),
      diagnostico: (value) =>
        executeValidation(value, [
          isRequiredValidation,
          (value) => isLongitudMinima(value, 3, "caracteres"),
        ]),
      evolucion: (value) =>
        executeValidation(value, [
          isRequiredValidation,
          (value) => isLongitudMinima(value, 3, "caracteres"),
        ]),
      observaciones: (value) =>
        executeValidation(value, [
          isRequiredValidation,
          (value) => isLongitudMinima(value, 3, "caracteres"),
        ]),
      tratamiento: (value) =>
        executeValidation(value, [
          isRequiredValidation,
          (value) => isLongitudMinima(value, 3, "caracteres"),
        ]),
    },

    validateInputOnChange: true,
    validateInputOnBlur: true,
  });
  return (
    <>
      <Stack pos="relative">
        <TextInput
          placeholder="Introduce el titulo"
          {...form.getInputProps("titulo")}
        />
        <Flex align="center" gap="sm" w="100%">
          <Box>
            <ImagenAvatar image={usuario.foto_perfil} />
          </Box>
          <Text>
            <Text span fw="bold">
              Autor:{" "}
            </Text>
            {usuario.nombre}
          </Text>
        </Flex>
        <Divider />
        <Container w="100%">
          <Stack spacing="xs" w="100%">
            <Textarea
              label={<LabelNota label="Diagnostico" />}
              {...form.getInputProps("diagnostico")}
            />
            <Textarea
              label={<LabelNota label="Observaciones" />}
              {...form.getInputProps("observaciones")}
            />
            <Textarea
              label={<LabelNota label="Tratamiento" />}
              {...form.getInputProps("tratamiento")}
            />
            <Textarea
              label={<LabelNota label="Evolución" />}
              {...form.getInputProps("evolucion")}
            />
          </Stack>
        </Container>
        <Divider />
        <Stack spacing={0}>
          <NotaFechas nota={nota} />
        </Stack>
        <Divider />
        <Flex w="100%" justify="end" gap="md">
          <Button
            onClick={() => {
              modals.closeAll();
            }}
            variant="cerrar"
          >
            Cancelar
          </Button>
          <Button
            disabled={!form.isValid() || !form.isDirty()}
            onClick={() => {
              handleSubmit();
            }}
            variant="guardar"
            loading={guardando}
          >
            Guardar
          </Button>
        </Flex>
      </Stack>
    </>
  );
}

function NotaFechas({ nota }) {
  let fechaCreacion = `${formatearFecha(
    nota.fecha_creacion
  )} a las ${FormatUTCTime(nota.fecha_creacion)}`;
  let fechaEdicion = `${formatearFecha(
    nota.fecha_edicion
  )} a las ${FormatUTCTime(nota.fecha_edicion)}`;
  return (
    <>
      <Text c="dimmed" fz="xs">
        <Text span fw="bold">
          Creado:{" "}
        </Text>
        {fechaCreacion}
      </Text>
      <Text c="dimmed" fz="xs">
        <Text span fw="bold">
          Modificado:{" "}
        </Text>
        {fechaEdicion}
      </Text>
    </>
  );
}

function NotaTitulo({ nota }) {
  return (
    <Flex w="100%" justify="space-between" align="center">
      <Title order={3}>{nota.titulo}</Title>
      <MenuOpciones nota={nota} />
    </Flex>
  );
}

function ContenidoCompleto({ label, contenido, ...props }) {
  return (
    <Text {...props}>
      <LabelNota label={label} />
      <Text>{contenido}</Text>
    </Text>
  );
}
function LabelNota({ label }) {
  return (
    <Text span fw="bold" c="gray">
      {label}:
    </Text>
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
